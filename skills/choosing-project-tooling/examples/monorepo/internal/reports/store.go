package reports

import (
	"context"
	"crypto/rand"

	"example.com/report-monorepo/internal/db"
	"example.com/report-monorepo/internal/jobs"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/riverqueue/river"
)

type Store struct {
	Pool *pgxpool.Pool
	Jobs *river.Client[pgx.Tx]
}

type Report struct {
	ID        string `json:"id"`
	Status    string `json:"status"`
	WordCount *int32 `json:"wordCount"`
}

func (s *Store) Create(ctx context.Context, text string) (string, error) {
	id := pgtype.UUID{Valid: true}
	if _, err := rand.Read(id.Bytes[:]); err != nil {
		return "", err
	}
	id.Bytes[6] = (id.Bytes[6] & 0x0f) | 0x40
	id.Bytes[8] = (id.Bytes[8] & 0x3f) | 0x80
	tx, err := s.Pool.Begin(ctx)
	if err != nil {
		return "", err
	}
	defer func() { _ = tx.Rollback(ctx) }()
	if err := db.New(tx).CreateReport(ctx, db.CreateReportParams{ID: id, Text: text}); err != nil {
		return "", err
	}
	if _, err := s.Jobs.InsertTx(ctx, tx, jobs.ReportArgs{ReportID: id}, nil); err != nil {
		return "", err
	}
	if err := tx.Commit(ctx); err != nil {
		return "", err
	}
	return id.String(), nil
}

func (s *Store) Get(ctx context.Context, id pgtype.UUID) (Report, error) {
	row, err := db.New(s.Pool).GetReport(ctx, id)
	if err != nil {
		return Report{}, err
	}
	r := Report{ID: row.ID.String(), Status: "pending"}
	if row.WordCount.Valid {
		r.Status = "complete"
		r.WordCount = &row.WordCount.Int32
	}
	return r, nil
}
