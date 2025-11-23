'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '@/components/animations/PageTransition';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FEATURED_DAOS, CHAIN_NAMES } from '@/lib/constants';
import { useUserStore } from '@/store/userStore';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Star,
  Flame,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'name' | 'popular'>('popular');
  const { favoriteDAOs } = useUserStore();

  // Get all unique tags
  const allTags = Array.from(new Set(FEATURED_DAOS.flatMap((dao) => dao.tags)));

  // Filter DAOs
  const filteredDAOs = FEATURED_DAOS.filter((dao) => {
    const matchesSearch = 
      dao.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dao.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dao.tokenSymbol?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = 
      selectedTags.length === 0 ||
      selectedTags.some((tag) => dao.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  }).sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    // Popular = favorites + predefined order
    const aFav = favoriteDAOs.includes(a.id) ? 1 : 0;
    const bFav = favoriteDAOs.includes(b.id) ? 1 : 0;
    return bFav - aFav;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <PageTransition>
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block mb-4"
            >
              <Badge variant="info" size="lg">
                {FEATURED_DAOS.length} Featured DAOs
              </Badge>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              Explore <span className="gradient-text">DAO Dashboards</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              Browse censorship-resistant treasury and governance dashboards for the top DAOs
            </motion.p>
          </div>

          {/* Search & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <Card>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Search */}
                <div className="lg:col-span-6">
                  <Input
                    placeholder="Search by name, token, or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    icon={<Search className="w-5 h-5" />}
                  />
                </div>

                {/* Sort */}
                <div className="lg:col-span-3">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'name' | 'popular')}
                    className="w-full bg-luxury-dark-800 border-2 border-luxury-gray-500 rounded-none px-4 py-3 text-white focus:outline-none focus:border-gold-500 uppercase tracking-wider font-bold"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="name">Alphabetical</option>
                  </select>
                </div>

                {/* Filter Button */}
                <div className="lg:col-span-3">
                  <Button
                    variant="ghost"
                    fullWidth
                    icon={<Filter className="w-5 h-5" />}
                  >
                    Filters {selectedTags.length > 0 && `(${selectedTags.length})`}
                  </Button>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-6 pt-6 border-t-2 border-luxury-gray-500">
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400 font-medium uppercase tracking-wider">Filter by category:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={clsx(
                        'px-4 py-2 rounded-none font-medium transition-all text-sm border-2 uppercase tracking-wider font-bold',
                        selectedTags.includes(tag)
                          ? 'bg-gold-500/20 text-gold-500 border-gold-500 shadow-gold-glow'
                          : 'bg-luxury-dark-800 text-gray-400 hover:bg-blood-red-500/10 hover:text-white border-luxury-gray-500 hover:border-blood-red-500'
                      )}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-400">
              Showing <span className="text-white font-bold">{filteredDAOs.length}</span> of{' '}
              <span className="text-white font-bold">{FEATURED_DAOS.length}</span> DAOs
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>

          {/* DAO Grid */}
          {filteredDAOs.length === 0 ? (
            <Card variant="luxury" className="text-center py-20">
              <div className="w-16 h-16 rounded-none bg-luxury-dark-800 border-4 border-blood-red-500 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-blood-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 uppercase tracking-wider">No DAOs Found</h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your search or filters
              </p>
              <Button
                variant="primary"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTags([]);
                }}
              >
                Clear Filters
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDAOs.map((dao, index) => {
                const isFavorite = favoriteDAOs.includes(dao.id);

                return (
                  <motion.div
                    key={dao.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card hover className="h-full flex flex-col">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-none bg-luxury-dark-800 border-4 border-blood-red-500 flex items-center justify-center shadow-red-glow">
                            <Flame className="w-6 h-6 text-gold-500" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg uppercase tracking-wider">{dao.name}</h3>
                            <p className="text-sm text-gray-400 font-mono">
                              {dao.tokenSymbol}
                            </p>
                          </div>
                        </div>
                        {isFavorite && (
                          <Star className="w-5 h-5 fill-current text-gold-500" />
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-1">
                        {dao.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {dao.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs rounded-none bg-luxury-dark-800 border-2 border-luxury-gray-500 text-gray-400 uppercase tracking-wider font-bold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t-2 border-luxury-gray-500">
                        <Badge variant="info" size="sm">
                          {CHAIN_NAMES[dao.chain]}
                        </Badge>
                        <Link href={`/dashboard/${dao.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={<ArrowRight className="w-4 h-4" />}
                          >
                            View Dashboard
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <Card className="text-center py-12 bg-gradient-to-br from-blood-red-500/10 via-gold-500/10 to-blood-red-500/10 border-2 border-luxury-gray-500">
              <h2 className="text-3xl font-bold mb-4 uppercase tracking-wider">
                Don't See Your DAO?
              </h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Create a custom dashboard for any DAO in minutes. No coding required.
              </p>
              <Link href="/create">
                <Button variant="gold" size="lg" icon={<Plus className="w-5 h-5" />}>
                  Create Custom Dashboard
                </Button>
              </Link>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}

const Plus = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
);