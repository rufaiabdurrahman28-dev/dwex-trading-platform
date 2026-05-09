#!/bin/bash
while true; do
  npx next start -p 3000 -H 0.0.0.0
  echo "Server crashed, restarting in 2s..."
  sleep 2
done
