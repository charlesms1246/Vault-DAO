'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Home, Search, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-dark via-luxury-dark-800 to-luxury-dark" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blood-red-500/10 rounded-none blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-500/10 rounded-none blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Error Code */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-9xl font-bold text-luxury mb-4 tracking-wider">
              404
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-blood-red-500 via-gold-500 to-blood-red-500 mx-auto" />
          </motion.div>

          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-luxury-dark-800 border-4 border-blood-red-500 rounded-none flex items-center justify-center mx-auto shadow-red-glow">
              <AlertTriangle className="w-12 h-12 text-blood-red-500" />
            </div>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 uppercase tracking-wider">
              Page Not Found
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The page you're looking for doesn't exist or has been moved to another dimension.
              Let's get you back to safety.
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/">
              <Button variant="primary" size="lg" icon={<Home className="w-5 h-5" />}>
                Back to Home
              </Button>
            </Link>
            <Link href="/explore">
              <Button variant="ghost" size="lg" icon={<Search className="w-5 h-5" />}>
                Explore DAOs
              </Button>
            </Link>
          </motion.div>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16"
          >
            <Card variant="luxury" className="text-left">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gold-500/20 border-2 border-gold-500 rounded-none flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-gold-500" />
                </div>
                <div>
                  <h3 className="font-bold mb-2 uppercase tracking-wider">Lost in the Void?</h3>
                  <p className="text-sm text-gray-400">
                    If you believe this page should exist, please check the URL or contact support.
                    All our DAO dashboards are permanently deployed on IPFS for eternal access.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
