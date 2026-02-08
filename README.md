<p align="center">
  <img src="public/Images/Logo/liqu.png" alt="Liqu Logo" width="120" />
</p>

# Liqu

An agentic payment system powered by AI agents that interact with Uniswap v4 Concentrated Liquidity Market Maker (CLMM) pools. Liqu enables intelligent, automated liquidity management with transparent, permissioned, and composable actions.

## Overview

Liqu leverages AI agents to help users optimize their liquidity positions on Uniswap v4. The system uses **ERC-8004** to standardize how agents receive user intent and permissions, ensuring all actions are:

- **Transparent** - Clear visibility into what actions will be executed
- **Safe** - Permissioned execution with user consent
- **Composable** - Modular design for extensibility
- **Intelligent** - AI-driven pool selection and range optimization

### Core Features

- **Smart Pool Selection** - AI agents analyze real-time pool conditions to recommend the best liquidity pools
- **Optimal Range Computation** - Automatic calculation of optimal CLMM position ranges
- **Automated Execution** - Seamless payment and liquidity action execution
- **Strategy Recommendations** - Agent-powered suggestions with confidence levels
- **Position Management** - Track and manage your liquidity positions
- **Rebalancing** - Automated position rebalancing based on market conditions

### Network

The system currently operates on **Unichain Sepolia** testnet.

## Tech Stack

- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Wallet Integration**: RainbowKit + Wagmi + Viem
- **Animations**: Framer Motion
- **Code Quality**: Biome (linting + formatting)

## Prerequisites

- Node.js 18+
- pnpm 8+
- A Web3 wallet (MetaMask, Coinbase Wallet, etc.)
- WalletConnect Project ID (for wallet connections)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/liqu.git
cd liqu/web
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the project root:

```bash
cp .env.local.example .env.local
```

Configure the required environment variables:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id_here
```

To obtain a WalletConnect Project ID:
1. Visit [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Create a new project
3. Copy the Project ID

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
pnpm build
```

### 6. Start Production Server

```bash
pnpm start
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run Biome linter |
| `pnpm format` | Format code with Biome |

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (main)/            # Main application routes
│   │   ├── agent/         # Agent management page
│   │   ├── faucet/        # Testnet faucet page
│   │   └── pool/          # Pool listing and detail pages
│   └── api/               # API routes
├── components/            # React components
│   ├── pages/             # Page-scoped components
│   │   └── (main)/        # Main section components
│   │       ├── Agent/     # Agent-related components
│   │       ├── Faucet/    # Faucet components
│   │       ├── Pool/      # Pool listing components
│   │       └── PoolDetail/# Pool detail components
│   └── providers/         # Context providers
├── data/                  # Static data
├── lib/                   # Utilities and hooks
│   ├── abis/              # Smart contract ABIs
│   └── hooks/             # Custom React hooks
└── types/                 # TypeScript type definitions
```

## User Flow

1. **Connect Wallet** - Connect your Web3 wallet to the application
2. **Browse Pools** - Explore available Uniswap v4 CLMM pools
3. **Select Agent** - Choose an AI agent strategy (Conservative, Moderate, Aggressive)
4. **Review Recommendation** - View agent analysis and suggested liquidity range
5. **Approve & Execute** - Sign the ERC-8004 permission and execute the action
6. **Monitor Position** - Track your positions and view transaction details

## Testnet Faucet

Need testnet tokens? Visit the `/faucet` page to mint test tokens for use on Unichain Sepolia.

## License

MIT
