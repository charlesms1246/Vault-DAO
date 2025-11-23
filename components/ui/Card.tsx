'use client';

import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  gradient?: boolean;
  onClick?: () => void;
}

export function Card({ 
  children, 
  className, 
  hover = false, 
  glow = false,
  gradient = false,
  onClick 
}: CardProps) {
  const Component = onClick ? motion.button : motion.div;

  return (
    <Component
      onClick={onClick}
      className={clsx(
        'glass rounded-xl p-6',
        hover && 'card-hover cursor-pointer',
        glow && 'shadow-neon-cyan',
        className
      )}
      whileHover={hover ? { scale: 1.02 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
    >
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/10 via-cyber-purple/10 to-cyber-pink/10 rounded-xl opacity-50" />
      )}
      <div className="relative z-10">{children}</div>
    </Component>
  );
}