#!/bin/sh
npx prisma migrate dev --name init
exec nodemon src/index.ts
