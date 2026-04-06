#!/bin/sh
set -e

if [ "$APP_ENV" = "prod" ]; then
  echo "Starting production server..."
  exec node index.js
else
  echo "Starting development server..."
  exec node --watch index.js
fi
