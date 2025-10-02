'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaperAirplaneIcon, MicrophoneIcon, StopIcon } from '@heroicons/react/24/outline';
import { Button } from './ui/Button';
import { Card, CardContent } from './ui/Card';
import { LoadingSpinner, TypingIndicator } from './ui/LoadingSpinner';
import { ChatMessage } from '@/types';

interface ModernChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
}

export default function ModernChatInterface({
  messages,
  onSendMessage,
  isLoading = false,
  placeholder = "Ask about traffic conditions, routes, or any transportation query...",
  className = ''
}: ModernChatInterfaceProps) {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsListening(!isListening);
      // Voice recognition implementation would go here
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(timestamp);
  };

  return (
    <Card className={`flex flex-col h-[600px] ${className}`} glow>
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-t-xl">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">AI Traffic Assistant</h3>
          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full font-medium">
            Online
          </span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-800/50 dark:to-slate-900">
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
                {/* Message Bubble */}
                <div
                  className={`rounded-2xl px-4 py-3 shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white ml-4'
                      : 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 mr-4 border border-slate-200 dark:border-slate-600'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
                
                {/* Timestamp */}
                <div className={`text-xs text-slate-500 dark:text-slate-400 mt-1 px-2 ${
                  msg.role === 'user' ? 'text-right' : 'text-left'
                }`}>
                  {formatTimestamp(msg.timestamp)}
                </div>
              </div>

              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                msg.role === 'user' 
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 order-1 mr-2' 
                  : 'bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 order-2 ml-2'
              }`}>
                {msg.role === 'user' ? '👤' : '🤖'}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 flex items-center justify-center text-sm">
                🤖
              </div>
              <div className="bg-white dark:bg-slate-700 rounded-2xl px-4 py-3 border border-slate-200 dark:border-slate-600">
                <TypingIndicator />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-b-xl">
        <form onSubmit={handleSubmit} className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleTextareaChange}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              rows={1}
              className="w-full px-4 py-3 pr-12 border border-slate-200 dark:border-slate-600 rounded-xl resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 transition-all duration-200 max-h-32"
              disabled={isLoading}
            />
            
            {/* Voice Input Button */}
            <button
              type="button"
              onClick={toggleVoiceInput}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all duration-200 ${
                isListening 
                  ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20' 
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'
              }`}
              disabled={isLoading}
            >
              {isListening ? (
                <StopIcon className="w-5 h-5" />
              ) : (
                <MicrophoneIcon className="w-5 h-5" />
              )}
            </button>
          </div>
          
          <Button
            type="submit"
            disabled={!message.trim() || isLoading}
            loading={isLoading}
            size="md"
            className="px-4 py-3"
            icon={<PaperAirplaneIcon className="w-4 h-4" />}
            iconPosition="right"
          >
            Send
          </Button>
        </form>
        
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mt-3">
          {[
            'Traffic status in Karachi',
            'Best route to Lahore',
            'Peak hours today',
            'Alternative routes'
          ].map((quickMessage) => (
            <button
              key={quickMessage}
              onClick={() => !isLoading && onSendMessage(quickMessage)}
              disabled={isLoading}
              className="px-3 py-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 text-xs rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
              {quickMessage}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}