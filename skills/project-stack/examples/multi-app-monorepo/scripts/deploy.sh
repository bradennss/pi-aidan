#!/usr/bin/env bash
set -euo pipefail

: "${DEPLOY_ENV:?Set DEPLOY_ENV to staging or production}"
: "${DEPLOY_FILE:?Set DEPLOY_FILE to the service deploy file}"
: "${DEPLOY_VERSION:?Set DEPLOY_VERSION to the image version}"

kamal_options=(--config-file "$DEPLOY_FILE" --destination "$DEPLOY_ENV")
current_version="$(kamal app version "${kamal_options[@]}" --quiet)"

if [[ -z "$current_version" ]]; then
  kamal setup "${kamal_options[@]}" --skip-push --version "$DEPLOY_VERSION"
elif [[ "$current_version" != "$DEPLOY_VERSION" ]]; then
  kamal deploy "${kamal_options[@]}" --skip-push --version "$DEPLOY_VERSION"
else
  printf '%s is already deployed at %s\n' "$DEPLOY_FILE" "$DEPLOY_VERSION"
  exit 0
fi

kamal server exec "${kamal_options[@]}" 'docker image prune --all --force --filter label=io.notes.managed=true'
