'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChatbubbleEllipsesOutline, IoClose, IoSend, IoTrashOutline } from 'react-icons/io5';
import { toast } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import TypingAnimation from './TypingAnimation';
import { ChatMessage, AIServiceType } from '@/types';
import apiService from '@/services/api';

interface FloatingChatProps {
  className?: string;
}

export default function FloatingChat({ className = '' }: FloatingChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [message, setMessage] = useState('');
  const [currentAIService, setCurrentAIService] = useState<AIServiceType>('google_gemini');
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gemini-pro');
  const [temperature, setTemperature] = useState(0.7);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load saved settings from localStorage and detect mobile
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedService = localStorage.getItem('aiService') as AIServiceType;
      const savedApiKey = localStorage.getItem('apiKey');
      const savedModel = localStorage.getItem('model');
      const savedTemp = localStorage.getItem('temperature');
      
      if (savedService) setCurrentAIService(savedService);
      if (savedApiKey) setApiKey(savedApiKey);
      if (savedModel) setModel(savedModel);
      if (savedTemp) setTemperature(parseFloat(savedTemp));

      // Check if mobile
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isLoading]);

  // Initialize welcome message when first opened
  useEffect(() => {
    if (isOpen && chatHistory.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        role: 'assistant',
        content: `# Welcome to TrafficWise AI! 🚦

I'm your intelligent traffic assistant for Pakistan. Ask me about:

- **🚥 Traffic Conditions** - Current status in major cities
- **🛣️ Route Planning** - Best routes and alternatives  
- **⏰ Travel Timing** - When to avoid peak hours
- **🅿️ Parking Advice** - Finding spots in busy areas
- **🚌 Public Transport** - Alternative options

**What would you like to know about traffic today?**`,
        timestamp: new Date(),
      };
      setChatHistory([welcomeMessage]);
    }
  }, [isOpen, chatHistory.length]);

  const generateOfflineResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    // Enhanced offline responses with markdown formatting
    if (lowerMessage.includes('lahore') || lowerMessage.includes('karachi') || lowerMessage.includes('islamabad')) {
      const cities = {
        lahore: `# 🚦 Lahore Traffic Update

**Current Conditions**: Moderate traffic on main routes

- **🛣️ Best Routes**: Ring Road for faster cross-city travel
- **⏰ Peak Hours**: 8-10 AM and 5-7 PM (avoid if possible)  
- **🚗 Alternative Routes**: Canal Road, Jail Road during rush
- **💡 Pro Tip**: Use Waze/Google Maps for real-time updates`,

        karachi: `# 🌊 Karachi Traffic Update

**Current Conditions**: Heavy traffic on major arteries

- **🚨 Avoid**: Shahrah-e-Faisal during 7-10 AM
- **✅ Better Options**: Clifton Bridge, Northern Bypass
- **⏰ Rush Hours**: 8-11 AM and 4-8 PM
- **🛣️ Alternative**: Use Lyari Expressway for north-south travel`,

        islamabad: `# 🏛️ Islamabad Traffic Update

**Current Conditions**: Light to moderate traffic

- **🚗 Main Routes**: Expressway and Kashmir Highway
- **✅ Traffic Flow**: Generally smooth outside peak hours
- **⏰ Peak Times**: 8-9 AM and 5-6 PM (government offices)
- **🅿️ Parking**: Centaurus, F-6/7 markets can be busy`
      };
      
      for (const [city, response] of Object.entries(cities)) {
        if (lowerMessage.includes(city)) {
          return response;
        }
      }
    }
    
    if (lowerMessage.includes('route') || lowerMessage.includes('best way') || lowerMessage.includes('fastest')) {
      return `# 🛣️ Route Planning Guide

**Smart Route Selection**:

- **📱 Check Apps**: Waze, Google Maps for live traffic
- **⏰ Time Strategy**: Leave 30 min earlier/later to avoid rush
- **🌦️ Weather Factor**: Rain increases travel time by 30%
- **🚗 Alternative Routes**: Always have 2-3 backup options

**Which specific route do you need help with?**`;
    }
    
    if (lowerMessage.includes('traffic') || lowerMessage.includes('congestion') || lowerMessage.includes('jam')) {
      return `# 🚥 Traffic Management Tips

**Peak Traffic Hours in Pakistan**:

- **🌅 Morning Rush**: 7:30-10:00 AM
- **🌆 Evening Rush**: 4:30-8:00 PM  
- **✅ Best Times**: 10 AM-4 PM, after 8 PM
- **📅 Weekends**: Shopping areas busy 4-10 PM

**� Which city or route needs traffic advice?**`;
    }
    
    // Default helpful response
    return `# 🤖 TrafficWise AI Assistant

**I can help you with**:

- **🚦 Traffic Conditions** - Real-time status updates
- **🛣️ Route Planning** - Best paths and alternatives  
- **⏰ Timing Advice** - When to travel for less traffic
- **🅿️ Parking Tips** - Finding spots in busy areas
- **🚌 Public Transport** - Alternative travel options

**💡 Try asking**: *"What's the traffic like in Lahore?"*

*Currently in offline mode. Configure API settings for enhanced responses.*`;
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    };

    setChatHistory(prev => [...prev, userMessage]);
    const currentMessage = message;
    setMessage('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      let response;
      
      // Try to call our API route
      const apiResponse = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentMessage,
          api_key: apiKey || undefined,
        }),
      });

      if (apiResponse.ok) {
        const data = await apiResponse.json();
        response = data.response;
      } else {
        throw new Error('API request failed');
      }

      // Simulate typing delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Add AI response to chat
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setChatHistory(prev => [...prev, aiMessage]);
      toast.success('Response received!');
    } catch (error) {
      console.error('Chat error:', error);
      
      // Fallback to offline response
      const offlineResponse = generateOfflineResponse(currentMessage);
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: offlineResponse,
        timestamp: new Date(),
      };

      setChatHistory(prev => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  };

  const clearChat = () => {
    setChatHistory([]);
    toast.success('Chat cleared!');
  };

  // Component for rendering markdown messages
  const MessageContent = ({ content, isUser }: { content: string; isUser: boolean }) => {
    if (isUser) {
      return <div className="whitespace-pre-wrap break-words">{content}</div>;
    }
    
    return (
      <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:text-sm prose-headings:font-semibold prose-headings:mt-3 prose-headings:mb-2 prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 prose-strong:text-slate-900 dark:prose-strong:text-slate-100">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({children}) => <h1 className="text-sm font-semibold mt-2 mb-1 text-slate-900 dark:text-slate-100">{children}</h1>,
            h2: ({children}) => <h2 className="text-sm font-semibold mt-2 mb-1 text-slate-900 dark:text-slate-100">{children}</h2>,
            h3: ({children}) => <h3 className="text-sm font-medium mt-1 mb-1 text-slate-900 dark:text-slate-100">{children}</h3>,
            ul: ({children}) => <ul className="list-disc list-inside space-y-0.5 my-1">{children}</ul>,
            li: ({children}) => <li className="text-xs leading-relaxed">{children}</li>,
            p: ({children}) => <p className="my-1 leading-relaxed">{children}</p>,
            strong: ({children}) => <strong className="font-semibold text-slate-900 dark:text-slate-100">{children}</strong>,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  };

  return (
    <>
      {/* Desktop/Tablet View */}
      {!isMobile && (
        <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
          {/* Chat Window */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ type: "spring", duration: 0.3 }}
                className="mb-4 w-80 sm:w-96 h-[32rem] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden"
              >
                {/* Chat Header with Gradient */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
                  <div className="flex items-center space-x-2">
                    <IoChatbubbleEllipsesOutline className="h-5 w-5" />
                    <h3 className="font-semibold tracking-wide">TrafficWise AI</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={clearChat}
                      className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                      title="Clear Chat"
                    >
                      <IoTrashOutline className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                      title="Close"
                    >
                      <IoClose className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600">
                  {chatHistory.map((msg) => (
                    <motion.div 
                      key={msg.id} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm shadow-sm ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-md'
                            : 'bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-bl-md border border-slate-200 dark:border-slate-600'
                        }`}
                      >
                        <MessageContent content={msg.content} isUser={msg.role === 'user'} />
                        <div className={`text-xs mt-2 opacity-70 ${
                          msg.role === 'user' ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                        }`}>
                          {msg.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-slate-50 dark:bg-slate-700 px-4 py-3 rounded-2xl rounded-bl-md border border-slate-200 dark:border-slate-600">
                        <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-xs">TrafficWise is typing...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Enhanced Chat Input */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-end space-x-3">
                    <div className="flex-1">
                      <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                          adjustTextareaHeight();
                        }}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask about traffic conditions in Pakistan..."
                        className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-full resize-none text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        rows={1}
                        style={{ minHeight: '48px', maxHeight: '120px' }}
                      />
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={!message.trim() || isLoading}
                      className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                    >
                      <IoSend className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 text-center">
                    Press Enter to send • Shift+Enter for new line
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Floating Chat Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="w-16 h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 ring-4 ring-white/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <IoClose className="h-7 w-7" />
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <IoChatbubbleEllipsesOutline className="h-7 w-7" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      )}

      {/* Mobile Full-Screen Modal */}
      {isMobile && (
        <>
          {/* Mobile Chat Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="fixed bottom-4 right-4 z-50 w-14 h-14 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white rounded-full shadow-xl flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.5 }}
          >
            <IoChatbubbleEllipsesOutline className="h-6 w-6" />
          </motion.button>

          {/* Mobile Full-Screen Chat */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-white dark:bg-slate-900 flex flex-col"
              >
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
                  <div className="flex items-center space-x-2">
                    <IoChatbubbleEllipsesOutline className="h-6 w-6" />
                    <h3 className="font-semibold text-lg">TrafficWise AI</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={clearChat}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <IoTrashOutline className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <IoClose className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Mobile Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatHistory.map((msg) => (
                    <motion.div 
                      key={msg.id} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm shadow-sm ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-md'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-md border border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        <MessageContent content={msg.content} isUser={msg.role === 'user'} />
                        <div className={`text-xs mt-2 opacity-70 ${
                          msg.role === 'user' ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                        }`}>
                          {msg.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-slate-50 dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-md">
                        <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-xs">TrafficWise is typing...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Mobile Chat Input */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                  <div className="flex items-end space-x-3">
                    <div className="flex-1">
                      <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                          adjustTextareaHeight();
                        }}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask about traffic conditions..."
                        className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-full resize-none text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={1}
                        style={{ minHeight: '48px', maxHeight: '120px' }}
                      />
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={!message.trim() || isLoading}
                      className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-lg"
                    >
                      <IoSend className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 text-center">
                    Press Enter to send • Shift+Enter for new line
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
}