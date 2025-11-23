'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ConnectButton } from '@/components/web3/ConnectButton';
import {
  Flame,
  LayoutDashboard,
  Search,
  PlusCircle,
  TrendingUp,
  Users,
  ChevronLeft,
  ChevronRight,
  Wifi,
} from 'lucide-react';

const NAV_ITEMS = [
  {
    id: 'overview',
    label: 'Overview',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    id: 'explore',
    label: 'Explore DAOs',
    href: '/explore',
    icon: Search,
  },
  {
    id: 'create',
    label: 'Create Dashboard',
    href: '/create',
    icon: PlusCircle,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    href: '/analytics',
    icon: TrendingUp,
  },
  {
    id: 'governance',
    label: 'Governance',
    href: '/governance',
    icon: Users,
  },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href);
  };

  return (
    <motion.aside
      initial={false}
      animate={{
        width: isCollapsed ? 80 : 280,
      }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="relative h-screen bg-luxury-dark-800 border-r-2 border-luxury-gray-500 flex flex-col"
    >
      {/* Logo Section */}
      <div className="h-20 border-b-2 border-luxury-gray-500 flex items-center justify-center px-6">
        <motion.div
          layout
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-blood-red-500 border-2 border-blood-red-600 rounded-none flex items-center justify-center shadow-red-glow">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <h1 className="text-2xl font-bold uppercase tracking-wider text-luxury whitespace-nowrap">
                  VAULT
                </h1>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-6 px-3 overflow-y-auto">
        <div className="space-y-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link key={item.id} href={item.href}>
                <motion.div
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    relative flex items-center gap-4 px-4 py-3 rounded-none
                    border-2 transition-all duration-200 cursor-pointer
                    ${
                      active
                        ? 'border-blood-red-500 bg-blood-red-500/10 text-gold-500 shadow-red-glow'
                        : 'border-luxury-gray-500 text-luxury-gray-300 hover:border-blood-red-500 hover:bg-luxury-dark-700'
                    }
                  `}
                >
                  <Icon
                    className={`w-5 h-5 flex-shrink-0 ${
                      active ? 'text-gold-500' : 'text-luxury-gray-400'
                    }`}
                  />
                  <AnimatePresence mode="wait">
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`
                          text-sm font-bold uppercase tracking-wider whitespace-nowrap overflow-hidden
                          ${active ? 'text-gold-500' : 'text-luxury-gray-300'}
                        `}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Wallet Connect Section */}
      <div className="border-t-2 border-luxury-gray-500 p-3">
        <AnimatePresence mode="wait">
          {isCollapsed ? (
            <motion.div
              key="collapsed-wallet"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="flex justify-center"
            >
              <button className="w-12 h-12 bg-gold-500 border-2 border-gold-600 rounded-none flex items-center justify-center shadow-gold-glow hover:bg-gold-600 transition-colors">
                <Users className="w-6 h-6 text-luxury-dark-900" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="expanded-wallet"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <ConnectButton />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Info (Expanded Only) */}
      <AnimatePresence mode="wait">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t-2 border-luxury-gray-500 px-4 py-3 overflow-hidden"
          >
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-luxury-gray-500 uppercase tracking-wider font-bold">
                  Network
                </span>
                <div className="flex items-center gap-1">
                  <Wifi className="w-3 h-3 text-green-500" />
                  <span className="text-green-500 font-mono font-bold">Mainnet</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-luxury-gray-500 uppercase tracking-wider font-bold">
                  Version
                </span>
                <span className="text-luxury-gray-400 font-mono">v1.0.0</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapse Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-gold-500 border-2 border-gold-600 rounded-none flex items-center justify-center shadow-gold-glow hover:bg-gold-600 transition-colors z-10"
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? (
          <ChevronRight className="w-5 h-5 text-luxury-dark-900" />
        ) : (
          <ChevronLeft className="w-5 h-5 text-luxury-dark-900" />
        )}
      </motion.button>
    </motion.aside>
  );
}
