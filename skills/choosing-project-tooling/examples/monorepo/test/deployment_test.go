package test

import (
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"testing"
)

// Uses the actual migration hook with local SSH transport/path substitution only.
func TestMigrationHookFirstBootAndPreviousImageRecovery(t *testing.T) {
	if os.Getenv("TEST_DEPLOYMENT_IMAGES") != "true" {
		t.Skip("build-images and set TEST_DEPLOYMENT_IMAGES=true for local native hook rehearsal")
	}
	f := setup(t)
	// The fixture owns this database; remove only its application schema for first boot.
	native(t, nil, "goose", "-dir", "db/migrations", "postgres", f.url, "down-to", "0")
	dir := t.TempDir()
	source := os.Getenv("TEST_IMAGE_REVISION")
	if source == "" {
		t.Fatal("TEST_IMAGE_REVISION required")
	}
	repository := "fixture/" + f.pool.Config().ConnConfig.Database
	good := "ghcr.io/" + repository + "-api:" + strings.Repeat("1", 40)
	bad := "ghcr.io/" + repository + "-api:" + strings.Repeat("2", 40)
	workerImage := "monorepo-worker:" + source
	for _, service := range []string{"monorepo-api", "monorepo-worker"} {
		if strings.TrimSpace(native(t, nil, "docker", "ps", "-aq", "--filter", "label=service="+service)) != "" {
			t.Fatal("refusing to touch existing service containers")
		}
	}
	// Previous release has only schema 1; new release contains additive schema 2.
	if err := os.WriteFile(filepath.Join(dir, "Dockerfile"), []byte("FROM monorepo-api:"+source+"\nUSER root\nRUN rm /migrations/00002_completion_time.sql\nUSER 65532:65532\n"), 0600); err != nil {
		t.Fatal(err)
	}
	native(t, nil, "docker", "build", "-t", good, dir)
	goodWorker := "ghcr.io/" + repository + "-worker:" + strings.Repeat("1", 40)
	native(t, nil, "docker", "tag", workerImage, goodWorker)
	t.Cleanup(func() { _ = exec.Command("docker", "image", "rm", goodWorker).Run() })
	t.Cleanup(func() { _ = exec.Command("docker", "image", "rm", good, bad).Run() })
	migrationURL := strings.Replace(f.url, "127.0.0.1:55434", "db:5432", 1)
	envFile := filepath.Join(dir, "migration.env")
	if err := os.WriteFile(envFile, []byte("DATABASE_URL="+migrationURL+"\nAPI_ADDR=:8080\n"), 0600); err != nil {
		t.Fatal(err)
	}
	ssh := `#!/bin/sh
set -eu
shift 2
while [ "$1" = -o ]; do shift 2; done
test "$1" = deploy@192.0.2.1
shift
sed -e "s|/etc/monorepo/migration.env|$RECOVERY_ENV_FILE|g" -e 's|--network kamal|--network monorepo-reports_default|g' | "$@"
`
	if err := os.WriteFile(filepath.Join(dir, "ssh"), []byte(ssh), 0700); err != nil {
		t.Fatal(err)
	}
	env := []string{"PATH=" + dir + ":" + os.Getenv("PATH"), "KAMAL_LOCK=true", "KAMAL_SERVICE=monorepo-api", "KAMAL_ROLES=web", "KAMAL_HOSTS=192.0.2.1", "DEPLOY_HOST=192.0.2.1", "IMAGE_REPOSITORY=" + repository, "SSH_CONFIG_FILE=/dev/null", "KAMAL_VERSION=" + strings.Repeat("1", 40), "RECOVERY_ENV_FILE=" + envFile}
	native(t, env, "bash", ".kamal/hooks/pre-app-boot")
	id := f.submit("preserve accepted work")
	apiName := f.pool.Config().ConnConfig.Database + "-api"
	workerName := f.pool.Config().ConnConfig.Database + "-worker"
	native(t, nil, "docker", "run", "-d", "--name", apiName, "--network", "monorepo-reports_default", "--env-file", envFile, "--label", "service=monorepo-api", "--label", "role=web", good)
	t.Cleanup(func() { _ = exec.Command("docker", "rm", "-f", apiName).Run() })
	// The failure is inside a native goose transaction, with no custom journal.
	if err := os.WriteFile(filepath.Join(dir, "00003_failed.sql"), []byte("-- +goose Up\nALTER TABLE reports ADD COLUMN release_probe text;\nSELECT missing_release_function();\n-- +goose Down\nALTER TABLE reports DROP COLUMN release_probe;\n"), 0600); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(filepath.Join(dir, "Dockerfile"), []byte("FROM monorepo-api:"+source+"\nCOPY --chmod=0444 00003_failed.sql /migrations/00003_failed.sql\n"), 0600); err != nil {
		t.Fatal(err)
	}
	native(t, nil, "docker", "build", "-t", bad, dir)
	failed := exec.Command("bash", ".kamal/hooks/pre-app-boot")
	failed.Dir = ".."
	failed.Env = append(append(os.Environ(), env...), "KAMAL_VERSION="+strings.Repeat("2", 40))
	if out, err := failed.CombinedOutput(); err == nil || !strings.Contains(string(out), "missing_release_function") {
		t.Fatalf("expected migration failure: %v %s", err, out)
	}
	if got := strings.TrimSpace(native(t, nil, "docker", "inspect", "--format", "{{.State.Running}}", apiName)); got != "true" {
		t.Fatal("failed migration interrupted previous API")
	}
	f.count("reports", 1)
	f.count("report_results", 0)
	var additive bool
	if err := f.pool.QueryRow(f.ctx, "SELECT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='report_results' AND column_name='completed_at')").Scan(&additive); err != nil || !additive {
		t.Fatalf("successful additive migration lost after later failure: %v", err)
	}
	native(t, env, "bash", ".kamal/hooks/pre-app-boot")
	if got := strings.TrimSpace(native(t, nil, "docker", "inspect", "--format", "{{.State.Running}}", apiName)); got != "false" {
		t.Fatal("previous private API alias still running")
	}
	native(t, nil, "docker", "start", apiName)
	native(t, nil, "docker", "run", "-d", "--name", workerName, "--network", "monorepo-reports_default", "--env-file", envFile, "--label", "service=monorepo-worker", "--label", "role=workers", workerImage)
	t.Cleanup(func() { _ = exec.Command("docker", "rm", "-f", workerName).Run() })
	f.complete(id, 3)
	// Worker hook replacement leaves accepted work durable while it is stopped.
	native(t, append(append([]string{}, env...), "KAMAL_SERVICE=monorepo-worker", "KAMAL_ROLES=workers"), "bash", ".kamal/hooks/pre-app-boot")
	next := f.submit("complete after restart")
	native(t, nil, "docker", "restart", apiName)
	native(t, nil, "docker", "start", workerName)
	f.complete(next, 3)
	f.count("report_results", 2)
}
