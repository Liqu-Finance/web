"use client";

import { useState } from "react";
import { AgentSelector } from "./AgentSelector";
import { StrategyRecommendation } from "./StrategyRecommendation";
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
];

export function AgentSelectionWrapper() {
  const [selectedAgentId, setSelectedAgentId] = useState<string>(
    mockAgents[0].id
  );

  const selectedAgent =
    mockAgents.find((agent) => agent.id === selectedAgentId) || mockAgents[0];

  return (
    <>
      <AgentSelector
        agents={mockAgents}
        selectedAgentId={selectedAgentId}
        onSelectAgent={setSelectedAgentId}
      />
      <StrategyRecommendation selectedAgent={selectedAgent} />
    </>
  );
}
