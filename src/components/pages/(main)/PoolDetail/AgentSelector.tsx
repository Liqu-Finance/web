"use client";

import { useState } from "react";
import { FaBriefcase, FaTrophy } from "react-icons/fa";
import type { AIAgent } from "@/types";

const mockAgents: AIAgent[] = [
  {
    id: "1",
    name: "CLMM Agent",
    agentId: "#22810",
    score: 95,
    feedback: 124,
    stars: 89,
  },
  {
    id: "2",
    name: "Liquidity Optimizer",
    agentId: "#22809",
    score: 92,
    feedback: 98,
    stars: 76,
  },
  {
    id: "3",
    name: "Pool Analytics",
    agentId: "#22808",
    score: 88,
    feedback: 67,
    stars: 54,
  },
];

export function AgentSelector() {
  const [selectedAgent, setSelectedAgent] = useState<string>(mockAgents[0].id);

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
        {mockAgents.map((agent) => {
          const isSelected = selectedAgent === agent.id;
          return (
            <button
              key={agent.id}
              onClick={() => setSelectedAgent(agent.id)}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer text-left ${
                isSelected
                  ? "border-brand bg-brand/5"
                  : "border-border-main hover:border-brand/50"
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isSelected ? "bg-brand" : "bg-bg-light"
                  }`}
                >
                  <FaBriefcase
                    className={`text-base ${
                      isSelected ? "text-white" : "text-text-secondary"
                    }`}
                  />
                </div>
                <div>
                  <p className="text-text-main font-semibold text-sm">{agent.name}</p>
                  <p className="text-text-secondary text-xs">{agent.agentId}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <FaTrophy className="text-brand text-xs" />
                  <span className="text-text-main font-medium">
                    {agent.score}
                  </span>
                </div>
                <div className="text-text-secondary">
                  {agent.feedback} feedback
                </div>
                <div className="text-text-secondary">{agent.stars} stars</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
