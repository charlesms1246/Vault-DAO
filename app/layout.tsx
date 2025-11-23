import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Web3Provider } from '@/components/providers/Web3Provider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ParticleField } from '@/components/animations/ParticleField';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-jetbrains' 
});

export const metadata: Metadata = {
  title: 'Vault DAO - Eternal Governance Dashboards',
  description: 'Censorship-resistant DAO treasury management and governance dashboards deployed on IPFS + ENS. Built for PinMe DeFront Hackathon.',
  keywords: ['DAO', 'DeFi', 'Governance', 'IPFS', 'ENS', 'Web3', 'Treasury'],
  authors: [{ name: 'Charles MS', url: 'https://github.com/charlesms-eth' }],
  openGraph: {
    title: 'Vault DAO - Eternal Governance Dashboards',
    description: 'Your DAO treasury deserves immortality. Deploy censorship-resistant dashboards on IPFS.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vault DAO',
    description: 'Eternal governance dashboards on IPFS + ENS',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning>
        <Web3Provider>
          <ParticleField />
          <div className="relative z-10 min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#1a0000',
                color: '#fff',
                border: '2px solid #2a0a0a',
                borderRadius: '0px',
                fontFamily: 'var(--font-inter)',
                fontWeight: '600',
              },
              success: {
                style: {
                  border: '2px solid #22c55e',
                  background: '#1a0000',
                },
                iconTheme: {
                  primary: '#eab308',
                  secondary: '#1a0000',
                },
              },
              error: {
                style: {
                  border: '2px solid #dc2626',
                  background: '#1a0000',
                  boxShadow: '0 0 20px rgba(220, 38, 38, 0.3)',
                },
                iconTheme: {
                  primary: '#dc2626',
                  secondary: '#1a0000',
                },
              },
              loading: {
                style: {
                  border: '2px solid #eab308',
                  background: '#1a0000',
                },
                iconTheme: {
                  primary: '#eab308',
                  secondary: '#1a0000',
                },
              },
            }}
          />
        </Web3Provider>
      </body>
    </html>
  );
}