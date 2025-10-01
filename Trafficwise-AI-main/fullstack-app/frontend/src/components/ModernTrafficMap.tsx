'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from './ui/Card';
import { Button } from './ui/Button';
import { Tooltip } from './ui/Tooltip';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { 
  MapPinIcon, 
  ClockIcon, 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon 
} from '@heroicons/react/24/outline';

interface TrafficLevel {
  level: 'low' | 'moderate' | 'heavy' | 'critical';
  color: string;
  bgColor: string;
  label: string;
  icon: string;
}

interface CityTrafficData {
  city: string;
  trafficLevel: TrafficLevel;
  avgSpeed: number;
  incidents: number;
  lastUpdated: Date;
  coordinates: [number, number];
  routes: {
    name: string;
    status: 'clear' | 'slow' | 'congested';
    duration: string;
  }[];
}

const trafficLevels: Record<string, TrafficLevel> = {
  low: {
    level: 'low',
    color: 'text-green-700 dark:text-green-300',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    label: 'Light Traffic',
    icon: '🟢'
  },
  moderate: {
    level: 'moderate',
    color: 'text-yellow-700 dark:text-yellow-300',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    label: 'Moderate Traffic',
    icon: '🟡'
  },
  heavy: {
    level: 'heavy',
    color: 'text-orange-700 dark:text-orange-300',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    label: 'Heavy Traffic',
    icon: '🟠'
  },
  critical: {
    level: 'critical',
    color: 'text-red-700 dark:text-red-300',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    label: 'Critical Traffic',
    icon: '🔴'
  }
};

interface ModernTrafficMapProps {
  selectedCity?: string;
  onCitySelect?: (city: string) => void;
  className?: string;
}

export default function ModernTrafficMap({ 
  selectedCity = 'Karachi', 
  onCitySelect,
  className = '' 
}: ModernTrafficMapProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Mock traffic data - in real app, this would come from API
  const [trafficData] = useState<CityTrafficData[]>([
    {
      city: 'Karachi',
      trafficLevel: trafficLevels.heavy,
      avgSpeed: 25,
      incidents: 3,
      lastUpdated: new Date(),
      coordinates: [24.8607, 67.0011],
      routes: [
        { name: 'Shahrah-e-Faisal', status: 'congested', duration: '45 min' },
        { name: 'I.I. Chundrigar Road', status: 'slow', duration: '30 min' },
        { name: 'University Road', status: 'clear', duration: '20 min' }
      ]
    },
    {
      city: 'Lahore',
      trafficLevel: trafficLevels.moderate,
      avgSpeed: 35,
      incidents: 1,
      lastUpdated: new Date(),
      coordinates: [31.5204, 74.3587],
      routes: [
        { name: 'Mall Road', status: 'slow', duration: '25 min' },
        { name: 'Canal Road', status: 'clear', duration: '15 min' },
        { name: 'Ring Road', status: 'clear', duration: '40 min' }
      ]
    },
    {
      city: 'Islamabad',
      trafficLevel: trafficLevels.low,
      avgSpeed: 50,
      incidents: 0,
      lastUpdated: new Date(),
      coordinates: [33.6844, 73.0479],
      routes: [
        { name: 'Islamabad Highway', status: 'clear', duration: '20 min' },
        { name: 'Blue Area', status: 'clear', duration: '10 min' },
        { name: 'Margalla Road', status: 'clear', duration: '15 min' }
      ]
    }
  ]);

  const currentCityData = trafficData.find(city => city.city === selectedCity) || trafficData[0];

  const refreshData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdated(new Date());
    setIsLoading(false);
  };

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastUpdated(new Date());
      }, 30000); // Update every 30 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const getRouteStatusIcon = (status: string) => {
    switch (status) {
      case 'clear': return <CheckCircleIcon className="w-4 h-4 text-green-500" />;
      case 'slow': return <ClockIcon className="w-4 h-4 text-yellow-500" />;
      case 'congested': return <XCircleIcon className="w-4 h-4 text-red-500" />;
      default: return <MapPinIcon className="w-4 h-4 text-slate-500" />;
    }
  };

  const formatLastUpdated = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    return `${Math.floor(diffInSeconds / 3600)}h ago`;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* City Selector */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Traffic Overview
            </h3>
            <div className="flex items-center space-x-2">
              <Tooltip content={autoRefresh ? 'Disable auto-refresh' : 'Enable auto-refresh'}>
                <button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`w-3 h-3 rounded-full ${
                    autoRefresh ? 'bg-green-500 animate-pulse' : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                />
              </Tooltip>
              <Button
                size="sm"
                variant="outline"
                onClick={refreshData}
                loading={isLoading}
                className="text-xs"
              >
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {trafficData.map((city) => (
              <motion.button
                key={city.city}
                onClick={() => onCitySelect?.(city.city)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                  selectedCity === city.city
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-slate-900 dark:text-slate-100">{city.city}</h4>
                  <span className="text-lg">{city.trafficLevel.icon}</span>
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${city.trafficLevel.bgColor} ${city.trafficLevel.color} font-medium`}>
                  {city.trafficLevel.label}
                </div>
                <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                  Avg: {city.avgSpeed} km/h
                </div>
              </motion.button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Map Area */}
      <Card className="overflow-hidden" glow>
        <div className="relative h-80 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20">
          {/* Map Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                🗺️
              </motion.div>
              <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">
                Interactive Traffic Map
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Real-time traffic data for {selectedCity}
              </p>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 space-y-2">
            <Tooltip content="Zoom In">
              <button className="w-10 h-10 bg-white dark:bg-slate-800 rounded-lg shadow-lg flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <span className="text-lg font-bold text-slate-700 dark:text-slate-300">+</span>
              </button>
            </Tooltip>
            <Tooltip content="Zoom Out">
              <button className="w-10 h-10 bg-white dark:bg-slate-800 rounded-lg shadow-lg flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <span className="text-lg font-bold text-slate-700 dark:text-slate-300">−</span>
              </button>
            </Tooltip>
            <Tooltip content="My Location">
              <button className="w-10 h-10 bg-white dark:bg-slate-800 rounded-lg shadow-lg flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <MapPinIcon className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              </button>
            </Tooltip>
          </div>

          {/* Status Badge */}
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center space-x-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Live Data
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Traffic Details */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Current Conditions */}
        <Card>
          <CardHeader>
            <h4 className="font-semibold text-slate-900 dark:text-slate-100">
              Current Conditions - {selectedCity}
            </h4>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${currentCityData.trafficLevel.bgColor.replace('bg-', 'bg-')}`}></div>
                <span className="font-medium text-slate-900 dark:text-slate-100">Traffic Level</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${currentCityData.trafficLevel.bgColor} ${currentCityData.trafficLevel.color}`}>
                {currentCityData.trafficLevel.label}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <span className="text-xs">⚡</span>
                </div>
                <span className="font-medium text-slate-900 dark:text-slate-100">Average Speed</span>
              </div>
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                {currentCityData.avgSpeed} km/h
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <ExclamationTriangleIcon className="w-3 h-3 text-red-600 dark:text-red-400" />
                </div>
                <span className="font-medium text-slate-900 dark:text-slate-100">Active Incidents</span>
              </div>
              <span className="text-red-600 dark:text-red-400 font-semibold">
                {currentCityData.incidents}
              </span>
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 text-center pt-2 border-t border-slate-200 dark:border-slate-700">
              Last updated: {formatLastUpdated(lastUpdated)}
            </div>
          </CardContent>
        </Card>

        {/* Major Routes */}
        <Card>
          <CardHeader>
            <h4 className="font-semibold text-slate-900 dark:text-slate-100">Major Routes</h4>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentCityData.routes.map((route, index) => (
                <motion.div
                  key={route.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    {getRouteStatusIcon(route.status)}
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100 text-sm">
                        {route.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                        {route.status}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {route.duration}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}