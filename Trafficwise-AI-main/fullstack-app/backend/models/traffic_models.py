"""
Traffic data models for Pakistani cities and routes
"""

from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from enum import Enum

class TrafficLevel(str, Enum):
    LIGHT = "Light"
    MODERATE = "Moderate" 
    HEAVY = "Heavy"
    VERY_HEAVY = "Very Heavy"

class TrafficData(BaseModel):
    city: str
    lat: float
    lon: float
    traffic_level: TrafficLevel
    color: str
    info: str
    peak_hours: Optional[List[str]] = None
    alternative_routes: Optional[List[str]] = None

class TrafficDataRequest(BaseModel):
    from_city: str
    to_city: str
    avoid_congestion: bool = True
    departure_time: Optional[str] = None

class RouteData(BaseModel):
    from_city: str
    to_city: str
    distance: str
    duration: str
    route_type: str  # "motorway", "highway", "city_road"
    traffic_level: TrafficLevel
    waypoints: List[Dict[str, float]]  # [{"lat": 31.5, "lon": 74.3}, ...]
    alternative_routes: Optional[List[Dict[str, Any]]] = None

class HighwayData(BaseModel):
    name: str
    route_code: str  # M-1, M-2, N-5, etc.
    start_city: str
    end_city: str
    total_distance: str
    traffic_level: TrafficLevel
    toll_required: bool
    waypoints: List[Dict[str, float]]
    current_conditions: Optional[str] = None

class ChatRequest(BaseModel):
    message: str
    service_type: str
    api_key: Optional[str] = None
    config: Optional[Dict[str, Any]] = None

class ChatResponse(BaseModel):
    response: str
    service_used: str
    status: str = "success"