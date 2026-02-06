import Image from "next/image";
import { FaTrophy, FaStar } from "react-icons/fa";
import type { Agent } from "@/types";

interface StrategyRecommendationProps {
  selectedAgent: Agent;
}

export function StrategyRecommendation({
  selectedAgent,
}: StrategyRecommendationProps) {
  return (
    <div className="bg-surface border border-border-main rounded-xl p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-text-main text-lg font-bold mb-1">
          AI Strategy Recommendation
        </h2>
        <p className="text-text-secondary text-sm">
          You classified as Balanced risk, here's our recommended CLMM strategy
        </p>
      </div>

      <div className="bg-bg-light border border-border-main rounded-lg p-4">
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-64">
            <div className="bg-white border border-border-main rounded-lg p-4">
              <div className="relative aspect-square rounded-lg overflow-hidden border border-border-main mb-3">
                <Image
                  src={selectedAgent.image}
                  alt={selectedAgent.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-text-main font-bold text-base">
                    {selectedAgent.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Image
                      src={selectedAgent.chainLogo}
                      alt={selectedAgent.chain}
                      width={65}
                      height={65}
                      className="object-contain"
                    />
                  </div>
                </div>
                <p className="text-brand text-sm font-medium mb-1">
                  {selectedAgent.ens}
                </p>
                <p className="text-text-secondary text-sm mb-3">
                  {selectedAgent.agentId}
                </p>

                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  {selectedAgent.services.map((service) => (
                    <span
                      key={service}
                      className="bg-bg-light rounded px-2 py-1 text-xs text-text-secondary"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm mb-3 pb-3 border-b border-border-main">
                  <div className="flex items-center gap-1">
                    <FaTrophy className="text-brand" />
                    <span className="text-text-main font-semibold">
                      {selectedAgent.score}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-brand" />
                    <span className="text-text-main font-semibold">
                      {selectedAgent.stars}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary">Owner</span>
                  <span className="text-text-main font-mono">
                    {selectedAgent.owner}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-4">
              <h3 className="text-text-main text-base font-semibold mb-1">
                Balanced Range Strategy
              </h3>
              <p className="text-text-secondary text-xs">
                AI-optimized liquidity range based on market analysis
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-text-secondary text-xs mb-1">Lower Range</p>
                <p className="text-text-main text-base font-semibold">
                  $2,845.20
                </p>
              </div>
              <div>
                <p className="text-text-secondary text-xs mb-1">Current Price</p>
                <p className="text-text-main text-base font-semibold">
                  $3,124.50
                </p>
              </div>
              <div>
                <p className="text-text-secondary text-xs mb-1">Upper Range</p>
                <p className="text-text-main text-base font-semibold">
                  $3,450.80
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-text-secondary text-xs mb-1">Estimated APY</p>
                <p className="text-brand text-base font-semibold">24.5%</p>
              </div>
              <div>
                <p className="text-text-secondary text-xs mb-1">
                  Estimated Fees
                </p>
                <p className="text-text-main text-base font-semibold">
                  $125.80/day
                </p>
              </div>
              <div>
                <p className="text-text-secondary text-xs mb-1">Risk Level</p>
                <p className="text-text-main text-base font-semibold">
                  Balanced
                </p>
              </div>
            </div>

            <div className="bg-white border border-border-main rounded-lg p-3 mb-4">
              <h4 className="text-text-main font-semibold text-sm mb-2">
                AI Analysis Summary
              </h4>
              <p className="text-text-secondary text-xs leading-relaxed">
                Based on recent market volatility and trading patterns, this
                range provides optimal balance between fee capture and
                impermanent loss risk. The agent has analyzed historical price
                movements over the past 30 days, identifying key support and
                resistance levels. Current market conditions suggest moderate
                volatility with a bullish trend, making this range ideal for
                maximizing fee generation while minimizing exposure to significant
                price swings. The agent predicts 85% in-range time over the next 7
                days, with an estimated daily volume of $2.4M providing consistent
                fee opportunities. Risk assessment indicates low probability of
                extreme price movements beyond the specified range during this
                period.  resistance levels at $2,800 and $3,500 respectively. Current                                                                  
      market conditions suggest moderate volatility with a bullish trend,                                                            
      making this range ideal for maximizing fee generation while                                                                   
      minimizing exposure to significant price swings. The agent predicts                                                           
                    volume of $2.4M providing consistent fee opportunities. 
                
              </p>
            </div>

            <button className="w-full bg-brand hover:bg-brand-hover text-white py-3 rounded-full font-semibold text-sm transition-colors cursor-pointer">
              Create Position
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
