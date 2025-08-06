#!/bin/bash

# Development script for Game 2048

set -e

echo "🔧 Starting development environment..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo ".env file not found. Run ./scripts/docker-setup.sh first."
    exit 1
fi

# Start only database for development
echo "🐘 Starting PostgreSQL..."
docker-compose up -d postgres

echo "⏳ Waiting for database to be ready..."
sleep 5

# Check if database is ready
if docker-compose exec postgres pg_isready -U postgres > /dev/null 2>&1; then
    echo "Database is ready"
else
    echo "Database is not ready. Please check logs: docker-compose logs postgres"
    exit 1
fi

echo ""
echo "🎯 Development environment ready!"
echo ""
echo "📋 Next steps:"
echo "   1. Start client: cd packages/client && yarn dev"
echo "   2. Start server: cd packages/server && yarn dev"
echo ""
echo "🌐 Access points:"
echo "   Client: http://localhost:3000"
echo "   Server: http://localhost:3001"
echo "   Database: localhost:5432"
echo ""
echo "📊 Database connection:"
echo "   Host: localhost"
echo "   Port: 5432"
echo "   User: postgres"
echo "   Database: game_2048"
echo ""
