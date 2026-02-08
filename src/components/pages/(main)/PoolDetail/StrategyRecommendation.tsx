"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaTrophy, FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAnalyze } from "@/lib/hooks/useAnalyze";
import { useRebalance } from "@/lib/hooks/useRebalance";
import type { Agent, ApiAgent, AnalyzeResponse } from "@/types";

interface StrategyRecommendationProps {
  selectedAgent: Agent;
  selectedApiAgent: ApiAgent | null;
  onStartDeposit: () => void;
  depositId: bigint | null;
}

const analysisLogs = [
  "Initializing AI agent...",
  "Analyzing market volatility...",
  "Evaluating historical price movements...",
  "Identifying support and resistance levels...",
  "Calculating optimal liquidity range...",
  "Assessing risk parameters...",
  "Simulating fee generation potential...",
  "Generating strategy recommendation...",
];

function capitalizeStrategy(strategy: string): string {
  return strategy.charAt(0).toUpperCase() + strategy.slice(1).toLowerCase();
}

export function StrategyRecommendation({
  selectedAgent,
  selectedApiAgent,
  onStartDeposit,
  depositId,
}: StrategyRecommendationProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeResponse | null>(null);

  const { mutate: analyze } = useAnalyze();
  const { mutate: rebalance, isPending: isRebalancePending, data: rebalanceData } = useRebalance();

  useEffect(() => {
    if (isAnalyzing) {
      setVisibleLogs([]);
      analysisLogs.forEach((log, index) => {
        setTimeout(() => {
          setVisibleLogs((prev) => [...prev, log]);
          if (index === analysisLogs.length - 1) {
            setTimeout(() => {
              if (selectedApiAgent) {
                analyze(
                  { strategy: selectedApiAgent.strategy },
                  {
                    onSuccess: (data) => {
                      setAnalysisResult(data);
                      setIsAnalyzing(false);
                    },
                    onError: () => {
                      setIsAnalyzing(false);
                    },
                  }
                );
              }
            }, 500);
          }
        }, index * 400);
      });
    }
  }, [isAnalyzing, selectedApiAgent, analyze]);

  const handleAnalyze = () => {
    setAnalysisResult(null);
    setIsAnalyzing(true);
  };

  const handleRebalance = () => {
    if (depositId) {
      rebalance(Number(depositId));
    }
  };

  const isAnalyzed = !!analysisResult;
  const hasDeposit = depositId !== null;

  return (
    <div className="bg-surface border border-border-main rounded-xl p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-text-main text-lg font-bold mb-1">
          AI Strategy Recommendation
        </h2>
        <p className="text-text-secondary text-sm">
          {isAnalyzed
            ? `Strategy: ${capitalizeStrategy(analysisResult?.strategy || "")} - Confidence: ${analysisResult?.recommendation.confidence}%`
            : "Let AI analyze the optimal CLMM strategy for your liquidity position"}
        </p>
      </div>

      <div className="bg-bg-light border border-border-main rounded-lg p-4">
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-64">
            <div className="bg-white border border-border-main rounded-lg p-4">
              <div className="relative aspect-square rounded-lg overflow-hidden border border-border-main mb-3">
                <Image
                  src={selectedAgent.image}
                  alt={selectedAgent.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-text-main font-bold text-base">
                    {selectedAgent.name}
                  </h3>
                </div>
                <p className="text-brand text-sm font-medium mb-1">
                  {selectedAgent.ens}
                </p>
                <p className="text-text-secondary text-sm mb-3">
                  Agent {selectedAgent.agentId}
                </p>
                <div className="flex items-center mb-3 mt-2">
                    <Image
                      src={selectedAgent.chainLogo}
                      alt={selectedAgent.chain}
                      width={65}
                      height={65}
                      className="object-contain"
                    />
                  </div>

                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  {selectedAgent.services.map((service) => (
                    <span
                      key={service}
                      className="bg-bg-light rounded px-2 py-1 text-xs text-text-secondary"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm mb-3 pb-3 border-b border-border-main">
                  <div className="flex items-center gap-1">
                    <FaTrophy className="text-brand" />
                    <span className="text-text-main font-semibold">
                      {selectedAgent.score}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-brand" />
                    <span className="text-text-main font-semibold">
                      {selectedAgent.stars}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary">Owner</span>
                  <span className="text-text-main font-mono">
                    {selectedAgent.owner}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            {!isAnalyzed && !isAnalyzing ? (
              <div className="flex flex-col h-full">
                <div className="bg-white border border-border-main rounded-lg p-6 mb-3">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-text-secondary text-sm font-medium">
                      Liquidity Distribution
                    </span>
                    <span className="text-text-main text-sm font-semibold">
                      Current Price: $3,124.50
                    </span>
                  </div>

                  <div className="relative h-72 mb-4">
                    <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-text-secondary pr-2">
                      <span>$3,500</span>
                      <span>$3,300</span>
                      <span>$3,100</span>
                      <span>$2,900</span>
                      <span>$2,700</span>
                    </div>
                    <div className="ml-12 h-full">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 400 288"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <linearGradient
                            id="areaGradient"
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                          >
                            <stop
                              offset="0%"
                              stopColor="#ec4899"
                              stopOpacity="0.3"
                            />
                            <stop
                              offset="100%"
                              stopColor="#ec4899"
                              stopOpacity="0.05"
                            />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 0 270 L 50 225 L 100 160 L 150 95 L 200 45 L 250 95 L 300 160 L 350 225 L 400 270 L 400 288 L 0 288 Z"
                          fill="url(#areaGradient)"
                          stroke="#ec4899"
                          strokeWidth="2"
                        />
                        <line
                          x1="200"
                          y1="0"
                          x2="200"
                          y2="288"
                          stroke="#6b7280"
                          strokeWidth="2"
                          strokeDasharray="6 6"
                        />
                        <circle cx="200" cy="45" r="5" fill="#6b7280" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex justify-between px-12">
                    <div className="text-left">
                      <p className="text-text-secondary text-xs mb-1">
                        Lower Range
                      </p>
                      <p className="text-text-main text-sm font-semibold">
                        ~$2,800
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-text-secondary text-xs mb-1">Current</p>
                      <p className="text-brand text-sm font-semibold">
                        $3,124.50
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-text-secondary text-xs mb-1">
                        Upper Range
                      </p>
                      <p className="text-text-main text-sm font-semibold">
                        ~$3,500
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mb-2">
                  <button
                    onClick={handleAnalyze}
                    disabled={!selectedApiAgent}
                    className="flex-1 bg-white border border-brand text-brand py-3 rounded-lg font-semibold text-sm transition-colors cursor-pointer shadow-sm hover:bg-brand/5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Preview Strategy
                  </button>
                  <button
                    onClick={onStartDeposit}
                    disabled={!selectedApiAgent}
                    className="flex-1 bg-brand hover:bg-brand-hover text-white py-3 rounded-lg font-semibold text-sm transition-colors cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Start Deposit
                  </button>
                </div>
                {rebalanceData && (
                  <div className="bg-white border border-brand/20 rounded-lg p-3 mb-2">
                    <p className="text-text-main text-sm font-semibold mb-1">
                      Rebalance Complete
                    </p>
                    <p className="text-text-secondary text-xs">
                      New Position: #{rebalanceData.newPosition}
                    </p>
                  </div>
                )}
                <p className="text-text-secondary text-xs text-center">
                  Preview strategy analysis or start creating your position
                </p>
              </div>
            ) : isAnalyzing ? (
              <div className="flex flex-col gap-2">
                <h3 className="text-text-main text-base font-semibold mb-2">
                  Analyzing Strategy
                </h3>
                <div className="space-y-2">
                  <AnimatePresence>
                    {visibleLogs.map((log, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white border border-border-main rounded-lg p-3"
                      >
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand mt-1.5 flex-shrink-0" />
                          <p className="text-text-secondary text-xs">{log}</p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="mb-4"
                >
                  <h3 className="text-text-main text-base font-semibold mb-1">
                    {capitalizeStrategy(analysisResult?.strategy || "")} Strategy
                  </h3>
                  <p className="text-text-secondary text-xs">
                    {analysisResult?.strategyConfig.description}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="grid grid-cols-3 gap-4 mb-4"
                >
                  <div>
                    <p className="text-text-secondary text-xs mb-1">
                      Tick Lower
                    </p>
                    <p className="text-text-main text-base font-semibold">
                      {analysisResult?.recommendation.tickLower}
                    </p>
                  </div>
                  <div>
                    <p className="text-text-secondary text-xs mb-1">
                      Current Tick
                    </p>
                    <p className="text-text-main text-base font-semibold">
                      {analysisResult?.pool.tick}
                    </p>
                  </div>
                  <div>
                    <p className="text-text-secondary text-xs mb-1">
                      Tick Upper
                    </p>
                    <p className="text-text-main text-base font-semibold">
                      {analysisResult?.recommendation.tickUpper}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="grid grid-cols-3 gap-4 mb-4"
                >
                  <div>
                    <p className="text-text-secondary text-xs mb-1">
                      Confidence
                    </p>
                    <p className="text-brand text-base font-semibold">
                      {analysisResult?.recommendation.confidence}%
                    </p>
                  </div>
                  <div>
                    <p className="text-text-secondary text-xs mb-1">Action</p>
                    <p className="text-text-main text-base font-semibold">
                      {analysisResult?.recommendation.action}
                    </p>
                  </div>
                  <div>
                    <p className="text-text-secondary text-xs mb-1">
                      Max Slippage
                    </p>
                    <p className="text-text-main text-base font-semibold">
                      {(analysisResult?.strategyConfig.maxSlippage || 0) * 100}%
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="bg-white border border-border-main rounded-lg p-3 mb-4"
                >
                  <h4 className="text-text-main font-semibold text-sm mb-2">
                    AI Analysis Summary
                  </h4>
                  <p className="text-text-secondary text-xs leading-relaxed">
                    {analysisResult?.recommendation.reason}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="flex gap-3"
                >
                  <button
                    onClick={onStartDeposit}
                    disabled={!selectedApiAgent}
                    className="flex-1 bg-brand hover:bg-brand-hover text-white py-3 rounded-full font-semibold text-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Start Deposit
                  </button>
                </motion.div>
                {rebalanceData && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 bg-white border border-brand/20 rounded-lg p-3"
                  >
                    <p className="text-text-main text-sm font-semibold mb-1">
                      Rebalance Complete
                    </p>
                    <p className="text-text-secondary text-xs mb-1">
                      New Position: #{rebalanceData.newPosition}
                    </p>
                    <p className="text-text-secondary text-xs">
                      {rebalanceData.reason}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
