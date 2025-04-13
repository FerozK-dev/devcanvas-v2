#!/bin/sh
set -e

# Wait for PostgreSQL
until nc -z postgres 5432; do
  echo "Waiting for PostgreSQL..."
  sleep 1
done

# Run migrations
npx prisma migrate deploy

# Start app
exec node dist/index.js
