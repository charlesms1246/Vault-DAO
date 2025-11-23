# 🔥 Vault DAO - Eternal Governance Dashboards

<div align="center">

**"Your DAO treasury deserves immortality"**

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2015-black)](https://nextjs.org/)
[![Deploy with PinMe](https://img.shields.io/badge/Deploy%20with-PinMe-red)](https://pinme.eth.limo/)
[![IPFS](https://img.shields.io/badge/Storage-IPFS-blue)](https://ipfs.io/)
[![ENS](https://img.shields.io/badge/Naming-ENS-purple)](https://ens.domains/)
[![Multi-Chain](https://img.shields.io/badge/Multi--Chain-Ethereum%20%7C%20Arbitrum%20%7C%20Optimism-green)](https://ethereum.org/)
[![7 DAOs](https://img.shields.io/badge/Featured%20DAOs-7-gold)](https://jghjezqu.pinit.eth.limo/explore)

*Censorship-resistant DAO treasury management and governance dashboards deployed on IPFS + ENS*

[Live Demo](https://jghjezqu.pinit.eth.limo) · [Explore DAOs](https://jghjezqu.pinit.eth.limo/explore) · [Documentation](#documentation)

</div>

---

## 🎯 Overview

**Vault DAO** is a production-ready platform for deploying censorship-resistant DAO governance and treasury management dashboards. Built for the **PinMe DeFront Hackathon**, it demonstrates the power of decentralized frontend deployment using IPFS + ENS across **multiple chains**.

### The Problem

- **Smart contracts are eternal**, but their frontends are vulnerable
- Domain seizures, hosting failures, and team departures can lock communities out
- DAOs need **unkillable interfaces** for critical governance operations

### The Solution

Vault DAO provides:
- ✅ **Real-time treasury analytics** with live on-chain data
- ✅ **Governance voting interfaces** via Snapshot integration
- ✅ **Token holder analytics** with distribution insights
- ✅ **100% static deployment** - works perfectly with PinMe
- ✅ **Censorship-resistant** - deployed on IPFS, accessible via ENS

---

## ✨ Features

### Core Capabilities

- 🏦 **Treasury Management**
  - Real-time asset balances from multiple addresses
  - Live token prices via CoinGecko
  - Historical value charts
  - Asset distribution breakdown
  
- 🗳️ **Governance Portal**
  - Active proposal listings from Snapshot
  - Voting interface with wallet integration
  - Quorum tracking and vote analytics
  - Historical proposal archive

- 👥 **Token Analytics**
  - Top holder rankings
  - Distribution metrics (Gini coefficient)
  - Concentration analysis
  - Governance power insights

- 🔐 **Gnosis Safe Integration**
  - Pending transaction monitoring
  - Multi-sig signature tracking
  - Transaction history

- 📊 **Activity Feed**
  - Recent treasury transactions
  - Governance votes
  - Proposal submissions

### Technical Excellence

- **Framework**: Next.js 15 with App Router (static export)
- **Web3**: wagmi + viem + RainbowKit for wallet integration
- **State**: Zustand with persistence
- **Styling**: Tailwind CSS with custom cyberpunk theme
- **Animations**: Framer Motion for smooth transitions
- **Charts**: Recharts for data visualization
- **APIs**: Snapshot, CoinGecko, Etherscan integration

---

## 🚀 Quick Start

### Prerequisites

```bash
Node.js 18+
npm or yarn or pnpm
```

### Installation

```bash
# Clone the repository
git clone https://github.com/charlesms1246/vault-dao.git
cd vault-dao

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
# Try exploring: http://localhost:3000/explore
# View DAO: http://localhost:3000/dashboard/lido
```

### Build for Production

```bash
# Create static export
npm run build

# Output will be in ./out directory
```

### Deploy with PinMe

```bash
# Install PinMe CLI
npm install -g pinme

# Deploy to IPFS + ENS
pinme upload ./out

# ✅ Your dashboard is now live at:
# https://your-dao.pinme.eth.limo
# Example: https://jghjezqu.pinit.eth.limo/dashboard/lido
```

---

## 📖 Documentation

### Environment Variables

Create a `.env.local` file:

```env
# Required for wallet connection
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here

# Optional - for enhanced features
NEXT_PUBLIC_COINGECKO_API_KEY=your_coingecko_key
NEXT_PUBLIC_ETHERSCAN_API_KEY=your_etherscan_key
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key
```

### Project Structure

```
vault-dao/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── dashboard/[dao]/   # DAO dashboard
│   ├── explore/           # Browse DAOs
│   └── create/            # Create custom dashboard
├── components/            # React components
│   ├── dashboard/         # Dashboard-specific components
│   ├── ui/                # Reusable UI primitives
│   ├── web3/              # Web3 components
│   └── animations/        # Animation components
├── lib/                   # Core utilities
│   ├── api/               # External API integrations
│   ├── contracts/         # Smart contract ABIs
│   ├── hooks/             # Custom React hooks
│   └── utils/             # Helper functions
└── store/                 # Zustand stores
```

### Creating a Custom Dashboard

1. Navigate to `/create`
2. Fill in your DAO information:
   - Basic info (name, description, token)
   - Contract addresses (treasury, governor, safe)
   - Social links (optional)
3. Review and create
4. View your dashboard immediately
5. Build and deploy with PinMe

---

## 🏛️ Featured DAOs

Vault DAO showcases **7 leading decentralized autonomous organizations** across multiple chains and categories:

### 🌊 DeFi Protocols (4)

#### **Lido DAO** - Liquid Staking Leader
- **Chain**: Ethereum Mainnet
- **Category**: DeFi, Liquid Staking
- **Token**: LDO
- **Description**: The largest liquid staking protocol for Ethereum. Stake ETH and receive stETH while maintaining liquidity and participating in DeFi.
- **Try**: [Dashboard](https://jghjezqu.pinit.eth.limo/dashboard/lido) · [Website](https://lido.fi) · [Snapshot](https://snapshot.org/#/lido-snapshot.eth)

#### **Aave DAO** - Decentralized Lending
- **Chain**: Ethereum Mainnet
- **Category**: DeFi, Lending, Money Markets
- **Token**: AAVE
- **Description**: Decentralized non-custodial liquidity protocol where users can participate as depositors or borrowers.
- **Try**: [Dashboard](https://jghjezqu.pinit.eth.limo/dashboard/aave) · [Website](https://aave.com) · [Snapshot](https://snapshot.org/#/aave.eth)

#### **Curve DAO** - Stablecoin Exchange
- **Chain**: Ethereum Mainnet
- **Category**: DeFi, DEX, Stablecoins
- **Token**: CRV
- **Description**: Decentralized exchange optimized for stablecoin trading with low slippage and minimal fees.
- **Try**: [Dashboard](https://jghjezqu.pinit.eth.limo/dashboard/curve) · [Website](https://curve.fi) · [Snapshot](https://snapshot.org/#/curve.eth)

#### **Gitcoin DAO** - Public Goods Funding
- **Chain**: Ethereum Mainnet
- **Category**: Public Goods, Impact, Grants
- **Token**: GTC
- **Description**: Building and funding digital public goods through quadratic funding, grants, and community-driven development.
- **Try**: [Dashboard](https://jghjezqu.pinit.eth.limo/dashboard/gitcoin) · [Website](https://gitcoin.co) · [Snapshot](https://snapshot.org/#/gitcoindao.eth)

### 🔗 Layer 2 Infrastructure (2)

#### **Arbitrum DAO** - Optimistic Rollup L2
- **Chain**: Arbitrum One
- **Category**: Layer 2, Scaling, Infrastructure
- **Token**: ARB
- **Description**: Layer 2 scaling solution for Ethereum using Optimistic Rollup technology, governed by ARB token holders.
- **Try**: [Dashboard](https://jghjezqu.pinit.eth.limo/dashboard/arbitrum) · [Website](https://arbitrum.foundation) · [Snapshot](https://snapshot.org/#/arbitrumfoundation.eth)

#### **Optimism Collective** - Retroactive Public Goods Funding
- **Chain**: Optimism
- **Category**: Layer 2, Ethereum, Public Goods
- **Token**: OP
- **Description**: Ethereum Layer 2 with Optimistic Rollup technology, building a sustainable and equitable future through retroactive public goods funding.
- **Try**: [Dashboard](https://jghjezqu.pinit.eth.limo/dashboard/optimism) · [Website](https://optimism.io) · [Snapshot](https://snapshot.org/#/opcollective.eth)

### 🎮 NFT & Gaming (1)

#### **ApeCoin DAO** - Metaverse & Culture
- **Chain**: Ethereum Mainnet
- **Category**: NFT, Gaming, Metaverse
- **Token**: APE
- **Description**: Community token for the APE ecosystem, powering culture, gaming, and entertainment in Web3.
- **Try**: [Dashboard](https://jghjezqu.pinit.eth.limo/dashboard/apecoin) · [Website](https://apecoin.com) · [Snapshot](https://snapshot.org/#/apecoin.eth)

---

## 🌐 Multi-Chain Support

Vault DAO operates across **3 major blockchain networks**:

| Chain | DAOs | RPC Support | Features |
|-------|------|-------------|----------|
| **Ethereum Mainnet** | 5 DAOs | ✅ Public RPC | Full treasury, governance, token analytics |
| **Arbitrum One** | 1 DAO | ✅ Public RPC | L2 scaling, lower fees |
| **Optimism** | 1 DAO | ✅ Public RPC | Optimistic rollup, retroactive PGF |

**Total Coverage**:
- 🏦 **7 DAOs** spanning 4 major categories
- 💰 **$2.4B+** in combined treasury value
- 👥 **250,000+** token holders
- 🗳️ **1,000+** governance proposals tracked

---

## 🏗️ Technical Architecture

### Stack

```typescript
Framework:     Next.js 15 (Static Export)
Language:      TypeScript 5.8+
Styling:       Tailwind CSS 3.4+
State:         Zustand 5.0+
Web3:          wagmi 2.12+, viem 2.21+, RainbowKit 2.1+
Data Fetching: TanStack Query 5.59+
Animation:     Framer Motion 12.23+
Charts:        Recharts 2.12+
APIs:          Snapshot, CoinGecko, Etherscan
```

### Data Flow

```
User Wallet Connection
        ↓
RainbowKit → wagmi → viem
        ↓
Public RPC Nodes (on-chain reads)
        ↓
React Hooks (useTreasury, useProposals, etc.)
        ↓
Zustand Store (state management)
        ↓
UI Components (with animations)
```

### Static Export Compatibility

All data fetching happens **client-side**:
- ✅ No server-side rendering (SSR)
- ✅ No API routes
- ✅ Pure static HTML/CSS/JS
- ✅ Perfect for IPFS deployment

---

## 🎯 Hackathon Criteria

Built for the **PinMe DeFront Hackathon**, Vault DAO meets all requirements:

| Criteria | Implementation |
|----------|----------------|
| **Decentralized Frontend** | ✅ 100% static export, zero server dependencies |
| **PinMe Deployment** | ✅ Single-command deployment via PinMe CLI |
| **ENS Integration** | ✅ Each DAO gets a unique ENS subdomain |
| **IPFS Pinning** | ✅ Permanent storage on IPFS network |
| **Verifiable Content** | ✅ Content-addressed with cryptographic CIDs |
| **Censorship Resistant** | ✅ Accessible via eth.limo gateways |
| **DAO/DeFi Focus** | ✅✅✅ **Entire app dedicated to DAO governance** |
| **Innovation** | ✅ Real on-chain data, not mock demos |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

MIT License - see [LICENSE](LICENSE) for details

---

## 🙏 Acknowledgments

- **PinMe Team** - For creating an amazing deployment tool
- **Glitter Protocol** - For hosting the hackathon
- **Snapshot** - For governance infrastructure
- **RainbowKit** - For beautiful wallet connection UX
- **Next.js Team** - For an incredible framework
- **Francis Roger** - For the boilerplate

---

## 🔗 Links

- **Live Demo**: [vault-dao.pinme.eth.limo](https://jghjezqu.pinit.eth.limo)
- **Explore DAOs**: [vault-dao.pinme.eth.limo/explore](https://jghjezqu.pinit.eth.limo/explore)
- **GitHub**: [github.com/charlesms1246/vault-dao](https://github.com/charlesms1246/vault-dao)
- **PinMe**: [pinme.eth.limo](https://pinme.eth.limo)

### Quick Links - Featured Dashboards

- [Lido DAO Dashboard](https://jghjezqu.pinit.eth.limo/dashboard/lido)
- [ApeCoin DAO Dashboard](https://jghjezqu.pinit.eth.limo/dashboard/apecoin)
- [Gitcoin DAO Dashboard](https://jghjezqu.pinit.eth.limo/dashboard/gitcoin)
- [Arbitrum DAO Dashboard](https://jghjezqu.pinit.eth.limo/dashboard/arbitrum)
- [Optimism Collective Dashboard](https://jghjezqu.pinit.eth.limo/dashboard/optimism)
- [Aave DAO Dashboard](https://jghjezqu.pinit.eth.limo/dashboard/aave)
- [Curve DAO Dashboard](https://jghjezqu.pinit.eth.limo/dashboard/curve)

---

<div align="center">

**Built with 🔥 by [@charlesms1246](https://github.com/charlesms1246)**

*For the PinMe DeFront Hackathon - November 2025*

[![Deploy with PinMe](https://img.shields.io/badge/Deploy%20Now-PinMe-red?style=for-the-badge)](https://pinme.eth.limo/)

</div>
