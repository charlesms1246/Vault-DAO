'use client';

import React from 'react';
import clsx from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({ 
  children, 
  variant = 'default', 
  size = 'md',
  className 
}: BadgeProps) {
  const variantStyles = {
    default: 'bg-luxury-dark-700 text-white border-blood-red-500/50',
    success: 'bg-gold-500/20 text-gold-400 border-gold-500',
    warning: 'bg-gold-600/20 text-gold-300 border-gold-600',
    danger: 'bg-blood-red-500/20 text-blood-red-400 border-blood-red-500',
    info: 'bg-blood-red-900/50 text-blood-red-300 border-blood-red-600',
    gold: 'bg-gold-500 text-luxury-dark-900 border-gold-600 shadow-gold-glow',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-none border-2 font-mono font-bold uppercase tracking-wider',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}