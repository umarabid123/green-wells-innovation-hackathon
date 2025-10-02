from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
import logging
import os
from contextlib import asynccontextmanager
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import routes
from routes.traffic import router as traffic_router

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("🚀 Starting TrafficWise AI Backend...")
    logger.info(f"Environment: {os.getenv('ENVIRONMENT', 'development')}")
    
    # Verify TomTom API key
    if not os.getenv("TOMTOM_API_KEY"):
        logger.warning("⚠️ TomTom API key not found in environment variables")
    else:
        logger.info("✅ TomTom API key configured")
    
    yield
    
    # Shutdown
    logger.info("🛑 Shutting down TrafficWise AI Backend...")

# Create FastAPI app
app = FastAPI(
    title="TrafficWise AI Backend",
    description="Real-time traffic and route intelligence for Pakistan",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# Add middleware
app.add_middleware(GZipMiddleware, minimum_size=1000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Next.js dev server
        "http://127.0.0.1:3000",
        "https://your-frontend-domain.com"  # Add your production domain
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Include routers
app.include_router(traffic_router)

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "TrafficWise AI Backend is running! 🚗💨",
        "version": "1.0.0",
        "status": "healthy",
        "endpoints": {
            "traffic_flow": "/api/traffic/flow/{city}",
            "traffic_incidents": "/api/traffic/incidents/{city}",
            "route_planning": "/api/traffic/route",
            "place_search": "/api/traffic/search",
            "dashboard": "/api/traffic/dashboard/{city}",
            "supported_cities": "/api/traffic/cities"
        }
    }

@app.get("/health")
async def health_check():
    """Detailed health check"""
    health_status = {
        "status": "healthy",
        "environment": os.getenv("ENVIRONMENT", "development"),
        "tomtom_api": "configured" if os.getenv("TOMTOM_API_KEY") else "missing",
        "supported_cities": 15,
        "services": {
            "traffic_flow": "available",
            "traffic_incidents": "available", 
            "route_planning": "available",
            "place_search": "available"
        }
    }
    
    return health_status

if __name__ == "__main__":
    import uvicorn
    
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    
    logger.info(f"🌟 Starting server on {host}:{port}")
    
    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=True if os.getenv("ENVIRONMENT") == "development" else False,
        log_level="info"
    )