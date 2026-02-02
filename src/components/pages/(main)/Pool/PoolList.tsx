"use client";

import { PoolCard } from "./PoolCard";
import type { Pool } from "@/types";

const mockPools: Pool[] = [
  {
    id: "eth-usdc",
    token0: "Ethereum",
    token1: "USD Coin",
    token0Symbol: "ETH",
    token1Symbol: "USDC",
    token0Logo: "/Images/Logo/eth-logo.svg",
    token1Logo: "/Images/Logo/usdc-logo.png",
    volume24h: "$687.89K",
    tvl: "$723.13K",
    aprRange: "0.35% - 82.15%",
    liquidity: {
      range1: {
        amount: "$0",
        apr: "0.0% APR",
        percentage: "0.01%",
      },
      range2: {
        amount: "$0.15",
        apr: "0.3% APR",
        percentage: "0.30%",
      },
      range3: {
        amount: "$687.89K",
        apr: "82.2% APR",
        percentage: "0.05%",
      },
      range4: {
        amount: "$0",
        apr: "0.0% APR",
        percentage: "1.00%",
      },
    },
  },
  {
    id: "eth-usdt",
    token0: "Ethereum",
    token1: "Tether USD",
    token0Symbol: "ETH",
    token1Symbol: "USDT",
    token0Logo: "/Images/Logo/eth-logo.svg",
    token1Logo: "/Images/Logo/usdt-logo.png",
    volume24h: "$532.51K",
    tvl: "$569.6K",
    aprRange: "0.21% - 53.50%",
    liquidity: {
      range1: {
        amount: "$532.51K",
        apr: "53.5% APR",
        percentage: "0.01%",
      },
      range2: {
        amount: "$0",
        apr: "0.0% APR",
        percentage: "0.30%",
      },
      range3: {
        amount: "$0",
        apr: "0.0% APR",
        percentage: "0.05%",
      },
      range4: {
        amount: "$0",
        apr: "0.0% APR",
        percentage: "1.00%",
      },
    },
  },
  {
    id: "wbtc-usdc",
    token0: "Wrapped Bitcoin",
    token1: "USD Coin",
    token0Symbol: "WBTC",
    token1Symbol: "USDC",
    token0Logo: "/Images/Logo/wbtcLogo.svg",
    token1Logo: "/Images/Logo/usdc-logo.png",
    volume24h: "$7.92",
    tvl: "$44.07",
    aprRange: "0.79%",
    liquidity: {
      range1: {
        amount: "$7.92",
        apr: "0.8% APR",
        percentage: "0.01%",
      },
      range2: {
        amount: "$0",
        apr: "0.0% APR",
        percentage: "0.30%",
      },
      range3: {
        amount: "$0",
        apr: "0.0% APR",
        percentage: "0.05%",
      },
      range4: {
        amount: "$0",
        apr: "0.0% APR",
        percentage: "1.00%",
      },
    },
  },
  {
    id: "wbtc-usdt",
    token0: "Wrapped Bitcoin",
    token1: "Tether USD",
    token0Symbol: "WBTC",
    token1Symbol: "USDT",
    token0Logo: "/Images/Logo/wbtcLogo.svg",
    token1Logo: "/Images/Logo/usdt-logo.png",
    volume24h: "$0.99",
    tvl: "$17.1",
    aprRange: "0.21%",
    liquidity: {
      range1: {
        amount: "$0.99",
        apr: "0.2% APR",
        percentage: "0.01%",
      },
      range2: {
        amount: "$0",
        apr: "0.0% APR",
        percentage: "0.30%",
      },
      range3: {
        amount: "$0",
        apr: "0.0% APR",
        percentage: "0.05%",
      },
      range4: {
        amount: "$0",
        apr: "0.0% APR",
        percentage: "1.00%",
      },
    },
  },
  {
    id: "usdc-usdt",
    token0: "USD Coin",
    token1: "Tether USD",
    token0Symbol: "USDC",
    token1Symbol: "USDT",
    token0Logo: "/Images/Logo/usdc-logo.png",
    token1Logo: "/Images/Logo/usdt-logo.png",
    volume24h: "$532.51K",
    tvl: "$569.6K",
    aprRange: "211.62%",
    liquidity: {
      range1: {
        amount: "$0",
        apr: "0.0% APR",
        percentage: "0.01%",
      },
      range2: {
        amount: "$0",
        apr: "0.0% APR",
        percentage: "0.30%",
      },
      range3: {
        amount: "$532.51K",
        apr: "211.6% APR",
        percentage: "0.05%",
      },
      range4: {
        amount: "$0",
        apr: "0.0% APR",
        percentage: "1.00%",
      },
    },
  },
];

export function PoolList() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-text-main text-4xl font-bold mb-2">Top CLMM Pools Today</h2>
        <p className="text-text-secondary">Top CLMM Pools for you</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockPools.map((pool) => (
          <PoolCard key={pool.id} pool={pool} />
        ))}
      </div>
    </div>
  );
}
