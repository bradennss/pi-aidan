package test

import (
	"context"
	"os"
	"os/exec"
	"strings"
	"testing"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/riverqueue/river"
	"github.com/riverqueue/river/riverdriver/riverpgxv5"
)

func native(t *testing.T, env []string, command string, args ...string) string {
	t.Helper()
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Minute)
	defer cancel()
	cmd := exec.CommandContext(ctx, command, args...)
	cmd.Dir = ".."
	cmd.Env = append(os.Environ(), env...)
	out, err := cmd.CombinedOutput()
	if err != nil {
		t.Fatalf("%s: %v\n%s", command, err, out)
	}
	return string(out)
}

// Catches incompatible additive migrations and loss of pending/completed jobs in captures.
func TestAdditiveMigrationBackupAndPendingResumption(t *testing.T) {
	f := setup(t)
	native(t, nil, "goose", "-dir", "db/migrations", "postgres", f.url, "down-to", "1")
	old := f.submit("old completed report")
	worker := startProcess(t, "worker", "DATABASE_URL="+f.url)
	f.complete(old, 3)
	worker.stop(t)
	pending := f.submit("accepted before additive migration")
	// Old processes use explicit column lists and continue to work after migration.
	native(t, nil, "goose", "-dir", "db/migrations", "postgres", f.url, "up")
	var timestamp bool
	if err := f.pool.QueryRow(f.ctx, "SELECT completed_at IS NOT NULL FROM report_results WHERE report_id=$1", old).Scan(&timestamp); err != nil || !timestamp {
		t.Fatalf("additive completion timestamp missing: %v", err)
	}
	f.request("GET", "/api/reports/"+pending, "", 200)
	f.restartAPI()
	newer := f.submit("new accepted report")
	repo := t.TempDir()
	env := []string{"RESTIC_REPOSITORY=" + repo, "RESTIC_PASSWORD=disposable-recovery-only-password", "BACKUP_DATABASE=" + f.pool.Config().ConnConfig.Database}
	native(t, env, "restic", "init")
	native(t, env, "just", "backup")
	// Fresh restore must not overwrite an existing target or follow unsafe URL parameters.
	restoreName := "monorepo_restore_" + strings.TrimPrefix(f.pool.Config().ConnConfig.Database, "monorepo_test_")
	restoreURL := strings.Replace(f.url, f.pool.Config().ConnConfig.Database, restoreName, 1)
	t.Cleanup(func() {
		_, err := f.pool.Exec(context.Background(), "DROP DATABASE IF EXISTS "+pgx.Identifier{restoreName}.Sanitize()+" WITH (FORCE)")
		if err != nil {
			t.Error(err)
		}
	})
	native(t, env, "just", "restore", restoreURL)
	pool, err := pgxpool.New(f.ctx, restoreURL)
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(pool.Close)
	restored := &fixture{t: t, ctx: f.ctx, pool: pool, url: restoreURL}
	restored.restartAPI()
	restored.count("reports", 3)
	restored.count("report_results", 1)
	restored.count("river_job", 3)
	var gooseVersion int
	if err := pool.QueryRow(f.ctx, "SELECT max(version_id) FROM goose_db_version WHERE is_applied").Scan(&gooseVersion); err != nil || gooseVersion != 2 {
		t.Fatalf("application journal lost: %d %v", gooseVersion, err)
	}
	native(t, nil, "river", "migrate-up", "--database-url", restoreURL)
	resumed := startProcess(t, "worker", "DATABASE_URL="+restoreURL)
	restored.complete(old, 3)
	restored.complete(pending, 4)
	restored.complete(newer, 3)
	// Equivalent delivery after restore preserves a single durable result.
	client, err := river.NewClient(riverpgxv5.New(pool), &river.Config{})
	if err != nil {
		t.Fatal(err)
	}
	job := restored.job(pending, "completed", 1)
	if _, err = client.JobRetry(f.ctx, job); err != nil {
		t.Fatal(err)
	}
	restored.job(pending, "completed", 2)
	restored.count("report_results", 3)
	resumed.stop(t)
	// Original database has not been mutated by restore/resumption.
	f.count("report_results", 1)
	for _, target := range []string{restoreURL, restoreURL + "?host=remote.invalid", "postgresql://monorepo_local:disposable-local-only@127.0.0.1:55434/monorepo_dev"} {
		cmd := exec.Command("just", "restore", target)
		cmd.Dir = ".."
		cmd.Env = append(os.Environ(), env...)
		if out, err := cmd.CombinedOutput(); err == nil {
			t.Fatalf("unsafe/existing restore accepted: %s", out)
		}
	}
	// A failed capture/upload must not add a snapshot or leak a temporary dump.
	before := native(t, env, "restic", "snapshots", "--json")
	for _, bad := range [][]string{append(append([]string{}, env...), "BACKUP_DATABASE=monorepo_test_missing"), append(append([]string{}, env...), "RESTIC_PASSWORD=wrong-password")} {
		cmd := exec.Command("just", "backup")
		cmd.Dir = ".."
		cmd.Env = append(os.Environ(), bad...)
		if out, err := cmd.CombinedOutput(); err == nil {
			t.Fatalf("failed backup succeeded: %s", out)
		}
	}
	after := native(t, env, "restic", "snapshots", "--json")
	if before != after {
		t.Fatal("failed backup changed snapshot list")
	}
	native(t, env, "restic", "check")
}
