// TomTom API service for real-time traffic data
// Frontend integration for TrafficWise AI

interface TomTomConfig {
  apiKey: string;
  baseUrl: string;
}

interface Coordinates {
  lat: number;
  lon: number;
}

interface TrafficFlowData {
  city: string;
  coordinates: Coordinates;
  timestamp: string;
  current_speed: number;
  free_flow_speed: number;
  current_travel_time: number;
  free_flow_travel_time: number;
  confidence: number;
  road_closure: boolean;
  traffic_level: 'light' | 'moderate' | 'heavy' | 'unknown';
  traffic_color: string;
}

interface TrafficIncident {
  id: string;
  type: number;
  description: string;
  coordinates: Coordinates;
  start_time: string;
  end_time: string;
  delay: number;
  length: number;
  severity: 'info' | 'minor' | 'moderate' | 'major';
}

interface TrafficIncidentsData {
  city: string;
  total_incidents: number;
  incidents: TrafficIncident[];
}

interface RouteData {
  origin: string;
  destination: string;
  routes: Array<{
    summary: {
      distance: number;
      travel_time: number;
      traffic_delay: number;
      departure_time: string;
      arrival_time: string;
    };
    legs: Array<{
      distance: number;
      travel_time: number;
      traffic_delay: number;
    }>;
  }>;
}

interface Place {
  id: string;
  name: string;
  category: string;
  address: string;
  coordinates: Coordinates;
  distance: number;
  phone: string;
  url: string;
}

interface PlaceSearchData {
  query: string;
  city: string;
  total_results: number;
  places: Place[];
}

interface TrafficDashboard {
  city: string;
  timestamp: string;
  traffic_flow: TrafficFlowData | null;
  incidents: TrafficIncidentsData | null;
  summary: {
    overall_status: 'good' | 'moderate' | 'congested' | 'unknown';
    total_incidents: number;
    avg_speed: number;
    traffic_level: string;
  };
}

export class TomTomService {
  private config: TomTomConfig;
  private backendUrl: string;

  constructor() {
    this.config = {
      apiKey: process.env.NEXT_PUBLIC_TOMTOM_API_KEY || '',
      baseUrl: 'https://api.tomtom.com'
    };
    this.backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
  }

  /**
   * Get supported Pakistani cities
   */
  async getSupportedCities(): Promise<string[]> {
    try {
      const response = await fetch(`${this.backendUrl}/api/traffic/cities`);
      const data = await response.json();
      
      if (data.success) {
        return data.data.cities;
      }
      throw new Error(data.error || 'Failed to fetch cities');
    } catch (error) {
      console.error('Error fetching supported cities:', error);
      // Fallback to hardcoded cities if backend is unavailable
      return [
        'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad',
        'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala',
        'Hyderabad', 'Bahawalpur', 'Sargodha', 'Sukkur', 'Larkana'
      ];
    }
  }

  /**
   * Get real-time traffic flow data for a city
   */
  async getTrafficFlow(city: string): Promise<TrafficFlowData> {
    try {
      const response = await fetch(`${this.backendUrl}/api/traffic/flow/${encodeURIComponent(city)}`);
      const data = await response.json();
      
      if (data.success) {
        return data.data;
      }
      throw new Error(data.error || 'Failed to fetch traffic flow data');
    } catch (error) {
      console.error(`Error fetching traffic flow for ${city}:`, error);
      throw error;
    }
  }

  /**
   * Get traffic incidents for a city
   */
  async getTrafficIncidents(city: string): Promise<TrafficIncidentsData> {
    try {
      const response = await fetch(`${this.backendUrl}/api/traffic/incidents/${encodeURIComponent(city)}`);
      const data = await response.json();
      
      if (data.success) {
        return data.data;
      }
      throw new Error(data.error || 'Failed to fetch traffic incidents');
    } catch (error) {
      console.error(`Error fetching traffic incidents for ${city}:`, error);
      throw error;
    }
  }

  /**
   * Get route with traffic information
   */
  async getRouteWithTraffic(origin: string, destination: string): Promise<RouteData> {
    try {
      const params = new URLSearchParams({
        origin,
        destination
      });
      
      const response = await fetch(`${this.backendUrl}/api/traffic/route?${params}`);
      const data = await response.json();
      
      if (data.success) {
        return data.data;
      }
      throw new Error(data.error || 'Failed to fetch route data');
    } catch (error) {
      console.error(`Error fetching route from ${origin} to ${destination}:`, error);
      throw error;
    }
  }

  /**
   * Search for places in a city
   */
  async searchPlaces(query: string, city: string): Promise<PlaceSearchData> {
    try {
      const params = new URLSearchParams({
        query,
        city
      });
      
      const response = await fetch(`${this.backendUrl}/api/traffic/search?${params}`);
      const data = await response.json();
      
      if (data.success) {
        return data.data;
      }
      throw new Error(data.error || 'Failed to search places');
    } catch (error) {
      console.error(`Error searching for '${query}' in ${city}:`, error);
      throw error;
    }
  }

  /**
   * Get comprehensive traffic dashboard for a city
   */
  async getTrafficDashboard(city: string): Promise<TrafficDashboard> {
    try {
      const response = await fetch(`${this.backendUrl}/api/traffic/dashboard/${encodeURIComponent(city)}`);
      const data = await response.json();
      
      if (data.success) {
        return data.data;
      }
      throw new Error(data.error || 'Failed to fetch traffic dashboard');
    } catch (error) {
      console.error(`Error fetching traffic dashboard for ${city}:`, error);
      throw error;
    }
  }

  /**
   * Format travel time from seconds to human readable format
   */
  formatTravelTime(seconds: number): string {
    if (seconds < 60) {
      return `${Math.round(seconds)}s`;
    }
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes < 60) {
      return remainingSeconds > 0 ? `${minutes}m ${Math.round(remainingSeconds)}s` : `${minutes}m`;
    }
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  }

  /**
   * Format distance from meters to human readable format
   */
  formatDistance(meters: number): string {
    if (meters < 1000) {
      return `${Math.round(meters)}m`;
    }
    
    const kilometers = meters / 1000;
    return kilometers < 10 
      ? `${kilometers.toFixed(1)}km` 
      : `${Math.round(kilometers)}km`;
  }

  /**
   * Get traffic level color
   */
  getTrafficLevelColor(level: string): string {
    const colors = {
      light: '#22c55e',      // Green
      moderate: '#eab308',   // Yellow
      heavy: '#ef4444',      // Red
      unknown: '#6b7280'     // Gray
    };
    return colors[level as keyof typeof colors] || colors.unknown;
  }

  /**
   * Get incident severity color
   */
  getIncidentSeverityColor(severity: string): string {
    const colors = {
      info: '#3b82f6',       // Blue
      minor: '#eab308',      // Yellow
      moderate: '#f97316',   // Orange
      major: '#ef4444'       // Red
    };
    return colors[severity as keyof typeof colors] || colors.info;
  }

  /**
   * Check if API is configured
   */
  isConfigured(): boolean {
    return Boolean(this.config.apiKey && this.backendUrl);
  }

  /**
   * Get configuration status
   */
  getConfigStatus(): { 
    configured: boolean; 
    hasApiKey: boolean; 
    hasBackendUrl: boolean; 
  } {
    return {
      configured: this.isConfigured(),
      hasApiKey: Boolean(this.config.apiKey),
      hasBackendUrl: Boolean(this.backendUrl)
    };
  }
}

// Export singleton instance
export const tomtomService = new TomTomService();

// Export types for use in components
export type {
  TrafficFlowData,
  TrafficIncident,
  TrafficIncidentsData,
  RouteData,
  Place,
  PlaceSearchData,
  TrafficDashboard,
  Coordinates
};