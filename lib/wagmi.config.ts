import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, arbitrum, optimism, base, polygon } from 'wagmi/chains';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '3c4b5d6e7f8g9h0i1j2k3l4m5n6o7p8q';

if (!process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID) {
  console.warn('⚠️ WalletConnect Project ID not found. Using fallback. Get yours at https://cloud.walletconnect.com/');
}

export const wagmiConfig = getDefaultConfig({
  appName: 'Vault DAO',
  projectId,
  chains: [mainnet, arbitrum, optimism, base, polygon],
  ssr: false,
});