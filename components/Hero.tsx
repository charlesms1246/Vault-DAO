'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { GlowEffect } from '@/components/animations/GlowEffect';
import { Flame, ArrowRight, Shield, Zap, Globe } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: <Shield className="w-5 h-5" />,
    text: 'Censorship Resistant',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    text: 'Real-time On-chain Data',
  },
  {
    icon: <Globe className="w-5 h-5" />,
    text: 'IPFS + ENS Powered',
  },
];

export function Hero() {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-dark via-luxury-dark-800 to-luxury-dark" />
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.2) 0%, transparent 50%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="bg-luxury-dark-800/80 backdrop-blur-xl px-4 py-2 rounded-none border-2 border-gold-500 inline-flex items-center gap-2">
              <div className="w-2 h-2 rounded-none bg-gold-500 animate-pulse" />
              <span className="text-sm font-mono text-gold-500 uppercase tracking-wider font-bold">
                Built for PinMe DeFront Hackathon
              </span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Your DAO Treasury
            <br />
            <span className="gradient-text">Deserves Immortality</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Censorship-resistant governance dashboards with real-time treasury analytics, proposal voting, and token distribution insights. Deployed permanently on IPFS + ENS.
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-gray-300"
              >
                <div className="w-8 h-8 rounded-none bg-luxury-dark-800 border-2 border-gold-500 flex items-center justify-center text-gold-500">
                  {feature.icon}
                </div>
                <span className="font-medium uppercase tracking-wide">{feature.text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <GlowEffect color="#eab308" intensity={0.8}>
              <Link href="/explore">
                <Button variant="gold" size="lg" icon={<Flame className="w-5 h-5" />}>
                  Explore DAOs
                </Button>
              </Link>
            </GlowEffect>

            <Link href="/create">
              <Button variant="secondary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                Create Dashboard
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { value: '5+', label: 'Featured DAOs' },
              { value: '100%', label: 'Uptime' },
              { value: '∞', label: 'Permanence' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 rounded-none bg-blood-red-500/10 blur-2xl"
        animate={{
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 rounded-none bg-gold-500/10 blur-2xl"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}