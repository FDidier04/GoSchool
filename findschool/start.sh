#!/bin/bash

# GoSchool Quick Start Script
# This script helps you get GoSchool running quickly

set -e

echo "ðŸš€ GoSchool Quick Start"
echo "========================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null
then
    echo "âŒ Docker is not installed. Please install Docker first."
    echo "   Download from: https://www.docker.com/products/docker-desktop"
    exit 1
fi

echo "âœ“ Docker is installed"

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null
then
    echo "âŒ Docker Compose is not installed."
    exit 1
fi

echo "âœ“ Docker Compose is installed"
echo ""

# Check if .env files exist
if [ ! -f "frontend/.env.local" ]; then
    echo "âš ï¸  Creating frontend/.env.local from template..."
    cp frontend/.env.local.example frontend/.env.local
    echo "   âš ï¸  Please add NEXT_PUBLIC_MAPBOX_TOKEN to frontend/.env.local"
fi

if [ ! -f "backend/.env" ]; then
    echo "âš ï¸  Creating backend/.env from template..."
    cp backend/.env.example backend/.env
fi

echo ""
echo "ðŸ“¦ Starting services with Docker Compose..."
echo ""

# Start services
docker-compose up -d

# Wait for services to be ready
echo "â³ Waiting for services to start (30 seconds)..."
sleep 30

echo ""
echo "âœ… All services are running!"
echo ""
echo "ðŸ“ Access the services:"
echo "   Frontend:  http://localhost:3000"
echo "   Backend:   http://localhost:5000"
echo "   API Docs:  http://localhost:5000/api"
echo ""
echo "ðŸ“Š Database:"
echo "   Host:      localhost"
echo "   Port:      5432"
echo "   User:      GoSchool_user"
echo ""
echo "ðŸ’¾ Redis:"
echo "   Host:      localhost"
echo "   Port:      6379"
echo ""
echo "ðŸŽ¯ Next steps:"
echo "   1. Open http://localhost:3000 in your browser"
echo "   2. Create an account (signup)"
echo "   3. Explore schools on the map"
echo "   4. Make a test booking"
echo ""
echo "ðŸ“š View logs:"
echo "   docker-compose logs -f frontend   # Frontend logs"
echo "   docker-compose logs -f backend    # Backend logs"
echo ""
echo "ðŸ›‘ Stop services:"
echo "   docker-compose down"
echo ""
echo "âœ¨ Happy exploring! ðŸš€"
