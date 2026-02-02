"use client";

import { FaSearch, FaClock } from "react-icons/fa";
import { AgentRow } from "./AgentRow";
import type { Agent } from "@/types";

const mockAgents: Agent[] = [
  {
    id: "1",
    name: "CLMM Agent",
    agentId: "#22810",
    chain: "Unichain Sepolia",
    chainLogo: "/Images/Logo/unichain-logo.png",
    services: ["CUSTOM"],
    score: 0,
    feedback: 0,
    stars: 0,
    owner: "0x6288...6408",
    x402: null,
    created: "11 minutes ago",
  },
  {
    id: "2",
    name: "Liquidity Optimizer",
    agentId: "#22809",
    chain: "Unichain Sepolia",
    chainLogo: "/Images/Logo/unichain-logo.png",
    services: ["CUSTOM"],
    score: 0,
    feedback: 0,
    stars: 0,
    owner: "0x6288...6408",
    x402: null,
    created: "20 minutes ago",
  },
  {
    id: "3",
    name: "Pool Analytics",
    agentId: "#22808",
    chain: "Unichain Sepolia",
    chainLogo: "/Images/Logo/unichain-logo.png",
    services: ["A2A", "WEB"],
    score: 0,
    feedback: 0,
    stars: 0,
    owner: "0x0C3D...0ED6",
    x402: "X402",
    created: "43 minutes ago",
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

      <div className="bg-surface border border-border-main rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-main bg-bg-light">
              <th className="py-3 px-4 text-left text-text-secondary text-xs font-medium uppercase">
                Name
              </th>
              <th className="py-3 px-4 text-left text-text-secondary text-xs font-medium uppercase">
                Chain
              </th>
              <th className="py-3 px-4 text-left text-text-secondary text-xs font-medium uppercase">
                Service
              </th>
              <th className="py-3 px-4 text-left text-text-secondary text-xs font-medium uppercase">
                Score
              </th>
              <th className="py-3 px-4 text-left text-text-secondary text-xs font-medium uppercase">
                Feedback
              </th>
              <th className="py-3 px-4 text-left text-text-secondary text-xs font-medium uppercase">
                Stars
              </th>
              <th className="py-3 px-4 text-left text-text-secondary text-xs font-medium uppercase">
                Owner
              </th>
              <th className="py-3 px-4 text-left text-text-secondary text-xs font-medium uppercase">
                X402
              </th>
              <th className="py-3 px-4 text-left text-text-secondary text-xs font-medium uppercase">
                Created
              </th>
            </tr>
          </thead>
          <tbody>
            {mockAgents.map((agent) => (
              <AgentRow key={agent.id} agent={agent} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
