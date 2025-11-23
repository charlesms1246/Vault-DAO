'use client';

import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  variant?: 'default' | 'glow-red' | 'glow-gold' | 'luxury';
  onClick?: () => void;
}

export function Card({ 
  children, 
  className, 
  hover = false, 
  variant = 'default',
  onClick 
}: CardProps) {
  const Component = onClick ? motion.button : motion.div;

  const variantStyles = {
    'default': 'bg-luxury-dark-800/90 border-2 border-blood-red-500/30',
    'glow-red': 'bg-luxury-dark-800/90 border-2 border-blood-red-500 shadow-red-glow',
    'glow-gold': 'bg-luxury-dark-800/90 border-2 border-gold-500 shadow-gold-glow',
    'luxury': 'bg-luxury-dark-800/90 border-2 border-transparent bg-gradient-to-br from-blood-red-500/50 via-gold-500/50 to-blood-red-500/50 bg-clip-padding',
  };

  return (
    <Component
      onClick={onClick}
      className={clsx(
        'glass rounded-none p-6 backdrop-blur-xl relative overflow-hidden',
        variantStyles[variant],
        hover && 'card-hover cursor-pointer transition-all duration-300 hover:border-blood-red-500',
        className
      )}
      whileHover={hover ? { scale: 1.01 } : undefined}
      whileTap={onClick ? { scale: 0.99 } : undefined}
    >
      {variant === 'luxury' && (
        <div className="absolute inset-[2px] bg-luxury-dark-800/95 rounded-none z-0" />
      )}
      <div className="relative z-10">{children}</div>
    </Component>
  );
}