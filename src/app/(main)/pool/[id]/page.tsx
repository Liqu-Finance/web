import { Navbar } from "@/components/pages/(main)/Pool";
import {
  PoolDetailHeader,
  CLMMChart,
  AgentSelector,
  StrategyRecommendation,
} from "@/components/pages/(main)/PoolDetail";
import type { PoolDetail } from "@/types";

const mockPoolDetail: PoolDetail = {
  id: "eth-usdc",
  token0: "Ethereum",
  token1: "USD Coin",
  token0Symbol: "ETH",
  token1Symbol: "USDC",
  token0Logo: "/Images/Logo/eth-logo.svg",
  token1Logo: "/Images/Logo/usdc-logo.png",
  volume24h: "$687.89K",
  volumeChange: "-7.6%",
  tvl: "$723.13K",
  aprRange: "0.00% - 82.15%",
  tradingRange: "0.0-17.4%",
  bonusRange: "up to 64.8%",
  liquidityInRange: "17.1%",
  totalFeesCaptured: "$343.95",
  tradingAPR: "17.36%",
  inRangeTradingAPR: "101.61%",
  inRangeComparison: "+84.25% higher",
};

export default function PoolDetailPage() {
  return (
    <div className="min-h-screen w-full bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center mb-8 relative">
          <Navbar />
        </div>
        <PoolDetailHeader pool={mockPoolDetail} />
        <CLMMChart />
        <AgentSelector />
        <StrategyRecommendation />
      </div>
    </div>
  );
}
