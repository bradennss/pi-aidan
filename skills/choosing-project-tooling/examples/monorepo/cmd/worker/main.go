package main

import (
	"context"
	"errors"
	"log/slog"
	"os"
	"os/signal"
	"syscall"
	"time"

	"example.com/report-monorepo/internal/db"
	"example.com/report-monorepo/internal/jobs"
	"github.com/riverqueue/river"
	"github.com/riverqueue/river/riverdriver/riverpgxv5"
)

func run() error {
	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()
	startup, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()
	pool, err := db.Open(startup, os.Getenv("DATABASE_URL"))
	if err != nil {
		return errors.New("database connection failed; check DATABASE_URL and database availability")
	}
	defer pool.Close()
	workers := river.NewWorkers()
	river.AddWorker(workers, &jobs.ReportWorker{Queries: db.New(pool)})
	client, err := river.NewClient(riverpgxv5.New(pool), &river.Config{
		Queues:  map[string]river.QueueConfig{river.QueueDefault: {MaxWorkers: 4}},
		Workers: workers, JobTimeout: 30 * time.Second, SoftStopTimeout: 3 * time.Second,
	})
	if err != nil {
		return errors.New("River worker initialization failed")
	}
	if err := client.Start(ctx); err != nil {
		return errors.New("River worker start failed; apply database migrations first")
	}
	slog.Info("worker started")
	<-ctx.Done()
	select {
	case <-client.Stopped():
		return nil
	case <-time.After(8 * time.Second):
		return errors.New("worker shutdown deadline exceeded")
	}
}

func main() {
	if err := run(); err != nil {
		slog.Error(err.Error())
		os.Exit(1)
	}
}
