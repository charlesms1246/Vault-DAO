import { createPublicClient, http, PublicClient } from 'viem';
import { mainnet, arbitrum, optimism, base, polygon } from 'viem/chains';

// Create public clients for each chain
export const publicClients: Record<number, PublicClient> = {
  1: createPublicClient({
    chain: mainnet,
    transport: http(process.env.NEXT_PUBLIC_MAINNET_RPC || 'https://eth.llamarpc.com'),
  }),
  42161: createPublicClient({
    chain: arbitrum,
    transport: http('https://arb1.arbitrum.io/rpc'),
  }),
  10: createPublicClient({
    chain: optimism,
    transport: http('https://mainnet.optimism.io'),
  }),
  8453: createPublicClient({
    chain: base,
    transport: http('https://mainnet.base.org'),
  }),
  137: createPublicClient({
    chain: polygon,
    transport: http('https://polygon-rpc.com'),
  }),
};

// Get client for specific chain
export function getPublicClient(chainId: number): PublicClient {
  return publicClients[chainId] || publicClients[1];
}