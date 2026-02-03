export interface PoolDetail {
  id: string;
  token0: string;
  token1: string;
  token0Symbol: string;
  token1Symbol: string;
  token0Logo: string;
  token1Logo: string;
  volume24h: string;
  volumeChange: string;
  tvl: string;
  aprRange: string;
  tradingRange: string;
  bonusRange: string;
  liquidityInRange: string;
  totalFeesCaptured: string;
  tradingAPR: string;
  inRangeTradingAPR: string;
  inRangeComparison: string;
}

export interface AIAgent {
  id: string;
  name: string;
  agentId: string;
  score: number;
  feedback: number;
  stars: number;
}

export interface Strategy {
  protocol: string;
  protocolLogo: string;
  token: string;
  tags: string[];
  apy: string;
  tvl: string;
  riskLevel: string;
}
