#!/usr/bin/env bash
set -euo pipefail

git init
git add .
git commit -m "docs: create gawains main repo index"

echo "Local repo initialized."
echo "Now create the GitHub repo, then run:"
echo "git branch -M main"
echo "git remote add origin https://github.com/infotradescout/Gawains-Main.git"
echo "git push -u origin main"
