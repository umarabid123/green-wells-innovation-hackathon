'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BellIcon, 
  CheckIcon, 
  TrashIcon,
  FunnelIcon,
  MagnifyingGlassIcon 
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

// Notification interface (same as in Navigation.tsx)
interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: 'traffic' | 'route' | 'system' | 'alert';
  icon: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Traffic Alert',
      message: 'Heavy traffic detected on M-2 Motorway near Lahore. Consider alternate route via GT Road.',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      read: false,
      type: 'traffic',
      icon: '🚦'
    },
    {
      id: '2',
      title: 'Route Updated',
      message: 'Better route found for Lahore to Islamabad - Save 15 minutes by taking Ring Road.',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      read: false,
      type: 'route',
      icon: '🛣️'
    },
    {
      id: '3',
      title: 'System Update',
      message: 'New traffic prediction model deployed with improved accuracy. Experience better route suggestions.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true,
      type: 'system',
      icon: '⚙️'
    },
    {
      id: '4',
      title: 'Speed Camera Alert',
      message: 'Speed camera detected ahead on Motorway M-1 near Islamabad exit.',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      read: true,
      type: 'alert',
      icon: '📷'
    },
    {
      id: '5',
      title: 'Route Optimization',
      message: 'Your daily commute route has been optimized. Check the new suggested path.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: true,
      type: 'route',
      icon: '🎯'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'traffic' | 'route' | 'system' | 'alert'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter(n => !n.read).length;

  // Mark all as read
  const markAllAsRead = () => {
    const unreadNotifications = notifications.filter(n => !n.read);
    if (unreadNotifications.length === 0) {
      toast.success('No unread notifications');
      return;
    }
    
    setNotifications(prev => prev.map(notification => ({
      ...notification,
      read: true
    })));
    
    toast.success(`Marked ${unreadNotifications.length} notification${unreadNotifications.length > 1 ? 's' : ''} as read`);
  };

  // Mark individual as read
  const markAsRead = (id: string) => {
    const notification = notifications.find(n => n.id === id);
    if (!notification || notification.read) {
      toast.error('Notification is already read');
      return;
    }
    
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
    
    toast.success('Notification marked as read');
  };

  // Delete notification
  const deleteNotification = (id: string) => {
    const notification = notifications.find(n => n.id === id);
    if (!notification) return;
    
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.success('Notification deleted');
  };

  // Format timestamp
  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'unread' && !notification.read) ||
                         notification.type === filter;
    
    const matchesSearch = searchQuery === '' || 
                         notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <BellIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  Notifications
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  {unreadCount} unread notifications
                </p>
              </div>
            </div>
            
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <CheckIcon className="h-4 w-4" />
                <span>Mark all as read</span>
              </button>
            )}
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <FunnelIcon className="h-5 w-5 text-slate-500" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="unread">Unread</option>
                <option value="traffic">Traffic</option>
                <option value="route">Route</option>
                <option value="system">System</option>
                <option value="alert">Alert</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <BellIcon className="h-16 w-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <p className="text-lg text-slate-500 dark:text-slate-400">
                {searchQuery || filter !== 'all' ? 'No notifications match your criteria' : 'No notifications yet'}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white dark:bg-slate-800 rounded-lg shadow-sm border-l-4 ${
                  notification.read 
                    ? 'border-slate-300 dark:border-slate-600 opacity-75' 
                    : 'border-blue-500 dark:border-blue-400'
                } hover:shadow-md transition-all duration-200`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <span className="text-2xl flex-shrink-0 mt-1">{notification.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className={`text-lg font-semibold ${
                            notification.read 
                              ? 'text-slate-600 dark:text-slate-400' 
                              : 'text-slate-900 dark:text-slate-100'
                          }`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            notification.type === 'traffic' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                            notification.type === 'route' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                            notification.type === 'system' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                            'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400'
                          }`}>
                            {notification.type}
                          </span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 mb-3">
                          {notification.message}
                        </p>
                        <p className="text-sm text-slate-400 dark:text-slate-500">
                          {formatTimestamp(notification.timestamp)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-2 text-slate-400 hover:text-green-600 transition-colors"
                          title="Mark as read"
                        >
                          <CheckIcon className="h-5 w-5" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                        title="Delete notification"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}