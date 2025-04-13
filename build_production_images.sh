#!/bin/bash
# build_production_images.sh
# Builds the production docker images for DevCanvas

echo "Starting production image builds..."

# Build backend production image
echo "Building devcanvas-api:prod..."
docker build -f devcanvas-api/Dockerfile.prod -t devcanvas-api:prod devcanvas-api/
echo "devcanvas-api:prod build completed"

# Build frontend production image
echo "Building devcanvas-frontend:prod..."
docker build -f devcanvas-frontend/Dockerfile.prod -t devcanvas-frontend:prod devcanvas-frontend/
echo "devcanvas-frontend:prod build completed"

echo "All production images built successfully"
