'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FEATURED_DAOS } from '@/lib/constants';
import { 
  TrendingUp, 
  Shield, 
  Zap, 
  ArrowRight,
  DollarSign,
  Users,
  FileText
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-full bg-luxury-dark">
      {/* Hero Command Center */}
      <section className="border-b-2 border-luxury-gray-500 bg-luxury-dark-800">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Title & CTA */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-luxury-dark-900 border-2 border-blood-red-500 mb-6"
              >
                <Shield className="w-4 h-4 text-gold-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-gold-500">
                  Deployed on IPFS + ENS
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="text-luxury">ETERNAL</span>
                <br />
                <span className="text-white">GOVERNANCE</span>
                <br />
                <span className="text-luxury-gray-400">COMMAND CENTER</span>
              </h1>

              <p className="text-xl text-luxury-gray-400 mb-8 leading-relaxed">
                Censorship-resistant DAO treasury dashboards. Your governance interface, immortalized on the decentralized web.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/explore">
                  <Button variant="gold" size="lg" icon={<ArrowRight />}>
                    Launch Dashboard
                  </Button>
                </Link>
                <Link href="/create">
                  <Button variant="secondary" size="lg">
                    Create Custom
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: Live Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Total Treasury Value', value: '$2.4B', icon: DollarSign, color: 'gold' },
                { label: 'Active DAOs', value: '247', icon: Users, color: 'red' },
                { label: 'Live Proposals', value: '1,234', icon: FileText, color: 'gold' },
                { label: 'Deployments', value: '5,678', icon: Zap, color: 'red' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="text-center p-6 border-2 border-luxury-gray-500 hover:border-gold-500 transition-all duration-300">
                    <stat.icon className={`w-8 h-8 mx-auto mb-3 ${
                      stat.color === 'gold' ? 'text-gold-500' : 'text-blood-red-500'
                    }`} />
                    <div className="text-3xl font-bold font-mono text-luxury mb-2">
                      {stat.value}
                    </div>
                    <div className="text-xs text-luxury-gray-400 uppercase tracking-wider font-bold">
                      {stat.label}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Treasuries */}
      <section className="py-12 border-b-2 border-luxury-gray-500">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="mb-8">
            <div className="flex items-end justify-between mb-3">
              <h2 className="text-3xl font-bold text-luxury uppercase tracking-wider">
                FEATURED TREASURIES
              </h2>
              <Link href="/explore">
                <Button variant="gold" size="sm" icon={<ArrowRight />}>
                  View All 7 DAOs
                </Button>
              </Link>
            </div>
            <p className="text-luxury-gray-400 text-sm">
              Leading DAOs on Ethereum & Layer 2s
            </p>
          </div>

          {/* DAO Grid - 2 cols mobile, 3 cols desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_DAOS.slice(0, 6).map((dao, index) => (
              <Link key={dao.id} href={`/dashboard/${dao.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full p-4 hover:border-blood-red-500 transition-all duration-300">
                    {/* Logo + Name/Symbol */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-luxury-dark-900 border-2 border-blood-red-500 flex items-center justify-center shrink-0 overflow-hidden">
                        <Image
                          src={dao.logo}
                          alt={dao.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm truncate uppercase tracking-wider">
                          {dao.name}
                        </h3>
                        <p className="text-xs text-luxury-gray-400 font-mono">
                          {dao.tokenSymbol}
                        </p>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-luxury-gray-400 uppercase tracking-wider">
                          Treasury
                        </span>
                        <span className="font-mono font-bold text-gold-500">
                          ${(Math.random() * 500 + 50).toFixed(1)}M
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-luxury-gray-400 uppercase tracking-wider">
                          Token
                        </span>
                        <span className="font-mono font-bold text-white">
                          {dao.tokenSymbol}
                        </span>
                      </div>
                    </div>

                    {/* Tags (max 2) */}
                    <div className="flex gap-2 overflow-hidden">
                      {dao.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-luxury-dark-900 border border-luxury-gray-500 text-luxury-gray-400 uppercase tracking-wider font-bold truncate"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Vault DAO - 3 Column Features */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-luxury uppercase tracking-wider">
            UNSTOPPABLE INFRASTRUCTURE
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: 'CENSORSHIP RESISTANT',
                desc: 'Deployed on IPFS. No single point of failure. Forever accessible.',
              },
              {
                icon: Zap,
                title: 'REAL-TIME DATA',
                desc: 'Live on-chain treasury data. Snapshot governance. Always current.',
              },
              {
                icon: TrendingUp,
                title: 'GOVERNANCE POWER',
                desc: 'Vote on proposals. Track execution. Full transparency.',
              },
            ].map((feature, idx) => (
              <Card key={idx} variant={idx === 1 ? 'glow-gold' : 'glow-red'} className="p-6">
                <feature.icon className="w-12 h-12 text-gold-500 mb-4" />
                <h3 className="text-xl font-bold mb-3 uppercase tracking-wider">
                  {feature.title}
                </h3>
                <p className="text-luxury-gray-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
