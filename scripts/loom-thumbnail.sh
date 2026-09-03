#!/usr/bin/env bash
# Pull a thumbnail frame out of a public Loom recording.
#
# Loom's own thumbnail CDN 403s for some videos (expired signed assets), which
# is why two cards here fell back to showing Hiram's profile photo. This asks
# Loom for the transcoded MP4 instead and takes a frame from it.
#
#   ./scripts/loom-thumbnail.sh <loom-id> <seconds> <out.webp> [crop]
#
# NOTE: not every video has a transcoded MP4 — Loom answers 204 for some, and
# there is no way around that from here. Download those from Loom's own
# Download button and use ffmpeg directly.
set -euo pipefail
ID="$1"; AT="$2"; OUT="$3"; CROP="${4:-}"
URL=$(curl -s -X POST "https://www.loom.com/api/campaigns/sessions/$ID/transcoded-url" \
      -H "Content-Type: application/json" -H "User-Agent: Mozilla/5.0" -d '{}' \
      | python3 -c "import sys,json; print(json.load(sys.stdin).get('url',''))")
[ -n "$URL" ] || { echo "No transcoded MP4 for $ID (Loom returned 204). Download it manually."; exit 1; }
TMP=$(mktemp -d)
curl -sL "$URL" -o "$TMP/v.mp4"
VF="scale=678:-2"; [ -n "$CROP" ] && VF="crop=$CROP,scale=678:-2"
ffmpeg -v error -y -ss "$AT" -i "$TMP/v.mp4" -frames:v 1 -vf "$VF" -q:v 3 "$TMP/f.jpg"
cwebp -quiet -q 82 "$TMP/f.jpg" -o "$OUT"
rm -rf "$TMP"
echo "wrote $OUT"
