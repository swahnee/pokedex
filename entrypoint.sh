#!/bin/sh
set -e

if [ "$APP_ENV" = "dev" ]; then
  echo "Starting development server..."
  exec node --watch index.js
else
  echo "Starting production server..."
  exec node index.js
fi
