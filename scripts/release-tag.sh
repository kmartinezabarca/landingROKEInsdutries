#!/usr/bin/env sh
# ==========================================================================
# Publica el release: commitea el bump de package.json y crea/empuja el tag
# semántico a GitHub.
#
#   Uso: release-tag.sh <version> [branch]
#
# Requiere en el entorno:
#   GIT_USER   -> usuario de GitHub
#   GIT_TOKEN  -> token/PAT con permiso de push
#
# El commit lleva "[skip ci]" para no disparar un build en cadena.
# ==========================================================================
set -eu

VERSION="${1:?Falta la versión}"
BRANCH="${2:-master}"

: "${GIT_USER:?Falta GIT_USER}"
: "${GIT_TOKEN:?Falta GIT_TOKEN}"

# Normalizar la URL del remoto a host/path (soporta https y ssh)
REMOTE_URL="$(git config --get remote.origin.url)"
HOST_PATH="$(printf '%s' "${REMOTE_URL}" \
  | sed -E -e 's#^https?://##' -e 's#^[^/@]+@##' -e 's#^([^/:]+):#\1/#')"

git config user.email "ci@rokeindustries.com"
git config user.name  "ROKE CI"

git add package.json
git commit -m "chore(release): v${VERSION} [skip ci]" || echo "Sin cambios para commitear"

if git rev-parse "v${VERSION}" >/dev/null 2>&1; then
  echo "El tag v${VERSION} ya existe — se omite la creación"
else
  git tag -a "v${VERSION}" -m "Release v${VERSION}"
fi

AUTH_URL="https://${GIT_USER}:${GIT_TOKEN}@${HOST_PATH}"
git push "${AUTH_URL}" "HEAD:refs/heads/${BRANCH}"
git push "${AUTH_URL}" "refs/tags/v${VERSION}"

echo "Release v${VERSION} publicado en ${BRANCH}"
