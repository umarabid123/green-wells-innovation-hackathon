'use client';

import { useState } from 'react';
import { ChatMessage, AIServiceType } from '@/types';

interface ChatInterfaceProps {
  chatHistory: ChatMessage[];
  onSendMessage: (message: string) => void;
  onClearChat: () => void;
  isLoading: boolean;
  currentService: AIServiceType;
  apiKey: string;
}

export default function ChatInterface({
  chatHistory,
  onSendMessage,
  onClearChat,
  isLoading,
  currentService,
  apiKey,
}: ChatInterfaceProps) {
  const [inputMessage, setInputMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() && !isLoading) {
      onSendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const formatMessage = (content: string) => {
    // Simple message formatting for markdown-like content
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br />');
  };

  const getServiceStatus = () => {
    if (currentService === 'google_gemini' && !apiKey) {
      return '⚠️ Please enter your Gemini API key in the sidebar';
    }
    if (currentService === 'openai' && !apiKey) {
      return '⚠️ Please enter your OpenAI API key in the sidebar';
    }
    return `✅ ${currentService.replace('_', ' ').toUpperCase()} connected`;
  };

  return (
    <div className="card space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          💬 AI Traffic Assistant
        </h2>
        <button
          onClick={onClearChat}
          disabled={isLoading || chatHistory.length === 0}
          className="btn-secondary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🗑️ Clear Chat
        </button>
      </div>

      {/* Service Status */}
      <div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
        {getServiceStatus()}
      </div>

      {/* Chat History */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {chatHistory.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-4">🤖</div>
            <p className="text-lg font-medium mb-2">Welcome to TrafficWise AI!</p>
            <p className="text-sm">
              Ask about traffic routes, urban planning, or congestion solutions in Pakistan
            </p>
            <div className="mt-4 text-xs text-gray-400">
              Example: "Best route from Lahore to Islamabad during peak hours?"
            </div>
          </div>
        ) : (
          chatHistory.map((message) => (
            <div
              key={message.id}
              className={`chat-message ${message.role}`}
            >
              <div className="flex items-start space-x-3">
                <div className="text-lg">
                  {message.role === 'user' ? '👤' : '🚦'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-gray-900">
                      {message.role === 'user' ? 'You' : 'TrafficWise AI'}
                    </span>
                    {message.service_used && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {message.service_used}
                      </span>
                    )}
                    <span className="text-xs text-gray-400">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div
                    className="prose prose-sm max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: formatMessage(message.content),
                    }}
                  />
                </div>
              </div>
            </div>
          ))
        )}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="chat-message assistant">
            <div className="flex items-start space-x-3">
              <div className="text-lg">🚦</div>
              <div className="flex-1">
                <div className="font-medium text-gray-900 mb-2">
                  TrafficWise AI
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <div className="spinner"></div>
                  <span>Analyzing traffic patterns with AI...</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex space-x-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about traffic routes, urban planning, or congestion solutions in Pakistan..."
            className="input-field flex-1"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="spinner"></div>
                <span>Sending</span>
              </div>
            ) : (
              'Send'
            )}
          </button>
        </div>
        
        {/* Quick suggestions */}
        <div className="flex flex-wrap gap-2">
          {[
            'Best route from Lahore to Islamabad?',
            'Traffic situation in Karachi?',
            'Public transport options in Lahore?',
            'Avoid congestion in Rawalpindi?',
          ].map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => setInputMessage(suggestion)}
              disabled={isLoading}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors duration-200 disabled:opacity-50"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}
