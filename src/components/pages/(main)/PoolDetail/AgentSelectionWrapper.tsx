"use client";

import { useState, useMemo } from "react";
import { AgentSelector } from "./AgentSelector";
import { StrategyRecommendation } from "./StrategyRecommendation";
import { DepositStepper } from "./DepositStepper";
import { MyPositions } from "./MyPositions";
import { useAgents } from "@/lib/hooks/useAgents";
import type { Agent, ApiAgent } from "@/types";

const agentImages: Record<string, string> = {
  CONSERVATIVE: "/Images/Agent-Image/agent-image-1.png",
  BALANCED: "/Images/Agent-Image/agent-image-2.png",
  DEGEN: "/Images/Agent-Image/agent-image-3.png",
};

const agentScores: Record<string, { score: number; stars: number }> = {
  CONSERVATIVE: { score: 95, stars: 89 },
  BALANCED: { score: 92, stars: 76 },
  DEGEN: { score: 88, stars: 54 },
};

function capitalizeStrategy(strategy: string): string {
  return strategy.charAt(0).toUpperCase() + strategy.slice(1).toLowerCase();
}

function mapApiAgentToAgent(apiAgent: ApiAgent): Agent {
  const shortAddress = `${apiAgent.address.slice(0, 6)}...${apiAgent.address.slice(-4)}`;
  const capitalizedStrategy = capitalizeStrategy(apiAgent.strategy);
  const isComingSoon = apiAgent.strategy === "BALANCED" || apiAgent.strategy === "DEGEN";

  return {
    id: String(apiAgent.agentId),
    name: `${capitalizedStrategy} Agent`,
    agentId: `#${apiAgent.agentId}`,
    image: agentImages[apiAgent.strategy] || agentImages.CONSERVATIVE,
    ens: apiAgent.domain,
    chain: "Unichain Sepolia",
    chainLogo: "/Images/Logo/unichain-logo.png",
    services: [capitalizedStrategy, "CLMM"],
    score: agentScores[apiAgent.strategy]?.score || 90,
    feedback: 0,
    stars: agentScores[apiAgent.strategy]?.stars || 70,
    owner: shortAddress,
    x402: null,
    created: "Active",
    comingSoon: isComingSoon,
  };
}

export function AgentSelectionWrapper() {
  const { data: agentsData, isLoading, error } = useAgents();
  const [selectedAgentId, setSelectedAgentId] = useState<string>("1");
  const [showStepper, setShowStepper] = useState(false);
  const [depositId, setDepositId] = useState<bigint | null>(null);

  const agents = useMemo(() => {
    if (!agentsData?.agents) return [];
    return agentsData.agents.map(mapApiAgentToAgent);
  }, [agentsData]);

  const selectedAgent = useMemo(() => {
    return agents.find((agent) => agent.id === selectedAgentId) || agents[0];
  }, [agents, selectedAgentId]);

  const selectedApiAgent = useMemo(() => {
    if (!agentsData?.agents) return null;
    return agentsData.agents.find((a) => String(a.agentId) === selectedAgentId) || agentsData.agents[0];
  }, [agentsData, selectedAgentId]);

  const handleDepositSuccess = (id: bigint) => {
    setDepositId(id);
  };

  if (isLoading) {
    return (
      <div className="bg-surface border border-border-main rounded-xl p-5 shadow-sm mb-4">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4" />
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !agents.length) {
    return (
      <div className="bg-surface border border-border-main rounded-xl p-5 shadow-sm mb-4">
        <p className="text-text-secondary">Failed to load agents. Please try again.</p>
      </div>
    );
  }

  return (
    <>
      <AgentSelector
        agents={agents}
        selectedAgentId={selectedAgentId}
        onSelectAgent={setSelectedAgentId}
      />
      <StrategyRecommendation
        selectedAgent={selectedAgent}
        selectedApiAgent={selectedApiAgent}
        onStartDeposit={() => setShowStepper(true)}
        depositId={depositId}
      />
      <MyPositions />
      {showStepper && (
        <DepositStepper
          selectedApiAgent={selectedApiAgent}
          onClose={() => setShowStepper(false)}
          onSuccess={handleDepositSuccess}
        />
      )}
    </>
  );
}
