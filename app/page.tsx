'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Hero } from '@/components/Hero';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FEATURED_DAOS } from '@/lib/constants';
import { 
  Shield, 
  Zap, 
  Globe, 
  Lock, 
  TrendingUp, 
  Users,
  ArrowRight,
  CheckCircle,
  Flame
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Censorship Resistant',
    description: 'Deployed on IPFS, your dashboard can never be taken down or blocked.',
    color: 'from-cyber-cyan to-blue-500',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Real-time Data',
    description: 'Live treasury balances, proposals, and token analytics fetched on-chain.',
    color: 'from-cyber-purple to-purple-500',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'ENS Powered',
    description: 'Human-readable domains via ENS with automatic contenthash records.',
    color: 'from-cyber-pink to-pink-500',
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: 'Zero Custody',
    description: 'Read-only interface. Your treasury funds remain completely secure.',
    color: 'from-green-400 to-emerald-500',
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Treasury Analytics',
    description: 'Asset breakdown, historical value charts, and portfolio insights.',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Token Distribution',
    description: 'Holder analytics, concentration metrics, and governance insights.',
    color: 'from-red-400 to-rose-500',
  },
];

const benefits = [
  'No hosting costs - permanent storage',
  'Survives domain seizures',
  'Community can redeploy instantly',
  'Works even if main site goes down',
  'Verifiable on-chain data',
  'Open source and forkable',
];

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Built for <span className="gradient-text">Permanence</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need for DAO governance and treasury management, deployed to last forever.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured DAOs */}
      <section className="py-20 bg-gradient-to-b from-transparent to-cyber-dark-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="gradient-text">DAOs</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Explore dashboards for the biggest DAOs in DeFi and beyond
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {FEATURED_DAOS.slice(0, 3).map((dao, index) => (
              <motion.div
                key={dao.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/dashboard/${dao.id}`}>
                  <Card hover className="h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyber-cyan to-cyber-purple flex items-center justify-center">
                        <Flame className="w-8 h-8" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold">{dao.name}</h3>
                        <p className="text-sm text-gray-400 font-mono">
                          {dao.tokenSymbol}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {dao.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {dao.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/explore">
              <Button variant="secondary" icon={<ArrowRight className="w-5 h-5" />}>
                View All DAOs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why <span className="gradient-text">Vault DAO</span>?
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Traditional hosting fails. Domains get seized. Servers go down. But your DAO's governance can't afford downtime.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-cyber-cyan/20 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-4 h-4 text-cyber-cyan" />
                    </div>
                    <span className="text-gray-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card gradient glow className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-cyber-cyan/20 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-cyber-cyan" />
                    </div>
                    <div>
                      <h4 className="font-bold">Deployed via PinMe</h4>
                      <p className="text-sm text-gray-400">One command deployment</p>
                    </div>
                  </div>
                  <div className="glass p-4 rounded-lg font-mono text-sm">
                    <div className="text-gray-500 mb-2"># Build and deploy</div>
                    <div className="text-cyber-cyan">$ npm run build</div>
                    <div className="text-cyber-cyan">$ pinme upload ./out</div>
                    <div className="mt-4 text-gray-500">✓ Deployed to IPFS</div>
                    <div className="text-gray-500">✓ ENS contenthash set</div>
                    <div className="text-gray-500">✓ Gateway URL active</div>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-sm text-gray-400">
                      Your dashboard lives forever at:
                    </p>
                    <p className="font-mono text-cyber-cyan text-sm mt-2">
                      https://your-dao.pinme.eth.limo
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/10 via-cyber-purple/10 to-cyber-pink/10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Deploy Your DAO Dashboard
              <br />
              <span className="gradient-text">In 60 Seconds</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              No servers. No hosting costs. No maintenance. Just eternal governance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create">
                <Button size="lg" icon={<Flame className="w-5 h-5" />}>
                  Create Dashboard
                </Button>
              </Link>
              <Link href="https://github.com/charlesms1246/vault-dao">
                <Button variant="ghost" size="lg">
                  View on GitHub
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}