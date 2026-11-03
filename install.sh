#!/usr/bin/env bash
# Design Team Collective installer.
#   ./install.sh list                      show packs
#   ./install.sh motion figma              install chosen packs into ~/.claude
#   ./install.sh all                       install every pack
#   ./install.sh all --project ~/code/app  install into that repo's .claude instead
#   ./install.sh figma --plugins           also install the pack's Claude Code plugins
#   ./install.sh github-standards --templates ~/code/app   copy CI workflows and test files into a repo
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"; PACKS="$ROOT/packs"
DEST="$HOME/.claude"; PLUGINS=0; TEMPLATES=""; SEL=()

while [[ $# -gt 0 ]]; do
  case "$1" in
    --project) DEST="$2/.claude"; shift 2 ;;
    --plugins) PLUGINS=1; shift ;;
    --templates) TEMPLATES="$2"; shift 2 ;;
    -h|--help) sed -n '2,8p' "$0"; exit 0 ;;
    *) SEL+=("$1"); shift ;;
  esac
done

if [[ ${#SEL[@]} -eq 0 || "${SEL[0]}" == list ]]; then
  for p in "$PACKS"/*/; do n=$(basename "$p"); c=$(ls "$p/skills" 2>/dev/null | wc -l | tr -d ' ')
    printf '\033[1m%-18s\033[0m %3s skills  %s\n' "$n" "$c" "$(cut -c1-90 "$p/pack.desc")"; done
  echo; echo "Usage: ./install.sh <pack...|all> [--project DIR] [--plugins] [--templates DIR]"; exit 0
fi
[[ "${SEL[0]}" == all ]] && SEL=($(ls "$PACKS"))

mkdir -p "$DEST/skills" "$DEST/agents"
for n in "${SEL[@]}"; do
  P="$PACKS/$n"; [[ -d "$P" ]] || { echo "Unknown pack: $n (run ./install.sh list)"; exit 1; }
  s=0; a=0
  if [[ -d "$P/skills" ]]; then for d in "$P"/skills/*/; do
    t="$DEST/skills/$(basename "$d")"
    [[ -e "$t" && ! -e "$t/.dtc-installed" ]] && { echo "  skip $(basename "$d"): you already have your own copy"; continue; }
    rm -rf "$t"; cp -R "$d" "$t"; touch "$t/.dtc-installed"; s=$((s+1)); done; fi
  if [[ -d "$P/agents" ]]; then for f in "$P"/agents/*.md; do cp "$f" "$DEST/agents/"; a=$((a+1)); done; fi
  echo "✓ $n: $s skills, $a agents → $DEST"
  if [[ $PLUGINS == 1 && -f "$P/plugins.txt" ]]; then
    while read -r plugin repo; do [[ -z "$plugin" ]] && continue
      if command -v claude >/dev/null; then
        claude plugin marketplace add "$repo" >/dev/null 2>&1 || true
        claude plugin install "$plugin" && echo "  ✓ plugin $plugin" || echo "  ! run in Claude Code: /plugin marketplace add $repo  then  /plugin install $plugin"
      else echo "  ! claude CLI not found. In Claude Code run: /plugin marketplace add $repo  then  /plugin install $plugin"; fi
    done < "$P/plugins.txt"
  elif [[ -f "$P/plugins.txt" ]]; then echo "  + this pack has plugins: rerun with --plugins"; fi
done

if [[ -n "$TEMPLATES" ]]; then
  cp -Rn "$PACKS/github-standards/templates/." "$TEMPLATES/"
  echo "✓ copied CI workflows, tests and PR template into $TEMPLATES (existing files kept)"
fi
echo "Restart Claude Code to load new skills."
