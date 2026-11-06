-- name: CreateReport :exec
INSERT INTO reports (id, text) VALUES ($1, $2);

-- name: GetReport :one
SELECT reports.id, report_results.word_count
FROM reports LEFT JOIN report_results ON report_results.report_id = reports.id
WHERE reports.id = $1;

-- name: GetReportText :one
SELECT text FROM reports WHERE id = $1;

-- name: CompleteReport :exec
INSERT INTO report_results (report_id, word_count) VALUES ($1, $2)
ON CONFLICT (report_id) DO NOTHING;
