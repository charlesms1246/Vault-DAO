'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { TreasuryOverview } from '@/components/dashboard/TreasuryOverview';
import { AssetBreakdown } from '@/components/dashboard/AssetBreakdown';
import { GovernancePanel } from '@/components/dashboard/GovernancePanel';
import { TokenHolders } from '@/components/dashboard/TokenHolders';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { useDaoStore } from '@/store/daoStore';
import { FEATURED_DAOS, CHAIN_NAMES } from '@/lib/constants';
import { 
  ExternalLink, 
  Twitter, 
  Globe, 
  Share2,
  Download,
  Bookmark,
  Flame
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

type PanelType = 'treasury' | 'governance';

interface DashboardClientProps {
  daoId: string;
}

export function DashboardClient({ daoId }: DashboardClientProps) {
  const { setSelectedDAO } = useDaoStore();
  const [activePanel, setActivePanel] = useState<PanelType>('treasury');

  // Find DAO config
  const dao = FEATURED_DAOS.find((d) => d.id === daoId);

  useEffect(() => {
    if (dao) {
      setSelectedDAO(dao);
    }
  }, [dao, setSelectedDAO]);

  if (!dao) {
    return (
      <div className="container mx-auto px-4 py-20">
        <Card className="text-center py-20">
          <h1 className="text-3xl font-bold mb-4 uppercase tracking-wider">DAO Not Found</h1>
          <p className="text-luxury-gray-400 mb-8">
            The DAO you're looking for doesn't exist or hasn't been configured yet.
          </p>
          <Link href="/explore">
            <Button variant="gold">Browse DAOs</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      const url = window.location.href;
      navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleExport = () => {
    toast.success('Exporting data... (Coming soon)');
  };

  const handleBookmark = () => {
    toast.success('Bookmarked!');
  };

  return (
    <div className="h-full flex flex-col bg-luxury-dark">
      {/* Compact Header Bar */}
      <div className="border-b-2 border-luxury-gray-500 bg-luxury-dark-800 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: DAO Info */}
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="w-12 h-12 rounded-none bg-luxury-dark-900 flex items-center justify-center border-2 border-blood-red-500 shadow-red-glow">
              <Flame className="w-6 h-6 text-gold-500" />
            </div>

            {/* Title + Chain + Links */}
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold uppercase tracking-wider text-luxury">
                {dao.name}
              </h1>
              <Badge variant="gold" size="sm">{CHAIN_NAMES[dao.chain] || 'Unknown'}</Badge>
              
              {/* Social Links */}
              <div className="flex items-center gap-2 ml-2">
                {dao.website && (
                  <a
                    href={dao.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-luxury-gray-400 hover:text-gold-500 transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                )}
                {dao.twitter && (
                  <a
                    href={`https://twitter.com/${dao.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-luxury-gray-400 hover:text-gold-500 transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmark}
              icon={<Bookmark className="w-4 h-4" />}
            >
              Save
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              icon={<Share2 className="w-4 h-4" />}
            >
              Share
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleExport}
              icon={<Download className="w-4 h-4" />}
            >
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Split Panel Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <div className="flex-1 flex flex-col border-r-2 border-luxury-gray-500 overflow-hidden">
          {/* Panel Tabs */}
          <div className="flex border-b-2 border-luxury-gray-500">
            <button
              onClick={() => setActivePanel('treasury')}
              className={`flex-1 px-6 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                activePanel === 'treasury'
                  ? 'bg-luxury-dark-900 text-gold-500 border-b-2 border-gold-500 -mb-0.5'
                  : 'text-luxury-gray-400 hover:text-white hover:bg-luxury-dark-800'
              }`}
            >
              Treasury Analytics
            </button>
            <button
              onClick={() => setActivePanel('governance')}
              className={`flex-1 px-6 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                activePanel === 'governance'
                  ? 'bg-luxury-dark-900 text-gold-500 border-b-2 border-gold-500 -mb-0.5'
                  : 'text-luxury-gray-400 hover:text-white hover:bg-luxury-dark-800'
              }`}
            >
              Governance
            </button>
          </div>

          {/* Scrollable Panel Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {activePanel === 'treasury' && (
              <>
                <TreasuryOverview
                  treasuryAddresses={dao.treasury}
                  chainId={dao.chain}
                />
                
                <AssetBreakdown
                  treasuryAddresses={dao.treasury}
                  chainId={dao.chain}
                />
                
                <TokenHolders tokenAddress={dao.token} chainId={dao.chain} />
              </>
            )}

            {activePanel === 'governance' && (
              <>
                <GovernancePanel snapshotSpace={dao.snapshot} />
                
                {dao.snapshot && (
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">Snapshot Integration</h3>
                    <p className="text-luxury-gray-400 mb-4">
                      This DAO uses Snapshot for off-chain governance voting. Connect your wallet to participate in active proposals.
                    </p>
                    <a
                      href={`https://snapshot.org/#/${dao.snapshot}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="gold" icon={<ExternalLink className="w-4 h-4" />}>
                        View on Snapshot
                      </Button>
                    </a>
                  </Card>
                )}
              </>
            )}
          </div>
        </div>

        {/* Right Panel: Activity Feed (Fixed Width) */}
        <div className="w-96 flex flex-col bg-luxury-dark-900 overflow-hidden">
          {/* Sticky Header */}
          <div className="border-b-2 border-luxury-gray-500 px-6 py-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gold-500">
              Live Activity
            </h2>
          </div>

          {/* Scrollable Activity Feed */}
          <div className="flex-1 overflow-y-auto p-6">
            <ActivityFeed />
          </div>
        </div>
      </div>
    </div>
  );
}