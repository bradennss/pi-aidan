#!/usr/bin/env bash
set -euo pipefail

case "${DEPLOY_ENV:?Set DEPLOY_ENV to staging or production}" in
  staging|production) ;;
  *) printf 'Unknown environment: %s\n' "$DEPLOY_ENV" >&2; exit 2 ;;
esac

: "${TF_VAR_vps_public_key:?Set TF_VAR_vps_public_key to the deployment public SSH key}"
export TF_DATA_DIR="$PWD/infra/.terraform/$DEPLOY_ENV"
export TF_VAR_environment="$DEPLOY_ENV"
export TF_VAR_api_host="${API_HOST:?Set API_HOST for this environment}"
export TF_VAR_web_host="${WEB_HOST:?Set WEB_HOST for this environment}"

tofu -chdir=infra init -input=false -lockfile=readonly -reconfigure
tofu -chdir=infra apply -input=false -auto-approve

vps_ip="$(tofu -chdir=infra output -raw vps_ip)"
ansible_vars="$(jq -n --arg environment "$DEPLOY_ENV" --arg key "$TF_VAR_vps_public_key" '{deployment_environment: $environment, deploy_keys: $key}')"
ansible-playbook -i "$vps_ip," -u debian ansible/playbook.yml -e "$ansible_vars"
