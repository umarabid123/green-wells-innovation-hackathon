'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader } from './ui/Card';
import { Button } from './ui/Button';
import { Tooltip } from './ui/Tooltip';
import { 
  CogIcon, 
  KeyIcon, 
  BeakerIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  InformationCircleIcon 
} from '@heroicons/react/24/outline';
import { AIServiceType } from '@/types';

interface ModernSidebarProps {
  currentAIService: AIServiceType;
  onAIServiceChange: (service: AIServiceType) => void;
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  model: string;
  onModelChange: (model: string) => void;
  temperature: number;
  onTemperatureChange: (temp: number) => void;
  className?: string;
}

const aiServices = [
  {
    id: 'google_gemini' as AIServiceType,
    name: 'Google Gemini',
    icon: '🤖',
    description: 'Advanced AI with excellent reasoning',
    color: 'from-blue-600 to-purple-600',
    models: ['gemini-pro', 'gemini-pro-vision']
  },
  {
    id: 'openai' as AIServiceType,
    name: 'OpenAI GPT',
    icon: '🧠',
    description: 'Powerful language understanding',
    color: 'from-green-600 to-teal-600',
    models: ['gpt-4', 'gpt-3.5-turbo']
  },
  {
    id: 'local_rag' as AIServiceType,
    name: 'Local RAG',
    icon: '📚',
    description: 'Local knowledge base search',
    color: 'from-orange-600 to-red-600',
    models: ['rag-base']
  },
  {
    id: 'offline' as AIServiceType,
    name: 'Offline Mode',
    icon: '💾',
    description: 'Works without internet',
    color: 'from-slate-600 to-slate-700',
    models: ['offline-model']
  }
];

export default function ModernSidebar({
  currentAIService,
  onAIServiceChange,
  apiKey,
  onApiKeyChange,
  model,
  onModelChange,
  temperature,
  onTemperatureChange,
  className = ''
}: ModernSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    aiService: true,
    apiKey: false,
    advanced: false
  });

  const [showApiKey, setShowApiKey] = useState(false);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const currentService = aiServices.find(service => service.id === currentAIService);
  const requiresApiKey = ['google_gemini', 'openai'].includes(currentAIService);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* AI Service Selection */}
      <Card>
        <CardHeader>
          <button
            onClick={() => toggleSection('aiService')}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="flex items-center space-x-2">
              <CogIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">AI Service</h3>
            </div>
            {expandedSections.aiService ? (
              <ChevronDownIcon className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronRightIcon className="w-4 h-4 text-slate-500" />
            )}
          </button>
        </CardHeader>
        
        <AnimatePresence>
          {expandedSections.aiService && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <CardContent>
                <div className="space-y-3">
                  {aiServices.map((service) => (
                    <motion.button
                      key={service.id}
                      onClick={() => onAIServiceChange(service.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        currentAIService === service.id
                          ? 'border-primary-500 shadow-lg shadow-primary-500/20'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center text-white text-lg shadow-lg`}>
                          {service.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-slate-900 dark:text-slate-100 truncate">
                            {service.name}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                            {service.description}
                          </p>
                          {currentAIService === service.id && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="mt-2 flex items-center space-x-1"
                            >
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                                Active
                              </span>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* API Key Configuration */}
      {requiresApiKey && (
        <Card>
          <CardHeader>
            <button
              onClick={() => toggleSection('apiKey')}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center space-x-2">
                <KeyIcon className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">API Configuration</h3>
              </div>
              {expandedSections.apiKey ? (
                <ChevronDownIcon className="w-4 h-4 text-slate-500" />
              ) : (
                <ChevronRightIcon className="w-4 h-4 text-slate-500" />
              )}
            </button>
          </CardHeader>
          
          <AnimatePresence>
            {expandedSections.apiKey && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        API Key
                      </label>
                      <div className="relative">
                        <input
                          type={showApiKey ? 'text' : 'password'}
                          value={apiKey}
                          onChange={(e) => onApiKeyChange(e.target.value)}
                          placeholder={`Enter your ${currentService?.name} API key`}
                          className="w-full px-3 py-2 pr-10 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                        />
                        <button
                          type="button"
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                        >
                          {showApiKey ? '🙈' : '👁️'}
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Your API key is stored locally and never sent to our servers
                      </p>
                    </div>

                    {!apiKey && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg"
                      >
                        <div className="flex items-start space-x-2">
                          <InformationCircleIcon className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                          <div className="text-xs text-amber-700 dark:text-amber-300">
                            <p className="font-medium mb-1">API Key Required</p>
                            <p>Get your API key from the {currentService?.name} dashboard to start using this service.</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      )}

      {/* Advanced Settings */}
      <Card>
        <CardHeader>
          <button
            onClick={() => toggleSection('advanced')}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="flex items-center space-x-2">
              <BeakerIcon className="w-5 h-5 text-accent-600 dark:text-accent-400" />
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">Advanced Settings</h3>
            </div>
            {expandedSections.advanced ? (
              <ChevronDownIcon className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronRightIcon className="w-4 h-4 text-slate-500" />
            )}
          </button>
        </CardHeader>
        
        <AnimatePresence>
          {expandedSections.advanced && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <CardContent>
                <div className="space-y-4">
                  {/* Model Selection */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Model
                    </label>
                    <select
                      value={model}
                      onChange={(e) => onModelChange(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    >
                      {currentService?.models.map((modelOption) => (
                        <option key={modelOption} value={modelOption}>
                          {modelOption}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Temperature Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Creativity
                      </label>
                      <Tooltip content="Higher values make responses more creative but less focused">
                        <span className="text-sm text-slate-500 dark:text-slate-400 font-mono">
                          {temperature.toFixed(1)}
                        </span>
                      </Tooltip>
                    </div>
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={temperature}
                        onChange={(e) => onTemperatureChange(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                        <span>Focused</span>
                        <span>Creative</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Status Card */}
      <Card className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-primary-200 dark:border-primary-800">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 flex items-center justify-center text-white shadow-lg">
              {currentService?.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-slate-900 dark:text-slate-100 truncate">
                {currentService?.name}
              </h4>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  {requiresApiKey && !apiKey ? 'API Key Required' : 'Ready'}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}