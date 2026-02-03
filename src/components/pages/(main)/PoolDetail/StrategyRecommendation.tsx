export function StrategyRecommendation() {
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
            <p className="text-text-main text-base font-semibold">$2,845.20</p>
          </div>
          <div>
            <p className="text-text-secondary text-xs mb-1">Current Price</p>
            <p className="text-text-main text-base font-semibold">$3,124.50</p>
          </div>
          <div>
            <p className="text-text-secondary text-xs mb-1">Upper Range</p>
            <p className="text-text-main text-base font-semibold">$3,450.80</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-text-secondary text-xs mb-1">Estimated APY</p>
            <p className="text-brand text-base font-semibold">24.5%</p>
          </div>
          <div>
            <p className="text-text-secondary text-xs mb-1">Estimated Fees</p>
            <p className="text-text-main text-base font-semibold">$125.80/day</p>
          </div>
          <div>
            <p className="text-text-secondary text-xs mb-1">Risk Level</p>
            <p className="text-text-main text-base font-semibold">Balanced</p>
          </div>
        </div>

        <div className="bg-white border border-border-main rounded-lg p-3 mb-4">
          <h4 className="text-text-main font-semibold text-sm mb-1">
            AI Analysis Summary
          </h4>
          <p className="text-text-secondary text-xs">
            Based on recent market volatility and trading patterns, this range
            provides optimal balance between fee capture and impermanent loss
            risk. The agent predicts 85% in-range time over the next 7 days.
          </p>
        </div>

        <button className="w-full bg-brand hover:bg-brand-hover text-white py-3 rounded-full font-semibold text-sm transition-colors cursor-pointer">
          Create Position
        </button>
      </div>
    </div>
  );
}
