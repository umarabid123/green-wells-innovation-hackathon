#!/bin/bash

# TrafficWise AI - Development Startup Script
# This script starts both backend and frontend in development mode

echo "🚦 Starting TrafficWise AI Development Environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command_exists python3 && ! command_exists python; then
    echo -e "${RED}❌ Python is not installed. Please install Python 3.8+ first.${NC}"
    exit 1
fi

if ! command_exists node; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+ first.${NC}"
    exit 1
fi

if ! command_exists npm; then
    echo -e "${RED}❌ npm is not installed. Please install npm first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Prerequisites check passed${NC}"

# Start backend
echo -e "\n🔧 Starting FastAPI Backend..."
cd backend

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating Python virtual environment..."
    python3 -m venv venv 2>/dev/null || python -m venv venv
fi

# Activate virtual environment
echo "🔌 Activating virtual environment..."
source venv/bin/activate 2>/dev/null || source venv/Scripts/activate

# Install backend dependencies
if [ ! -f ".deps_installed" ]; then
    echo "📦 Installing Python dependencies..."
    pip install -r requirements.txt
    touch .deps_installed
else
    echo "📦 Python dependencies already installed"
fi

# Start backend in background
echo "🚀 Starting FastAPI server on port 8000..."
uvicorn main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend
echo -e "\n🎨 Starting Next.js Frontend..."
cd ../frontend

# Install frontend dependencies
if [ ! -d "node_modules" ]; then
    echo "📦 Installing Node.js dependencies..."
    npm install
else
    echo "📦 Node.js dependencies already installed"
fi

# Copy environment file if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "⚙️ Creating environment configuration..."
    cp .env.example .env.local
fi

# Start frontend
echo "🚀 Starting Next.js development server on port 3000..."
npm run dev &
FRONTEND_PID=$!

# Function to cleanup background processes
cleanup() {
    echo -e "\n🛑 Shutting down servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo -e "${GREEN}✅ Cleanup complete${NC}"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

echo -e "\n${GREEN}🎉 TrafficWise AI is starting up!${NC}"
echo -e "${YELLOW}📍 Frontend: http://localhost:3000${NC}"
echo -e "${YELLOW}📍 Backend API: http://localhost:8000${NC}"
echo -e "${YELLOW}📍 API Docs: http://localhost:8000/docs${NC}"
echo -e "\n${GREEN}Press Ctrl+C to stop all servers${NC}"

# Wait for processes to finish
wait