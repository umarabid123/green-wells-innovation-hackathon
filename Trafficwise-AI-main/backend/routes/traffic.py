from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List
import logging
from services.tomtom_service import tomtom_service

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/traffic", tags=["traffic"])

@router.get("/cities")
async def get_supported_cities():
    """Get list of supported Pakistani cities"""
    try:
        cities = tomtom_service.get_supported_cities()
        return {
            "success": True,
            "data": {
                "cities": cities,
                "total": len(cities)
            }
        }
    except Exception as e:
        logger.error(f"Error getting supported cities: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/flow/{city}")
async def get_traffic_flow(city: str):
    """Get real-time traffic flow data for a Pakistani city"""
    try:
        result = await tomtom_service.get_traffic_flow(city)
        if result["success"]:
            return result
        else:
            raise HTTPException(status_code=400, detail=result["error"])
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting traffic flow for {city}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/incidents/{city}")
async def get_traffic_incidents(city: str):
    """Get traffic incidents for a Pakistani city"""
    try:
        result = await tomtom_service.get_traffic_incidents(city)
        if result["success"]:
            return result
        else:
            raise HTTPException(status_code=400, detail=result["error"])
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting traffic incidents for {city}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/route")
async def get_route_with_traffic(
    origin: str = Query(..., description="Origin coordinates (lat,lon) or address"),
    destination: str = Query(..., description="Destination coordinates (lat,lon) or address")
):
    """Get route with traffic information between two points"""
    try:
        result = await tomtom_service.get_route_traffic(origin, destination)
        if result["success"]:
            return result
        else:
            raise HTTPException(status_code=400, detail=result["error"])
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting route from {origin} to {destination}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/search")
async def search_places(
    query: str = Query(..., description="Search query for places"),
    city: str = Query(..., description="Pakistani city to search in")
):
    """Search for places in Pakistani cities"""
    try:
        result = await tomtom_service.search_places(query, city)
        if result["success"]:
            return result
        else:
            raise HTTPException(status_code=400, detail=result["error"])
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error searching places for '{query}' in {city}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/dashboard/{city}")
async def get_traffic_dashboard(city: str):
    """Get complete traffic dashboard data for a Pakistani city"""
    try:
        # Get traffic flow and incidents concurrently
        import asyncio
        
        flow_task = tomtom_service.get_traffic_flow(city)
        incidents_task = tomtom_service.get_traffic_incidents(city)
        
        flow_result, incidents_result = await asyncio.gather(
            flow_task, incidents_task, return_exceptions=True
        )
        
        dashboard_data = {
            "city": city.title(),
            "timestamp": "",
            "traffic_flow": None,
            "incidents": None,
            "summary": {
                "overall_status": "unknown",
                "total_incidents": 0,
                "avg_speed": 0,
                "traffic_level": "unknown"
            }
        }
        
        # Process traffic flow data
        if isinstance(flow_result, dict) and flow_result.get("success"):
            dashboard_data["traffic_flow"] = flow_result["data"]
            dashboard_data["timestamp"] = flow_result["data"].get("timestamp", "")
            dashboard_data["summary"]["avg_speed"] = flow_result["data"].get("current_speed", 0)
            dashboard_data["summary"]["traffic_level"] = flow_result["data"].get("traffic_level", "unknown")
        
        # Process incidents data
        if isinstance(incidents_result, dict) and incidents_result.get("success"):
            dashboard_data["incidents"] = incidents_result["data"]
            dashboard_data["summary"]["total_incidents"] = incidents_result["data"].get("total_incidents", 0)
        
        # Determine overall status
        if dashboard_data["traffic_flow"] and dashboard_data["incidents"]:
            traffic_level = dashboard_data["summary"]["traffic_level"]
            incident_count = dashboard_data["summary"]["total_incidents"]
            
            if traffic_level == "light" and incident_count <= 2:
                dashboard_data["summary"]["overall_status"] = "good"
            elif traffic_level == "moderate" or incident_count <= 5:
                dashboard_data["summary"]["overall_status"] = "moderate"
            else:
                dashboard_data["summary"]["overall_status"] = "congested"
        
        return {
            "success": True,
            "data": dashboard_data
        }
        
    except Exception as e:
        logger.error(f"Error getting traffic dashboard for {city}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")