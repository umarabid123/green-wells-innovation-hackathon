'use client';

import { useEffect, useRef } from 'react';
import { TrafficData } from '@/types';

interface TrafficMapProps {
  trafficData: TrafficData[];
}

export default function TrafficMap({ trafficData }: TrafficMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Dynamically import Leaflet to avoid SSR issues
    const initializeMap = async () => {
      if (typeof window === 'undefined') return;

      const L = (await import('leaflet')).default;
      
      // Fix for default markers in Leaflet with Next.js
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      // Initialize map centered on Pakistan
      if (mapRef.current && !mapInstanceRef.current) {
        mapInstanceRef.current = L.map(mapRef.current).setView([30.3753, 69.3451], 6);

        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 18,
        }).addTo(mapInstanceRef.current);
      }
    };

    initializeMap();

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !trafficData.length) return;

    const L = require('leaflet');

    // Clear existing markers
    mapInstanceRef.current.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        mapInstanceRef.current.removeLayer(layer);
      }
    });

    // Add city markers
    trafficData.forEach((city) => {
      const getMarkerColor = (trafficLevel: string) => {
        switch (trafficLevel) {
          case 'Light': return 'green';
          case 'Moderate': return 'blue';
          case 'Heavy': return 'orange';
          case 'Very Heavy': return 'red';
          default: return 'gray';
        }
      };

      const getTrafficIcon = (color: string) => {
        return L.divIcon({
          className: 'custom-div-icon',
          html: `
            <div style="
              background-color: ${color};
              width: 24px;
              height: 24px;
              border: 2px solid white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              color: white;
              font-weight: bold;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            ">
              🚗
            </div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });
      };

      const markerColor = getMarkerColor(city.traffic_level);
      const icon = getTrafficIcon(markerColor);

      const popupContent = `
        <div style="min-width: 200px; font-family: Arial, sans-serif;">
          <h4 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px; font-weight: 600;">
            ${city.city}
          </h4>
          <div style="margin-bottom: 8px;">
            <strong style="color: #374151;">Traffic Level:</strong> 
            <span style="color: ${markerColor}; font-weight: 600;">
              ${city.traffic_level}
            </span>
          </div>
          <p style="margin: 8px 0; color: #6b7280; font-size: 14px; line-height: 1.4;">
            ${city.info}
          </p>
          ${city.peak_hours ? `
            <div style="margin-top: 8px;">
              <strong style="color: #374151; font-size: 13px;">Peak Hours:</strong>
              <div style="font-size: 12px; color: #6b7280; margin-top: 2px;">
                ${city.peak_hours.join(', ')}
              </div>
            </div>
          ` : ''}
          ${city.alternative_routes ? `
            <div style="margin-top: 8px;">
              <strong style="color: #374151; font-size: 13px;">Alternative Routes:</strong>
              <div style="font-size: 12px; color: #6b7280; margin-top: 2px;">
                ${city.alternative_routes.join(', ')}
              </div>
            </div>
          ` : ''}
          <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #e5e7eb;">
            <em style="font-size: 12px; color: #9ca3af;">
              Click for route suggestions
            </em>
          </div>
        </div>
      `;

      const marker = L.marker([city.lat, city.lon], { icon })
        .bindPopup(popupContent, { maxWidth: 300 })
        .bindTooltip(`${city.city} - ${city.traffic_level} Traffic`, {
          direction: 'top',
          offset: [0, -10],
        });

      marker.addTo(mapInstanceRef.current);
    });

    // Add major highways as polylines
    const highways = [
      {
        name: 'GT Road',
        coordinates: [
          [31.582045, 74.329376], // Lahore
          [33.6844, 73.0479],     // Islamabad
          [34.0151, 71.5249],     // Peshawar
        ],
        color: '#3b82f6',
      },
      {
        name: 'M-1/M-2 Motorway',
        coordinates: [
          [31.582045, 74.329376], // Lahore
          [31.4187, 73.0790],     // Faisalabad
          [30.1575, 71.5249],     // Multan
          [24.8607, 67.0011],     // Karachi
        ],
        color: '#ef4444',
      },
    ];

    highways.forEach((highway) => {
      L.polyline(highway.coordinates, {
        color: highway.color,
        weight: 4,
        opacity: 0.7,
      })
        .bindPopup(`<strong>${highway.name}</strong><br/>Major Highway Route`)
        .addTo(mapInstanceRef.current);
    });

  }, [trafficData]);

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>Light Traffic</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>Moderate Traffic</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span>Heavy Traffic</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span>Very Heavy Traffic</span>
        </div>
      </div>

      {/* Map Container */}
      <div 
        ref={mapRef} 
        className="map-container"
        style={{ minHeight: '400px' }}
      />

      {/* Map Information */}
      <div className="text-xs text-gray-500 space-y-1">
        <p>📍 Click on city markers for detailed traffic information and alternative routes</p>
        <p>🛣️ Blue lines show GT Road, Red lines show Motorway routes</p>
        <p>⏰ Peak hours and real-time conditions vary by city and season</p>
      </div>
    </div>
  );
}
