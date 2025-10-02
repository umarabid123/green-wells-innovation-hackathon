# Project Overview

This is a full-stack web application for traffic management and urban planning in Pakistani cities. It features a Next.js (React) frontend with TypeScript and TailwindCSS, and a Python backend powered by FastAPI. The application provides an AI-powered chat interface for traffic advice and an interactive map for visualizing real-time traffic data.

## Architecture

*   **Frontend**: Next.js 14 (React) with TypeScript and TailwindCSS
*   **Backend**: FastAPI (Python) with async support
*   **Optional Server**: Node.js for additional server-side functionality
*   **AI Services**: Google Gemini API, OpenAI API, Local RAG, Offline Mode
*   **Maps**: Leaflet with OpenStreetMap for interactive traffic visualization

# Building and Running

## Frontend (Next.js)

To run the frontend development server:

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at http://localhost:3000.

To build the frontend for production:

```bash
cd frontend
npm install
npm run build
```

## Backend (FastAPI)

To run the backend server:

```bash
cd backend
python -m venv venv
# On Windows
venv\Scripts\activate
# On Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload
```

The backend API will be available at http://localhost:8000.

# Development Conventions

## Code Style

*   **Python**: Follow PEP 8 guidelines. Use type hints.
*   **TypeScript**: Strict mode is enabled. Use proper typing.
*   **React**: Use functional components with hooks.
*   **CSS**: Use TailwindCSS utility classes.

## Testing

### Backend

To run backend tests:

```bash
cd backend
pip install pytest pytest-asyncio
pytest
```

### Frontend

To run frontend tests:

```bash
cd frontend
npm run lint
npm run type-check
```
