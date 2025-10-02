import os
import httpx
import asyncio
from typing import Optional, Dict, List, Any
from fastapi import HTTPException
import logging

logger = logging.getLogger(__name__)

class TomTomService:
    def __init__(self):
        self.api_key = os.getenv("TOMTOM_API_KEY")
        if not self.api_key:
            raise ValueError("TomTom API key not found in environment variables")
        
        self.base_url = "https://api.tomtom.com"
        self.timeout = 30.0
        
        # Pakistan major cities coordinates
        self.pakistan_cities = {
            "karachi": {"lat": 24.8607, "lon": 67.0011, "zoom": 11},
            "lahore": {"lat": 31.5204, "lon": 74.3587, "zoom": 11},
            "islamabad": {"lat": 33.6844, "lon": 73.0479, "zoom": 11},
            "rawalpindi": {"lat": 33.5651, "lon": 73.0169, "zoom": 12},
            "faisalabad": {"lat": 31.4504, "lon": 73.1350, "zoom": 11},
            "multan": {"lat": 30.1575, "lon": 71.5249, "zoom": 11},
            "peshawar": {"lat": 34.0151, "lon": 71.5249, "zoom": 11},
            "quetta": {"lat": 30.1798, "lon": 66.9750, "zoom": 11},
            "sialkot": {"lat": 32.4945, "lon": 74.5229, "zoom": 12},
            "gujranwala": {"lat": 32.1877, "lon": 74.1945, "zoom": 12},
            "hyderabad": {"lat": 25.3960, "lon": 68.3578, "zoom": 11},
            "bahawalpur": {"lat": 29.4000, "lon": 71.6833, "zoom": 11},
            "sargodha": {"lat": 32.0836, "lon": 72.6711, "zoom": 11},
            "sukkur": {"lat": 27.7058, "lon": 68.8574, "zoom": 11},
            "larkana": {"lat": 27.5590, "lon": 68.2120, "zoom": 11}
        }

    async def get_traffic_flow(self, city: str) -> Dict[str, Any]:
        """Get traffic flow data for a Pakistani city"""
        try:
            city_lower = city.lower()
            if city_lower not in self.pakistan_cities:
                raise HTTPException(status_code=404, message=f"City {city} not supported")
            
            coords = self.pakistan_cities[city_lower]
            
            # TomTom Traffic Flow API
            url = f"{self.base_url}/traffic/services/4/flowSegmentData/absolute/10/json"
            params = {
                "key": self.api_key,
                "point": f"{coords['lat']},{coords['lon']}",
                "unit": "KMPH"
            }
            
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.get(url, params=params)
                
                if response.status_code == 200:
                    data = response.json()
                    
                    # Process and format the traffic data
                    traffic_info = {
                        "city": city.title(),
                        "coordinates": coords,
                        "timestamp": data.get("flowSegmentData", {}).get("@capture", ""),
                        "current_speed": data.get("flowSegmentData", {}).get("currentSpeed", 0),
                        "free_flow_speed": data.get("flowSegmentData", {}).get("freeFlowSpeed", 0),
                        "current_travel_time": data.get("flowSegmentData", {}).get("currentTravelTime", 0),
                        "free_flow_travel_time": data.get("flowSegmentData", {}).get("freeFlowTravelTime", 0),
                        "confidence": data.get("flowSegmentData", {}).get("confidence", 0),
                        "road_closure": data.get("flowSegmentData", {}).get("roadClosure", False)
                    }
                    
                    # Calculate traffic level
                    if traffic_info["current_speed"] > 0 and traffic_info["free_flow_speed"] > 0:
                        speed_ratio = traffic_info["current_speed"] / traffic_info["free_flow_speed"]
                        if speed_ratio > 0.8:
                            traffic_info["traffic_level"] = "light"
                            traffic_info["traffic_color"] = "#22c55e"  # Green
                        elif speed_ratio > 0.5:
                            traffic_info["traffic_level"] = "moderate" 
                            traffic_info["traffic_color"] = "#eab308"  # Yellow
                        else:
                            traffic_info["traffic_level"] = "heavy"
                            traffic_info["traffic_color"] = "#ef4444"  # Red
                    else:
                        traffic_info["traffic_level"] = "unknown"
                        traffic_info["traffic_color"] = "#6b7280"  # Gray
                    
                    return {
                        "success": True,
                        "data": traffic_info
                    }
                else:
                    return {
                        "success": False,
                        "error": f"TomTom API error: {response.status_code}",
                        "message": response.text
                    }
                    
        except Exception as e:
            logger.error(f"Error getting traffic flow for {city}: {str(e)}")
            return {
                "success": False,
                "error": "Internal server error",
                "message": str(e)
            }

    async def get_traffic_incidents(self, city: str) -> Dict[str, Any]:
        """Get traffic incidents for a Pakistani city"""
        try:
            city_lower = city.lower()
            if city_lower not in self.pakistan_cities:
                raise HTTPException(status_code=404, message=f"City {city} not supported")
            
            coords = self.pakistan_cities[city_lower]
            
            # Create bounding box around city (approximately 20km radius)
            lat_offset = 0.18  # ~20km
            lon_offset = 0.18  # ~20km
            
            bbox = f"{coords['lon'] - lon_offset},{coords['lat'] - lat_offset},{coords['lon'] + lon_offset},{coords['lat'] + lat_offset}"
            
            # TomTom Traffic Incidents API
            url = f"{self.base_url}/traffic/services/5/incidentDetails/s3/{bbox}/10/-1/json"
            params = {
                "key": self.api_key,
                "language": "en-US",
                "categoryFilter": "0,1,2,3,4,5,6,7,8,9,10,11"  # All incident types
            }
            
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.get(url, params=params)
                
                if response.status_code == 200:
                    data = response.json()
                    incidents = []
                    
                    for incident in data.get("incidents", []):
                        incident_info = {
                            "id": incident.get("id", ""),
                            "type": incident.get("iconCategory", 0),
                            "description": incident.get("description", ""),
                            "coordinates": {
                                "lat": incident.get("geometry", {}).get("coordinates", [0, 0])[1],
                                "lon": incident.get("geometry", {}).get("coordinates", [0, 0])[0]
                            },
                            "start_time": incident.get("startTime", ""),
                            "end_time": incident.get("endTime", ""),
                            "delay": incident.get("delay", 0),
                            "length": incident.get("length", 0),
                            "severity": self._get_incident_severity(incident.get("iconCategory", 0))
                        }
                        incidents.append(incident_info)
                    
                    return {
                        "success": True,
                        "data": {
                            "city": city.title(),
                            "total_incidents": len(incidents),
                            "incidents": incidents
                        }
                    }
                else:
                    return {
                        "success": False,
                        "error": f"TomTom API error: {response.status_code}",
                        "message": response.text
                    }
                    
        except Exception as e:
            logger.error(f"Error getting traffic incidents for {city}: {str(e)}")
            return {
                "success": False,
                "error": "Internal server error", 
                "message": str(e)
            }

    async def get_route_traffic(self, origin: str, destination: str) -> Dict[str, Any]:
        """Get route with traffic information between two points in Pakistan"""
        try:
            # TomTom Routing API with traffic
            url = f"{self.base_url}/routing/1/calculateRoute/{origin}:{destination}/json"
            params = {
                "key": self.api_key,
                "traffic": "true",
                "routeType": "fastest",
                "travelMode": "car",
                "departure": "now",
                "computeTravelTimeFor": "all"
            }
            
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.get(url, params=params)
                
                if response.status_code == 200:
                    data = response.json()
                    routes = []
                    
                    for route in data.get("routes", []):
                        route_info = {
                            "summary": {
                                "distance": route.get("summary", {}).get("lengthInMeters", 0),
                                "travel_time": route.get("summary", {}).get("travelTimeInSeconds", 0),
                                "traffic_delay": route.get("summary", {}).get("trafficDelayInSeconds", 0),
                                "departure_time": route.get("summary", {}).get("departureTime", ""),
                                "arrival_time": route.get("summary", {}).get("arrivalTime", "")
                            },
                            "legs": []
                        }
                        
                        for leg in route.get("legs", []):
                            leg_info = {
                                "distance": leg.get("summary", {}).get("lengthInMeters", 0),
                                "travel_time": leg.get("summary", {}).get("travelTimeInSeconds", 0),
                                "traffic_delay": leg.get("summary", {}).get("trafficDelayInSeconds", 0)
                            }
                            route_info["legs"].append(leg_info)
                        
                        routes.append(route_info)
                    
                    return {
                        "success": True,
                        "data": {
                            "origin": origin,
                            "destination": destination,
                            "routes": routes
                        }
                    }
                else:
                    return {
                        "success": False,
                        "error": f"TomTom API error: {response.status_code}",
                        "message": response.text
                    }
                    
        except Exception as e:
            logger.error(f"Error getting route traffic from {origin} to {destination}: {str(e)}")
            return {
                "success": False,
                "error": "Internal server error",
                "message": str(e)
            }

    async def search_places(self, query: str, city: str) -> Dict[str, Any]:
        """Search for places in Pakistani cities"""
        try:
            city_lower = city.lower()
            if city_lower not in self.pakistan_cities:
                raise HTTPException(status_code=404, message=f"City {city} not supported")
            
            coords = self.pakistan_cities[city_lower]
            
            # TomTom Search API
            url = f"{self.base_url}/search/2/search/{query}.json"
            params = {
                "key": self.api_key,
                "lat": coords["lat"],
                "lon": coords["lon"],
                "radius": 20000,  # 20km radius
                "limit": 20,
                "countrySet": "PK",  # Pakistan only
                "language": "en-US"
            }
            
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.get(url, params=params)
                
                if response.status_code == 200:
                    data = response.json()
                    places = []
                    
                    for result in data.get("results", []):
                        place_info = {
                            "id": result.get("id", ""),
                            "name": result.get("poi", {}).get("name", ""),
                            "category": result.get("poi", {}).get("categories", [""])[0] if result.get("poi", {}).get("categories") else "",
                            "address": result.get("address", {}).get("freeformAddress", ""),
                            "coordinates": {
                                "lat": result.get("position", {}).get("lat", 0),
                                "lon": result.get("position", {}).get("lon", 0)
                            },
                            "distance": result.get("dist", 0),
                            "phone": result.get("poi", {}).get("phone", ""),
                            "url": result.get("poi", {}).get("url", "")
                        }
                        places.append(place_info)
                    
                    return {
                        "success": True,
                        "data": {
                            "query": query,
                            "city": city.title(),
                            "total_results": len(places),
                            "places": places
                        }
                    }
                else:
                    return {
                        "success": False,
                        "error": f"TomTom API error: {response.status_code}",
                        "message": response.text
                    }
                    
        except Exception as e:
            logger.error(f"Error searching places for '{query}' in {city}: {str(e)}")
            return {
                "success": False,
                "error": "Internal server error",
                "message": str(e)
            }

    def _get_incident_severity(self, icon_category: int) -> str:
        """Map TomTom incident categories to severity levels"""
        severity_map = {
            0: "info",      # Traffic info
            1: "minor",     # Accident  
            2: "moderate",  # Fog
            3: "major",     # Dangerous conditions
            4: "minor",     # Rain
            5: "minor",     # Ice
            6: "major",     # Jam
            7: "moderate",  # Lane closed
            8: "major",     # Road closed
            9: "moderate",  # Road works
            10: "minor",    # Wind
            11: "info"      # Other
        }
        return severity_map.get(icon_category, "info")

    def get_supported_cities(self) -> List[str]:
        """Get list of supported Pakistani cities"""
        return [city.title() for city in self.pakistan_cities.keys()]

# Initialize service
tomtom_service = TomTomService()