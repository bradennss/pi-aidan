package httpapi

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"strings"
	"time"
	"unicode/utf8"

	"example.com/report-monorepo/internal/reports"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
)

func Handler(store *reports.Store) http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /up", func(w http.ResponseWriter, r *http.Request) {
		ctx, cancel := context.WithTimeout(r.Context(), 2*time.Second)
		defer cancel()
		if err := store.Pool.Ping(ctx); err != nil {
			fail(w, http.StatusServiceUnavailable, "service unavailable")
			return
		}
		writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
	})
	mux.HandleFunc("POST /api/reports", func(w http.ResponseWriter, r *http.Request) {
		r.Body = http.MaxBytesReader(w, r.Body, 128*1024)
		data, err := io.ReadAll(r.Body)
		if err != nil || !utf8.Valid(data) {
			fail(w, 400, "invalid request")
			return
		}
		decoder := json.NewDecoder(bytes.NewReader(data))
		start, err := decoder.Token()
		if err != nil || start != json.Delim('{') {
			fail(w, 400, "invalid request")
			return
		}
		key, err := decoder.Token()
		if err != nil || key != "text" {
			fail(w, 400, "invalid request")
			return
		}
		var input *string
		if err := decoder.Decode(&input); err != nil || input == nil {
			fail(w, 400, "invalid request")
			return
		}
		end, err := decoder.Token()
		if err != nil || end != json.Delim('}') {
			fail(w, 400, "invalid request")
			return
		}
		if err := decoder.Decode(new(any)); err != io.EOF || strings.ContainsRune(*input, '\x00') {
			fail(w, 400, "invalid request")
			return
		}
		text := strings.TrimSpace(*input)
		if n := utf8.RuneCountInString(text); n < 1 || n > 10000 {
			fail(w, 400, "text must contain 1–10000 trimmed characters")
			return
		}
		ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
		defer cancel()
		id, err := store.Create(ctx, text)
		if err != nil {
			fail(w, 500, "internal server error")
			return
		}
		writeJSON(w, http.StatusAccepted, map[string]string{"id": id, "status": "pending"})
	})
	mux.HandleFunc("GET /api/reports/{id}", func(w http.ResponseWriter, r *http.Request) {
		var id pgtype.UUID
		if err := id.Scan(r.PathValue("id")); err != nil {
			fail(w, 404, "report not found")
			return
		}
		ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
		defer cancel()
		report, err := store.Get(ctx, id)
		if errors.Is(err, pgx.ErrNoRows) {
			fail(w, 404, "report not found")
			return
		}
		if err != nil {
			fail(w, 500, "internal server error")
			return
		}
		writeJSON(w, http.StatusOK, report)
	})
	return mux
}

func fail(w http.ResponseWriter, status int, message string) {
	writeJSON(w, status, map[string]string{"error": message})
}

func writeJSON(w http.ResponseWriter, status int, value any) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Cache-Control", "no-store")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(value)
}
