#!/usr/bin/env bash
set -euo pipefail

jq -c '{
  include: [
    to_entries[] |
    select(.key | startswith("apps/")) |
    {app: (.key | ltrimstr("apps/")), path: .key, version: .value}
  ]
}' .release-please-manifest.json
