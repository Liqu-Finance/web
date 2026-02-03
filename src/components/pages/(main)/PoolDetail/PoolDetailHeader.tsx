import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import type { PoolDetail } from "@/types";

interface PoolDetailHeaderProps {
  pool: PoolDetail;
}

export function PoolDetailHeader({ pool }: PoolDetailHeaderProps) {
  const isNegativeChange = pool.volumeChange.startsWith("-");

  return (
    <div className="bg-surface border border-border-main rounded-xl p-5 shadow-sm mb-4">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/pool"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-bg-light border border-border-main hover:bg-brand hover:border-brand hover:text-white text-text-secondary transition-all cursor-pointer group"
          >
            <FaArrowLeft className="text-base group-hover:text-white" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white relative z-10">
                <Image
                  src={pool.token0Logo}
                  alt={pool.token0Symbol}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white -ml-3">
                <Image
                  src={pool.token1Logo}
                  alt={pool.token1Symbol}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <h1 className="text-text-main text-2xl font-bold mb-0.5">
                {pool.token0} / {pool.token1}
              </h1>
              <p className="text-text-secondary text-sm">
                {pool.token0Symbol} / {pool.token1Symbol}
              </p>
            </div>
          </div>
        </div>
        <button className="bg-brand hover:bg-brand-hover text-white px-4 py-2 rounded-full font-medium text-sm transition-colors cursor-pointer">
          Manage my liquidity
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-5">
        <div>
          <p className="text-text-secondary text-xs mb-1">Volume (24h)</p>
          <div className="flex items-baseline gap-1.5">
            <p className="text-text-main text-lg font-bold">{pool.volume24h}</p>
            <p
              className={`text-xs font-medium ${
                isNegativeChange ? "text-red-500" : "text-green-500"
              }`}
            >
              {pool.volumeChange}
            </p>
          </div>
        </div>
        <div>
          <p className="text-text-secondary text-xs mb-1">TVL</p>
          <p className="text-text-main text-lg font-bold">{pool.tvl}</p>
        </div>
        <div>
          <p className="text-text-secondary text-xs mb-1">APR Range</p>
          <p className="text-text-main text-lg font-bold">{pool.aprRange}</p>
          <p className="text-text-secondary text-xs mt-0.5">
            Trading: {pool.tradingRange} • Bonus: {pool.bonusRange}
          </p>
        </div>
        <div>
          <p className="text-text-secondary text-xs mb-1">Liquidity in Range</p>
          <p className="text-text-main text-lg font-bold">{pool.liquidityInRange}</p>
        </div>
      </div>

      <div className="border-t border-border-main pt-4">
        <h3 className="text-text-main text-base font-semibold mb-3">
          Overall Pool Performance
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-text-secondary text-xs mb-1">
              Total Fees Captured (24h)
            </p>
            <p className="text-text-main text-base font-bold">
              {pool.totalFeesCaptured}
            </p>
          </div>
          <div>
            <p className="text-text-secondary text-xs mb-1">
              Trading APR (All Liquidity)
            </p>
            <p className="text-text-main text-base font-bold">{pool.tradingAPR}</p>
          </div>
          <div>
            <p className="text-text-secondary text-xs mb-1">
              In-Range Trading APR
            </p>
            <div className="flex items-baseline gap-1.5">
              <p className="text-text-main text-base font-bold">
                {pool.inRangeTradingAPR}
              </p>
              <p className="text-green-500 text-xs font-medium">
                {pool.inRangeComparison}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
