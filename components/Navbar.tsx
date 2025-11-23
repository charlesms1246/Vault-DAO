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
        className="fixed top-0 left-0 right-0 z-40 glass border-b border-white/10"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyber-cyan via-cyber-purple to-cyber-pink flex items-center justify-center"
              >
                <Flame className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold gradient-text">Vault DAO</h1>
                <p className="text-xs text-gray-500 font-mono">Eternal Governance</p>
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
                      'flex items-center gap-2 font-medium transition-colors relative py-2',
                      isActive ? 'text-cyber-cyan' : 'text-gray-400 hover:text-white'
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyber-cyan"
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
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
              {mounted && <ConnectButton />}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-400 hover:text-white transition-colors"
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
            <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full glass border-l border-white/10 p-6">
              <div className="flex flex-col gap-6 mt-16">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={clsx(
                        'flex items-center gap-3 p-4 rounded-lg transition-colors',
                        isActive
                          ? 'bg-cyber-cyan/20 text-cyber-cyan'
                          : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      )}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}

                {mounted && (
                  <div className="mt-4 pt-6 border-t border-white/10">
                    <ConnectButton />
                  </div>
                )}

                <Link
                  href="https://github.com/charlesms-eth/vault-dao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
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