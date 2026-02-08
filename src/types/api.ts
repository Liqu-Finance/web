export interface StrategyConfig {
  tickRangeMultiplier: number;
  maxSlippage: number;
  rebalanceThreshold: number;
  description: string;
}

export interface ApiAgent {
  agentId: number;
  domain: string;
  address: string;
  strategy: "CONSERVATIVE" | "BALANCED" | "DEGEN";
  strategyConfig: StrategyConfig;
  authorized: boolean;
}

export interface AgentsResponse {
  agents: ApiAgent[];
}

export interface PoolInfo {
  tick: number;
  price: number;
  liquidity: string;
}

export interface Recommendation {
  action: string;
  tickLower: number;
  tickUpper: number;
  reason: string;
  confidence: number;
}

export interface AnalyzeResponse {
  strategy: string;
  strategyConfig: StrategyConfig;
  pool: PoolInfo;
  recommendation: Recommendation;
  agentAddress: string;
}

export interface AgentRunResponse {
  agentId: number;
  agentDomain: string;
  agentAddress: string;
  depositId: number;
  pool: PoolInfo;
  status: string;
  action: string;
  reason: string;
  confidence: number;
  txHashes: string[];
  message: string;
  timestamp: number;
}

export interface UpdatedDeposit {
  amount0Remaining: string;
  amount1Remaining: string;
  positionTokenIds: number[];
}

export interface CloseTransaction {
  positionId: number;
  txHash: string;
}

export interface RebalanceTransactions {
  close: CloseTransaction[];
  mint: {
    positionId: number;
    txHash: string;
  };
  validationHash: string;
}

export interface RebalanceResponse {
  depositId: number;
  strategy: string;
  action: string;
  previousPositions: number[];
  newPosition: number;
  newTickLower: number;
  newTickUpper: number;
  reason: string;
  pool: {
    tick: number;
    price: number;
  };
  updatedDeposit: UpdatedDeposit;
  transactions?: RebalanceTransactions;
}

export interface UserDeposit {
  user: string;
  amount0Remaining: bigint;
  amount1Remaining: bigint;
  depositTime: bigint;
  lockUntil: bigint;
  strategy: number;
  assignedAgent: string;
  status: number;
  positionTokenIds: bigint[];
}

export interface UserPosition {
  depositId: bigint;
  deposit: UserDeposit;
}
