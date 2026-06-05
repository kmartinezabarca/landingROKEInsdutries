#!/usr/bin/env sh
# Escribe la versión recibida en el campo "version" de package.json,
# preservando indentación y el resto del archivo.
#   Uso: apply-version.sh <version>
set -eu

VERSION="${1:?Falta la versión}"

sed -i.bak -E 's/("version"[[:space:]]*:[[:space:]]*")[^"]*(")/\1'"${VERSION}"'\2/' package.json
rm -f package.json.bak

echo "package.json version -> ${VERSION}"
