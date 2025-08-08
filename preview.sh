#!/usr/bin/env bash
set -euo pipefail

PORT="${PORT:-${1:-5173}}"

if [ ! -f package.json ]; then
  echo "Error: Run this script from the project root containing package.json" >&2
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  npm install --no-audit --no-fund
fi

echo "Building production bundle..."
 npm run build

echo "Starting Vite preview on 0.0.0.0:${PORT} (will auto-pick another if busy)..."
exec npm run preview -- --host 0.0.0.0 --port "${PORT}"