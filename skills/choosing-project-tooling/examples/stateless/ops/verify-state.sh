#!/usr/bin/env bash
set -euo pipefail
# Only the native encrypted envelope may be persisted or uploaded.
jq -e 'keys == ["encrypted_data", "encryption_version", "lineage", "meta", "serial"] and (.encrypted_data | type == "string" and length > 0)' infra/production.tfstate >/dev/null
tofu -chdir=infra state pull >/dev/null
