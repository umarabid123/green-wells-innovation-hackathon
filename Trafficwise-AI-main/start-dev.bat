@echo off
REM TrafficWise AI - Development Startup Script for Windows
REM This script starts both backend and frontend in development mode

echo 🚦 Starting TrafficWise AI Development Environment...

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed. Please install Python 3.8+ first.
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed

REM Start backend
echo.
echo 🔧 Starting FastAPI Backend...
cd backend

REM Check if virtual environment exists
if not exist "venv" (
    echo 📦 Creating Python virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo 🔌 Activating virtual environment...
call venv\Scripts\activate.bat

REM Install backend dependencies
if not exist ".deps_installed" (
    echo 📦 Installing Python dependencies...
    pip install -r requirements.txt
    echo. > .deps_installed
) else (
    echo 📦 Python dependencies already installed
)

REM Start backend in background
echo 🚀 Starting FastAPI server on port 8000...
start /b uvicorn main:app --reload --host 0.0.0.0 --port 8000

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend
echo.
echo 🎨 Starting Next.js Frontend...
cd ..\frontend

REM Install frontend dependencies
if not exist "node_modules" (
    echo 📦 Installing Node.js dependencies...
    npm install
) else (
    echo 📦 Node.js dependencies already installed
)

REM Copy environment file if it doesn't exist
if not exist ".env.local" (
    echo ⚙️ Creating environment configuration...
    copy .env.example .env.local
)

REM Start frontend
echo 🚀 Starting Next.js development server on port 3000...
start /b npm run dev

echo.
echo 🎉 TrafficWise AI is starting up!
echo 📍 Frontend: http://localhost:3000
echo 📍 Backend API: http://localhost:8000
echo 📍 API Docs: http://localhost:8000/docs
echo.
echo ✅ Both servers are running in the background
echo ❌ Close this window or press Ctrl+C to stop servers
echo.

REM Keep the window open
pause