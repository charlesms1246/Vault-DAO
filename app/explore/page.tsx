'use client';

import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FEATURED_DAOS, CHAIN_NAMES } from '@/lib/constants';
import Image from 'next/image';
import { 
  Search, 
  X,
  Users,
  DollarSign,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';

type SortOption = 'tvl' | 'alphabetical' | 'recent';

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<SortOption>('tvl');

  const filters = [
    'ALL',
    'DEFI',
    'LAYER 2',
    'NFT & GAMING',
    'PUBLIC GOODS',
    'INFRASTRUCTURE',
    'LIQUID STAKING'
  ];

  // Filter and sort DAOs
  const filteredDAOs = useMemo(() => {
    const filtered = FEATURED_DAOS.filter((dao) => {
      const matchesSearch = 
        dao.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dao.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dao.tokenSymbol?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = 
        activeFilter === 'ALL' ||
        dao.tags.some((tag) => {
          const normalizedTag = tag.toUpperCase();
          const normalizedFilter = activeFilter.toUpperCase();
          
          // Map filter categories to tag matches
          if (normalizedFilter === 'LAYER 2') return normalizedTag === 'LAYER 2';
          if (normalizedFilter === 'NFT & GAMING') return normalizedTag === 'NFT' || normalizedTag === 'GAMING';
          if (normalizedFilter === 'PUBLIC GOODS') return normalizedTag === 'PUBLIC GOODS';
          
          return normalizedTag === normalizedFilter;
        });
      
      return matchesSearch && matchesFilter;
    });

    // Sort
    if (sortBy === 'alphabetical') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'recent') {
      filtered.reverse(); // Recently added = reverse order
    }
    // TVL sort would need real data, keeping default order for now

    return filtered;
  }, [searchQuery, activeFilter, sortBy]);

  return (
    <div className="h-full flex flex-col bg-luxury-dark">
      {/* Header Section */}
      <div className="border-b-2 border-luxury-gray-500 bg-luxury-dark-800 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wider text-luxury mb-2">
            Explore DAOs
          </h1>
          <p className="text-luxury-gray-400 mb-4">
            7 Leading Decentralized Autonomous Organizations
          </p>
          <div className="flex items-center justify-between">
            <p className="text-sm text-luxury-gray-400">
              Showing <span className="text-gold-500 font-bold">{filteredDAOs.length}</span> of <span className="text-white font-bold">7</span> DAOs
            </p>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-luxury-dark-900 border-2 border-luxury-gray-500 px-4 py-2 pr-10 text-sm font-bold uppercase tracking-wider text-white outline-none hover:border-gold-500 transition-colors appearance-none cursor-pointer"
              >
                <option value="tvl">Sort: TVL</option>
                <option value="alphabetical">Sort: A-Z</option>
                <option value="recent">Sort: Recent</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="border-b-2 border-luxury-gray-500 bg-luxury-dark-900 px-6 py-4">
        <div className="max-w-7xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-gray-400" />
          <input
            type="text"
            placeholder="Search 7 DAOs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-luxury-dark-800 border-2 border-luxury-gray-500 focus:border-gold-500 outline-none pl-12 pr-12 py-3 text-white placeholder:text-luxury-gray-400 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-luxury-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Buttons Row */}
      <div className="border-b-2 border-luxury-gray-500 bg-luxury-dark-900 px-6 py-3 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex gap-2 min-w-max">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      {/* DAO Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          {filteredDAOs.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-luxury-dark-800 border-2 border-blood-red-500 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-blood-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 uppercase tracking-wider">No DAOs Found</h3>
              <p className="text-luxury-gray-400 mb-6">
                Try adjusting your search or filters
              </p>
              <Button
                variant="primary"
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('ALL');
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDAOs.map((dao) => (
                <Link key={dao.id} href={`/dashboard/${dao.id}`}>
                  <Card className="h-full hover:border-blood-red-500 hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
                    {/* Logo + Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 bg-luxury-dark-900 border-2 border-blood-red-500 flex items-center justify-center shrink-0 overflow-hidden">
                        <Image
                          src={dao.logo}
                          alt={dao.name}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold uppercase tracking-wider truncate group-hover:text-gold-500 transition-colors mb-1">
                          {dao.name}
                        </h3>
                        <Badge variant="gold" size="sm">
                          {CHAIN_NAMES[dao.chain] || 'Unknown'}
                        </Badge>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-luxury-gray-400 mb-4 line-clamp-2 min-h-[40px]">
                      {dao.description}
                    </p>

                    {/* Stats Row */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-luxury-gray-400 flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          Treasury
                        </span>
                        <span className="font-bold text-gold-500">
                          ${(Math.random() * 500 + 50).toFixed(1)}M
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-luxury-gray-400">Token</span>
                        <span className="font-mono font-bold text-white">
                          {dao.tokenSymbol}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-luxury-gray-400 flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          Holders
                        </span>
                        <span className="font-bold text-luxury-gray-300">
                          {(Math.random() * 50000 + 10000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex gap-2 pt-4 border-t-2 border-luxury-gray-500">
                      {dao.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-luxury-dark-900 border border-luxury-gray-500 text-luxury-gray-400 uppercase tracking-wider font-bold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}