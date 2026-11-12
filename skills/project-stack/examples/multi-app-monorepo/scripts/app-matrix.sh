#!/usr/bin/env bash
set -euo pipefail

jq -c --slurpfile config release-please-config.json '{
  include: [
    to_entries[] |
    select(.key | startswith("apps/")) |
    {app: (.key | ltrimstr("apps/")), path: .key, version: .value, image: ("notes-" + $config[0].packages[.key].component)}
  ]
}' .release-please-manifest.json
