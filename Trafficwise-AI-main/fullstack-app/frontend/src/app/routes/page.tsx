'use client';

import { useState } from 'react';

export default function RoutesPage() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [travelMode, setTravelMode] = useState('driving');
  const [departureTime, setDepartureTime] = useState('now');

  const suggestedRoutes = [
    {
      id: 1,
      name: 'Fastest Route',
      duration: '32 min',
      distance: '18.5 km',
      traffic: 'Moderate',
      trafficColor: 'yellow',
      icon: '⚡',
      highlights: ['Expressway', 'Less traffic lights']
    },
    {
      id: 2,
      name: 'Shortest Route',
      duration: '28 min',
      distance: '15.2 km',
      traffic: 'Heavy',
      trafficColor: 'red',
      icon: '📏',
      highlights: ['Direct path', 'City center']
    },
    {
      id: 3,
      name: 'Scenic Route',
      duration: '38 min',
      distance: '22.1 km',
      traffic: 'Light',
      trafficColor: 'green',
      icon: '🌳',
      highlights: ['Waterfront', 'Parks', 'Less congested']
    }
  ];

  const recentRoutes = [
    { from: 'Gulshan-e-Iqbal', to: 'Saddar', time: '2 hours ago' },
    { from: 'DHA Lahore', to: 'Mall Road', time: 'Yesterday' },
    { from: 'Blue Area', to: 'F-6 Islamabad', time: '3 days ago' }
  ];

  const pakistaniCities = [
    'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad',
    'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala'
  ];

  const popularDestinations = [
    'Jinnah International Airport',
    'Allama Iqbal International Airport',
    'Islamabad International Airport',
    'Mall Road Lahore',
    'Saddar Karachi',
    'Blue Area Islamabad',
    'Liberty Market Lahore',
    'Port Grand Karachi'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
      <main className="pt-8 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Pakistan Smart <span className="gradient-text">Routes</span> 🇵🇰
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Find the best routes across Pakistan with real-time traffic insights
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Route Planning Form */}
            <div className="lg:col-span-1">
              <div className="card-gradient p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">🗺️ Plan Your Route</h3>
                
                <div className="space-y-4">
                  {/* From Location */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      From
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        placeholder="e.g., Karachi, Lahore, Islamabad"
                        className="w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
                        list="cities-from"
                      />
                      <datalist id="cities-from">
                        {pakistaniCities.map(city => (
                          <option key={city} value={city} />
                        ))}
                        {popularDestinations.map(dest => (
                          <option key={dest} value={dest} />
                        ))}
                      </datalist>
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500">
                        🟢
                      </div>
                    </div>
                  </div>

                  {/* To Location */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      To
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        placeholder="e.g., Mall Road, Saddar, Blue Area"
                        className="w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
                        list="cities-to"
                      />
                      <datalist id="cities-to">
                        {pakistaniCities.map(city => (
                          <option key={city} value={city} />
                        ))}
                        {popularDestinations.map(dest => (
                          <option key={dest} value={dest} />
                        ))}
                      </datalist>
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500">
                        🔴
                      </div>
                    </div>
                  </div>

                  {/* Travel Mode */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Travel Mode
                    </label>
                    <select 
                      value={travelMode}
                      onChange={(e) => setTravelMode(e.target.value)}
                      className="w-full px-3 py-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                    >
                      <option value="driving">🚗 Car/Motorbike</option>
                      <option value="transit">🚌 Bus/Metro</option>
                      <option value="rickshaw">🛺 Rickshaw</option>
                      <option value="walking">🚶 Walking</option>
                      <option value="cycling">🚴 Cycling</option>
                    </select>
                  </div>

                  {/* Departure Time */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Departure Time
                    </label>
                    <select 
                      value={departureTime}
                      onChange={(e) => setDepartureTime(e.target.value)}
                      className="w-full px-3 py-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                    >
                      <option value="now">🕐 Leave Now</option>
                      <option value="custom">⏰ Choose Time</option>
                      <option value="avoid-peak">🚦 Avoid Peak Hours</option>
                    </select>
                  </div>

                  <button className="w-full btn-primary py-3 font-semibold">
                    🔍 Find Best Routes
                  </button>
                </div>

                {/* Recent Routes */}
                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-600">
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">🕐 Recent Routes</h4>
                  <div className="space-y-2">
                    {recentRoutes.map((route, index) => (
                      <div key={index} className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 cursor-pointer transition-colors">
                        <div className="text-sm font-medium text-slate-700 dark:text-slate-200">
                          {route.from} → {route.to}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{route.time}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Popular Destinations */}
                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-600">
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">🔥 Popular Destinations</h4>
                  <div className="space-y-1">
                    {popularDestinations.slice(0, 4).map((dest, index) => (
                      <button 
                        key={index} 
                        onClick={() => setTo(dest)}
                        className="w-full text-left p-2 text-xs text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-700 rounded transition-colors"
                      >
                        📍 {dest}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Route Results */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">🛣️ Route Suggestions</h3>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {from && to ? `${from} → ${to}` : 'Enter locations to see routes'}
                  </div>
                </div>
                
                {suggestedRoutes.map((route) => (
                  <div key={route.id} className="card-gradient p-6 hover:shadow-lg transition-shadow cursor-pointer border border-slate-200 dark:border-slate-700">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                          <span className="text-xl">{route.icon}</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{route.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
                            <span>⏱️ {route.duration}</span>
                            <span>•</span>
                            <span>📏 {route.distance}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          route.trafficColor === 'green' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                          route.trafficColor === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                          'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                        }`}>
                          🚦 {route.traffic} Traffic
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {route.highlights.map((highlight, index) => (
                        <span key={index} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-md">
                          {highlight}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-600 flex justify-between items-center">
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm">
                        👁️ View Details
                      </button>
                      <button className="btn-primary px-4 py-2 text-sm">
                        🧭 Start Navigation
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}