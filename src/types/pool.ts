export interface Pool {
  id: string;
  token0: string;
  token1: string;
  token0Symbol: string;
  token1Symbol: string;
  token0Logo: string;
  token1Logo: string;
  volume24h: string;
  tvl: string;
  aprRange: string;
  liquidity: {
    range1: {
      amount: string;
      apr: string;
      percentage: string;
    };
    range2: {
      amount: string;
      apr: string;
      percentage: string;
    };
    range3: {
      amount: string;
      apr: string;
      percentage: string;
    };
    range4: {
      amount: string;
      apr: string;
      percentage: string;
    };
  };
}
