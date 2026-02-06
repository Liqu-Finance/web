"use client";

import { FaSearch, FaClock } from "react-icons/fa";
import { AgentCard } from "./AgentCard";
import type { Agent } from "@/types";

const mockAgents: Agent[] = [
  {
    id: "1",
    name: "CLMM Agent",
    agentId: "#22810",
    image: "/Images/Agent-Image/agent-image-1.png",
    ens: "clmm-agent.eth",
    chain: "Unichain Sepolia",
    chainLogo: "/Images/Logo/unichain-logo.png",
    services: ["CUSTOM", "CLMM"],
    score: 95,
    feedback: 124,
    stars: 89,
    owner: "0x6288...6408",
    x402: null,
    created: "11 minutes ago",
  },
  {
    id: "2",
    name: "Liquidity Optimizer",
    agentId: "#22809",
    image: "/Images/Agent-Image/agent-image-2.png",
    ens: "liq-optimizer.eth",
    chain: "Unichain Sepolia",
    chainLogo: "/Images/Logo/unichain-logo.png",
    services: ["CUSTOM", "DeFi"],
    score: 92,
    feedback: 98,
    stars: 76,
    owner: "0x6288...6408",
    x402: null,
    created: "20 minutes ago",
  },
  {
    id: "3",
    name: "Pool Analytics",
    agentId: "#22808",
    image: "/Images/Agent-Image/agent-image-3.png",
    ens: "pool-analytics.eth",
    chain: "Unichain Sepolia",
    chainLogo: "/Images/Logo/unichain-logo.png",
    services: ["A2A", "WEB"],
    score: 88,
    feedback: 67,
    stars: 54,
    owner: "0x0C3D...0ED6",
    x402: "X402",
    created: "43 minutes ago",
  },
  {
    id: "4",
    name: "Yield Maximizer",
    agentId: "#22807",
    image: "/Images/Agent-Image/agent-image-4.png",
    ens: "yield-max.eth",
    chain: "Unichain Sepolia",
    chainLogo: "/Images/Logo/unichain-logo.png",
    services: ["CUSTOM", "Yield"],
    score: 85,
    feedback: 52,
    stars: 41,
    owner: "0x9A2B...3C4D",
    x402: null,
    created: "1 hour ago",
  },
  {
    id: "5",
    name: "Risk Manager",
    agentId: "#22806",
    image: "/Images/Agent-Image/agent-image-5.png",
    ens: "risk-manager.eth",
    chain: "Unichain Sepolia",
    chainLogo: "/Images/Logo/unichain-logo.png",
    services: ["CUSTOM", "Risk"],
    score: 91,
    feedback: 78,
    stars: 62,
    owner: "0x5E6F...7G8H",
    x402: "X402",
    created: "2 hours ago",
  },
  {
    id: "6",
    name: "Portfolio Rebalancer",
    agentId: "#22805",
    image: "/Images/Agent-Image/agent-image-6.png",
    ens: "rebalancer.eth",
    chain: "Unichain Sepolia",
    chainLogo: "/Images/Logo/unichain-logo.png",
    services: ["CUSTOM", "Portfolio"],
    score: 87,
    feedback: 61,
    stars: 48,
    owner: "0x1I2J...3K4L",
    x402: null,
    created: "3 hours ago",
  },
];

export function AgentList() {
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2 text-text-secondary text-sm mb-4">
          <FaClock className="text-brand" />
          <span>new agent registered 12 minutes ago</span>
        </div>

        <div className="bg-surface border border-border-main rounded-full px-4 py-3 flex items-center gap-3 shadow-sm">
          <FaSearch className="text-text-secondary" />
          <input
            type="text"
            placeholder="Search by agent name, description, skills, ID, or address"
            className="flex-1 bg-transparent outline-none text-text-main placeholder:text-text-secondary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAgents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}
