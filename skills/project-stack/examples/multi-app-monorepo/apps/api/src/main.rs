use axum::{
    Json, Router,
    extract::{DefaultBodyLimit, Path, Request, State},
    http::StatusCode,
    response::IntoResponse,
    routing::get,
};
use serde::{Deserialize, Serialize};
use sqlx::{PgPool, postgres::PgPoolOptions};
use std::{error::Error, io::ErrorKind, time::Duration};
use subtle::ConstantTimeEq;
use tower_http::{trace::TraceLayer, validate_request::ValidateRequestHeaderLayer};

#[derive(Serialize, sqlx::FromRow)]
struct Note {
    id: i64,
    body: String,
}

#[derive(Deserialize)]
struct NewNote {
    body: String,
}

#[derive(Deserialize)]
struct Config {
    database_url: String,
    api_token: String,
    rust_log: Option<String>,
}

fn main() -> Result<(), Box<dyn Error>> {
    match dotenvy::dotenv() {
        Ok(_) => {}
        Err(dotenvy::Error::Io(error)) if error.kind() == ErrorKind::NotFound => {}
        Err(error) => return Err(error.into()),
    }
    let config: Config = envy::from_env()?;
    if config.api_token.len() < 32
        || !config
            .api_token
            .bytes()
            .all(|byte| byte.is_ascii_alphanumeric())
    {
        return Err("API_TOKEN must contain at least 32 ASCII letters or digits".into());
    }
    run(&config)
}

#[tokio::main]
async fn run(config: &Config) -> Result<(), Box<dyn Error>> {
    tracing_subscriber::fmt()
        .json()
        .with_env_filter(tracing_subscriber::EnvFilter::try_new(
            config.rust_log.as_deref().unwrap_or("info"),
        )?)
        .init();
    let pool = PgPoolOptions::new()
        .max_connections(10)
        .acquire_timeout(Duration::from_secs(5))
        .after_connect(|connection, _| {
            Box::pin(async move {
                sqlx::query("SET statement_timeout = '5s'")
                    .execute(connection)
                    .await?;
                Ok(())
            })
        })
        .connect(&config.database_url)
        .await?;
    sqlx::migrate!().run(&pool).await?;
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await?;
    axum::serve(listener, app(pool, &config.api_token))
        .with_graceful_shutdown(shutdown())
        .await?;
    Ok(())
}

fn app(pool: PgPool, token: &str) -> Router {
    let expected = format!("Bearer {token}");
    #[allow(clippy::result_large_err)]
    let auth = ValidateRequestHeaderLayer::custom(move |request: &mut Request| {
        let valid = request
            .headers()
            .get("authorization")
            .is_some_and(|value| bool::from(value.as_bytes().ct_eq(expected.as_bytes())));
        if valid {
            Ok(())
        } else {
            Err(StatusCode::UNAUTHORIZED.into_response())
        }
    });
    Router::new()
        .route("/notes", axum::routing::post(create_note))
        .route("/notes/{id}", get(get_note))
        .route_layer(auth)
        .route("/healthz", get(health))
        .route("/readyz", get(ready))
        .layer(DefaultBodyLimit::max(16 * 1024))
        .layer(TraceLayer::new_for_http())
        .with_state(pool)
}

async fn health() -> StatusCode {
    StatusCode::OK
}

async fn ready(State(pool): State<PgPool>) -> StatusCode {
    match sqlx::query("SELECT 1").execute(&pool).await {
        Ok(_) => StatusCode::OK,
        Err(_) => StatusCode::SERVICE_UNAVAILABLE,
    }
}

async fn create_note(
    State(pool): State<PgPool>,
    Json(note): Json<NewNote>,
) -> Result<(StatusCode, Json<Note>), StatusCode> {
    let body = note.body.trim();
    if body.is_empty() || body.chars().count() > 2000 {
        return Err(StatusCode::UNPROCESSABLE_ENTITY);
    }
    let note = sqlx::query_as::<_, Note>("INSERT INTO notes (body) VALUES ($1) RETURNING id, body")
        .bind(body)
        .fetch_one(&pool)
        .await
        .map_err(database_error)?;
    Ok((StatusCode::CREATED, Json(note)))
}

async fn get_note(
    State(pool): State<PgPool>,
    Path(id): Path<i64>,
) -> Result<Json<Note>, StatusCode> {
    sqlx::query_as::<_, Note>("SELECT id, body FROM notes WHERE id = $1")
        .bind(id)
        .fetch_optional(&pool)
        .await
        .map_err(database_error)?
        .map(Json)
        .ok_or(StatusCode::NOT_FOUND)
}

#[allow(clippy::needless_pass_by_value)]
fn database_error(error: sqlx::Error) -> StatusCode {
    tracing::error!(%error, "database request failed");
    StatusCode::INTERNAL_SERVER_ERROR
}

async fn shutdown() {
    let interrupt = async {
        tokio::signal::ctrl_c()
            .await
            .expect("install Ctrl-C handler");
    };
    #[cfg(unix)]
    let terminate = async {
        tokio::signal::unix::signal(tokio::signal::unix::SignalKind::terminate())
            .expect("install SIGTERM handler")
            .recv()
            .await;
    };
    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();
    tokio::select! {
        () = interrupt => {},
        () = terminate => {},
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use axum::{body::Body, http::Request};
    use tower::ServiceExt;

    #[test]
    fn deserialize_dotenv_configuration() {
        let variables = dotenvy::from_read_iter(
            &b"DATABASE_URL=postgres://localhost/notes\nAPI_TOKEN=test-token\nRUST_LOG=debug\n"[..],
        )
        .collect::<Result<Vec<_>, _>>()
        .unwrap();
        let config: Config = envy::from_iter(variables).unwrap();
        assert_eq!(config.database_url, "postgres://localhost/notes");
        assert_eq!(config.api_token, "test-token");
        assert_eq!(config.rust_log.as_deref(), Some("debug"));
        assert!(envy::from_iter::<_, Config>([("API_TOKEN".into(), "test-token".into())]).is_err());
    }

    #[sqlx::test]
    async fn probes_reflect_database_availability(pool: PgPool) {
        let app = app(pool.clone(), "test-token");
        for path in ["/healthz", "/readyz"] {
            let response = app
                .clone()
                .oneshot(Request::get(path).body(Body::empty()).unwrap())
                .await
                .unwrap();
            assert_eq!(response.status(), StatusCode::OK);
        }

        pool.close().await;
        for (path, status) in [
            ("/healthz", StatusCode::OK),
            ("/readyz", StatusCode::SERVICE_UNAVAILABLE),
        ] {
            let response = app
                .clone()
                .oneshot(Request::get(path).body(Body::empty()).unwrap())
                .await
                .unwrap();
            assert_eq!(response.status(), status);
        }
    }

    #[sqlx::test]
    async fn authenticated_round_trip(pool: PgPool) {
        let app = app(pool.clone(), "test-token");
        let response = app
            .clone()
            .oneshot(Request::get("/notes/1").body(Body::empty()).unwrap())
            .await
            .unwrap();
        assert_eq!(response.status(), StatusCode::UNAUTHORIZED);

        let response = app
            .clone()
            .oneshot(
                Request::post("/notes")
                    .header("authorization", "Bearer test-token")
                    .header("content-type", "application/json")
                    .body(Body::from(r#"{"body":"hello"}"#))
                    .unwrap(),
            )
            .await
            .unwrap();
        assert_eq!(response.status(), StatusCode::CREATED);
        let id: i64 = sqlx::query_scalar("SELECT id FROM notes WHERE body = 'hello'")
            .fetch_one(&pool)
            .await
            .unwrap();
        let response = app
            .oneshot(
                Request::get(format!("/notes/{id}"))
                    .header("authorization", "Bearer test-token")
                    .body(Body::empty())
                    .unwrap(),
            )
            .await
            .unwrap();
        assert_eq!(response.status(), StatusCode::OK);
    }
}
