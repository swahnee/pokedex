#!/bin/sh
set -e

if [ "$APP_ENV" = "prod" ]; then
  echo "Starting production server..."
  exec node index.js
elif [ "$APP_ENV" = "ci" ]; then
  echo "Running CI..."
  exec npm run ci
else
  echo "Starting development server..."
  exec node --watch index.js
fi
