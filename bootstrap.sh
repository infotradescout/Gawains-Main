#!/usr/bin/env bash
set -euo pipefail

git init
git add .
git commit -m "docs: create roundtable repo index"

echo "Local repo initialized."
echo "Now create the GitHub repo, then run:"
echo "git branch -M main"
echo "git remote add origin https://github.com/infotradescout/RoundTable.git"
echo "git push -u origin main"
