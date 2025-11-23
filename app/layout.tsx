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
                background: '#1a1a24',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.1)',
              },
              success: {
                iconTheme: {
                  primary: '#00d4ff',
                  secondary: '#1a1a24',
                },
              },
            }}
          />
        </Web3Provider>
      </body>
    </html>
  );
}