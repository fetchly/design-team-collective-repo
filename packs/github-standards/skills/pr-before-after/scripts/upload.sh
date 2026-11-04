#!/usr/bin/env bash
# Push screenshots to the repo's pr-assets branch and print Markdown links.
# usage: upload.sh <shots-dir> <folder-name, e.g. the PR branch>
set -euo pipefail
dir=${1:?shots dir}; name=${2:?folder name}
repo=$(gh repo view --json nameWithOwner -q .nameWithOwner)
tmp=$(mktemp -d)
if git ls-remote --exit-code --heads origin pr-assets >/dev/null 2>&1; then
  git clone -q --depth 1 --branch pr-assets "$(git remote get-url origin)" "$tmp"
else
  git clone -q --depth 1 "$(git remote get-url origin)" "$tmp" && (cd "$tmp" && git checkout -q --orphan pr-assets && git rm -rq . && echo "Screenshots for PR descriptions. Not code." > README.md && git add README.md && git commit -qm "Start pr-assets branch")
fi
mkdir -p "$tmp/$name" && cp "$dir"/*.png "$tmp/$name/" 2>/dev/null; cp "$dir"/*.gif "$dir"/*.mp4 "$tmp/$name/" 2>/dev/null || true
(cd "$tmp" && git add -A && git commit -qm "Screenshots for $name" && git push -q origin pr-assets)
for f in "$tmp/$name"/*; do b=$(basename "$f"); echo "![$b](https://github.com/$repo/blob/pr-assets/$name/$b?raw=true)"; done
rm -rf "$tmp"
