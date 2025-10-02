// API service for communicating with FastAPI backend

import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { 
  ChatRequest, 
  ChatResponse, 
  TrafficData, 
  RouteRequest, 
  RouteData, 
  HighwayData,
  AIConfig,
  APIError 
} from '@/types';

class APIService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`API Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error('API Response Error:', error.response?.data || error.message);
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private handleError(error: any): APIError {
    if (error.response) {
      // Server responded with error status
      return {
        detail: error.response.data?.detail || error.response.statusText,
        status_code: error.response.status,
      };
    } else if (error.request) {
      // Request was made but no response received
      return {
        detail: 'No response from server. Please check if the backend is running.',
        status_code: 0,
      };
    } else {
      // Something else happened
      return {
        detail: error.message || 'An unexpected error occurred',
      };
    }
  }

  // Health check
  async healthCheck(): Promise<{ status: string; services: any }> {
    const response = await this.api.get('/health');
    return response.data;
  }

  // Chat with AI
  async chatWithAI(request: ChatRequest): Promise<ChatResponse> {
    const response = await this.api.post('/chat', request);
    return response.data;
  }

  // Get cities traffic data
  async getCitiesTraffic(): Promise<TrafficData[]> {
    const response = await this.api.get('/traffic/cities');
    return response.data;
  }

  // Get route suggestions
  async getRouteSuggestions(request: RouteRequest): Promise<any> {
    const response = await this.api.post('/traffic/route', request);
    return response.data;
  }

  // Get highway data
  async getHighwayData(): Promise<HighwayData[]> {
    const response = await this.api.get('/traffic/highways');
    return response.data;
  }

  // Save AI configuration
  async saveAIConfig(config: AIConfig): Promise<{ status: string; message: string }> {
    const response = await this.api.post('/config/ai', config);
    return response.data;
  }

  // Get AI configuration
  async getAIConfig(): Promise<AIConfig> {
    const response = await this.api.get('/config/ai');
    return response.data;
  }
}

// Create singleton instance
const apiService = new APIService();

export default apiService;