#!/usr/bin/env bash
# Design Team Collective installer.
#   ./install.sh                           pick packs or a bundle from a menu
#   ./install.sh list                      show bundles and packs
#   ./install.sh ui-designer               install a bundle (see bundles.txt)
#   ./install.sh motion figma              install chosen packs into ~/.claude
#   ./install.sh all                       install every pack
#   ./install.sh update                    pull the latest repo and reinstall what you have
#   ./install.sh uninstall motion          remove a pack's skills and agents this installer added
#   ./install.sh all --project ~/code/app  install into that repo's .claude instead
#   ./install.sh figma --plugins           also install the pack's Claude Code plugins
#   ./install.sh github-standards --templates ~/code/app   copy CI workflows and test files into a repo
# No clone needed:
#   curl -fsSL https://raw.githubusercontent.com/fetchly/design-team-collective-repo/main/install.sh | bash -s -- ui-designer
set -euo pipefail
REPO_URL="${DTC_REPO_URL:-https://github.com/fetchly/design-team-collective-repo.git}"
HOME_CLONE="$HOME/.design-team-collective"

# Run through curl (or from outside the repo): clone or refresh a copy, then run from it.
SELF_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" 2>/dev/null && pwd || echo "")"
if [[ -z "$SELF_DIR" || ! -d "$SELF_DIR/packs" ]]; then
  command -v git >/dev/null || { echo "git is required"; exit 1; }
  if [[ -d "$HOME_CLONE/.git" ]]; then git -C "$HOME_CLONE" pull -q --ff-only
  else echo "Downloading the collective into $HOME_CLONE"; git clone -q --depth 1 "$REPO_URL" "$HOME_CLONE"; fi
  if [[ ${#} -eq 0 ]] && { : </dev/tty; } 2>/dev/null; then exec bash "$HOME_CLONE/install.sh" "$@" </dev/tty; fi
  exec bash "$HOME_CLONE/install.sh" "$@"
fi

ROOT="$SELF_DIR"; PACKS="$ROOT/packs"; BUNDLES="$ROOT/bundles.txt"
DEST="$HOME/.claude"; PLUGINS=0; TEMPLATES=""; SEL=(); MODE=install

while [[ $# -gt 0 ]]; do
  case "$1" in
    --project) DEST="$2/.claude"; shift 2 ;;
    --plugins) PLUGINS=1; shift ;;
    --templates) TEMPLATES="$2"; shift 2 ;;
    -h|--help) sed -n '2,15p' "$0"; exit 0 ;;
    update) MODE=update; shift ;;
    uninstall|remove) MODE=uninstall; shift ;;
    *) SEL+=("$1"); shift ;;
  esac
done
STATE="$DEST/.dtc-packs"

bundle_packs() { awk -v b="$1" '$1==b {for(i=2;i<=NF;i++) print $i}' "$BUNDLES"; }
show_list() {
  printf '\033[1mBundles\033[0m\n'
  grep -v '^#' "$BUNDLES" | while read -r b rest; do [[ -n "$b" ]] && printf '  %-18s %s\n' "$b" "$rest"; done
  printf '\n\033[1mPacks\033[0m\n'
  for p in "$PACKS"/*/; do n=$(basename "$p"); c=$(ls "$p/skills" 2>/dev/null | wc -l | tr -d ' ')
    printf '  %-18s %3s skills  %s\n' "$n" "$c" "$(cut -c1-80 "$p/pack.desc")"; done
}

# Menu when run with no arguments in a terminal.
if [[ $MODE == install && ${#SEL[@]} -eq 0 ]]; then
  if [[ -t 0 ]]; then
    show_list; echo
    read -r -p "Type bundle or pack names (space separated), 'all', or Enter to cancel: " line
    [[ -z "$line" ]] && exit 0
    read -r -a SEL <<<"$line"
    read -r -p "Also install the Claude Code plugins these packs use? [y/N] " yn
    [[ "$yn" =~ ^[Yy] ]] && PLUGINS=1
  else show_list; echo; echo "Usage: ./install.sh <bundle|pack...|all> [--project DIR] [--plugins] [--templates DIR]"; exit 0; fi
fi
[[ ${SEL[0]:-} == list ]] && { show_list; exit 0; }

# update: refresh the repo, then reinstall every pack recorded for this destination.
if [[ $MODE == update ]]; then
  if [[ -d "$ROOT/.git" ]]; then git -C "$ROOT" pull -q --ff-only 2>/dev/null && echo "✓ repo up to date" || echo "! could not pull, reinstalling from the local copy"; fi
  [[ -f "$STATE" ]] || { echo "Nothing installed in $DEST yet."; exit 0; }
  read -r -a SEL <<<"$(sort -u "$STATE" | tr '\n' ' ')"
  ARGS=("${SEL[@]}" --project "$(dirname "$DEST")"); [[ $PLUGINS == 1 ]] && ARGS+=(--plugins)
  exec bash "$ROOT/install.sh" "${ARGS[@]}"
fi

# Expand bundles and 'all' into pack names.
EXP=()
for n in "${SEL[@]}"; do
  if [[ $n == all ]]; then EXP+=($(ls "$PACKS"))
  elif [[ -n "$(bundle_packs "$n")" ]]; then EXP+=($(bundle_packs "$n"))
  else EXP+=("$n"); fi
done
SEL=($(printf '%s\n' "${EXP[@]}" | awk '!seen[$0]++'))
for n in "${SEL[@]}"; do [[ -d "$PACKS/$n" ]] || { echo "Unknown pack or bundle: $n (run ./install.sh list)"; exit 1; }; done

if [[ $MODE == uninstall ]]; then
  for n in "${SEL[@]}"; do P="$PACKS/$n"; s=0
    for d in "$P"/skills/*/; do t="$DEST/skills/$(basename "$d")"
      [[ -e "$t/.dtc-installed" ]] && { rm -rf "$t"; s=$((s+1)); }; done
    for f in "$P"/agents/*.md; do [[ -f "$f" ]] && rm -f "$DEST/agents/$(basename "$f")"; done
    [[ -f "$STATE" ]] && { grep -vx "$n" "$STATE" > "$STATE.tmp" || true; mv "$STATE.tmp" "$STATE"; }
    echo "✓ removed $n: $s skills"; done
  exit 0
fi

mkdir -p "$DEST/skills" "$DEST/agents"
for n in "${SEL[@]}"; do
  P="$PACKS/$n"; s=0; a=0
  if [[ -d "$P/skills" ]]; then for d in "$P"/skills/*/; do
    t="$DEST/skills/$(basename "$d")"
    [[ -e "$t" && ! -e "$t/.dtc-installed" ]] && { echo "  skip $(basename "$d"): you already have your own copy"; continue; }
    rm -rf "$t"; cp -R "$d" "$t"; touch "$t/.dtc-installed"; s=$((s+1)); done; fi
  if [[ -d "$P/agents" ]]; then for f in "$P"/agents/*.md; do [[ -f "$f" ]] && cp "$f" "$DEST/agents/" && a=$((a+1)); done; fi
  grep -qx "$n" "$STATE" 2>/dev/null || echo "$n" >> "$STATE"
  echo "✓ $n: $s skills, $a agents → $DEST"
  if [[ $PLUGINS == 1 && -f "$P/plugins.txt" ]]; then
    while read -r plugin repo; do [[ -z "$plugin" ]] && continue
      if command -v claude >/dev/null; then
        claude plugin marketplace add "$repo" >/dev/null 2>&1 || true
        claude plugin install "$plugin" && echo "  ✓ plugin $plugin" || echo "  ! run in Claude Code: /plugin marketplace add $repo  then  /plugin install $plugin"
      else echo "  ! claude CLI not found. In Claude Code run: /plugin marketplace add $repo  then  /plugin install $plugin"; fi
    done < "$P/plugins.txt"
  elif [[ -f "$P/plugins.txt" ]]; then echo "  + this pack uses plugins: rerun with --plugins"; fi
done

if [[ -n "$TEMPLATES" ]]; then
  cp -Rn "$PACKS/github-standards/templates/." "$TEMPLATES/"
  echo "✓ copied CI workflows, tests and PR template into $TEMPLATES (existing files kept)"
fi
echo "Restart Claude Code to load new skills. Update later with: ./install.sh update"
