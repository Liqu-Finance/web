"use client";

import Image from "next/image";
import { FaTrophy, FaStar } from "react-icons/fa";
import type { Agent } from "@/types";

interface AgentSelectorProps {
  agents: Agent[];
  selectedAgentId: string;
  onSelectAgent: (agentId: string) => void;
}

export function AgentSelector({
  agents,
  selectedAgentId,
  onSelectAgent,
}: AgentSelectorProps) {

  return (
    <div className="bg-surface border border-border-main rounded-xl p-5 shadow-sm mb-4">
      <div className="mb-4">
        <h2 className="text-text-main text-lg font-bold mb-1">
          Select AI Agent
        </h2>
        <p className="text-text-secondary text-sm">
          Choose an AI agent from the registry to determine optimal range
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {agents.map((agent) => {
          const isSelected = selectedAgentId === agent.id;
          const isDisabled = agent.comingSoon;
          return (
            <button
              key={agent.id}
              onClick={() => !isDisabled && onSelectAgent(agent.id)}
              disabled={isDisabled}
              className={`p-3 rounded-lg border-2 transition-all text-left relative ${
                isDisabled
                  ? "opacity-60 cursor-not-allowed border-border-main"
                  : isSelected
                  ? "border-brand bg-brand/5 cursor-pointer"
                  : "border-border-main hover:border-brand/50 cursor-pointer"
              }`}
            >
              {isDisabled && (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="px-2 py-1 bg-brand/90 backdrop-blur-sm text-white text-xs font-bold rounded-full shadow-lg">
                    Coming Soon
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2 mb-2">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={agent.image}
                    alt={agent.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-text-main font-semibold text-sm truncate">
                      {agent.name}
                    </p>
                    <Image
                      src={agent.chainLogo}
                      alt={agent.chain}
                      width={50}
                      height={50}
                      className="object-contain flex-shrink-0"
                    />
                  </div>
                  <p className="text-brand text-xs font-medium truncate">
                    {agent.ens}
                  </p>
                  <p className="text-text-secondary text-xs">{agent.agentId}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-2 flex-wrap">
                {agent.services.map((service) => (
                  <span
                    key={service}
                    className="bg-bg-light rounded px-1.5 py-0.5 text-xs text-text-secondary"
                  >
                    {service}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1">
                  <FaTrophy className="text-brand text-xs" />
                  <span className="text-text-main font-medium">
                    {agent.score}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <FaStar className="text-brand text-xs" />
                  <span className="text-text-main font-medium">
                    {agent.stars}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
