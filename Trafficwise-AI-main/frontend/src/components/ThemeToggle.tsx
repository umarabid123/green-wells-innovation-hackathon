'use client';

import { useTheme } from './ThemeProvider';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { name: 'light', icon: SunIcon, label: 'Light' },
    { name: 'dark', icon: MoonIcon, label: 'Dark' },
    { name: 'system', icon: ComputerDesktopIcon, label: 'System' },
  ] as const;

  return (
    <div className="relative">
      <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
        {themes.map((t) => {
          const Icon = t.icon;
          const isActive = theme === t.name;
          
          return (
            <button
              key={t.name}
              onClick={() => setTheme(t.name)}
              className={`relative flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200 ${
                isActive
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
              title={t.label}
            >
              {isActive && (
                <motion.div
                  layoutId="theme-indicator"
                  className="absolute inset-0 bg-white dark:bg-slate-700 rounded-md shadow-sm"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <Icon className="relative w-4 h-4" />
            </button>
          );
        })}
      </div>
    </div>
  );
}