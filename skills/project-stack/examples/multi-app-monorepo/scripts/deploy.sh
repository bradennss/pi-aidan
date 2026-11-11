#!/usr/bin/env bash
set -euo pipefail

: "${DEPLOY_FILE:?Set DEPLOY_FILE to the service deploy file}"
: "${DEPLOY_VERSION:?Set DEPLOY_VERSION to the image version}"

current_version="$(kamal app version --config-file "$DEPLOY_FILE" --quiet)"

if [[ -z "$current_version" ]]; then
  kamal setup --config-file "$DEPLOY_FILE" --skip-push --version "$DEPLOY_VERSION"
elif [[ "$current_version" != "$DEPLOY_VERSION" ]]; then
  kamal deploy --config-file "$DEPLOY_FILE" --skip-push --version "$DEPLOY_VERSION"
else
  printf '%s is already deployed at %s\n' "$DEPLOY_FILE" "$DEPLOY_VERSION"
  exit 0
fi

kamal server exec --config-file "$DEPLOY_FILE" 'docker image prune --all --force --filter label=io.notes.managed=true'
