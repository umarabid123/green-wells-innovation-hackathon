// TypeScript types for the TrafficWise AI application

export type AIServiceType = 'google_gemini' | 'openai' | 'local_rag' | 'offline';

export type TrafficLevel = 'Light' | 'Moderate' | 'Heavy' | 'Very Heavy';

export interface AIConfig {
  service_type: AIServiceType;
  model?: string;
  temperature?: number;
  max_tokens?: number;
  api_key?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  service_used?: string;
}

export interface ChatRequest {
  message: string;
  service_type: AIServiceType;
  api_key?: string;
  config?: AIConfig;
}

export interface ChatResponse {
  response: string;
  service_used: string;
  status: string;
}

export interface TrafficData {
  city: string;
  lat: number;
  lon: number;
  traffic_level: TrafficLevel;
  color: string;
  info: string;
  peak_hours?: string[];
  alternative_routes?: string[];
}

export interface RouteRequest {
  from_city: string;
  to_city: string;
  avoid_congestion?: boolean;
  departure_time?: string;
}

export interface RouteData {
  from_city: string;
  to_city: string;
  distance: string;
  duration: string;
  route_type: string;
  traffic_level: TrafficLevel;
  waypoints: Array<{ lat: number; lon: number }>;
  alternative_routes?: Array<{
    route_type: string;
    name: string;
    distance: string;
    duration: string;
    traffic_level: TrafficLevel;
    toll_cost: string;
    recommended: boolean;
  }>;
}

export interface HighwayData {
  name: string;
  route_code: string;
  start_city: string;
  end_city: string;
  total_distance: string;
  traffic_level: TrafficLevel;
  toll_required: boolean;
  waypoints: Array<{ lat: number; lon: number }>;
  current_conditions?: string;
}

export interface APIError {
  detail: string;
  status_code?: number;
}

export interface AppState {
  currentAIService: AIServiceType;
  apiKey: string;
  model: string;
  temperature: number;
  showMap: boolean;
  chatHistory: ChatMessage[];
  trafficData: TrafficData[];
  isLoading: boolean;
  error: string | null;
}
