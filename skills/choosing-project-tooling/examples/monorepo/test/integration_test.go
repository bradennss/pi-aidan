package test

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"net"
	"net/http"
	"net/url"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"syscall"
	"testing"
	"time"

	"example.com/report-monorepo/internal/jobs"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/riverqueue/river"
	"github.com/riverqueue/river/riverdriver/riverpgxv5"
)

var binaries string

func TestMain(m *testing.M) {
	if os.Getenv("TEST_DATABASE_URL") == "" {
		os.Exit(m.Run())
	}
	var err error
	binaries, err = os.MkdirTemp("", "monorepo-binaries-")
	if err != nil {
		panic(err)
	}
	code := func() int {
		ctx, cancel := context.WithTimeout(context.Background(), 2*time.Minute)
		defer cancel()
		for _, name := range []string{"api", "worker"} {
			cmd := exec.CommandContext(ctx, "go", "build", "-race", "-o", filepath.Join(binaries, name), "./cmd/"+name)
			cmd.Dir = ".."
			if out, err := cmd.CombinedOutput(); err != nil {
				fmt.Fprintf(os.Stderr, "build %s: %v\n%s", name, err, out)
				return 1
			}
		}
		return m.Run()
	}()
	_ = os.RemoveAll(binaries)
	os.Exit(code)
}

type fixture struct {
	t    *testing.T
	ctx  context.Context
	pool *pgxpool.Pool
	url  string
	base string
	api  *process
}

func parseTestDatabaseConfig(databaseURL string) (*pgxpool.Config, error) {
	cfg, err := pgxpool.ParseConfig(databaseURL)
	if err != nil {
		return nil, fmt.Errorf("invalid test database configuration")
	}
	// The test runner creates databases only on this example's dedicated local server.
	if cfg.ConnConfig.Host != "127.0.0.1" || cfg.ConnConfig.Port != 55434 || cfg.ConnConfig.User != "monorepo_local" || cfg.ConnConfig.Database != "monorepo_dev" {
		return nil, fmt.Errorf("TEST_DATABASE_URL must use monorepo_local@127.0.0.1:55434/monorepo_dev")
	}
	for _, fallback := range cfg.ConnConfig.Fallbacks {
		if fallback.Host != "127.0.0.1" || fallback.Port != 55434 {
			return nil, fmt.Errorf("TEST_DATABASE_URL fallbacks must use 127.0.0.1:55434")
		}
	}
	return cfg, nil
}

func TestParseTestDatabaseConfig(t *testing.T) {
	const localURL = "postgresql://monorepo_local:disposable-local-only@127.0.0.1:55434/monorepo_dev"
	for _, tc := range []struct {
		name         string
		url          string
		wantError    bool
		wantFallback bool
	}{
		{name: "local without TLS", url: localURL + "?sslmode=disable"},
		{name: "same-target TLS fallback", url: localURL + "?sslmode=prefer", wantFallback: true},
		{name: "same-target host and TLS fallbacks", url: localURL + "?host=127.0.0.1,127.0.0.1&port=55434&sslmode=prefer", wantFallback: true},
		{name: "nonlocal fallback", url: localURL + "?host=127.0.0.1,db.example&port=55434&sslmode=disable", wantError: true},
		{name: "wrong-port fallback", url: localURL + "?host=127.0.0.1,127.0.0.1&port=55434,5432&sslmode=disable", wantError: true},
		{name: "nonlocal primary", url: localURL + "?host=db.example&sslmode=disable", wantError: true},
		{name: "wrong primary port", url: localURL + "?port=5432&sslmode=disable", wantError: true},
		{name: "wrong user", url: localURL + "?user=other&sslmode=disable", wantError: true},
		{name: "wrong database", url: localURL + "?dbname=other&sslmode=disable", wantError: true},
		{name: "malformed URL", url: "postgresql://monorepo_local@127.0.0.1:invalid/monorepo_dev", wantError: true},
	} {
		t.Run(tc.name, func(t *testing.T) {
			cfg, err := parseTestDatabaseConfig(tc.url)
			if (err != nil) != tc.wantError {
				t.Fatalf("configuration rejected = %t, want %t", err != nil, tc.wantError)
			}
			if tc.wantFallback && len(cfg.ConnConfig.Fallbacks) == 0 {
				t.Fatal("allowed fixture must exercise a parsed fallback")
			}
		})
	}
}

func setup(t *testing.T) *fixture {
	t.Helper()
	databaseURL := os.Getenv("TEST_DATABASE_URL")
	if databaseURL == "" {
		t.Skip("set TEST_DATABASE_URL to the example's local database; see README")
	}
	ctx, cancel := context.WithTimeout(context.Background(), 45*time.Second)
	t.Cleanup(cancel)
	cfg, err := parseTestDatabaseConfig(databaseURL)
	if err != nil {
		t.Fatal(err)
	}
	admin, err := pgxpool.NewWithConfig(ctx, cfg.Copy())
	if err != nil {
		t.Fatal(err)
	}
	id := make([]byte, 8)
	if _, err := rand.Read(id); err != nil {
		t.Fatal(err)
	}
	name := "monorepo_test_" + hex.EncodeToString(id)
	if _, err := admin.Exec(ctx, "CREATE DATABASE "+pgx.Identifier{name}.Sanitize()); err != nil {
		admin.Close()
		t.Fatal(err)
	}
	t.Cleanup(func() {
		cleanupCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		defer admin.Close()
		if _, err := admin.Exec(cleanupCtx, "DROP DATABASE "+pgx.Identifier{name}.Sanitize()+" WITH (FORCE)"); err != nil {
			t.Errorf("drop task-owned database: %v", err)
		}
	})
	target, err := url.Parse(databaseURL)
	if err != nil || (target.Scheme != "postgresql" && target.Scheme != "postgres") {
		t.Fatal("use a PostgreSQL URL for TEST_DATABASE_URL")
	}
	target.Path = "/" + name
	databaseURL = target.String()
	cfg, err = pgxpool.ParseConfig(databaseURL)
	if err != nil {
		t.Fatal(err)
	}
	if cfg.ConnConfig.Database != name {
		t.Fatal("test URL must not override the task-owned database name")
	}
	for _, args := range [][]string{
		{"goose", "-dir", "db/migrations", "postgres", databaseURL, "up"},
		{"river", "migrate-up", "--database-url", databaseURL},
	} {
		cmd := exec.CommandContext(ctx, args[0], args[1:]...)
		cmd.Dir = ".."
		if out, err := cmd.CombinedOutput(); err != nil {
			t.Fatalf("%s migration: %v\n%s", args[0], err, out)
		}
	}
	pool, err := pgxpool.NewWithConfig(ctx, cfg)
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(pool.Close)
	f := &fixture{t: t, ctx: ctx, pool: pool, url: databaseURL}
	f.restartAPI()
	return f
}

type process struct {
	cmd     *exec.Cmd
	done    chan error
	logPath string
	stopped bool
}

func startProcess(t *testing.T, name string, env ...string) *process {
	t.Helper()
	logPath := filepath.Join(t.TempDir(), name+".log")
	log, err := os.Create(logPath)
	if err != nil {
		t.Fatal(err)
	}
	cmd := exec.Command(filepath.Join(binaries, name))
	cmd.Env = append(os.Environ(), env...)
	cmd.Stdout, cmd.Stderr = log, log
	if err := cmd.Start(); err != nil {
		log.Close()
		t.Fatal(err)
	}
	p := &process{cmd: cmd, done: make(chan error, 1), logPath: logPath}
	go func() { err := cmd.Wait(); _ = log.Close(); p.done <- err }()
	t.Cleanup(func() { p.stop(t) })
	return p
}

func (p *process) stop(t *testing.T) {
	t.Helper()
	if p.stopped {
		return
	}
	p.stopped = true
	_ = p.cmd.Process.Signal(syscall.SIGTERM)
	select {
	case err := <-p.done:
		if err != nil {
			out, _ := os.ReadFile(p.logPath)
			t.Errorf("process exit: %v\n%s", err, out)
		}
	case <-time.After(10 * time.Second):
		_ = p.cmd.Process.Kill()
		<-p.done
		out, _ := os.ReadFile(p.logPath)
		t.Errorf("process did not stop within deadline\n%s", out)
	}
}

func (f *fixture) restartAPI() {
	if f.api != nil {
		f.api.stop(f.t)
	}
	listener, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		f.t.Fatal(err)
	}
	addr := listener.Addr().String()
	_ = listener.Close()
	f.base = "http://" + addr
	f.api = startProcess(f.t, "api", "DATABASE_URL="+f.url, "API_ADDR="+addr)
	await(f.t, "API listener", func() bool {
		conn, err := net.DialTimeout("tcp", addr, 100*time.Millisecond)
		if err != nil {
			return false
		}
		_ = conn.Close()
		return true
	})
}

func await(t *testing.T, label string, check func() bool) {
	t.Helper()
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()
	ticker := time.NewTicker(25 * time.Millisecond)
	defer ticker.Stop()
	for {
		if check() {
			return
		}
		select {
		case <-ctx.Done():
			t.Fatalf("deadline waiting for %s", label)
		case <-ticker.C:
		}
	}
}

func (f *fixture) request(method, path, body string, status int) map[string]any {
	f.t.Helper()
	req, err := http.NewRequestWithContext(f.ctx, method, f.base+path, strings.NewReader(body))
	if err != nil {
		f.t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	client := &http.Client{Timeout: 5 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		f.t.Fatal(err)
	}
	defer resp.Body.Close()
	data, err := io.ReadAll(resp.Body)
	if err != nil {
		f.t.Fatal(err)
	}
	if resp.StatusCode != status {
		f.t.Fatalf("%s %s: got %d want %d: %s", method, path, resp.StatusCode, status, data)
	}
	if !strings.HasPrefix(resp.Header.Get("Content-Type"), "application/json") {
		f.t.Fatalf("expected JSON response: %s", data)
	}
	var result map[string]any
	if err := json.Unmarshal(data, &result); err != nil {
		f.t.Fatal(err)
	}
	return result
}

func (f *fixture) submit(text string) string {
	f.t.Helper()
	body, _ := json.Marshal(map[string]string{"text": text})
	r := f.request("POST", "/api/reports", string(body), 202)
	id, ok := r["id"].(string)
	if !ok || id == "" || len(r) != 2 || r["status"] != "pending" {
		f.t.Fatalf("wrong acceptance contract: %#v", r)
	}
	return id
}

func (f *fixture) exec(sql string, args ...any) {
	f.t.Helper()
	if _, err := f.pool.Exec(f.ctx, sql, args...); err != nil {
		f.t.Fatal(err)
	}
}

func (f *fixture) count(table string, want int) {
	f.t.Helper()
	var got int
	if err := f.pool.QueryRow(f.ctx, "SELECT count(*) FROM "+table).Scan(&got); err != nil {
		f.t.Fatal(err)
	}
	if got != want {
		f.t.Fatalf("%s rows: got %d want %d", table, got, want)
	}
}

func (f *fixture) job(id string, state string, minAttempts int) int64 {
	f.t.Helper()
	var jobID int64
	await(f.t, "job "+state, func() bool {
		var got string
		var attempt int
		err := f.pool.QueryRow(f.ctx, "SELECT id,state,attempt FROM river_job WHERE args->>'reportId'=$1 ORDER BY id DESC LIMIT 1", id).Scan(&jobID, &got, &attempt)
		return err == nil && got == state && attempt >= minAttempts
	})
	return jobID
}

func (f *fixture) complete(id string, want int) {
	f.t.Helper()
	f.job(id, "completed", 1)
	r := f.request("GET", "/api/reports/"+id, "", 200)
	if len(r) != 3 || r["id"] != id || r["status"] != "complete" || r["wordCount"] != float64(want) {
		f.t.Fatalf("wrong completion contract: %#v", r)
	}
}

func TestHTTPValidationAndCompletion(t *testing.T) {
	f := setup(t)
	for _, body := range []string{
		`{}`, `{"text":null}`, `{"text":17}`, `{"text":true}`, `{"text":[]}`, `{"text":{}}`, `null`, `[]`, `"text"`,
		`{"text":""}`, `{"text":" \n\t\u2003 "}`, `{"text":"ok","extra":1}`, `{"Text":"ok"}`, `{"text":"ok","text":"again"}`, `{"text":"\u0000"}`, `{"text":`, `{"text":"ok"} {}`, `{"text":"ok"} junk`,
		`{"text":"` + strings.Repeat("界", 10001) + `"}`, `{"text":"` + strings.Repeat("x", 65537) + `"}`, string([]byte{'{', '"', 't', 'e', 'x', 't', '"', ':', '"', 0xff, '"', '}'}),
	} {
		f.request("POST", "/api/reports", body, 400)
	}
	f.count("reports", 0)
	f.count("river_job", 0)
	f.request("GET", "/api/reports/00000000-0000-0000-0000-000000000000", "", 404)
	f.request("GET", "/api/reports/not-a-uuid", "", 404)
	id := f.submit("  one\ttwo\nthree\u2003four  ")
	r := f.request("GET", "/api/reports/"+id, "", 200)
	if len(r) != 3 || r["id"] != id || r["status"] != "pending" || r["wordCount"] != nil {
		t.Fatalf("wrong pending contract: %#v", r)
	}
	f.count("reports", 1)
	f.count("river_job", 1)
	boundary := f.submit(" \u2003" + strings.Repeat("界", 10000) + "\t ")
	var text string
	if err := f.pool.QueryRow(f.ctx, "SELECT text FROM reports WHERE id=$1", boundary).Scan(&text); err != nil {
		t.Fatal(err)
	}
	if text != strings.Repeat("界", 10000) {
		t.Fatal("text was not trimmed at Unicode boundary")
	}
	escaped := f.request("POST", "/api/reports", `{"text":"`+strings.Repeat(`\ud83d\ude00`, 10000)+`"}`, 202)
	escapedID, ok := escaped["id"].(string)
	if !ok || escapedID == "" || len(escaped) != 2 || escaped["status"] != "pending" {
		t.Fatalf("wrong escaped-Unicode acceptance: %#v", escaped)
	}
	startProcess(t, "worker", "DATABASE_URL="+f.url)
	f.complete(id, 4)
	f.complete(boundary, 1)
	f.complete(escapedID, 1)
	f.restartAPI()
	f.complete(id, 4)
}

func TestSubmissionRollsBackWhenEnqueueFails(t *testing.T) {
	f := setup(t)
	f.exec("ALTER TABLE river_job ADD CONSTRAINT reject_report_job CHECK (kind <> 'generate_report')")
	r := f.request("POST", "/api/reports", `{"text":"atomic words"}`, 500)
	if len(r) != 1 || r["error"] != "internal server error" {
		t.Fatalf("database error leaked: %#v", r)
	}
	f.count("reports", 0)
	f.count("river_job", 0)
	f.exec("ALTER TABLE river_job DROP CONSTRAINT reject_report_job")
	f.submit("recovered")
	f.count("reports", 1)
	f.count("river_job", 1)
}

func TestReadinessChecksDatabaseWithoutReportData(t *testing.T) {
	f := setup(t)
	f.submit("private report content")
	r := f.request("GET", "/up", "", 200)
	if len(r) != 1 || r["status"] != "ok" {
		t.Fatalf("unexpected readiness: %#v", r)
	}
	adminCfg, _ := pgxpool.ParseConfig(os.Getenv("TEST_DATABASE_URL"))
	admin, err := pgxpool.NewWithConfig(f.ctx, adminCfg)
	if err != nil {
		t.Fatal(err)
	}
	defer admin.Close()
	name := f.pool.Config().ConnConfig.Database
	_, err = admin.Exec(f.ctx, "ALTER DATABASE "+pgx.Identifier{name}.Sanitize()+" ALLOW_CONNECTIONS false")
	if err != nil {
		t.Fatal(err)
	}
	defer func() {
		_, err := admin.Exec(f.ctx, "ALTER DATABASE "+pgx.Identifier{name}.Sanitize()+" ALLOW_CONNECTIONS true")
		if err != nil {
			t.Error(err)
		}
	}()
	if _, err := admin.Exec(f.ctx, "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname=$1", name); err != nil {
		t.Fatal(err)
	}
	r = f.request("GET", "/up", "", 503)
	if len(r) != 1 || r["error"] != "service unavailable" {
		t.Fatalf("readiness leaked database details: %#v", r)
	}
	f.request("POST", "/api/reports", `{"text":"db unavailable"}`, 500)
}

func TestWorkerRetryRestartAndEquivalentExecution(t *testing.T) {
	f := setup(t)
	// A real database failure keeps the first execution from completing. No worker hooks.
	f.exec("ALTER TABLE report_results ADD CONSTRAINT fail_completion CHECK (word_count < 0)")
	id := f.submit("retry these three")
	worker := startProcess(t, "worker", "DATABASE_URL="+f.url)
	jobID := f.job(id, "retryable", 2)
	worker.stop(t)
	f.count("report_results", 0)
	f.exec("ALTER TABLE report_results DROP CONSTRAINT fail_completion")
	client, err := river.NewClient(riverpgxv5.New(f.pool), &river.Config{})
	if err != nil {
		t.Fatal(err)
	}
	// River's supported JobRetry removes the backoff wait without changing queue rows directly.
	if _, err = client.JobRetry(f.ctx, jobID); err != nil {
		t.Fatal(err)
	}
	startProcess(t, "worker", "DATABASE_URL="+f.url)
	f.complete(id, 3)
	f.job(id, "completed", 2)
	if _, err = client.JobRetry(f.ctx, jobID); err != nil {
		t.Fatal(err)
	}
	f.job(id, "completed", 3)
	var reportID pgtype.UUID
	if err := reportID.Scan(id); err != nil {
		t.Fatal(err)
	}
	// A distinct River job with the same report identity must also be harmless.
	if _, err := client.Insert(f.ctx, jobs.ReportArgs{ReportID: reportID}, nil); err != nil {
		t.Fatal(err)
	}
	f.complete(id, 3)
	f.count("report_results", 1)
}

func TestWorkerStopsWithAcceptedWorkAndResumes(t *testing.T) {
	f := setup(t)
	// Hold completion behind a real database lock, so shutdown cannot race a fast job.
	tx, err := f.pool.Begin(f.ctx)
	if err != nil {
		t.Fatal(err)
	}
	defer func() { _ = tx.Rollback(context.Background()) }()
	if _, err = tx.Exec(f.ctx, "LOCK TABLE report_results IN ACCESS EXCLUSIVE MODE"); err != nil {
		t.Fatal(err)
	}
	id := f.submit("survives worker restart")
	worker := startProcess(t, "worker", "DATABASE_URL="+f.url)
	f.job(id, "running", 1)
	worker.stop(t)
	if err := tx.Rollback(f.ctx); err != nil {
		t.Fatal(err)
	}
	f.count("report_results", 0)
	// River's native soft-stop cancellation returns interrupted work to available.
	f.job(id, "available", 0)
	startProcess(t, "worker", "DATABASE_URL="+f.url)
	f.complete(id, 3)
	f.count("report_results", 1)
}
