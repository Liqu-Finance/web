"use client";

import { useState } from "react";
import Image from "next/image";
import { FaClock, FaWallet, FaRobot, FaCalendarAlt, FaSyncAlt, FaTimes, FaCheck, FaExternalLinkAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useUserPositions } from "@/lib/hooks/useUserPositions";
import { useRebalance } from "@/lib/hooks/useRebalance";
import { formatUnits } from "viem";
import type { UserPosition, RebalanceResponse } from "@/types";

const EXPLORER_URL = "https://unichain-sepolia.blockscout.com/tx";

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

const AGENT_IMAGES: Record<string, string> = {
  "0x5b6A404F8958E7e10028301549e61435925725Bf": "/Images/Agent-Image/agent-image-1.png",
  "0x6c52aAD1Cbb66C0f666b62b36261d2f2205A8607": "/Images/Agent-Image/agent-image-2.png",
  "0x5B20B5a4Bba73bC6363fBE90E6b2Ab4fFF5C820e": "/Images/Agent-Image/agent-image-3.png",
};

export function MyPositions() {
  const { positions, isLoading, refetch } = useUserPositions();
  const { mutate: rebalance, isPending: isRebalancing } = useRebalance();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<UserPosition | null>(null);
  const [rebalanceResult, setRebalanceResult] = useState<RebalanceResponse | null>(null);

  const handleRebalanceClick = (position: UserPosition) => {
    setSelectedPosition(position);
    setShowConfirmModal(true);
  };

  const handleConfirmRebalance = () => {
    if (selectedPosition) {
      rebalance(Number(selectedPosition.depositId), {
        onSuccess: (data) => {
          refetch();
          setShowConfirmModal(false);
          setRebalanceResult(data);
          setShowSuccessModal(true);
        },
      });
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setSelectedPosition(null);
    setRebalanceResult(null);
  };

  const handleCancelRebalance = () => {
    setShowConfirmModal(false);
    setSelectedPosition(null);
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
                    {/* {position.deposit.positionTokenIds.length > 0 && (
                      <div className="flex items-center gap-1">
                        <span className="text-text-secondary text-xs">NFT IDs:</span>
                        <span className="text-brand text-xs font-semibold">
                          {position.deposit.positionTokenIds.map((id) => `#${id.toString()}`).join(", ")}
                        </span>
                      </div>
                    )} */}
                    <button
                      onClick={() => handleRebalanceClick(position)}
                      disabled={isRebalancing}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-brand hover:bg-brand-hover text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaSyncAlt className="text-xs" />
                      Rebalance Position
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showConfirmModal && selectedPosition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={handleCancelRebalance}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h3 className="text-gray-900 text-lg font-bold">Confirm Rebalance</h3>
                <button
                  onClick={handleCancelRebalance}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <FaTimes className="text-gray-400 text-sm" />
                </button>
              </div>

              <div className="px-6 py-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-brand mb-4">
                    <Image
                      src={AGENT_IMAGES[selectedPosition.deposit.assignedAgent] || "/Images/Agent-Image/agent-image-1.png"}
                      alt="Agent"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="text-gray-900 text-xl font-bold mb-1">
                    Position #{selectedPosition.depositId.toString()}
                  </h4>
                  <p className="text-brand text-sm font-medium">
                    {formatAddress(selectedPosition.deposit.assignedAgent)}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Strategy</p>
                      <p className="text-gray-900 text-sm font-semibold">
                        {STRATEGY_NAMES[selectedPosition.deposit.strategy]}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Status</p>
                      <p className="text-gray-900 text-sm font-semibold">
                        {STATUS_NAMES[selectedPosition.deposit.status]}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    This will rebalance your position to the optimal range based on current market conditions. Your funds will remain safe during the process.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleCancelRebalance}
                    disabled={isRebalancing}
                    className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-semibold text-sm transition-colors cursor-pointer disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmRebalance}
                    disabled={isRebalancing}
                    className="flex-1 px-4 py-3 bg-brand hover:bg-brand-hover text-white rounded-full font-semibold text-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isRebalancing ? (
                      <>
                        <FaSyncAlt className="text-sm animate-spin" />
                        Rebalancing...
                      </>
                    ) : (
                      <>
                        <FaSyncAlt className="text-sm" />
                        Confirm Rebalance
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccessModal && rebalanceResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={handleCloseSuccessModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h3 className="text-gray-900 text-lg font-bold">Rebalance Successful</h3>
                <button
                  onClick={handleCloseSuccessModal}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <FaTimes className="text-gray-400 text-sm" />
                </button>
              </div>

              <div className="px-6 py-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-20 h-20 bg-brand/10 rounded-full flex items-center justify-center mb-4">
                    <FaCheck className="text-brand text-3xl" />
                  </div>
                  <h4 className="text-gray-900 text-xl font-bold mb-1">Position Rebalanced</h4>
                  <p className="text-gray-500 text-sm text-center">
                    {rebalanceResult.reason}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-gray-500 text-xs mb-1">New Position ID</p>
                      <p className="text-gray-900 text-sm font-semibold">
                        #{rebalanceResult.newPosition}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Action</p>
                      <p className="text-gray-900 text-sm font-semibold capitalize">
                        {rebalanceResult.action}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500 text-xs mb-1">New Tick Lower</p>
                      <p className="text-gray-900 text-sm font-semibold">
                        {rebalanceResult.newTickLower}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">New Tick Upper</p>
                      <p className="text-gray-900 text-sm font-semibold">
                        {rebalanceResult.newTickUpper}
                      </p>
                    </div>
                  </div>
                </div>

                {rebalanceResult.transactions && (
                  <div className="space-y-3 mb-6">
                    <p className="text-gray-700 text-sm font-semibold">View Transaction Hash</p>

                    {rebalanceResult.transactions.close.length > 0 && (
                      <div className="space-y-2">
                        {rebalanceResult.transactions.close.map((tx, index) => (
                          <a
                            key={tx.txHash}
                            href={`${EXPLORER_URL}/${tx.txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                          >
                            <div>
                              <p className="text-gray-500 text-xs">Close Position {tx.positionId}</p>
                              <p className="text-gray-900 text-xs font-mono">
                                {tx.txHash.slice(0, 10)}...{tx.txHash.slice(-8)}
                              </p>
                            </div>
                            <FaExternalLinkAlt className="text-gray-400 text-xs group-hover:text-brand transition-colors" />
                          </a>
                        ))}
                      </div>
                    )}

                    {rebalanceResult.transactions.mint && (
                      <a
                        href={`${EXPLORER_URL}/${rebalanceResult.transactions.mint.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                      >
                        <div>
                          <p className="text-gray-500 text-xs">Mint Position {rebalanceResult.transactions.mint.positionId}</p>
                          <p className="text-gray-900 text-xs font-mono">
                            {rebalanceResult.transactions.mint.txHash.slice(0, 10)}...{rebalanceResult.transactions.mint.txHash.slice(-8)}
                          </p>
                        </div>
                        <FaExternalLinkAlt className="text-gray-400 text-xs group-hover:text-brand transition-colors" />
                      </a>
                    )}

                    {rebalanceResult.transactions.validationHash && (
                      <a
                        href={`${EXPLORER_URL}/${rebalanceResult.transactions.validationHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 bg-brand/5 border border-brand/20 rounded-lg hover:bg-brand/10 transition-colors cursor-pointer group"
                      >
                        <div>
                          <p className="text-brand text-xs font-medium">Validation Transaction</p>
                          <p className="text-gray-900 text-xs font-mono">
                            {rebalanceResult.transactions.validationHash.slice(0, 10)}...{rebalanceResult.transactions.validationHash.slice(-8)}
                          </p>
                        </div>
                        <FaExternalLinkAlt className="text-brand text-xs" />
                      </a>
                    )}
                  </div>
                )}

                <button
                  onClick={handleCloseSuccessModal}
                  className="w-full px-4 py-3 bg-brand hover:bg-brand-hover text-white rounded-full font-semibold text-sm transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
