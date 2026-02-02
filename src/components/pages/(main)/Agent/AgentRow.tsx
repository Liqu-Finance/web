import Image from "next/image";
import { FaTrophy, FaComment, FaStar, FaBriefcase } from "react-icons/fa";
import type { Agent } from "@/types";

interface AgentRowProps {
  agent: Agent;
}

export function AgentRow({ agent }: AgentRowProps) {
  return (
    <tr className="border-b border-border-main hover:bg-bg-light transition-colors">
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center">
            <FaBriefcase className="text-white text-sm" />
          </div>
          <div>
            <p className="text-text-main font-medium">{agent.name}</p>
            <p className="text-text-secondary text-xs">{agent.agentId}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-2 bg-brand/10 border border-brand/20 rounded-full px-3 py-1 w-fit">
          <Image
            src={agent.chainLogo}
            alt={agent.chain}
            width={80}
            height={80}
            className="object-contain"
          />
          {/* <span className="text-brand text-xs font-medium">{agent.chain}</span> */}
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-2 flex-wrap">
          {agent.services.map((service) => (
            <span
              key={service}
              className="bg-bg-light border border-border-main rounded px-2 py-1 text-xs text-text-secondary font-medium"
            >
              {service}
            </span>
          ))}
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-1">
          <FaTrophy className="text-brand text-sm" />
          <span className="text-text-main font-medium text-sm">
            {agent.score}
          </span>
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-1">
          <FaComment className="text-text-secondary text-sm" />
          <span className="text-text-main font-medium text-sm">
            {agent.feedback}
          </span>
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-1">
          <FaStar className="text-brand text-sm" />
          <span className="text-text-main font-medium text-sm">
            {agent.stars}
          </span>
        </div>
      </td>
      <td className="py-4 px-4">
        <span className="text-text-secondary text-sm font-mono">
          {agent.owner}
        </span>
      </td>
      <td className="py-4 px-4">
        {agent.x402 ? (
          <span className="bg-bg-light border border-border-main rounded px-2 py-1 text-xs text-text-secondary font-medium">
            {agent.x402}
          </span>
        ) : (
          <span className="text-text-secondary text-sm">-</span>
        )}
      </td>
      <td className="py-4 px-4">
        <span className="text-text-secondary text-sm">{agent.created}</span>
      </td>
    </tr>
  );
}
