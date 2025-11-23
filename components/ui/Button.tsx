'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

interface ButtonProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'gold' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  fullWidth = false,
  className,
  disabled,
  onClick,
  type = 'button',
  ...props
}: ButtonProps) {
  const baseStyles = 'font-bold rounded-none transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wider border-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-blood-red-500 hover:bg-blood-red-600 text-white border-blood-red-600 shadow-red-glow hover:shadow-red-glow-lg active:scale-95',
    gold: 'bg-gold-500 hover:bg-gold-600 text-luxury-dark-900 border-gold-600 shadow-gold-glow hover:shadow-gold-glow-lg active:scale-95',
    secondary: 'bg-transparent hover:bg-blood-red-500/10 text-blood-red-500 border-blood-red-500 hover:border-blood-red-400 active:scale-95',
    ghost: 'bg-transparent hover:bg-blood-red-500/10 text-white border-blood-red-500/30 hover:border-blood-red-500 active:scale-95',
    danger: 'bg-blood-red-700 hover:bg-blood-red-800 text-white border-blood-red-800 shadow-red-glow active:scale-95',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        (disabled || loading) && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && icon}
          {children}
        </>
      )}
    </motion.button>
  );
}