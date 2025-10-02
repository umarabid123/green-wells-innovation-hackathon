"""
Traffic Service for managing Pakistani cities traffic data and route suggestions
"""

from typing import List, Dict, Any
import asyncio
from models.traffic_models import TrafficData, TrafficLevel, RouteData, HighwayData

class TrafficService:
    def __init__(self):
        # Pakistani cities traffic data
        self.cities_data = [
            {
                "city": "Lahore",
                "lat": 31.582045,
                "lon": 74.329376,
                "traffic_level": TrafficLevel.HEAVY,
                "color": "red",
                "info": "Cultural capital - Heavy traffic during peak hours (7-9 AM, 5-8 PM)",
                "peak_hours": ["07:00-09:30", "17:00-19:30"],
                "alternative_routes": ["Ring Road", "Canal Road", "Jail Road"]
            },
            {
                "city": "Karachi",
                "lat": 24.8607,
                "lon": 67.0011,
                "traffic_level": TrafficLevel.VERY_HEAVY,
                "color": "darkred",
                "info": "Economic hub - Severe congestion on main arteries",
                "peak_hours": ["07:00-10:00", "16:30-20:00"],
                "alternative_routes": ["Lyari Expressway", "Northern Bypass", "Korangi Road"]
            },
            {
                "city": "Islamabad",
                "lat": 33.6844,
                "lon": 73.0479,
                "traffic_level": TrafficLevel.MODERATE,
                "color": "green",
                "info": "Capital city - Well-planned roads, moderate traffic",
                "peak_hours": ["08:00-09:30", "17:30-19:00"],
                "alternative_routes": ["Margalla Road", "Kashmir Highway", "Expressway"]
            },
            {
                "city": "Rawalpindi",
                "lat": 33.5651,
                "lon": 73.0169,
                "traffic_level": TrafficLevel.HEAVY,
                "color": "orange",
                "info": "Twin city - Connected to Islamabad, busy commercial area",
                "peak_hours": ["07:30-09:30", "16:30-19:00"],
                "alternative_routes": ["GT Road", "Murree Road", "Committee Chowk Road"]
            },
            {
                "city": "Faisalabad",
                "lat": 31.4187,
                "lon": 73.0790,
                "traffic_level": TrafficLevel.MODERATE,
                "color": "blue",
                "info": "Industrial city - Traffic concentrated in textile areas",
                "peak_hours": ["07:00-09:00", "17:00-19:00"],
                "alternative_routes": ["Sargodha Road", "Sheikhupura Road", "Circular Road"]
            },
            {
                "city": "Peshawar",
                "lat": 34.0151,
                "lon": 71.5249,
                "traffic_level": TrafficLevel.MODERATE,
                "color": "purple",
                "info": "Historic city - Congestion in old city areas",
                "peak_hours": ["07:30-09:00", "16:30-18:30"],
                "alternative_routes": ["GT Road", "Ring Road", "University Road"]
            },
            {
                "city": "Multan",
                "lat": 30.1575,
                "lon": 71.5249,
                "traffic_level": TrafficLevel.LIGHT,
                "color": "cadetblue",
                "info": "City of Saints - Manageable traffic flow",
                "peak_hours": ["07:00-08:30", "17:30-18:30"],
                "alternative_routes": ["Bosan Road", "Northern Bypass", "Southern Bypass"]
            }
        ]
        
        # Major highways data
        self.highways_data = [
            {
                "name": "Motorway M-1",
                "route_code": "M-1",
                "start_city": "Islamabad",
                "end_city": "Peshawar",
                "total_distance": "155 km",
                "traffic_level": TrafficLevel.LIGHT,
                "toll_required": True,
                "waypoints": [
                    {"lat": 33.6844, "lon": 73.0479},  # Islamabad
                    {"lat": 34.0151, "lon": 71.5249}   # Peshawar
                ],
                "current_conditions": "Clear - Good driving conditions"
            },
            {
                "name": "Motorway M-2",
                "route_code": "M-2",
                "start_city": "Islamabad",
                "end_city": "Lahore",
                "total_distance": "367 km",
                "traffic_level": TrafficLevel.MODERATE,
                "toll_required": True,
                "waypoints": [
                    {"lat": 33.6844, "lon": 73.0479},  # Islamabad
                    {"lat": 31.582045, "lon": 74.329376}  # Lahore
                ],
                "current_conditions": "Moderate traffic - Expected travel time 3.5 hours"
            },
            {
                "name": "Grand Trunk Road",
                "route_code": "GT Road",
                "start_city": "Karachi",
                "end_city": "Peshawar",
                "total_distance": "1800 km",
                "traffic_level": TrafficLevel.HEAVY,
                "toll_required": False,
                "waypoints": [
                    {"lat": 24.8607, "lon": 67.0011},   # Karachi
                    {"lat": 30.1575, "lon": 71.5249},   # Multan
                    {"lat": 31.582045, "lon": 74.329376}, # Lahore
                    {"lat": 33.6844, "lon": 73.0479},   # Islamabad
                    {"lat": 34.0151, "lon": 71.5249}    # Peshawar
                ],
                "current_conditions": "Heavy traffic expected - Consider motorways for faster travel"
            }
        ]
    
    async def get_cities_traffic_data(self) -> List[TrafficData]:
        """Get traffic data for all major Pakistani cities"""
        return [TrafficData(**city) for city in self.cities_data]
    
    async def get_route_suggestions(
        self, 
        from_city: str, 
        to_city: str, 
        avoid_congestion: bool = True
    ) -> Dict[str, Any]:
        """Get route suggestions between cities"""
        
        # Find cities in our data
        from_city_data = next((city for city in self.cities_data if city["city"].lower() == from_city.lower()), None)
        to_city_data = next((city for city in self.cities_data if city["city"].lower() == to_city.lower()), None)
        
        if not from_city_data or not to_city_data:
            return {
                "error": f"City data not found for {from_city} or {to_city}",
                "available_cities": [city["city"] for city in self.cities_data]
            }
        
        # Generate route based on common Pakistani routes
        routes = await self._generate_routes(from_city, to_city, avoid_congestion)
        
        return {
            "from_city": from_city,
            "to_city": to_city,
            "routes": routes,
            "recommendations": await self._get_route_recommendations(from_city, to_city)
        }
    
    async def get_highway_data(self) -> List[HighwayData]:
        """Get major highway information for Pakistan"""
        return [HighwayData(**highway) for highway in self.highways_data]
    
    async def _generate_routes(
        self, 
        from_city: str, 
        to_city: str, 
        avoid_congestion: bool
    ) -> List[Dict[str, Any]]:
        """Generate possible routes between cities"""
        
        routes = []
        
        # Define common routes between major cities
        route_map = {
            ("lahore", "islamabad"): [
                {
                    "route_type": "motorway",
                    "name": "M-2 Motorway",
                    "distance": "367 km",
                    "duration": "3.5 hours",
                    "traffic_level": TrafficLevel.MODERATE,
                    "toll_cost": "Rs. 890",
                    "recommended": True
                },
                {
                    "route_type": "highway",
                    "name": "Grand Trunk Road",
                    "distance": "375 km",
                    "duration": "5-6 hours",
                    "traffic_level": TrafficLevel.HEAVY,
                    "toll_cost": "Free",
                    "recommended": False
                }
            ],
            ("islamabad", "peshawar"): [
                {
                    "route_type": "motorway",
                    "name": "M-1 Motorway",
                    "distance": "155 km",
                    "duration": "2 hours",
                    "traffic_level": TrafficLevel.LIGHT,
                    "toll_cost": "Rs. 420",
                    "recommended": True
                }
            ],
            ("karachi", "lahore"): [
                {
                    "route_type": "motorway",
                    "name": "National Highway + M-2",
                    "distance": "1200 km",
                    "duration": "18-20 hours",
                    "traffic_level": TrafficLevel.MODERATE,
                    "toll_cost": "Rs. 2500",
                    "recommended": True
                }
            ]
        }
        
        # Get routes for the city pair
        key1 = (from_city.lower(), to_city.lower())
        key2 = (to_city.lower(), from_city.lower())
        
        if key1 in route_map:
            routes = route_map[key1]
        elif key2 in route_map:
            # Reverse the route
            routes = route_map[key2]
        else:
            # Generate a generic route
            routes = [
                {
                    "route_type": "highway",
                    "name": f"{from_city} to {to_city} via National Highway",
                    "distance": "Estimated",
                    "duration": "Variable",
                    "traffic_level": TrafficLevel.MODERATE,
                    "toll_cost": "Variable",
                    "recommended": True
                }
            ]
        
        # Filter based on congestion preference
        if avoid_congestion:
            routes = [route for route in routes if route["traffic_level"] != TrafficLevel.VERY_HEAVY]
        
        return routes
    
    async def _get_route_recommendations(self, from_city: str, to_city: str) -> Dict[str, Any]:
        """Get recommendations for the route"""
        
        return {
            "best_time_to_travel": "Early morning (5-7 AM) or late evening (9-11 PM)",
            "avoid_times": [
                "7-9 AM (Morning rush)",
                "5-7 PM (Evening rush)",
                "12-2 PM Friday (Jumma prayers)"
            ],
            "weather_considerations": [
                "Check weather during monsoon season (July-September)",
                "Fog possible in winter months (December-February)",
                "Avoid travel during dust storms"
            ],
            "safety_tips": [
                "Keep fuel tank at least half full",
                "Carry emergency kit and first aid",
                "Have emergency contact numbers",
                "Follow speed limits",
                "Take breaks every 2 hours"
            ],
            "estimated_fuel_cost": "Calculate based on current petrol/diesel prices",
            "alternative_transport": [
                "Daewoo Bus Service",
                "Pakistan Railways",
                "Domestic flights for long distances"
            ]
        }