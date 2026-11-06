-- +goose Up
CREATE TABLE reports (
    id uuid PRIMARY KEY,
    text text NOT NULL CHECK (char_length(text) BETWEEN 1 AND 10000),
    created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE report_results (
    report_id uuid PRIMARY KEY REFERENCES reports(id),
    word_count integer NOT NULL CHECK (word_count >= 0)
);

-- +goose Down
DROP TABLE report_results;
DROP TABLE reports;
