@echo off
REM GoSchool Quick Start Script for Windows
REM This script helps you get GoSchool running quickly

echo.
echo ðŸš€ GoSchool Quick Start (Windows)
echo ====================================
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo âŒ Docker is not installed. Please install Docker first.
    echo    Download from: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

echo âœ“ Docker is installed

REM Check if Docker Compose is installed
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo âŒ Docker Compose is not installed.
    pause
    exit /b 1
)

echo âœ“ Docker Compose is installed
echo.

REM Check if .env files exist
if not exist "frontend\.env.local" (
    echo âš ï¸  Creating frontend\.env.local from template...
    copy frontend\.env.local.example frontend\.env.local
    echo    âš ï¸  Please add NEXT_PUBLIC_MAPBOX_TOKEN to frontend\.env.local
)

if not exist "backend\.env" (
    echo âš ï¸  Creating backend\.env from template...
    copy backend\.env.example backend\.env
)

echo.
echo ðŸ“¦ Starting services with Docker Compose...
echo.

REM Start services
docker-compose up -d

REM Wait for services to be ready
echo â³ Waiting for services to start (30 seconds)...
timeout /t 30 /nobreak

echo.
echo âœ… All services are running!
echo.
echo ðŸ“ Access the services:
echo    Frontend:  http://localhost:3000
echo    Backend:   http://localhost:5000
echo    API Docs:  http://localhost:5000/api
echo.
echo ðŸŽ¯ Next steps:
echo    1. Open http://localhost:3000 in your browser
echo    2. Create an account (signup)
echo    3. Explore schools on the map
echo    4. Make a test booking
echo.
echo ðŸ“š View logs:
echo    docker-compose logs -f frontend   # Frontend logs
echo    docker-compose logs -f backend    # Backend logs
echo.
echo ðŸ›‘ Stop services:
echo    docker-compose down
echo.
echo âœ¨ Happy exploring! ðŸš€
echo.
pause
