'use client';

import React from 'react';
import Link from 'next/link';
import { Flame, Twitter, Github, MessageCircle } from 'lucide-react';

const socialLinks = [
  { icon: <Twitter className="w-5 h-5" />, href: 'https://twitter.com/vaultdao', label: 'Twitter' },
  { icon: <Github className="w-5 h-5" />, href: 'https://github.com/charlesms-eth/vault-dao', label: 'GitHub' },
  { icon: <MessageCircle className="w-5 h-5" />, href: 'https://discord.gg/vaultdao', label: 'Discord' },
];

const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Explore DAOs', href: '/explore' },
      { label: 'Create Dashboard', href: '/create' },
      { label: 'Documentation', href: '/docs' },
      { label: 'API', href: '/api' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'About PinMe', href: 'https://pinme.eth.limo' },
      { label: 'IPFS Guide', href: '/docs/ipfs' },
      { label: 'ENS Integration', href: '/docs/ens' },
      { label: 'Smart Contracts', href: '/docs/contracts' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'GitHub', href: 'https://github.com/charlesms-eth/vault-dao' },
      { label: 'Discord', href: 'https://discord.gg/vaultdao' },
      { label: 'Twitter', href: 'https://twitter.com/vaultdao' },
      { label: 'Forum', href: 'https://forum.vaultdao.com' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-20 border-t-2 border-luxury-gray-500 bg-luxury-dark-900">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-none bg-gradient-to-br from-blood-red-500 to-gold-500 flex items-center justify-center border-2 border-gold-500 shadow-red-glow">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold gradient-text uppercase tracking-wider">Vault DAO</h3>
                <p className="text-xs text-luxury-gray-500 font-mono uppercase tracking-wider">Eternal Governance</p>
              </div>
            </Link>
            <p className="text-luxury-gray-400 text-sm mb-6 max-w-sm">
              Censorship-resistant DAO treasury management and governance dashboards deployed on IPFS + ENS. Built for the PinMe DeFront Hackathon.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-none glass-hover flex items-center justify-center text-blood-red-500 hover:text-gold-500 transition-colors border-2 border-blood-red-500/30 hover:border-gold-500"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-bold mb-4 uppercase tracking-wider text-gold-500">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-luxury-gray-400 hover:text-white transition-colors font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t-2 border-blood-red-500/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-luxury-gray-500">
            © 2025 Vault DAO. Built by{' '}
            <a
              href="https://github.com/charlesms-eth"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-500 hover:underline font-bold"
            >
              @charlesms-eth
            </a>
            {' '}for PinMe DeFront Hackathon.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/privacy" className="text-luxury-gray-500 hover:text-white transition-colors uppercase tracking-wider text-xs font-bold">
              Privacy
            </Link>
            <Link href="/terms" className="text-luxury-gray-500 hover:text-white transition-colors uppercase tracking-wider text-xs font-bold">
              Terms
            </Link>
            <a
              href="https://pinme.eth.limo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-luxury-gray-500 hover:text-gold-500 transition-colors flex items-center gap-1 uppercase tracking-wider text-xs font-bold"
            >
              Deployed via <span className="font-bold">PinMe</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}