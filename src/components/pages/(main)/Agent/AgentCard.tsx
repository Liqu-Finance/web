"use client";

import { useState } from "react";
import Image from "next/image";
import { FaTrophy, FaStar, FaTimes, FaCheck, FaExternalLinkAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAccount } from "wagmi";
import { useClaimEns } from "@/lib/hooks/useClaimEns";
import type { Agent } from "@/types";

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  const { address, isConnected } = useAccount();
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [customName, setCustomName] = useState("");
  const [claimedEns, setClaimedEns] = useState<{ name: string; url: string } | null>(null);

  const { mutate: claimEns, isPending, isSuccess, reset: resetMutation } = useClaimEns();

  const handleClaimClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    resetMutation();
    setShowClaimModal(true);
    setClaimedEns(null);
    setCustomName("");
  };

  const handleClaimSubmit = () => {
    if (!customName.trim() || !address) return;

    claimEns(
      {
        agentId: parseInt(agent.id),
        customName: customName.trim(),
        walletAddress: address,
      },
      {
        onSuccess: (data) => {
          setClaimedEns({ name: data.ensName, url: data.ensAppUrl });
        },
      }
    );
  };

  const handleCloseModal = () => {
    setShowClaimModal(false);
    setCustomName("");
    resetMutation();
  };

  return (
    <>
      <div className="bg-surface border border-border-main rounded-xl overflow-hidden hover:border-brand/50 transition-all shadow-sm group">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={agent.image}
            alt={agent.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {agent.comingSoon && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
              <span className="px-4 py-2 bg-brand/90 text-white text-sm font-bold rounded-full">
                Coming Soon
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-text-main font-bold text-base mb-0.5 truncate">
                {agent.name}
              </h3>
              <p className="text-brand text-xs font-medium">{agent.ens}</p>
            </div>
            <Image
              src={agent.chainLogo}
              alt={agent.chain}
              width={70}
              height={70}
              className="object-contain"
            />
          </div>

          <div className="flex items-center gap-1.5 mb-3 flex-wrap">
            {agent.services.map((service) => (
              <span
                key={service}
                className="bg-bg-light rounded-full px-2 py-0.5 text-xs text-text-secondary"
              >
                {service}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs pt-3 border-t border-border-main mb-3">
            <div className="flex items-center gap-1">
              <FaTrophy className="text-brand text-xs" />
              <span className="text-text-main font-semibold">{agent.score}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaStar className="text-brand text-xs" />
              <span className="text-text-main font-semibold">{agent.stars}</span>
            </div>
          </div>

          {claimedEns ? (
            <a
              href={claimedEns.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-brand text-white rounded-full font-semibold text-sm transition-colors cursor-pointer hover:bg-brand-hover"
            >
              <Image
                src="/Images/Logo/ens-logo.svg"
                alt="ENS"
                width={18}
                height={18}
                className="object-contain brightness-0 invert"
              />
              {claimedEns.name}
              <FaExternalLinkAlt className="text-xs" />
            </a>
          ) : (
            <button
              onClick={handleClaimClick}
              disabled={agent.comingSoon || !isConnected}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-brand text-brand rounded-full font-semibold text-sm transition-colors cursor-pointer hover:bg-brand hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-brand"
            >
              <Image
                src="/Images/Logo/ens-logo.svg"
                alt="ENS"
                width={18}
                height={18}
                className="object-contain"
              />
              Claim ENS
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showClaimModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={handleCloseModal}
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
                <div className="flex items-center gap-3">
                  <Image
                    src="/Images/Logo/ens-logo.svg"
                    alt="ENS"
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                  <h3 className="text-gray-900 text-lg font-bold">Claim ENS Name</h3>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <FaTimes className="text-gray-400 text-sm" />
                </button>
              </div>

              <div className="px-6 py-6">
                {!isSuccess ? (
                  <>
                    <div className="flex flex-col items-center mb-6">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-brand mb-4">
                        <Image
                          src={agent.image}
                          alt={agent.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h4 className="text-gray-900 text-lg font-bold mb-1">{agent.name}</h4>
                      <p className="text-gray-500 text-sm">{agent.ens}</p>
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-semibold mb-3">
                        Choose Your ENS Name
                      </label>
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={customName}
                            onChange={(e) => setCustomName(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                            placeholder="your-name"
                            className="flex-1 bg-transparent text-gray-900 text-base font-medium focus:outline-none placeholder:text-gray-400"
                            maxLength={32}
                          />
                          <span className="text-brand text-base font-semibold">.liqu.finance.eth</span>
                        </div>
                      </div>
                      <p className="mt-2 text-gray-400 text-xs">
                        Lowercase letters, numbers, and hyphens only
                      </p>
                    </div>

                    <div className={`rounded-xl p-4 mb-6 transition-all ${customName ? "bg-brand/5 border border-brand/20" : "bg-gray-50 border border-gray-100"}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-500 text-xs mb-1">Preview</p>
                          <p className={`text-base font-bold ${customName ? "text-brand" : "text-gray-300"}`}>
                            {customName || "your-name"}.liqu.finance.eth
                          </p>
                        </div>
                        {customName && (
                          <div className="w-8 h-8 bg-brand/10 rounded-full flex items-center justify-center">
                            <FaCheck className="text-brand text-xs" />
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={handleClaimSubmit}
                      disabled={!customName.trim() || isPending || !isConnected}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-brand hover:bg-brand-hover text-white rounded-full font-semibold text-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPending ? (
                        "Processing..."
                      ) : (
                        <>
                          <Image
                            src="/Images/Logo/ens-logo.svg"
                            alt="ENS"
                            width={18}
                            height={18}
                            className="object-contain brightness-0 invert"
                          />
                          Claim ENS Name
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-brand/10 rounded-full flex items-center justify-center mb-4">
                      <FaCheck className="text-brand text-3xl" />
                    </div>
                    <h4 className="text-gray-900 text-xl font-bold mb-2">ENS Claimed!</h4>
                    <p className="text-gray-500 text-sm mb-6 text-center">
                      Your ENS name has been registered successfully
                    </p>

                    <div className="w-full bg-brand/5 border border-brand/20 rounded-xl p-4 mb-6">
                      <p className="text-gray-500 text-xs mb-2 text-center">Your ENS Name</p>
                      <p className="text-brand text-xl font-bold text-center">
                        {claimedEns?.name || `${customName}.liqu.finance.eth`}
                      </p>
                    </div>

                    <a
                      href={claimedEns?.url || `https://app.ens.domains/name/${customName}.liqu.finance.eth`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-brand hover:bg-brand-hover text-white rounded-full font-semibold text-sm transition-colors cursor-pointer mb-3"
                    >
                      <Image
                        src="/Images/Logo/ens-logo.svg"
                        alt="ENS"
                        width={18}
                        height={18}
                        className="object-contain brightness-0 invert"
                      />
                      Open in ENS App
                      <FaExternalLinkAlt className="text-xs" />
                    </a>

                    <button
                      onClick={handleCloseModal}
                      className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-semibold text-sm transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
