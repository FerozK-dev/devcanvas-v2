# Build stage
FROM node:18-alpine as builder
WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma ./prisma
RUN npm install
COPY . .
RUN npm run build

# Development stage
FROM node:18-alpine as development
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
COPY prisma ./prisma
RUN npm install && npm install --include=dev

# Copy source code
COPY . .

# Generate Prisma client (doesn't need database connection)
RUN npx prisma generate

# Install nodemon globally
RUN npm install -g nodemon

EXPOSE 3000

# Create entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

# Production stage
FROM node:18-alpine as production
WORKDIR /usr/src/app

# Install production dependencies only
COPY package*.json ./
COPY prisma ./prisma
RUN npm install --omit=dev

# Generate Prisma client
RUN npx prisma generate

# Copy built files (from a previous build stage)
COPY . .

# Entrypoint for production
COPY entrypoint.prod.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["/entrypoint.sh"]
