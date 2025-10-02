'use client';

import { useState } from 'react';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('travel-time');

  const metrics = [
    { id: 'travel-time', label: 'Travel Time', icon: '⏱️' },
    { id: 'traffic-volume', label: 'Traffic Volume', icon: '🚗' },
    { id: 'route-efficiency', label: 'Route Efficiency', icon: '📊' }
  ];

  const timeRanges = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 3 Months' }
  ];

  const topRoutes = [
    { route: 'Bandra → Andheri', usage: 342, savings: '12 min', efficiency: 85 },
    { route: 'Powai → Lower Parel', usage: 298, savings: '18 min', efficiency: 92 },
    { route: 'Thane → Churchgate', usage: 256, savings: '25 min', efficiency: 78 },
    { route: 'Malad → BKC', usage: 189, savings: '15 min', efficiency: 88 }
  ];

  const insights = [
    {
      title: 'Peak Hours Identified',
      description: 'Traffic peaks between 8-10 AM and 6-8 PM',
      impact: 'High',
      color: 'red'
    },
    {
      title: 'Alternative Route Found',
      description: 'New efficient route discovered for Bandra-Worli',
      impact: 'Medium',
      color: 'yellow'
    },
    {
      title: 'Traffic Improvement',
      description: 'Overall congestion reduced by 15% this week',
      impact: 'Positive',
      color: 'green'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">      
      <main className="pt-8 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                Traffic <span className="gradient-text">Analytics</span>
              </h1>
              <p className="text-xl text-slate-600">
                Deep insights into traffic patterns and route performance
              </p>
            </div>
            
            <div className="flex space-x-4 mt-6 md:mt-0">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                {timeRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
              
              <button className="btn-primary px-6 py-2">
                📊 Export Report
              </button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="card-gradient p-6 text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">2.4M</div>
              <div className="text-slate-600">Total Trips</div>
              <div className="text-sm text-green-600 mt-1">↗ 12% vs last period</div>
            </div>
            
            <div className="card-gradient p-6 text-center">
              <div className="text-3xl font-bold text-secondary-600 mb-2">18.5</div>
              <div className="text-slate-600">Avg Time Saved (min)</div>
              <div className="text-sm text-green-600 mt-1">↗ 8% vs last period</div>
            </div>
            
            <div className="card-gradient p-6 text-center">
              <div className="text-3xl font-bold text-accent-600 mb-2">89%</div>
              <div className="text-slate-600">Route Accuracy</div>
              <div className="text-sm text-green-600 mt-1">↗ 3% vs last period</div>
            </div>
            
            <div className="card-gradient p-6 text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">156K</div>
              <div className="text-slate-600">Active Users</div>
              <div className="text-sm text-green-600 mt-1">↗ 24% vs last period</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Chart */}
            <div className="lg:col-span-2">
              <div className="card-gradient p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-slate-900">Traffic Trends</h3>
                  <div className="flex space-x-2">
                    {metrics.map(metric => (
                      <button
                        key={metric.id}
                        onClick={() => setSelectedMetric(metric.id)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedMetric === metric.id
                            ? 'bg-primary-100 text-primary-700'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {metric.icon} {metric.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Chart Placeholder */}
                <div className="h-80 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-4">📈</div>
                    <h4 className="text-lg font-semibold text-slate-700 mb-2">Interactive Chart</h4>
                    <p className="text-slate-600">
                      Showing {metrics.find(m => m.id === selectedMetric)?.label} trends
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Top Routes */}
              <div className="card-gradient p-6 mt-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-6">Top Performing Routes</h3>
                <div className="space-y-4">
                  {topRoutes.map((route, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center font-semibold text-primary-700">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">{route.route}</div>
                          <div className="text-sm text-slate-600">{route.usage} trips</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="text-green-600 font-medium">
                          {route.savings} saved
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-12 bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary-500 rounded-full"
                              style={{ width: `${route.efficiency}%` }}
                            ></div>
                          </div>
                          <span className="text-slate-600">{route.efficiency}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* AI Insights */}
              <div className="card-gradient p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  🤖 AI Insights
                </h3>
                <div className="space-y-4">
                  {insights.map((insight, index) => (
                    <div key={index} className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-slate-900 text-sm">
                          {insight.title}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          insight.color === 'red' ? 'bg-red-100 text-red-700' :
                          insight.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {insight.impact}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">{insight.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real-time Status */}
              <div className="card-gradient p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  🔴 Live Status
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">System Status</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-green-600">Active</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Data Freshness</span>
                    <span className="text-sm font-medium text-slate-900">2 min ago</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Active Monitors</span>
                    <span className="text-sm font-medium text-slate-900">847</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card-gradient p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  ⚡ Quick Actions
                </h3>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                    📧 Setup Alerts
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                    📋 Custom Report
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                    ⚙️ Data Sources
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}