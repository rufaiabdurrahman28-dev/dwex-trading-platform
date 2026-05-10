#!/bin/bash
# Start the standalone Next.js server and keep it alive with self-pings

cd /home/z/my-project

# Kill any existing server
pkill -f "node.*server.js" 2>/dev/null
sleep 1

# Start the server in background
PORT=3000 node .next/standalone/server.js &
SERVER_PID=$!
echo "Server started with PID $SERVER_PID"

# Wait for server to be ready
for i in $(seq 1 30); do
  if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null | grep -q "200\|302"; then
    echo "Server is ready!"
    break
  fi
  sleep 1
done

# Keep-alive loop - ping every 10 seconds
while true; do
  # Check if server is still running
  if ! kill -0 $SERVER_PID 2>/dev/null; then
    echo "Server died, restarting..."
    PORT=3000 node .next/standalone/server.js &
    SERVER_PID=$!
    sleep 5
  fi
  # Self-ping to keep it warm
  curl -s -o /dev/null http://localhost:3000 2>/dev/null
  sleep 10
done
