import Image from "next/image";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import type { Pool } from "@/types";

interface PoolCardProps {
  pool: Pool;
}

export function PoolCard({ pool }: PoolCardProps) {
  return (
    <Link href={`/pool/${pool.id}`} className="block">
      <div className="bg-surface border border-border-main rounded-2xl p-6 hover:border-brand/50 transition-colors cursor-pointer">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white relative z-10">
              <Image
                src={pool.token0Logo}
                alt={pool.token0Symbol}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white -ml-2">
              <Image
                src={pool.token1Logo}
                alt={pool.token1Symbol}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <h3 className="text-text-main font-semibold text-lg">
              {pool.token0} / {pool.token1}
            </h3>
            <p className="text-text-secondary text-sm">
              {pool.token0Symbol} / {pool.token1Symbol}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-bg-light border border-border-main rounded-full px-3 py-1.5">
          <Image
            src="/Images/Logo/unichain-logo.png"
            alt="Unichain Sepolia"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div>
          <p className="text-text-secondary text-xs mb-1">Volume (24h)</p>
          <p className="text-text-main font-semibold">{pool.volume24h}</p>
        </div>
        <div>
          <p className="text-text-secondary text-xs mb-1">TVL</p>
          <p className="text-text-main font-semibold">{pool.tvl}</p>
        </div>
        <div>
          <p className="text-text-secondary text-xs mb-1">APR Range</p>
          <p className="text-text-main font-semibold">{pool.aprRange}</p>
          {pool.contractAddress && (
            <a
              href={pool.contractAddress}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-brand text-xs mt-1 hover:underline cursor-pointer"
            >
              <span>Contract</span>
              <FiExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <LiquidityRange
          amount={pool.liquidity.range1.amount}
          apr={pool.liquidity.range1.apr}
          percentage={pool.liquidity.range1.percentage}
        />
        <LiquidityRange
          amount={pool.liquidity.range2.amount}
          apr={pool.liquidity.range2.apr}
          percentage={pool.liquidity.range2.percentage}
        />
        <LiquidityRange
          amount={pool.liquidity.range3.amount}
          apr={pool.liquidity.range3.apr}
          percentage={pool.liquidity.range3.percentage}
        />
        <LiquidityRange
          amount={pool.liquidity.range4.amount}
          apr={pool.liquidity.range4.apr}
          percentage={pool.liquidity.range4.percentage}
        />
      </div>
    </div>
    </Link>
  );
}

interface LiquidityRangeProps {
  amount: string;
  apr: string;
  percentage: string;
}

function LiquidityRange({ amount, apr, percentage }: LiquidityRangeProps) {
  return (
    <div className="bg-bg-light border border-border-main rounded-lg p-3 text-center">
      <p className="text-text-main font-semibold text-sm mb-1">{amount}</p>
      <p className="text-text-secondary text-xs mb-1">{apr}</p>
      <p className="text-text-secondary text-xs">{percentage}</p>
    </div>
  );
}
