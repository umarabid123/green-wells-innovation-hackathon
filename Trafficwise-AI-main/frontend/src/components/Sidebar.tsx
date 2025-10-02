'use client';

import { AIServiceType } from '@/types';

interface SidebarProps {
  currentAIService: AIServiceType;
  onAIServiceChange: (service: AIServiceType) => void;
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  model: string;
  onModelChange: (model: string) => void;
  temperature: number;
  onTemperatureChange: (temp: number) => void;
  showMap: boolean;
  onShowMapChange: (show: boolean) => void;
}

export default function Sidebar({
  currentAIService,
  onAIServiceChange,
  apiKey,
  onApiKeyChange,
  model,
  onModelChange,
  temperature,
  onTemperatureChange,
  showMap,
  onShowMapChange,
}: SidebarProps) {
  const aiServices = [
    { value: 'google_gemini' as AIServiceType, label: 'Google Gemini API' },
    { value: 'openai' as AIServiceType, label: 'OpenAI API' },
    { value: 'local_rag' as AIServiceType, label: 'Local RAG' },
    { value: 'offline' as AIServiceType, label: 'Offline Mode' },
  ];

  const geminiModels = [
    'gemini-1.5-flash',
    'gemini-1.5-pro',
    'gemini-pro',
  ];

  const requiresApiKey = currentAIService === 'google_gemini' || currentAIService === 'openai';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="text-center">
          <div className="text-2xl mb-2">🚦</div>
          <h2 className="text-lg font-semibold text-gray-900">
            TrafficWise Urban Planner
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Your AI Assistant for Traffic & Urban Planning
          </p>
        </div>
      </div>

      {/* AI Service Selection */}
      <div className="card">
        <h3 className="text-md font-semibold text-gray-900 mb-3">
          🤖 AI Service
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose AI Service:
            </label>
            <select
              value={currentAIService}
              onChange={(e) => onAIServiceChange(e.target.value as AIServiceType)}
              className="input-field"
            >
              {aiServices.map((service) => (
                <option key={service.value} value={service.value}>
                  {service.label}
                </option>
              ))}
            </select>
          </div>

          {/* API Key Input */}
          {requiresApiKey && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {currentAIService === 'google_gemini' ? 'Google Gemini' : 'OpenAI'} API Key:
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => onApiKeyChange(e.target.value)}
                placeholder="Enter your API key"
                className="input-field"
              />
              {!apiKey && (
                <p className="text-xs text-amber-600 mt-1">
                  ⚠️ API key required for this service
                </p>
              )}
            </div>
          )}

          {/* Model Selection for Gemini */}
          {currentAIService === 'google_gemini' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gemini Model:
              </label>
              <select
                value={model}
                onChange={(e) => onModelChange(e.target.value)}
                className="input-field"
              >
                {geminiModels.map((modelOption) => (
                  <option key={modelOption} value={modelOption}>
                    {modelOption}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Flash is faster, Pro is more capable
              </p>
            </div>
          )}

          {/* Temperature Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              AI Response Variation: {temperature}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={temperature}
              onChange={(e) => onTemperatureChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Conservative</span>
              <span>Creative</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Higher values provide more varied suggestions
            </p>
          </div>
        </div>
      </div>

      {/* Map Toggle */}
      <div className="card">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Show Interactive Traffic Map
          </label>
          <input
            type="checkbox"
            checked={showMap}
            onChange={(e) => onShowMapChange(e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
        </div>
      </div>

      {/* Pakistan Traffic Guidelines */}
      <div className="card">
        <h3 className="text-md font-semibold text-gray-900 mb-3">
          🚗 Pakistan Traffic Guidelines
        </h3>
        <div className="space-y-3 text-sm text-gray-600">
          <div>
            <h4 className="font-medium text-gray-800">📍 Major Routes:</h4>
            <ul className="text-xs space-y-1 mt-1">
              <li>• <strong>GT Road:</strong> Historic but congested</li>
              <li>• <strong>Motorways:</strong> M-1, M-2, M-3, M-4 - fastest</li>
              <li>• <strong>National Highways:</strong> N-5, N-25, N-35</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-800">⏰ Peak Hours:</h4>
            <ul className="text-xs space-y-1 mt-1">
              <li>• Morning: 7:00-9:30 AM</li>
              <li>• Evening: 4:30-7:30 PM</li>
              <li>• Friday: 12:00-2:00 PM</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-800">🌦️ Weather Impact:</h4>
            <ul className="text-xs space-y-1 mt-1">
              <li>• Monsoon: July-September</li>
              <li>• Fog: December-February</li>
              <li>• Heat waves: May-June</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-800">🚨 Emergency Numbers:</h4>
            <ul className="text-xs space-y-1 mt-1">
              <li>• Motorway Police: 130</li>
              <li>• Highway Police: 1915</li>
              <li>• Rescue 1122: 1122</li>
            </ul>
          </div>
        </div>
      </div>

      {/* API Setup Instructions */}
      {currentAIService === 'google_gemini' && (
        <div className="card">
          <h3 className="text-md font-semibold text-gray-900 mb-3">
            🆓 Google Gemini Benefits
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <span className="text-green-600">✅</span>
              <span>Free Tier Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-600">✅</span>
              <span>15 requests per minute</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-600">✅</span>
              <span>1 million tokens per day</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-600">✅</span>
              <span>Advanced reasoning</span>
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="font-medium text-gray-800 mb-2">🔧 Setup Instructions:</h4>
            <ol className="text-xs space-y-1 text-gray-600">
              <li>1. Visit https://aistudio.google.com</li>
              <li>2. Sign in with Google</li>
              <li>3. Create API key</li>
              <li>4. Paste in sidebar</li>
              <li>5. Start chatting!</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
