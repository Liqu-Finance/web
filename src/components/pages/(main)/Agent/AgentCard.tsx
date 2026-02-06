import Image from "next/image";
import { FaTrophy, FaComment, FaStar } from "react-icons/fa";
import type { Agent } from "@/types";

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <div className="bg-surface border border-border-main rounded-lg overflow-hidden hover:border-brand/50 transition-all cursor-pointer shadow-sm group">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={agent.image}
          alt={agent.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-text-main font-semibold text-sm mb-0.5 truncate">
              {agent.name}
            </h3>
            <p className="text-brand text-xs font-medium">{agent.ens}</p>
          </div>
          <Image
            src={agent.chainLogo}
            alt={agent.chain}
            width={80}
            height={80}
            className="object-contain mt-0.5"
          />
        </div>

        <p className="text-text-secondary text-xs mb-2">{agent.agentId}</p>

        <div className="flex items-center gap-1.5 mb-2 flex-wrap">
          {agent.services.map((service) => (
            <span
              key={service}
              className="bg-bg-light rounded px-1.5 py-0.5 text-xs text-text-secondary"
            >
              {service}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs pt-2 border-t border-border-main">
          <div className="flex items-center gap-1">
            <FaTrophy className="text-brand text-xs" />
            <span className="text-text-main font-medium">{agent.score}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaComment className="text-text-secondary text-xs" />
            <span className="text-text-main font-medium">{agent.feedback}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaStar className="text-brand text-xs" />
            <span className="text-text-main font-medium">{agent.stars}</span>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="text-text-secondary">Owner</span>
          <span className="text-text-main font-mono">{agent.owner}</span>
        </div>
      </div>
    </div>
  );
}
