"use client";

import { useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import { AgentCard } from "./AgentCard";
import { useAgents } from "@/lib/hooks/useAgents";
import type { Agent } from "@/types";

const agentImages: Record<string, string> = {
  CONSERVATIVE: "/Images/Agent-Image/agent-image-1.png",
  BALANCED: "/Images/Agent-Image/agent-image-5.png",
  DEGEN: "/Images/Agent-Image/agent-image-2.png",
};

const agentScores: Record<string, { score: number; stars: number }> = {
  CONSERVATIVE: { score: 95, stars: 89 },
  BALANCED: { score: 92, stars: 76 },
  DEGEN: { score: 88, stars: 54 },
};

function capitalizeStrategy(strategy: string): string {
  return strategy.charAt(0).toUpperCase() + strategy.slice(1).toLowerCase();
}

export function AgentList() {
  const { data: agentsData, isLoading, error } = useAgents();

  const agents: Agent[] = useMemo(() => {
    if (!agentsData?.agents) return [];

    return agentsData.agents.map((apiAgent) => {
      const shortAddress = `${apiAgent.address.slice(0, 6)}...${apiAgent.address.slice(-4)}`;
      const capitalizedStrategy = capitalizeStrategy(apiAgent.strategy);

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
        comingSoon: apiAgent.strategy === "BALANCED" || apiAgent.strategy === "DEGEN",
      };
    });
  }, [agentsData]);

  if (isLoading) {
    return (
      <div>
        <div className="mb-6">
          <div className="bg-surface border border-border-main rounded-full px-4 py-3 flex items-center gap-3 shadow-sm">
            <FaSearch className="text-text-secondary" />
            <input
              type="text"
              placeholder="Search by agent name, description, skills, ID, or address"
              className="flex-1 bg-transparent outline-none text-text-main placeholder:text-text-secondary"
              disabled
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-surface border border-border-main rounded-xl overflow-hidden animate-pulse"
            >
              <div className="aspect-square bg-gray-200" />
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !agents.length) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary">Failed to load agents. Please try again.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="bg-surface border border-border-main rounded-full px-4 py-3 flex items-center gap-3 shadow-sm">
          <FaSearch className="text-text-secondary" />
          <input
            type="text"
            placeholder="Search by agent name, description, skills, ID, or address"
            className="flex-1 bg-transparent outline-none text-text-main placeholder:text-text-secondary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}
