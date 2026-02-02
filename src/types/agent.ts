export interface Agent {
  id: string;
  name: string;
  agentId: string;
  chain: string;
  chainLogo: string;
  services: string[];
  score: number;
  feedback: number;
  stars: number;
  owner: string;
  x402: string | null;
  created: string;
}
