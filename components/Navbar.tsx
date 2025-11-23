'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ConnectButton } from '@/components/web3/ConnectButton';
import { Menu, X, Flame, LayoutDashboard, Plus, Compass, Github } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { href: '/', label: 'Home', icon: <Flame className="w-4 h-4" /> },
  { href: '/explore', label: 'Explore', icon: <Compass className="w-4 h-4" /> },
  { href: '/dashboard/nouns', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { href: '/create', label: 'Create', icon: <Plus className="w-4 h-4" /> },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-40 bg-luxury-dark-900/80 backdrop-blur-xl border-b-2 border-luxury-gray-500"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 rounded-none bg-gradient-to-br from-blood-red-500 to-gold-500 flex items-center justify-center border-2 border-gold-500 shadow-red-glow"
              >
                <Flame className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold gradient-text uppercase tracking-wider">Vault DAO</h1>
                <p className="text-xs text-luxury-gray-400 font-mono uppercase tracking-wider">Eternal Governance</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== '/' && pathname.startsWith(item.href));
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={clsx(
                      'flex items-center gap-2 font-bold uppercase tracking-wider transition-colors relative py-2 text-sm',
                      isActive ? 'text-gold-500' : 'text-luxury-gray-400 hover:text-white'
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gold-500 shadow-gold-glow"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Side */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="https://github.com/charlesms-eth/vault-dao"
                target="_blank"
                rel="noopener noreferrer"
                className="text-luxury-gray-400 hover:text-gold-500 transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
              {mounted && <ConnectButton />}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-luxury-gray-400 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-0 z-30 md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-luxury-dark-900 border-l-2 border-luxury-gray-500 p-6">
              <div className="flex flex-col gap-6 mt-16">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={clsx(
                        'flex items-center gap-3 p-4 rounded-none transition-colors border-2 uppercase tracking-wider font-bold text-sm',
                        isActive
                          ? 'bg-blood-red-500/20 text-gold-500 border-blood-red-500'
                          : 'text-luxury-gray-400 hover:bg-blood-red-500/10 hover:text-white border-blood-red-500/20'
                      )}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  );
                })}

                {mounted && (
                  <div className="mt-4 pt-6 border-t-2 border-luxury-gray-500">
                    <ConnectButton />
                  </div>
                )}

                <Link
                  href="https://github.com/charlesms-eth/vault-dao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-luxury-gray-400 hover:text-gold-500 transition-colors uppercase tracking-wider text-sm font-bold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Github className="w-5 h-5" />
                  <span>View on GitHub</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}