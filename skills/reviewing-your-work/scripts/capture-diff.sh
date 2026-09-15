#!/usr/bin/env bash

set -euo pipefail

repository_root=$(git rev-parse --show-toplevel 2>/dev/null) || {
  printf 'capture-diff: current directory is not inside a Git repository\n' >&2
  exit 2
}
repository_root=$(cd -- "$repository_root" && pwd -P)

if [[ $# -gt 1 ]]; then
  printf 'usage: %s [output-path]\n' "$0" >&2
  exit 2
fi

remove_output_on_failure=false
if [[ $# -eq 1 ]]; then
  output_directory=$(dirname -- "$1")
  output_name=$(basename -- "$1")
  [[ -d "$output_directory" ]] || {
    printf 'capture-diff: output directory does not exist: %s\n' "$output_directory" >&2
    exit 2
  }
  output_directory=$(cd -- "$output_directory" && pwd -P)
  output_path="$output_directory/$output_name"
  if [[ -e "$output_path" ]]; then
    printf 'capture-diff: refusing to overwrite: %s\n' "$output_path" >&2
    exit 2
  fi
else
  output_directory=${TMPDIR:-/tmp}
  [[ -d "$output_directory" ]] || {
    printf 'capture-diff: temporary directory does not exist: %s\n' "$output_directory" >&2
    exit 2
  }
  output_directory=$(cd -- "$output_directory" && pwd -P)
  output_path=$(mktemp "$output_directory/change-review.XXXXXX")
  remove_output_on_failure=true
fi

case "$output_path" in
  "$repository_root" | "$repository_root"/*)
    if [[ $remove_output_on_failure == true ]]; then
      rm -f -- "$output_path"
    fi
    printf 'capture-diff: output must be outside the repository: %s\n' "$output_path" >&2
    exit 2
    ;;
esac

build_path=
untracked_path_list=
completed=false
cleanup() {
  if [[ -n $build_path ]]; then
    rm -f -- "$build_path"
  fi
  if [[ -n $untracked_path_list ]]; then
    rm -f -- "$untracked_path_list"
  fi
  if [[ $remove_output_on_failure == true && $completed == false ]]; then
    rm -f -- "$output_path"
  fi
}
trap cleanup EXIT
build_path=$(mktemp "$output_directory/change-review-build.XXXXXX")
untracked_path_list=$(mktemp "$output_directory/change-review-paths.XXXXXX")

cd -- "$repository_root"
if base_revision=$(git rev-parse --verify HEAD 2>/dev/null); then
  :
else
  base_revision=$(git hash-object -t tree /dev/null)
fi

printf '# Staged changes (HEAD to index)\n' >"$build_path"
git diff --cached --no-ext-diff --no-textconv --binary --full-index "$base_revision" -- . >>"$build_path"
printf '\n# Unstaged changes (index to working tree)\n' >>"$build_path"
git diff --no-ext-diff --no-textconv --binary --full-index -- . >>"$build_path"
printf '\n# Untracked files\n' >>"$build_path"
git ls-files --others --exclude-standard -z >"$untracked_path_list"

while IFS= read -r -d '' untracked_path; do
  set +e
  git diff --no-ext-diff --no-textconv --binary --full-index --no-index -- /dev/null "$untracked_path" >>"$build_path"
  diff_status=$?
  set -e

  if [[ $diff_status -gt 1 ]]; then
    printf 'capture-diff: failed to capture untracked path: %s\n' "$untracked_path" >&2
    exit "$diff_status"
  fi
done <"$untracked_path_list"

mv -- "$build_path" "$output_path"
completed=true
printf '%s\n' "$output_path"
