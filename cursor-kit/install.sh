#!/usr/bin/env bash
# Установка Cursor workflow kit в ~/.cursor и ~/.agents
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
CURSOR_RULES="${HOME}/.cursor/rules"
CURSOR_SKILLS="${HOME}/.cursor/skills"
AGENTS_SKILLS="${HOME}/.agents/skills"

echo "→ Rules → ${CURSOR_RULES}"
mkdir -p "${CURSOR_RULES}"
cp -f "${ROOT}/rules/"*.mdc "${CURSOR_RULES}/"

echo "→ Skills → ${CURSOR_SKILLS} и ${AGENTS_SKILLS}"
mkdir -p "${CURSOR_SKILLS}" "${AGENTS_SKILLS}"
for skill_dir in "${ROOT}/skills/"*/; do
  name="$(basename "${skill_dir}")"
  rm -rf "${CURSOR_SKILLS}/${name}" "${AGENTS_SKILLS}/${name}"
  cp -R "${skill_dir}" "${CURSOR_SKILLS}/${name}"
  cp -R "${skill_dir}" "${AGENTS_SKILLS}/${name}"
  echo "   ✓ ${name}"
done

echo "Готово. Читай SETUP.md в корне репозитория."
