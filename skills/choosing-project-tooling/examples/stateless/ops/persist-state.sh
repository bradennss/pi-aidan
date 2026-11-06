#!/usr/bin/env bash
set -euo pipefail
bash ops/verify-state.sh
# Retain verified ciphertext before a commit or push can fail. Never rebase state.
mkdir -p .recovery
cp infra/production.tfstate .recovery/production.tfstate
git add -- infra/production.tfstate
if git diff --cached --quiet -- infra/production.tfstate; then exit 0; fi
git -c user.name='Infrastructure state' -c user.email='infra@users.noreply.github.com' commit --only -m 'Persist encrypted infrastructure state [skip ci]' -- infra/production.tfstate
git push origin HEAD:main
