'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface GoogleMapComponentProps {
  selectedCity: string;
  trafficLayer: boolean;
  routeLayer: boolean;
}

// Pakistan major cities coordinates
const PAKISTAN_CITIES = {
  'Karachi': { lat: 24.8607, lng: 67.0011, zoom: 11 },
  'Lahore': { lat: 31.5204, lng: 74.3587, zoom: 12 },
  'Islamabad': { lat: 33.6844, lng: 73.0479, zoom: 12 },
  'Rawalpindi': { lat: 33.5651, lng: 73.0169, zoom: 12 },
  'Faisalabad': { lat: 31.4504, lng: 73.1350, zoom: 12 },
  'Multan': { lat: 30.1575, lng: 71.5249, zoom: 12 },
  'Peshawar': { lat: 34.0151, lng: 71.5249, zoom: 12 },
  'Quetta': { lat: 30.1798, lng: 66.9750, zoom: 12 },
  'Sialkot': { lat: 32.4945, lng: 74.5229, zoom: 13 },
  'Gujranwala': { lat: 32.1877, lng: 74.1945, zoom: 13 },
  'Hyderabad': { lat: 25.3960, lng: 68.3578, zoom: 12 },
  'Bahawalpur': { lat: 29.4000, lng: 71.6833, zoom: 12 },
  'Sargodha': { lat: 32.0836, lng: 72.6711, zoom: 12 },
  'Sukkur': { lat: 27.7058, lng: 68.8574, zoom: 12 },
  'Larkana': { lat: 27.5590, lng: 68.2120, zoom: 12 }
};

export default function GoogleMapComponent({ selectedCity, trafficLayer, routeLayer }: GoogleMapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [trafficLayerInstance, setTrafficLayerInstance] = useState<any>(null);

  // Get city coordinates
  const cityData = PAKISTAN_CITIES[selectedCity as keyof typeof PAKISTAN_CITIES] || PAKISTAN_CITIES['Karachi'];

  // Initialize Google Maps
  useEffect(() => {
    const initializeGoogleMaps = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Ensure the component is mounted
        if (!mapRef.current) {
          console.warn('Map ref not available yet, waiting...');
          await new Promise(resolve => setTimeout(resolve, 500));
        }

        // Check if Google Maps API key is available
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        
        if (!apiKey || apiKey === 'your_google_maps_key_here') {
          setError('Google Maps API key not configured properly. Please check your environment variables.');
          setIsLoading(false);
          return;
        }

        // Initialize Google Maps Loader
        const loader = new Loader({
          apiKey: apiKey,
          version: 'weekly',
          libraries: ['places', 'geometry']
        });

        // Load Google Maps API
        const google = await loader.load();
        
        // Wait a bit for the DOM element to be ready
        await new Promise(resolve => setTimeout(resolve, 100));
        
        if (!mapRef.current) {
          setError('Map container not ready. Please try refreshing the page.');
          setIsLoading(false);
          console.error('mapRef.current is null after timeout');
          return;
        }

        // Initialize the map
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: cityData.lat, lng: cityData.lng },
          zoom: cityData.zoom,
          mapTypeId: 'roadmap',
          styles: [
            // Custom styling for better visibility
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'on' }]
            }
          ]
        });

        // Add city marker
        const marker = new google.maps.Marker({
          position: { lat: cityData.lat, lng: cityData.lng },
          map: map,
          title: selectedCity,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            `),
            scaledSize: new google.maps.Size(30, 30),
          }
        });

        // Add info window
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <h3 style="margin: 0 0 5px 0; color: #1f2937;">${selectedCity}</h3>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">📍 ${cityData.lat.toFixed(4)}, ${cityData.lng.toFixed(4)}</p>
              <p style="margin: 5px 0 0 0; color: #10b981; font-size: 12px;">🚗 Pakistani City Traffic Monitor</p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        // Create traffic layer instance
        const traffic = new google.maps.TrafficLayer();
        setTrafficLayerInstance(traffic);

        // Add traffic layer if enabled
        if (trafficLayer) {
          traffic.setMap(map);
        }

        setMapInstance(map);
        setIsLoading(false);

      } catch (err) {
        console.error('Google Maps initialization error:', err);
        setError('Failed to load Google Maps. Please check your API key and internet connection.');
        setIsLoading(false);
      }
    };

    initializeGoogleMaps();
  }, [selectedCity, cityData.lat, cityData.lng, cityData.zoom]);

  // Handle traffic layer toggle
  useEffect(() => {
    if (mapInstance && trafficLayerInstance) {
      if (trafficLayer) {
        trafficLayerInstance.setMap(mapInstance);
      } else {
        trafficLayerInstance.setMap(null);
      }
    }
  }, [mapInstance, trafficLayerInstance, trafficLayer]);

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px] bg-red-50 dark:bg-red-900/20 rounded-lg border-2 border-red-200 dark:border-red-800">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-red-700 dark:text-red-300 mb-2">
            Map Loading Error
          </h3>
          <p className="text-red-600 dark:text-red-400 mb-4 max-w-md">
            {error}
          </p>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 text-left">
            <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
              To enable Google Maps:
            </p>
            <ol className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              <li>1. Get Google Maps API key</li>
              <li>2. Add to .env.local file</li>
              <li>3. Enable Maps JavaScript API</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px] bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">🌍</div>
          <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">
            Loading Google Maps
          </h3>
          <p className="text-blue-600 dark:text-blue-400">
            Initializing map for {selectedCity}...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <div 
        ref={mapRef} 
        className="h-full w-full rounded-lg shadow-lg"
        style={{ minHeight: '400px' }}
      />
      
      {/* Real-time indicator */}
      <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-lg z-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            Google Maps Live
          </span>
        </div>
      </div>

      {/* City info */}
      <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg z-10">
        <h4 className="font-semibold text-gray-900 dark:text-white">
          📍 {selectedCity}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {cityData.lat.toFixed(4)}, {cityData.lng.toFixed(4)}
        </p>
        {trafficLayer && (
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">
            🚦 Traffic layer active
          </p>
        )}
      </div>
    </div>
  );
}