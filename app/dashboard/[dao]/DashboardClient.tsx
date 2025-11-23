'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '@/components/animations/PageTransition';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';
import { TreasuryOverview } from '@/components/dashboard/TreasuryOverview';
import { AssetBreakdown } from '@/components/dashboard/AssetBreakdown';
import { GovernancePanel } from '@/components/dashboard/GovernancePanel';
import { TokenHolders } from '@/components/dashboard/TokenHolders';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { useDaoStore } from '@/store/daoStore';
import { useUserStore } from '@/store/userStore';
import { FEATURED_DAOS, CHAIN_NAMES } from '@/lib/constants';
import { 
  ExternalLink, 
  Twitter, 
  Globe, 
  MessageCircle,
  Star,
  Share2,
  Download,
  Flame
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

interface DashboardClientProps {
  daoId: string;
}

export function DashboardClient({ daoId }: DashboardClientProps) {
  const { setSelectedDAO } = useDaoStore();
  const { favoriteDAOs, addFavoriteDAO, removeFavoriteDAO } = useUserStore();

  // Find DAO config
  const dao = FEATURED_DAOS.find((d) => d.id === daoId);

  useEffect(() => {
    if (dao) {
      setSelectedDAO(dao);
    }
  }, [dao, setSelectedDAO]);

  if (!dao) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 py-20">
          <Card className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">DAO Not Found</h1>
            <p className="text-gray-400 mb-8">
              The DAO you're looking for doesn't exist or hasn't been configured yet.
            </p>
            <Link href="/explore">
              <Button>Browse DAOs</Button>
            </Link>
          </Card>
        </div>
      </PageTransition>
    );
  }

  const isFavorite = favoriteDAOs.includes(dao.id);

  const handleFavorite = () => {
    if (isFavorite) {
      removeFavoriteDAO(dao.id);
      toast.success('Removed from favorites');
    } else {
      addFavoriteDAO(dao.id);
      toast.success('Added to favorites');
    }
  };

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

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Flame className="w-4 h-4" /> },
    { id: 'governance', label: 'Governance' },
    { id: 'holders', label: 'Token Holders' },
    { id: 'activity', label: 'Activity' },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen pb-20">
        {/* Header */}
        <div className="border-b-2 border-blood-red-500/30 bg-luxury-dark-800/90 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
              {/* DAO Info */}
              <div className="flex items-start gap-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 rounded-none bg-luxury-dark-900 flex items-center justify-center shrink-0 border-4 border-blood-red-500 shadow-red-glow-lg"
                >
                  <Flame className="w-10 h-10 text-gold-500" style={{ filter: 'drop-shadow(0 0 8px rgba(234, 179, 8, 0.8))' }} />
                </motion.div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wider gradient-text">{dao.name}</h1>
                    <Badge variant="gold">{CHAIN_NAMES[dao.chain] || 'Unknown'}</Badge>
                  </div>
                  <p className="text-luxury-gray-300 mb-4 max-w-2xl">{dao.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {dao.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-none bg-luxury-dark-900 border-2 border-luxury-gray-500 text-luxury-gray-300 uppercase tracking-wider font-bold hover:border-gold-500 hover:text-gold-500 transition-all duration-300 cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center gap-3">
                    {dao.website && (
                      <a
                        href={dao.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-luxury-gray-400 hover:text-gold-500 transition-all duration-300 hover:scale-110"
                      >
                        <Globe className="w-5 h-5" />
                      </a>
                    )}
                    {dao.twitter && (
                      <a
                        href={`https://twitter.com/${dao.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-luxury-gray-400 hover:text-gold-500 transition-all duration-300 hover:scale-110"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                    {dao.discord && (
                      <a
                        href={dao.discord}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-luxury-gray-400 hover:text-gold-500 transition-all duration-300 hover:scale-110"
                      >
                        <MessageCircle className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="gold"
                  size="sm"
                  onClick={handleFavorite}
                  icon={<Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />}
                >
                  {isFavorite ? 'Favorited' : 'Favorite'}
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
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <Tabs tabs={tabs}>
            {(activeTab) => (
              <>
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    {/* Treasury Overview */}
                    <TreasuryOverview
                      treasuryAddresses={dao.treasury}
                      chainId={dao.chain}
                    />

                    {/* Two Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Asset Breakdown */}
                      <AssetBreakdown
                        treasuryAddresses={dao.treasury}
                        chainId={dao.chain}
                      />

                      {/* Governance Panel */}
                      <GovernancePanel snapshotSpace={dao.snapshot} />
                    </div>

                    {/* Activity Feed */}
                    <ActivityFeed />
                  </div>
                )}

                {activeTab === 'governance' && (
                  <div className="space-y-8">
                    <GovernancePanel snapshotSpace={dao.snapshot} />
                    
                    {dao.snapshot && (
                      <Card>
                        <h3 className="text-xl font-bold mb-4">About Governance</h3>
                        <p className="text-gray-400 mb-4">
                          This DAO uses Snapshot for off-chain governance voting. Connect your wallet to participate in active proposals.
                        </p>
                        <a
                          href={`https://snapshot.org/#/${dao.snapshot}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="secondary" icon={<ExternalLink className="w-4 h-4" />}>
                            View on Snapshot
                          </Button>
                        </a>
                      </Card>
                    )}
                  </div>
                )}

                {activeTab === 'holders' && (
                  <div className="space-y-8">
                    <TokenHolders tokenAddress={dao.token} chainId={dao.chain} />
                    
                    <Card>
                      <h3 className="text-xl font-bold mb-4">Distribution Analysis</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold mb-2 uppercase tracking-wider">Gini Coefficient</h4>
                          <p className="text-sm text-gray-400">
                            Measures wealth distribution inequality. Lower is more equal distribution (0 = perfect equality, 1 = maximum inequality).
                          </p>
                        </div>
                        <div>
                          <h4 className="font-bold mb-2 uppercase tracking-wider">Concentration Risk</h4>
                          <p className="text-sm text-gray-400">
                            High concentration in top holders can indicate centralization risk for governance decisions.
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}

                {activeTab === 'activity' && (
                  <div className="space-y-8">
                    <ActivityFeed />
                    
                    <Card className="text-center py-12">
                      <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
                      <p className="text-gray-400">
                        Advanced activity filtering and historical analytics
                      </p>
                    </Card>
                  </div>
                )}
              </>
            )}
          </Tabs>
        </div>
      </div>
    </PageTransition>
  );
}