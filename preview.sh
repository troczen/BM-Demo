#!/usr/bin/env bash
set -euo pipefail

echo "🚀 Starting dev server and preparing preview link..."

# 1) Stop any previously started server for this repo (if present)
if [[ -f .vite_pid ]]; then
  if kill -0 "$(cat .vite_pid)" 2>/dev/null; then
    echo "⏹  Stopping previous dev server (PID $(cat .vite_pid))..."
    kill "$(cat .vite_pid)" 2>/dev/null || true
    sleep 1
  fi
  rm -f .vite_pid
fi

# 2) Choose a free port (5173..5185) without lsof; use /dev/tcp probe
pick_port() {
  for p in $(seq 5173 5185); do
    if (echo > "/dev/tcp/127.0.0.1/$p") >/dev/null 2>&1; then
      # Connection succeeded => port in use; try next
      :
    else
      echo "$p"; return 0
    fi
  done
  echo "No free ports 5173-5185" >&2
  exit 1
}
PORT="$(pick_port)"

HOST="${HOSTNAME:-localhost}"
URL="https://$HOST-$PORT.app.cursor.run"

echo "🔌 Using port: $PORT"
echo "🌍 Preview will be: $URL"

# 3) Start dev server in background, log to vite.log, store PID
#    (works with Vite's default `npm run dev`)
echo "▶️  Launching: npm run dev -- --host 0.0.0.0 --port $PORT"
npm run dev -- --host 0.0.0.0 --port "$PORT" > vite.log 2>&1 & echo $! > .vite_pid

# 4) Wait until the port is actually listening (timeout ~20s) without lsof
echo -n "⏳ Waiting for server"
for i in {1..40}; do
  if (echo > "/dev/tcp/127.0.0.1/$PORT") >/dev/null 2>&1; then
    echo ""
    break
  fi
  echo -n "."
  sleep 0.5
done

# 5) Save & print the preview link
echo "🔗 Preview: $URL" | tee preview-link.txt

# 6) Stream logs (Ctrl+C to stop logs; server continues running)
echo "📜 Tailing logs (Ctrl+C to stop viewing logs; server stays running):"
tail -f vite.log
