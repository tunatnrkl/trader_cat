#!/usr/bin/env bash
# Sürüm sorumlusu: testleri geçen adımı GitHub'a kaydeder.
# Kullanım: araclar/surum.sh "commit mesajı" dosya1 [dosya2 ...]
# Kurallar: main dalına kaydetmez (patron izni gerekir), PR açmaz.
# index.html değiştiyse önce smoke testi çalıştırır; kırmızıysa kaydetmez.
# Ofis için son kayıtları yedek/github-son.json dosyasına yazar (git dışı).
set -euo pipefail
cd "$(dirname "$0")/.."
[ $# -ge 2 ] || { echo "Kullanım: araclar/surum.sh \"mesaj\" dosya..."; exit 2; }
msg="$1"; shift
dal=$(git rev-parse --abbrev-ref HEAD)
case "$dal" in main|master) echo "RET: $dal dalına kayıt yok (patron izni gerekir)."; exit 1;; esac

git add -- "$@"
if git diff --cached --quiet; then echo "Kaydedilecek değişiklik yok."; exit 0; fi

if git diff --cached --name-only | grep -qx 'index.html'; then
  echo "index.html değişti: smoke testi çalışıyor..."
  out=$(node araclar/qa/smoke.js 2>&1 || true)
  ozet=$(printf '%s\n' "$out" | grep 'ÖZET:' || true)
  echo "$ozet"
  if ! printf '%s' "$ozet" | grep -q 'kalan: 0'; then
    printf '%s\n' "$out" | tail -15
    git reset -q -- "$@"
    echo "RET: testler geçmedi, kayıt yapılmadı."; exit 1
  fi
fi

trailer="Co-Authored-By: ${SURUM_YAZAR:-Claude Opus 5.5 <noreply@anthropic.com>}"
[ -n "${CLAUDE_SESSION_URL:-}" ] && trailer="$trailer
Claude-Session: $CLAUDE_SESSION_URL"
git commit -q -m "$msg" -m "$trailer"

for i in 1 2 3 4; do
  if git push -q -u origin "$dal" 2>&1; then break; fi
  [ "$i" = 4 ] && { echo "UYARI: push başarısız (commit yerelde duruyor)."; exit 1; }
  sleep $((2 ** i))
done

mkdir -p yedek
git log -10 --format='%H%x09%ct%x09%s' | node -e '
const l=require("fs").readFileSync(0,"utf8").trim().split("\n").map(r=>{const[h,t,...m]=r.split("\t");return{h,t:+t*1000,m:m.join("\t")}});
require("fs").writeFileSync("yedek/github-son.json",JSON.stringify({liste:l,dal:process.argv[1]}));' "$dal"
echo "GÖNDERİLDİ: $(git log -1 --format='%h %s') → origin/$dal"
