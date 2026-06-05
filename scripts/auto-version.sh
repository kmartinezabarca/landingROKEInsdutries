#!/usr/bin/env sh
# ==========================================================================
# Auto-versionado basado en Conventional Commits.
#
#   Uso:  auto-version.sh [stable|dev] [build_number]
#
# Lee el último tag semántico (vX.Y.Z) como base y analiza los commits
# desde ese tag para decidir el incremento:
#
#   feat:            -> MINOR   (1.2.0 -> 1.3.0)
#   fix:             -> PATCH   (1.2.0 -> 1.2.1)
#   feat!: / BREAKING CHANGE -> MAJOR (1.2.0 -> 2.0.0)
#   otros commits    -> PATCH   (por defecto)
#
# Si no existe ningún tag aún, usa la versión de package.json como semilla
# (sin incrementar) para el primer release.
#
# Canal 'dev' añade un sufijo de pre-release: X.Y.Z-dev.<build>+<sha>
#
# Imprime la versión calculada en stdout (sin escribir nada).
# ==========================================================================
set -eu

CHANNEL="${1:-stable}"
BUILD_NUMBER="${2:-0}"

LAST_TAG="$(git describe --tags --abbrev=0 --match 'v[0-9]*' 2>/dev/null || true)"

if [ -n "${LAST_TAG}" ]; then
  BASE="${LAST_TAG#v}"
  RANGE="${LAST_TAG}..HEAD"
else
  BASE="$(sed -n 's/.*"version"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' package.json | head -n1)"
  [ -n "${BASE}" ] || BASE="0.0.0"
  RANGE="HEAD"
fi

# Quitar cualquier sufijo de pre-release / build de la base
CORE="$(printf '%s' "${BASE}" | sed 's/[-+].*$//')"
MAJOR="$(printf '%s' "${CORE}" | cut -d. -f1)"; MAJOR="${MAJOR:-0}"
MINOR="$(printf '%s' "${CORE}" | cut -d. -f2)"; MINOR="${MINOR:-0}"
PATCH="$(printf '%s' "${CORE}" | cut -d. -f3)"; PATCH="${PATCH:-0}"

if [ -z "${LAST_TAG}" ]; then
  # Primer release: sembrar con la versión actual de package.json (sin bump)
  BUMP="seed"
else
  LOG="$(git log ${RANGE} --pretty=format:'%B' 2>/dev/null || true)"
  if printf '%s' "${LOG}" | grep -qiE '(^|[[:space:]])BREAKING[ -]CHANGE|^[a-z]+(\(.+\))?!:'; then
    BUMP="major"
  elif printf '%s' "${LOG}" | grep -qiE '^feat(\(.+\))?:'; then
    BUMP="minor"
  elif printf '%s' "${LOG}" | grep -qiE '^fix(\(.+\))?:'; then
    BUMP="patch"
  elif [ -n "$(git log ${RANGE} --oneline 2>/dev/null || true)" ]; then
    BUMP="patch"
  else
    BUMP="none"
  fi
fi

case "${BUMP}" in
  major) MAJOR=$((MAJOR + 1)); MINOR=0; PATCH=0 ;;
  minor) MINOR=$((MINOR + 1)); PATCH=0 ;;
  patch) PATCH=$((PATCH + 1)) ;;
  seed|none) : ;;
esac

NEW="${MAJOR}.${MINOR}.${PATCH}"

if [ "${CHANNEL}" = "dev" ]; then
  SHA="$(git rev-parse --short HEAD 2>/dev/null || echo 0000000)"
  NEW="${NEW}-dev.${BUILD_NUMBER}+${SHA}"
fi

printf '%s' "${NEW}"
