'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { RefreshCw, Home, AlertOctagon } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

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
              500
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
            <div className="w-24 h-24 bg-luxury-dark-800 border-4 border-blood-red-500 rounded-none flex items-center justify-center mx-auto shadow-red-glow pulse-red">
              <AlertOctagon className="w-12 h-12 text-blood-red-500" />
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
              Something Went Wrong
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-4">
              An unexpected error occurred. Don't worry, your DAO's data is safe on IPFS.
              Try refreshing the page or return to the home page.
            </p>
            {error.digest && (
              <p className="text-sm text-gray-500 font-mono">
                Error ID: {error.digest}
              </p>
            )}
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              variant="primary" 
              size="lg" 
              icon={<RefreshCw className="w-5 h-5" />}
              onClick={reset}
            >
              Try Again
            </Button>
            <Link href="/">
              <Button variant="ghost" size="lg" icon={<Home className="w-5 h-5" />}>
                Back to Home
              </Button>
            </Link>
          </motion.div>

          {/* Error Details Card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16"
          >
            <Card variant="glow-red" className="text-left">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blood-red-500/20 border-2 border-blood-red-500 rounded-none flex items-center justify-center shrink-0">
                  <AlertOctagon className="w-5 h-5 text-blood-red-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold mb-2 uppercase tracking-wider text-blood-red-500">
                    Error Details
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">
                    {error.message || 'An unexpected error occurred while processing your request.'}
                  </p>
                  <details className="text-sm">
                    <summary className="cursor-pointer text-gold-500 hover:text-gold-400 font-mono">
                      View Technical Details
                    </summary>
                    <pre className="mt-3 p-4 bg-luxury-dark rounded-none border-2 border-luxury-gray-500 overflow-x-auto text-xs">
                      {error.stack || 'No stack trace available'}
                    </pre>
                  </details>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
