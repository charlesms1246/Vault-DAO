'use client';

import { useConfig as useWagmiConfig } from 'wagmi';

export function useConfig() {
  return useWagmiConfig();
}