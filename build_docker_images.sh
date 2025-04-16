#!/bin/bash

# Build all images with production configuration
echo "Building production images..."
echo "--------------------------------"

# Frontend
echo "Building frontend..."
docker build -f devcanvas-frontend/Dockerfile.prod -t devcanvas-frontend:prod .

# Backend
echo "Building backend..."
docker build -f devcanvas-api/Dockerfile.prod -t devcanvas-backend:prod .

# AI Service
echo "Building AI service..."
docker build -f ai-service/Dockerfile.prod -t devcanvas-ai:prod .

# Nginx
echo "Building Nginx..."
docker build -f nginx/Dockerfile -t devcanvas-nginx:prod .

echo "--------------------------------"
echo "All production images built successfully:"
docker images | grep devcanvas-
