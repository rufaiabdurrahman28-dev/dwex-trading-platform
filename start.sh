#!/bin/bash
# Aroyan Muslim School - Self-healing static server
# This script keeps the server alive permanently

cd /home/z/my-project

while true; do
  # Start the static server
  bun static-server.js &
  SERVER_PID=$!

  # Wait for it to be ready
  for i in $(seq 1 10); do
    if curl -s -o /dev/null http://localhost:3000 2>/dev/null; then
      echo "Server is ready (PID $SERVER_PID)"
      break
    fi
    sleep 0.2
  done

  # Keep it alive by pinging every 2 seconds
  while true; do
    if ! kill -0 $SERVER_PID 2>/dev/null; then
      echo "Server died, restarting..."
      break
    fi
    curl -s -o /dev/null http://localhost:3000 2>/dev/null
    sleep 2
  done
done
