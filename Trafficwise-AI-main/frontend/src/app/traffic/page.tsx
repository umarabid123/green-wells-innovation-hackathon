'use client';

import { useState, useEffect } from 'react';
import ModernTrafficMap from '../../components/ModernTrafficMap';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Tooltip } from '../../components/ui/Tooltip';
import { 
  ClockIcon, 
  ExclamationTriangleIcon,
  ArrowPathIcon,
  MapPinIcon 
} from '@heroicons/react/24/outline';

export default function TrafficPage() {
  const [selectedCity, setSelectedCity] = useState('Karachi');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastUpdated(new Date());
      }, 30000); // Update every 30 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const formatLastUpdated = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    return `${Math.floor(diffInSeconds / 3600)}h ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Real-time <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Traffic Data</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Monitor live traffic conditions across major Pakistani cities with AI-powered insights
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl">🟢</span>
              </div>
              <div className="text-2xl font-bold text-green-700 dark:text-green-300 mb-1">
                12
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">
                Clear Routes
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-200 dark:border-yellow-800">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <ClockIcon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300 mb-1">
                8
              </div>
              <div className="text-sm text-yellow-600 dark:text-yellow-400">
                Slow Routes
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border-red-200 dark:border-red-800">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <ExclamationTriangleIcon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-red-700 dark:text-red-300 mb-1">
                5
              </div>
              <div className="text-sm text-red-600 dark:text-red-400">
                Incidents
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPinIcon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-1">
                25K
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400">
                Active Users
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${autoRefresh ? 'bg-green-500 animate-pulse' : 'bg-slate-300 dark:bg-slate-600'}`}></div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {autoRefresh ? 'Auto-refresh enabled' : 'Auto-refresh disabled'}
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className="text-xs"
                >
                  {autoRefresh ? 'Disable' : 'Enable'} Auto-refresh
                </Button>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Last updated: {formatLastUpdated(lastUpdated)}
                </span>
                <Button
                  size="sm"
                  variant="primary"
                  icon={<ArrowPathIcon className="w-4 h-4" />}
                  onClick={() => setLastUpdated(new Date())}
                >
                  Refresh Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Traffic Map */}
        <ModernTrafficMap
          selectedCity={selectedCity}
          onCitySelect={setSelectedCity}
        />

        {/* Traffic Alerts */}
        <Card className="mt-8">
          <CardHeader>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Active Traffic Alerts
            </h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  type: 'incident',
                  severity: 'high',
                  title: 'Accident on Shahrah-e-Faisal',
                  description: 'Multi-vehicle accident causing major delays',
                  location: 'Karachi',
                  time: '15 min ago',
                  icon: '🚨',
                  color: 'red'
                },
                {
                  type: 'construction',
                  severity: 'medium',
                  title: 'Road Construction on Mall Road',
                  description: 'Lane closures affecting traffic flow',
                  location: 'Lahore',
                  time: '2 hours ago',
                  icon: '🚧',
                  color: 'yellow'
                },
                {
                  type: 'event',
                  severity: 'low',
                  title: 'Event at Convention Center',
                  description: 'Increased traffic expected in the area',
                  location: 'Islamabad',
                  time: '1 hour ago',
                  icon: '🎪',
                  color: 'blue'
                }
              ].map((alert, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${
                    alert.color === 'red' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                    alert.color === 'yellow' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                    'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{alert.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-slate-900 dark:text-slate-100">
                          {alert.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          alert.severity === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                          alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                          'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        }`}>
                          {alert.severity}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        {alert.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-slate-500 dark:text-slate-400">
                        <span>📍 {alert.location}</span>
                        <span>⏰ {alert.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}