#!/usr/bin/env bash
set -euo pipefail

case "${DEPLOY_ENV:?}" in staging|production) ;; *) exit 1 ;; esac
[[ "${RELEASE_TAG:?}" =~ ^v(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)$ ]]
version="${RELEASE_TAG#v}"
commit="$(git rev-parse "$RELEASE_TAG^{commit}")"
git merge-base --is-ancestor "$commit" origin/main
vps_ip="$(tofu -chdir=infra output -raw vps_ip)"
if ssh "deploy@$vps_ip" bash -s -- "$DEPLOY_ENV" > /dev/null 2>&1 <<'SH'
docker container inspect "notes-api-$1-db"
SH
then
  kamal deploy --skip-push --version "$version"
else
  kamal setup --skip-push --version "$version"
fi
host="$(tofu -chdir=infra output -json runtime | jq -r --arg environment "$DEPLOY_ENV" '.[$environment].host')"
curl --fail --silent --show-error --retry 10 --retry-delay 6 --retry-all-errors "https://$host/readyz"
