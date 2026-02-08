"use client";

import Image from "next/image";
import { FaClock, FaWallet, FaRobot, FaCalendarAlt, FaSyncAlt } from "react-icons/fa";
import { useUserPositions } from "@/lib/hooks/useUserPositions";
import { useRebalance } from "@/lib/hooks/useRebalance";
import { formatUnits } from "viem";

const STRATEGY_NAMES: Record<number, string> = {
  0: "Conservative",
  1: "Balanced",
  2: "Degen",
};

const STATUS_NAMES: Record<number, string> = {
  0: "Active",
  1: "Processing",
  2: "Closed",
};

const AGENT_DOMAINS: Record<string, string> = {
  "0x5b6A404F8958E7e10028301549e61435925725Bf": "conservative.liqu.finance",
  "0x6c52aAD1Cbb66C0f666b62b36261d2f2205A8607": "balanced.liqu.finance",
  "0x5B20B5a4Bba73bC6363fBE90E6b2Ab4fFF5C820e": "degen.liqu.finance",
};

function formatAddress(address: string): string {
  if (!address || address === "0x0000000000000000000000000000000000000000") {
    return "conservative.liqu.finance";
  }

  const domain = AGENT_DOMAINS[address];
  if (domain) {
    return domain;
  }

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function formatTimestamp(timestamp: bigint | undefined): string {
  if (timestamp === undefined || timestamp === null || timestamp === BigInt(0)) return "-";
  try {
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "-";
  }
}

function formatAmount(amount: bigint | undefined, decimals: number = 18): string {
  if (amount === undefined || amount === null) return "0";
  try {
    const formatted = formatUnits(amount, decimals);
    const num = parseFloat(formatted);
    if (num === 0) return "0";
    if (num < 0.0001) return "<0.0001";
    return num.toLocaleString("en-US", { maximumFractionDigits: 4 });
  } catch {
    return "0";
  }
}

export function MyPositions() {
  const { positions, isLoading, refetch } = useUserPositions();
  const { mutate: rebalance, isPending: isRebalancing, variables: rebalancingId } = useRebalance();

  const handleRebalance = (depositId: bigint) => {
    rebalance(Number(depositId), {
      onSuccess: () => {
        refetch();
      },
    });
  };

  if (isLoading) {
    return (
      <div className="bg-surface border border-border-main rounded-xl p-5 shadow-sm mt-4">
        <div className="mb-4">
          <h2 className="text-text-main text-lg font-bold mb-1">My Positions</h2>
          <p className="text-text-secondary text-sm">
            Loading your liquidity positions...
          </p>
        </div>
        <div className="animate-pulse space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!positions.length) {
    return (
      <div className="bg-surface border border-border-main rounded-xl p-5 shadow-sm mt-4">
        <div className="mb-4">
          <h2 className="text-text-main text-lg font-bold mb-1">My Positions</h2>
          <p className="text-text-secondary text-sm">
            Your active liquidity positions will appear here
          </p>
        </div>
        <div className="bg-bg-light border border-border-main rounded-lg p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white border border-border-main flex items-center justify-center">
            <FaWallet className="text-brand text-2xl" />
          </div>
          <p className="text-text-main font-semibold mb-1">No Positions Yet</p>
          <p className="text-text-secondary text-sm">
            Start a deposit to create your first AI-managed position
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border-main rounded-xl p-5 shadow-sm mt-4">
      <div className="mb-4">
        <h2 className="text-text-main text-lg font-bold mb-1">My Positions</h2>
        <p className="text-text-secondary text-sm">
          {positions.length} active position{positions.length > 1 ? "s" : ""} managed by AI agents
        </p>
      </div>

      <div className="space-y-3">
        {positions.map((position) => (
          <div
            key={position.depositId.toString()}
            className="bg-bg-light border border-border-main rounded-lg p-4"
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-brand">
                  <Image
                    src="/Images/Agent-Image/agent-image-1.png"
                    alt="Agent"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-text-main font-bold text-base">
                      Position #{position.depositId.toString()}
                    </h3>
                    <span className="px-2 py-0.5 bg-brand/10 text-brand text-xs font-semibold rounded">
                      {STRATEGY_NAMES[position.deposit.strategy] || "Unknown"}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-xs font-semibold rounded ${
                        position.deposit.status === 0
                          ? "bg-green-100 text-green-700"
                          : position.deposit.status === 1
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {STATUS_NAMES[position.deposit.status] || "Unknown"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-1 mb-0.5">
                      <Image
                        src="/Images/Logo/usdt-logo.png"
                        alt="USDT"
                        width={14}
                        height={14}
                        className="rounded-full"
                      />
                      <p className="text-text-secondary text-xs">USDT Remaining</p>
                    </div>
                    <p className="text-text-main text-sm font-semibold">
                      {formatAmount(position.deposit.amount0Remaining, 18)}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-0.5">
                      <Image
                        src="/Images/Logo/eth-logo.svg"
                        alt="ETH"
                        width={14}
                        height={14}
                        className="rounded-full"
                      />
                      <p className="text-text-secondary text-xs">ETH Remaining</p>
                    </div>
                    <p className="text-text-main text-sm font-semibold">
                      {formatAmount(position.deposit.amount1Remaining, 18)}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-0.5">
                      <FaCalendarAlt className="text-text-secondary text-xs" />
                      <p className="text-text-secondary text-xs">Deposit Date</p>
                    </div>
                    <p className="text-text-main text-sm font-semibold">
                      {formatTimestamp(position.deposit.depositTime)}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-0.5">
                      <FaClock className="text-brand text-xs" />
                      <p className="text-text-secondary text-xs">Lock Until</p>
                    </div>
                    <p className="text-text-main text-sm font-semibold">
                      {formatTimestamp(position.deposit.lockUntil)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border-main">
                  <div className="flex items-center gap-2">
                    <FaRobot className="text-brand text-xs" />
                    <span className="text-text-secondary text-xs">Agent:</span>
                    <span className="text-brand text-xs font-medium">
                      {formatAddress(position.deposit.assignedAgent)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {position.deposit.positionTokenIds.length > 0 && (
                      <div className="flex items-center gap-1">
                        <span className="text-text-secondary text-xs">NFT IDs:</span>
                        <span className="text-brand text-xs font-semibold">
                          {position.deposit.positionTokenIds.map((id) => `#${id.toString()}`).join(", ")}
                        </span>
                      </div>
                    )}
                    <button
                      onClick={() => handleRebalance(position.depositId)}
                      disabled={isRebalancing && rebalancingId === Number(position.depositId)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-brand hover:bg-brand-hover text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaSyncAlt className={`text-xs ${isRebalancing && rebalancingId === Number(position.depositId) ? "animate-spin" : ""}`} />
                      {isRebalancing && rebalancingId === Number(position.depositId) ? "Rebalancing..." : "Rebalance Position"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
