#!/bin/sh

# Wait for PostgreSQL to be ready
until nc -z postgres 5432; do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 1
done

# Run migrations
npx prisma migrate deploy

# Start the application with nodemon for development
exec npx nodemon src/index.ts
