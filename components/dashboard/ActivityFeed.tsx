'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AddressDisplay } from '@/components/web3/AddressDisplay';
import { formatTimeAgo } from '@/lib/utils/formatters';
import { 
  ArrowUpRight, 
  Vote, 
  FileText, 
  Users,
  ExternalLink 
} from 'lucide-react';

// Mock activity data - in production, combine data from multiple sources
const mockActivity = [
  {
    id: '1',
    type: 'transaction' as const,
    timestamp: Date.now() - 3600000,
    title: 'Treasury Transfer',
    description: 'Transferred 100 ETH to development fund',
    actor: '0x1234567890123456789012345678901234567890',
    value: '100 ETH',
    status: 'success' as const,
  },
  {
    id: '2',
    type: 'vote' as const,
    timestamp: Date.now() - 7200000,
    title: 'Voted on Proposal #42',
    description: 'Vote: FOR',
    actor: '0x2345678901234567890123456789012345678901',
  },
  {
    id: '3',
    type: 'proposal' as const,
    timestamp: Date.now() - 86400000,
    title: 'New Proposal Created',
    description: 'Upgrade protocol to v2.0',
    actor: '0x3456789012345678901234567890123456789012',
  },
];

export function ActivityFeed() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'transaction':
        return <ArrowUpRight className="w-5 h-5" />;
      case 'vote':
        return <Vote className="w-5 h-5" />;
      case 'proposal':
        return <FileText className="w-5 h-5" />;
      case 'delegation':
        return <Users className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'transaction':
        return 'text-cyber-cyan bg-cyber-cyan/10';
      case 'vote':
        return 'text-cyber-purple bg-cyber-purple/10';
      case 'proposal':
        return 'text-cyber-pink bg-cyber-pink/10';
      case 'delegation':
        return 'text-green-400 bg-green-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <Card>
      <h3 className="text-xl font-bold mb-6">Recent Activity</h3>

      <div className="space-y-4">
        {mockActivity.map((activity) => (
          <div
            key={activity.id}
            className="flex gap-4 p-4 glass-hover rounded-lg"
          >
            <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${getIconColor(activity.type)}`}>
              {getIcon(activity.type)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="font-semibold">{activity.title}</h4>
                {activity.status && (
                  <Badge
                    variant={activity.status === 'success' ? 'success' : 'danger'}
                    size="sm"
                  >
                    {activity.status}
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-gray-400 mb-2">
                {activity.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-gray-500">
                <AddressDisplay address={activity.actor} chars={3} showCopy={false} />
                <span>•</span>
                <span>{formatTimeAgo(activity.timestamp)}</span>
                {activity.value && (
                  <>
                    <span>•</span>
                    <span className="font-mono font-medium text-cyber-cyan">
                      {activity.value}
                    </span>
                  </>
                )}
              </div>
            </div>

            <button className="shrink-0 text-gray-400 hover:text-white transition-colors">
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
        View All Activity →
      </button>
    </Card>
  );
}