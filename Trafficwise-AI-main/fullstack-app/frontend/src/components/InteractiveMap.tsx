'use client';

import { useState, useEffect, useRef } from 'react';
import { tomtomService, TrafficFlowData, TrafficIncident } from '@/services/tomtom';
import { toast } from 'react-hot-toast';

interface InteractiveMapProps {
  selectedCity: string;
  trafficLayer: boolean;
  routeLayer: boolean;
  showRealTimeData?: boolean;
  onCitySelect?: (city: string) => void;
}

interface CityData {
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  realTimeData?: TrafficFlowData;
  incidents?: TrafficIncident[];
}

// Pakistan major cities coordinates
const CITY_COORDINATES = {
  'Karachi': { lat: 24.8607, lng: 67.0011 },
  'Lahore': { lat: 31.5204, lng: 74.3587 },
  'Islamabad': { lat: 33.6844, lng: 73.0479 },
  'Rawalpindi': { lat: 33.5651, lng: 73.0169 },
  'Faisalabad': { lat: 31.4504, lng: 73.1350 },
  'Multan': { lat: 30.1575, lng: 71.5249 },
  'Peshawar': { lat: 34.0151, lng: 71.5249 },
  'Quetta': { lat: 30.1798, lng: 66.9750 },
  'Sialkot': { lat: 32.4945, lng: 74.5229 },
  'Gujranwala': { lat: 32.1877, lng: 74.1945 },
  'Hyderabad': { lat: 25.3960, lng: 68.3578 },
  'Bahawalpur': { lat: 29.4000, lng: 71.6833 },
  'Sargodha': { lat: 32.0836, lng: 72.6711 },
  'Sukkur': { lat: 27.7058, lng: 68.8574 },
  'Larkana': { lat: 27.5590, lng: 68.2120 }
};

export default function InteractiveMap({ 
  selectedCity, 
  trafficLayer, 
  routeLayer, 
  showRealTimeData = false,
  onCitySelect 
}: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [citiesData, setCitiesData] = useState<CityData[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  // Initialize cities data
  useEffect(() => {
    const initialCities: CityData[] = Object.entries(CITY_COORDINATES).map(([name, coordinates]) => ({
      name,
      coordinates
    }));
    setCitiesData(initialCities);
  }, []);

  // Load real-time traffic data
  const loadRealTimeData = async () => {
    if (!showRealTimeData || loading) return;
    
    setLoading(true);
    try {
      const updatedCities = await Promise.all(
        citiesData.map(async (city) => {
          try {
            const [trafficData, incidentsData] = await Promise.all([
              tomtomService.getTrafficFlow(city.name),
              tomtomService.getTrafficIncidents(city.name)
            ]);
            
            return {
              ...city,
              realTimeData: trafficData,
              incidents: incidentsData.incidents
            };
          } catch (error) {
            console.warn(`Failed to load data for ${city.name}:`, error);
            return city;
          }
        })
      );
      
      setCitiesData(updatedCities);
      setLastUpdate(new Date());
      
    } catch (error) {
      console.error('Error loading real-time data:', error);
      toast.error('Failed to load real-time traffic data');
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh real-time data
  useEffect(() => {
    if (showRealTimeData && citiesData.length > 0) {
      loadRealTimeData();
      
      // Refresh data every 5 minutes
      const interval = setInterval(loadRealTimeData, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [showRealTimeData, citiesData.length]);

  // Mock traffic data for demonstration (fallback)
  const generateTrafficData = (city: string) => {
    const cityData = citiesData.find(c => c.name === city);
    
    if (cityData?.realTimeData) {
      return [
        { 
          area: 'City Center', 
          traffic: cityData.realTimeData.traffic_level,
          color: cityData.realTimeData.traffic_color,
          speed: cityData.realTimeData.current_speed
        },
        { 
          area: 'Highway', 
          traffic: 'Moderate', 
          color: '#eab308',
          speed: 65
        },
        { 
          area: 'Commercial District', 
          traffic: 'Heavy', 
          color: '#ef4444',
          speed: 25
        },
        { 
          area: 'Residential Area', 
          traffic: 'Light', 
          color: '#22c55e',
          speed: 45
        },
      ];
    }

    // Fallback mock data
    return [
      { area: 'Main Road', traffic: 'Heavy', color: '#ef4444', speed: 20 },
      { area: 'Commercial District', traffic: 'Moderate', color: '#eab308', speed: 35 },
      { area: 'Residential Area', traffic: 'Light', color: '#22c55e', speed: 50 },
      { area: 'Highway', traffic: 'Moderate', color: '#eab308', speed: 60 },
    ];
  };

  // Initialize map using dynamic import to avoid SSR issues
  useEffect(() => {
    if (!mapRef.current || typeof window === 'undefined') return;

    const initializeMap = async () => {
      try {
        // Dynamic import to avoid SSR issues
        const L = (await import('leaflet')).default;

        // Fix default icon issue
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        // Initialize the map with null check
        if (!mapRef.current) return;
        const map = L.map(mapRef.current).setView([30.3753, 69.3451], 6);

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add city markers
        citiesData.forEach(city => {
          const marker = L.marker([city.coordinates.lat, city.coordinates.lng]).addTo(map);
          
          let popupContent = `
            <div style="font-family: system-ui; padding: 4px;">
              <h3 style="margin: 0 0 4px 0; font-size: 16px;">${city.name}</h3>
              <p style="margin: 0; font-size: 12px; color: #666;">
                📍 ${city.coordinates.lat.toFixed(4)}, ${city.coordinates.lng.toFixed(4)}
              </p>
          `;

          if (city.realTimeData) {
            popupContent += `
              <p style="margin: 4px 0 0 0; font-size: 12px;">
                🚗 Speed: ${city.realTimeData.current_speed} km/h<br>
                🚦 Traffic: ${city.realTimeData.traffic_level}
              </p>
            `;
          }

          popupContent += `</div>`;
          marker.bindPopup(popupContent);

          marker.on('click', () => {
            onCitySelect?.(city.name);
          });
        });

        setMapInstance(map);
        setIsMapLoaded(true);

      } catch (error) {
        console.error('Error initializing map:', error);
        // Fallback to simple initialization
        setIsMapLoaded(true);
      }
    };

    const timer = setTimeout(initializeMap, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Update map when city changes
  useEffect(() => {
    if (mapInstance && selectedCity) {
      const coords = CITY_COORDINATES[selectedCity as keyof typeof CITY_COORDINATES];
      if (coords) {
        // Update map center
        // mapInstance.setCenter(coords);
        console.log(`Centering map on ${selectedCity}:`, coords);
      }
    }
  }, [mapInstance, selectedCity]);

  const trafficData = generateTrafficData(selectedCity);
  const cityCoords = CITY_COORDINATES[selectedCity as keyof typeof CITY_COORDINATES];

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50 dark:from-slate-700 dark:to-slate-800 rounded-2xl overflow-hidden">
      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full relative">
        {!isMapLoaded ? (
          /* Loading State */
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-slate-600 dark:text-slate-300">Loading Pakistan Map...</p>
            </div>
          </div>
        ) : (
          /* Map Content */
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="text-6xl mb-4">🇵🇰</div>
              <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-2">
                {selectedCity} Traffic Map
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Coordinates: {cityCoords?.lat.toFixed(4)}, {cityCoords?.lng.toFixed(4)}
              </p>
              
              {/* Mock Traffic Visualization */}
              <div className="bg-white dark:bg-slate-700 rounded-lg p-4 shadow-lg">
                <h4 className="font-semibold mb-3 text-slate-800 dark:text-slate-200">Live Traffic Areas</h4>
                <div className="space-y-2">
                  {trafficData.map((area, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-slate-700 dark:text-slate-300">{area.area}</span>
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: area.color }}
                        ></div>
                        <span className="text-slate-600 dark:text-slate-400">{area.traffic}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* API Integration Notice */}
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  🔗 Ready for Google Maps API integration
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Map Controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <button className="w-10 h-10 bg-white dark:bg-slate-700 rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors">
            <span className="text-lg">🔍</span>
          </button>
          <button className="w-10 h-10 bg-white dark:bg-slate-700 rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors">
            <span className="text-lg">📍</span>
          </button>
          <button className="w-10 h-10 bg-white dark:bg-slate-700 rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors">
            <span className="text-lg">🎯</span>
          </button>
        </div>

        {/* Layer Indicators */}
        <div className="absolute bottom-4 left-4 space-y-2">
          {trafficLayer && (
            <div className="bg-white dark:bg-slate-700 px-3 py-1 rounded-full shadow-lg">
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">🚦 Traffic Layer ON</span>
            </div>
          )}
          {routeLayer && (
            <div className="bg-white dark:bg-slate-700 px-3 py-1 rounded-full shadow-lg">
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">🛣️ Routes ON</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}