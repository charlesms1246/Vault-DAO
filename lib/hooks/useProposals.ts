'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchProposals } from '@/lib/api/snapshot';
import { REFRESH_INTERVALS } from '@/lib/constants';

export function useProposals(
  space?: string,
  state?: 'active' | 'closed' | 'pending',
  limit: number = 10
) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['proposals', space, state, limit],
    queryFn: () => {
      if (!space) return Promise.resolve([]);
      return fetchProposals(space, state, limit);
    },
    enabled: !!space,
    refetchInterval: REFRESH_INTERVALS.PROPOSALS,
  });

  return {
    proposals: data || [],
    isLoading,
    error,
    refetch,
  };
}