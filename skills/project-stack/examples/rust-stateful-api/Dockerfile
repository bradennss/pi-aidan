FROM rust:1.99.1-trixie AS chef
RUN cargo install cargo-chef --version 0.1.77 --locked
WORKDIR /app

FROM chef AS planner
COPY Cargo.toml Cargo.lock ./
COPY src ./src
RUN cargo chef prepare --recipe-path recipe.json

FROM chef AS build
COPY --from=planner /app/recipe.json recipe.json
RUN cargo chef cook --locked --release --recipe-path recipe.json
COPY Cargo.toml Cargo.lock ./
COPY src ./src
COPY migrations ./migrations
RUN cargo build --locked --release --bin notes-api

FROM debian:13-slim
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates curl \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd --gid 10001 app && useradd --uid 10001 --gid app --no-create-home app
COPY --from=build /app/target/release/notes-api /usr/local/bin/notes-api
USER app
EXPOSE 3000
ENTRYPOINT ["notes-api"]
