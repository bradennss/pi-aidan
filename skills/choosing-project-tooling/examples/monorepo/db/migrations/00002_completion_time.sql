-- +goose Up
-- Old workers omit this column; existing results receive the migration time.
ALTER TABLE report_results ADD COLUMN completed_at timestamptz NOT NULL DEFAULT now();

-- +goose Down
ALTER TABLE report_results DROP COLUMN completed_at;
