'use client';

import { useState } from 'react';

export default function MapPage() {
  const [selectedCity, setSelectedCity] = useState('Karachi');
  const [trafficLayer, setTrafficLayer] = useState(true);
  const [useGoogleMaps, setUseGoogleMaps] = useState(false);

  const cities = [
    'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad',
    'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala',
    'Hyderabad', 'Bahawalpur', 'Sargodha', 'Sukkur', 'Larkana'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <main className="pt-8 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Pakistan Traffic Map
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Real-time traffic conditions for Pakistani cities
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Map Controls</h3>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Select City
                  </label>
                  <select 
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={trafficLayer}
                      onChange={(e) => setTrafficLayer(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span>Traffic Layer</span>
                  </label>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Map Provider</h4>
                  <label className="flex items-center space-x-3 mb-2">
                    <input
                      type="radio"
                      name="mapProvider"
                      checked={!useGoogleMaps}
                      onChange={() => setUseGoogleMaps(false)}
                      className="w-4 h-4"
                    />
                    <span>TomTom Maps</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="mapProvider"
                      checked={useGoogleMaps}
                      onChange={() => setUseGoogleMaps(true)}
                      className="w-4 h-4"
                    />
                    <span>Google Maps</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="h-[600px] bg-white rounded-lg shadow-lg flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4">{selectedCity} Traffic Map</h2>
                  <p className="text-gray-600">Map Provider: {useGoogleMaps ? 'Google Maps' : 'TomTom Maps'}</p>
                  <p className="text-sm mt-2">Traffic Layer: {trafficLayer ? 'ON' : 'OFF'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
