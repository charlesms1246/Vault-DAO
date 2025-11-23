'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { useProposals } from '@/lib/hooks/useProposals';
import { formatTimeAgo } from '@/lib/utils/formatters';
import { ExternalLink, Vote as VoteIcon, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface GovernancePanelProps {
  snapshotSpace?: string;
}

export function GovernancePanel({ snapshotSpace }: GovernancePanelProps) {
  const { proposals, isLoading } = useProposals(snapshotSpace, 'active', 5);

  if (isLoading) {
    return (
      <Card>
        <h3 className="text-xl font-bold mb-6">Active Proposals</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} height="120px" />
          ))}
        </div>
      </Card>
    );
  }

  if (!snapshotSpace) {
    return (
      <Card>
        <h3 className="text-xl font-bold mb-4">Active Proposals</h3>
        <p className="text-center text-gray-400">
          No Snapshot space configured for this DAO
        </p>
      </Card>
    );
  }

  if (proposals.length === 0) {
    return (
      <Card>
        <h3 className="text-xl font-bold mb-4">Active Proposals</h3>
        <div className="text-center py-8">
          <CheckCircle className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No active proposals</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Active Proposals</h3>
        <Badge variant="info">{proposals.length} Active</Badge>
      </div>

      <div className="space-y-4">
        {proposals.map((proposal, index) => {
          const isActive = proposal.state === 'active';
          const timeLeft = proposal.end - Date.now() / 1000;
          const hasEnded = timeLeft <= 0;

          return (
            <div
              key={`${proposal.id}-${index}`}
              className="glass-hover p-5 rounded-lg border border-white/5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-2 line-clamp-2">
                    {proposal.title}
                  </h4>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <VoteIcon className="w-4 h-4" />
                      {proposal.votes} votes
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {hasEnded ? 'Ended' : formatTimeAgo(proposal.end * 1000)}
                    </span>
                  </div>
                </div>
                <Badge
                  variant={isActive ? 'success' : 'default'}
                  className="shrink-0"
                >
                  {proposal.state}
                </Badge>
              </div>

              {/* Voting Results */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Votes Cast</span>
                  <span className="font-mono font-medium">
                    {proposal.scores_total.toFixed(0)}
                  </span>
                </div>
                <div className="h-2 bg-cyber-dark-700 rounded-full overflow-hidden flex">
                  {proposal.choices.map((choice, idx) => {
                    const percentage = (proposal.scores[idx] / proposal.scores_total) * 100;
                    return (
                      <div
                        key={`${choice}-${idx}`}
                        className="h-full transition-all"
                        style={{
                          width: `${percentage}%`,
                          background: `hsl(${(idx * 120)}, 70%, 50%)`,
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<VoteIcon className="w-4 h-4" />}
                  disabled={hasEnded}
                  fullWidth
                >
                  {hasEnded ? 'Voting Ended' : 'Vote'}
                </Button>
                <Link
                  href={proposal.link || `https://snapshot.org/#/${snapshotSpace}/proposal/${proposal.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}