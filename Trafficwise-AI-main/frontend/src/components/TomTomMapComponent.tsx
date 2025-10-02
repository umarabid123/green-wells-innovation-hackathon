'use client';

import { useEffect, useRef, useState } from 'react';

interface TomTomMapProps {
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

export default function TomTomMapComponent({ selectedCity, trafficLayer, routeLayer }: TomTomMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mapInstance, setMapInstance] = useState<any>(null);

  // Get city coordinates
  const cityData = PAKISTAN_CITIES[selectedCity as keyof typeof PAKISTAN_CITIES] || PAKISTAN_CITIES['Karachi'];

  // Initialize TomTom Map
  useEffect(() => {
    const initializeTomTomMap = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Check if TomTom API key is available
        const apiKey = process.env.NEXT_PUBLIC_TOMTOM_API_KEY;
        
        if (!apiKey) {
          setError('TomTom API key not found. Please add your API key to .env.local');
          setIsLoading(false);
          return;
        }

        // Wait for DOM element to be ready
        if (!mapRef.current) {
          await new Promise(resolve => setTimeout(resolve, 100));
          if (!mapRef.current) {
            setError('Map container not ready');
            setIsLoading(false);
            return;
          }
        }

        // Load TomTom SDK dynamically
        const script = document.createElement('script');
        script.src = `https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.24.0/maps/maps-web.min.js`;
        script.async = true;

        const cssLink = document.createElement('link');
        cssLink.href = `https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.24.0/maps/maps.css`;
        cssLink.rel = 'stylesheet';

        document.head.appendChild(cssLink);
        document.head.appendChild(script);

        script.onload = () => {
          // Initialize TomTom map
          const tt = (window as any).tt;
          
          const map = tt.map({
            key: apiKey,
            container: mapRef.current,
            center: [cityData.lng, cityData.lat],
            zoom: cityData.zoom,
            language: 'en-US'
          });

          // Add marker for the selected city
          const marker = new tt.Marker()
            .setLngLat([cityData.lng, cityData.lat])
            .addTo(map);

          // Add popup
          const popup = new tt.Popup({ offset: 35 })
            .setHTML(`
              <div style="padding: 8px; font-family: system-ui;">
                <h3 style="margin: 0 0 4px 0; font-size: 14px; font-weight: bold;">${selectedCity}</h3>
                <p style="margin: 0; font-size: 12px; color: #666;">
                  📍 ${cityData.lat.toFixed(4)}, ${cityData.lng.toFixed(4)}
                </p>
                <p style="margin: 4px 0 0 0; font-size: 11px; color: #10b981;">
                  🚗 TomTom Real-time Traffic
                </p>
              </div>
            `);

          marker.setPopup(popup);

          // Add traffic layer if enabled
          if (trafficLayer) {
            map.addLayer('traffic-flow');
            map.addLayer('traffic-incidents');
          }

          setMapInstance(map);
          setIsLoading(false);
        };

        script.onerror = () => {
          setError('Failed to load TomTom Maps SDK');
          setIsLoading(false);
        };

      } catch (err) {
        console.error('TomTom Maps initialization error:', err);
        setError('Failed to initialize TomTom Maps');
        setIsLoading(false);
      }
    };

    initializeTomTomMap();

    // Cleanup
    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [selectedCity, cityData.lat, cityData.lng, cityData.zoom]);

  // Handle traffic layer toggle
  useEffect(() => {
    if (mapInstance) {
      if (trafficLayer) {
        mapInstance.addLayer('traffic-flow');
        mapInstance.addLayer('traffic-incidents');
      } else {
        mapInstance.removeLayer('traffic-flow');
        mapInstance.removeLayer('traffic-incidents');
      }
    }
  }, [mapInstance, trafficLayer]);

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px] bg-red-50 dark:bg-red-900/20 rounded-lg border-2 border-red-200 dark:border-red-800">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-red-700 dark:text-red-300 mb-2">
            TomTom Map Error
          </h3>
          <p className="text-red-600 dark:text-red-400 mb-4 max-w-md">
            {error}
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-left">
            <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
              TomTom API Setup:
            </p>
            <ol className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>1. Add NEXT_PUBLIC_TOMTOM_API_KEY to .env.local</li>
              <li>2. Your key: itaP2OCG0L5DTAbMkdFhRXh0yhHfWgqU</li>
              <li>3. Restart the development server</li>
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
          <div className="animate-spin text-6xl mb-4">🗺️</div>
          <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">
            Loading TomTom Map
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
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            TomTom Live
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
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
            🚦 Traffic layer active
          </p>
        )}
      </div>
    </div>
  );
}