#!/bin/bash

# Game 2048 Docker Setup Script

set -e

echo "🚀 Setting up Game 2048 Docker environment..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo ".env file created. Please edit it with your configuration."
    echo "⚠️  IMPORTANT: Change POSTGRES_PASSWORD to a secure password!"
    exit 1
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "Docker is not running. Please start Docker and try again."
    exit 1
fi

# Build and start services
echo "🔨 Building Docker images..."
docker-compose build

echo "🚀 Starting services..."
docker-compose up -d

echo "⏳ Waiting for services to be ready..."
sleep 10

# Check service health
echo "🔍 Checking service health..."

# Check PostgreSQL
if docker-compose exec postgres pg_isready -U postgres > /dev/null 2>&1; then
    echo "PostgreSQL is ready"
else
    echo "PostgreSQL is not ready"
fi

# Check Server
if curl -f http://localhost:3001/health > /dev/null 2>&1; then
    echo "Server is ready"
else
    echo "Server is not ready"
fi

# Check Client
if curl -f http://localhost:3000/health > /dev/null 2>&1; then
    echo "Client is ready"
else
    echo "Client is not ready"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📱 Access your application:"
echo "   Client: http://localhost:3000"
echo "   Server: http://localhost:3001"
echo ""
echo "📋 Useful commands:"
echo "   View logs: docker-compose logs -f"
echo "   Stop services: docker-compose down"
echo "   Restart: docker-compose restart"
echo ""
