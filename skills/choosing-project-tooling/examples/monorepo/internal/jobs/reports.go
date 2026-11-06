package jobs

import (
	"context"
	"strings"

	"example.com/report-monorepo/internal/db"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/riverqueue/river"
)

type ReportArgs struct {
	ReportID pgtype.UUID `json:"reportId"`
}

func (ReportArgs) Kind() string { return "generate_report" }

type ReportWorker struct {
	river.WorkerDefaults[ReportArgs]
	Queries *db.Queries
}

func (w *ReportWorker) Work(ctx context.Context, job *river.Job[ReportArgs]) error {
	text, err := w.Queries.GetReportText(ctx, job.Args.ReportID)
	if err != nil {
		return err
	}
	// River can deliver work again after a retry or interrupted acknowledgement.
	// The result's primary key makes completion idempotent across deliveries.
	return w.Queries.CompleteReport(ctx, db.CompleteReportParams{
		ReportID:  job.Args.ReportID,
		WordCount: int32(len(strings.Fields(text))),
	})
}
