#!/bin/sh
# index.html is an artifact fragment (no <html>), so wrap it before serving. Usage: sh health-hub/tests/serve.sh  then  node health-hub/tests/browser.test.js
D=$(cd "$(dirname "$0")/.." && pwd); T=$(mktemp -d); ln -s "$D/data" "$T/data"; ln -s "$D/assets" "$T/assets"
{ printf '<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover"><style>body{margin:0}img{max-width:100%%}[hidden]{display:none!important}</style></head><body>'; cat "$D/index.html"; printf '</body></html>'; } > "$T/index.html"
cd "$T" && exec python3 -m http.server 8765
