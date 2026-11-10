#!/bin/sh
set -eu
psql --username "$POSTGRES_USER" --dbname postgres --set=ON_ERROR_STOP=1 \
  --set=app_password="$APP_DB_PASSWORD" <<'SQL'
CREATE ROLE notes LOGIN PASSWORD :'app_password';
CREATE DATABASE notes OWNER notes;
SQL
