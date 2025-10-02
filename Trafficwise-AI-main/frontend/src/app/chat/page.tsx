'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import ModernChatInterface from '../../components/ModernChatInterface';
import ModernSidebar from '../../components/ModernSidebar';
import { ChatMessage, AIServiceType } from '@/types';
import apiService from '@/services/api';

export default function ChatPage() {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAIService, setCurrentAIService] = useState<AIServiceType>('google_gemini');
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gemini-pro');
  const [temperature, setTemperature] = useState(0.7);

  // Load saved settings from localStorage
  useEffect(() => {
    const savedService = localStorage.getItem('aiService') as AIServiceType;
    const savedApiKey = localStorage.getItem('apiKey');
    const savedModel = localStorage.getItem('model');
    const savedTemp = localStorage.getItem('temperature');
    
    if (savedService) setCurrentAIService(savedService);
    if (savedApiKey) setApiKey(savedApiKey);
    if (savedModel) setModel(savedModel);
    if (savedTemp) setTemperature(parseFloat(savedTemp));

    // Add welcome message
    const welcomeMessage: ChatMessage = {
      id: 'welcome',
      role: 'assistant',
      content: `Welcome to TrafficWise AI! 🚦\n\nI'm your intelligent traffic assistant, ready to help you with:\n\n🚥 **Traffic Conditions** - Current status in major cities\n🛣️ **Route Planning** - Best routes and alternatives  \n⏰ **Travel Timing** - When to avoid peak hours\n🅿️ **Parking Advice** - Finding spots in busy areas\n🚌 **Public Transport** - Alternative options\n\n*Currently running in offline mode with helpful traffic insights. Configure API settings in the sidebar for enhanced features.*\n\nWhat would you like to know about traffic today?`,
      timestamp: new Date(),
    };
    setChatHistory([welcomeMessage]);
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('aiService', currentAIService);
    localStorage.setItem('apiKey', apiKey);
    localStorage.setItem('model', model);
    localStorage.setItem('temperature', temperature.toString());
  }, [currentAIService, apiKey, model, temperature]);

  const generateOfflineResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    // Traffic-related keywords and responses
    if (lowerMessage.includes('lahore') || lowerMessage.includes('karachi') || lowerMessage.includes('islamabad')) {
      const cities = {
        lahore: 'Lahore currently has moderate traffic on main routes. Consider using Ring Road for faster travel. Peak hours are 8-10 AM and 5-7 PM.',
        karachi: 'Karachi traffic is heavy on Shahrah-e-Faisal and II Chundrigar Road. Try using Clifton Bridge or Northern Bypass for alternative routes.',
        islamabad: 'Islamabad has light to moderate traffic. The Expressway and Kashmir Highway are your best options for quick travel across the city.'
      };
      
      for (const [city, advice] of Object.entries(cities)) {
        if (lowerMessage.includes(city)) {
          return `🚦 **${city.charAt(0).toUpperCase() + city.slice(1)} Traffic Update**\n\n${advice}\n\n💡 **Quick Tips:**\n• Use navigation apps for real-time updates\n• Avoid peak hours when possible\n• Consider carpooling or public transport`;
        }
      }
    }
    
    if (lowerMessage.includes('route') || lowerMessage.includes('best way') || lowerMessage.includes('fastest')) {
      return `🛣️ **Route Planning Assistance**\n\nFor optimal route planning, I recommend:\n\n1. **Check current traffic conditions** before departing\n2. **Use alternative routes** during peak hours\n3. **Consider departure time** - leaving 30 minutes earlier/later can save significant time\n4. **Monitor weather conditions** as they affect traffic flow\n\nWould you like specific route advice for particular cities?`;
    }
    
    if (lowerMessage.includes('traffic') || lowerMessage.includes('congestion') || lowerMessage.includes('jam')) {
      return `🚥 **Traffic Management Tips**\n\nHere are some general traffic insights:\n\n• **Peak Hours**: 7-10 AM and 5-8 PM on weekdays\n• **Best Times**: 10 AM - 4 PM and after 8 PM\n• **Weekends**: Generally lighter traffic except near shopping areas\n• **Rainy Days**: Expect 20-30% longer travel times\n\n📍 Which specific area or route would you like advice about?`;
    }
    
    if (lowerMessage.includes('parking') || lowerMessage.includes('park')) {
      return `🅿️ **Parking Guidance**\n\n**Commercial Areas:**\n• Arrive before 9 AM for better spots\n• Consider paid parking for convenience\n• Look for multi-story parking facilities\n\n**Shopping Centers:**\n• Weekday mornings are best\n• Upper floors usually have more space\n• Check for time limits\n\n**Pro Tip:** Use parking apps to find and reserve spots in advance!`;
    }
    
    if (lowerMessage.includes('time') || lowerMessage.includes('duration') || lowerMessage.includes('how long')) {
      return `⏱️ **Travel Time Estimates**\n\nTraffic conditions vary throughout the day:\n\n**Off-Peak (10 AM - 4 PM):**\n• Short distances (< 5km): 15-20 minutes\n• Medium distances (5-15km): 25-40 minutes\n• Long distances (> 15km): 45+ minutes\n\n**Peak Hours:**\n• Add 50-100% extra time\n• Plan alternative routes\n\nFor specific routes, please mention your start and end points!`;
    }
    
    if (lowerMessage.includes('public transport') || lowerMessage.includes('bus') || lowerMessage.includes('metro')) {
      return `🚌 **Public Transport Options**\n\n**Metro/BRT Systems:**\n• Lahore: Orange Line Metro\n• Islamabad/Rawalpindi: Metro Bus\n• Karachi: Green Line BRT\n\n**Benefits:**\n• Avoid traffic congestion\n• Cost-effective\n• Environmentally friendly\n• Predictable travel times\n\n**Tips:**\n• Check schedules and routes\n• Keep exact change ready\n• Travel during off-peak for comfort`;
    }
    
    // Default helpful response
    return `🤖 **TrafficWise AI Assistant**\n\nI'm here to help with traffic and transportation queries! I can assist you with:\n\n🚦 **Traffic Conditions** - Current traffic status in major cities\n🛣️ **Route Planning** - Best routes and alternatives\n⏰ **Timing Advice** - When to travel for minimal delays\n🅿️ **Parking Tips** - Finding parking in busy areas\n🚌 **Public Transport** - Alternative transportation options\n\n*Note: Currently running in offline mode. For real-time data, please configure your API settings in the sidebar.*\n\nWhat would you like to know about traffic today?`;
  };

  const handleSendMessage = async (message: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    };

    setChatHistory(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Try to send message to API first
      const response = await apiService.chatWithAI({
        message,
        service_type: currentAIService,
        api_key: apiKey || undefined,
        config: {
          service_type: currentAIService,
          model,
          temperature,
          api_key: apiKey || undefined,
        },
      });

      // Add AI response to chat
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.response,
        timestamp: new Date(),
      };

      setChatHistory(prev => [...prev, aiMessage]);
      toast.success('Response received!');
    } catch (error) {
      console.error('Chat error:', error);
      
      // Fallback to offline response
      const offlineResponse = generateOfflineResponse(message);
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: offlineResponse,
        timestamp: new Date(),
      };

      setChatHistory(prev => [...prev, aiMessage]);
      toast.success('Offline response provided');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            AI Traffic <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Assistant</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Get intelligent traffic insights powered by advanced AI models
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ModernSidebar
                currentAIService={currentAIService}
                onAIServiceChange={setCurrentAIService}
                apiKey={apiKey}
                onApiKeyChange={setApiKey}
                model={model}
                onModelChange={setModel}
                temperature={temperature}
                onTemperatureChange={setTemperature}
              />
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <ModernChatInterface
              messages={chatHistory}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              placeholder="Ask about traffic conditions, routes, or any transportation query..."
            />
          </div>
        </div>

        {/* Quick Start Tips */}
        <div className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 text-center">
            Quick Start Tips
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🗣️',
                title: 'Ask About Traffic',
                description: 'Get real-time traffic updates for any Pakistani city',
                example: '"What\'s the traffic like in Karachi right now?"'
              },
              {
                icon: '🛣️',
                title: 'Plan Routes',
                description: 'Find the best routes and avoid congestion',
                example: '"Best route from Lahore to Islamabad"'
              },
              {
                icon: '📊',
                title: 'Get Insights',
                description: 'Understand traffic patterns and peak hours',
                example: '"When are the peak traffic hours in Karachi?"'
              }
            ].map((tip, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow duration-200"
              >
                <div className="text-3xl mb-3">{tip.icon}</div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  {tip.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                  {tip.description}
                </p>
                <code className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded">
                  {tip.example}
                </code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}