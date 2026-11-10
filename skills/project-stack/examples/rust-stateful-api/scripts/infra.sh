#!/usr/bin/env bash
set -euo pipefail

export TF_VAR_vps_public_key
TF_VAR_vps_public_key="$(ssh-keygen -y -f "$HOME/.ssh/id_ed25519")"
tofu -chdir=infra init -input=false -lockfile=readonly
tofu -chdir=infra plan -input=false -out=change.tfplan
tofu -chdir=infra show -json change.tfplan | jq -e --arg service "${TF_VAR_vps_service_name:?}" '
  [.resource_changes[] | select(.address == "ovh_vps.api")] |
  length == 1 and all(.[];
    (.change.importing.id // .change.before.id) == $service and
    all(.change.actions[]; . != "create" and . != "delete")
  )
' > /dev/null
tofu -chdir=infra apply -input=false change.tfplan

vps_ip="$(tofu -chdir=infra output -raw vps_ip)"
user=""
for ((attempt = 0; attempt < 60; attempt++)); do
  if ssh -o ConnectTimeout=5 "deploy@$vps_ip" true 2>/dev/null; then
    user=deploy
    break
  fi
  if ssh -o ConnectTimeout=5 "debian@$vps_ip" true 2>/dev/null; then
    user=debian
    break
  fi
  sleep 10
done
test -n "$user"
jq -n --arg key "$TF_VAR_vps_public_key" '{deploy_keys: $key}' > "$RUNNER_TEMP/ansible-vars.json"
ansible-playbook -i "$vps_ip," -u "$user" ansible/playbook.yml -e "@$RUNNER_TEMP/ansible-vars.json"
