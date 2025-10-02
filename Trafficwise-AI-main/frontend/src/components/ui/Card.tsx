'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  gradient?: boolean;
  onClick?: () => void;
}

export function Card({ 
  children, 
  className = '', 
  hover = false, 
  glow = false, 
  gradient = false,
  onClick 
}: CardProps) {
  const baseStyles = `
    bg-white dark:bg-slate-800 
    border border-slate-200 dark:border-slate-700 
    rounded-xl 
    shadow-sm dark:shadow-slate-900/20
    ${gradient ? 'bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900' : ''}
    ${glow ? 'shadow-lg shadow-primary-500/10 dark:shadow-primary-400/10' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  const hoverStyles = hover ? `
    hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50
    hover:border-slate-300 dark:hover:border-slate-600
    hover:-translate-y-1
    transition-all duration-300 ease-out
  ` : '';

  if (onClick) {
    return (
      <motion.div
        className={`${baseStyles} ${hoverStyles}`}
        onClick={onClick}
        whileHover={{ scale: hover ? 1.02 : 1 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`${baseStyles} ${hoverStyles}`}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`p-6 pb-0 ${className}`}>
      {children}
    </div>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  );
}