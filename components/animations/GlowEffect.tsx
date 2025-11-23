'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GlowEffectProps {
  children: React.ReactNode;
  color?: string;
  intensity?: number;
}

export function GlowEffect({ 
  children, 
  color = '#eab308', 
  intensity = 0.8 
}: GlowEffectProps) {
  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="absolute inset-0 rounded-none blur-xl"
        style={{
          background: color,
          opacity: intensity,
        }}
        animate={{
          opacity: [intensity * 0.5, intensity, intensity * 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}