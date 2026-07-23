#!/usr/bin/env bash
# Copia fotos de ~/Downloads para public/profiles (rode no SEU PC).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/public/profiles"
SRC="${1:-$HOME/Downloads}"

mkdir -p "$DEST"

copy_one () {
  local name="$1"
  local found=""
  for ext in jpg jpeg png webp JPG JPEG PNG WEBP; do
    if [[ -f "$SRC/${name}.${ext}" ]]; then
      found="$SRC/${name}.${ext}"
      break
    fi
  done
  if [[ -z "$found" ]]; then
    echo "⚠  Não achei ${name}.jpg/.png em $SRC"
    return 1
  fi
  # normaliza para .jpg no destino (mesmo se for png, mantém extensão real)
  local ext="${found##*.}"
  local out="$DEST/${name}.jpg"
  if [[ "${ext,,}" == "png" || "${ext,,}" == "webp" ]]; then
    out="$DEST/${name}.${ext,,}"
  fi
  cp -f "$found" "$out"
  echo "✓  $found → $out"
}

ok=0
for name in samuel riquelme guilherme gustavo joao; do
  if copy_one "$name"; then ok=$((ok+1)); fi
done

echo ""
echo "Copiadas: $ok"
echo "Agora rode:"
echo "  git add public/profiles src/data/profiles.ts"
echo "  git commit -m \"Adiciona fotos dos perfis\""
echo "  git push"
