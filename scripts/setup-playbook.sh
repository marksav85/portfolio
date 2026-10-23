#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

# Never replace local edits in an initialized Playbook checkout.
if [[ -f playbook/.git ]] && [[ -n "$(git -C playbook status --porcelain)" ]]; then
  echo "Playbook has local changes; preserve them before continuing." >&2
  exit 1
fi

git submodule sync --recursive -- playbook
git submodule update --init --recursive -- playbook

git -C playbook sparse-checkout init --cone
git -C playbook sparse-checkout set \
  docs/templates/0-ai \
  docs/templates/0-project-management \
  docs/templates/1-pre-development \
  docs/templates/2-development \
  docs/templates/3-post-development

git -C playbook log -1 --oneline
