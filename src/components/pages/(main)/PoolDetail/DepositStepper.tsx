"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaCheck, FaSpinner, FaArrowLeft, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAccount } from "wagmi";
import { useDeposit } from "@/lib/hooks/useDeposit";
import { useAssignAgent, AGENT_ADDRESSES } from "@/lib/hooks/useAssignAgent";
import { useAnalyze } from "@/lib/hooks/useAnalyze";
import { useAgentRun } from "@/lib/hooks/useAgentRun";
import type { ApiAgent, AnalyzeResponse } from "@/types";

interface DepositStepperProps {
  selectedApiAgent: ApiAgent | null;
  onClose: () => void;
  onSuccess: (depositId: bigint) => void;
}

type StepStatus = "pending" | "active" | "completed" | "error";

interface Step {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  status: StepStatus;
}

export function DepositStepper({ selectedApiAgent, onClose, onSuccess }: DepositStepperProps) {
  const { address, isConnected } = useAccount();
  const [currentStep, setCurrentStep] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeResponse | null>(null);
  const [amount0, setAmount0] = useState("100");
  const [amount1, setAmount1] = useState("100");
  const [activeTab, setActiveTab] = useState<"steps" | "info">("steps");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const {
    approveUsdt,
    approveEth,
    deposit,
    isPending: isDepositPending,
    isApproveUsdtSuccess,
    isApproveEthSuccess,
    isDepositSuccess,
    depositId,
  } = useDeposit();

  const { assignAgent, isPending: isAssignPending, isSuccess: isAssignSuccess } = useAssignAgent();
  const { mutate: analyze, isPending: isAnalyzePending } = useAnalyze();
  const { mutate: runAgent, isPending: isRunPending, isSuccess: isRunSuccess, data: runData } = useAgentRun();

  const [steps, setSteps] = useState<Step[]>([
    { id: "approve-usdt", title: "Approve USDT", subtitle: "Allow contract to spend USDT", icon: "/Images/Logo/usdt-logo.png", status: "active" },
    { id: "approve-eth", title: "Approve ETH", subtitle: "Allow contract to spend ETH", icon: "/Images/Logo/eth-logo.svg", status: "pending" },
    { id: "deposit", title: "Deposit Tokens", subtitle: "Deposit to CLMM Agent contract", icon: "/Images/Logo/liqu.png", status: "pending" },
    { id: "assign", title: "Assign Agent", subtitle: `Assign ${selectedApiAgent?.strategy || "AI"} agent`, icon: "/Images/Agent-Image/agent-image-1.png", status: "pending" },
    { id: "analyze", title: "AI Analyze", subtitle: "Calculate optimal range", icon: "/Images/Agent-Image/agent-image-1.png", status: "pending" },
    { id: "create", title: "Create Position", subtitle: "Mint CLMM position", icon: "/Images/Logo/liqu.png", status: "pending" },
  ]);

  useEffect(() => {
    if (isApproveUsdtSuccess && currentStep === 0) {
      updateStepStatus(0, "completed");
      updateStepStatus(1, "active");
      setCurrentStep(1);
    }
  }, [isApproveUsdtSuccess, currentStep]);

  useEffect(() => {
    if (isApproveEthSuccess && currentStep === 1) {
      updateStepStatus(1, "completed");
      updateStepStatus(2, "active");
      setCurrentStep(2);
    }
  }, [isApproveEthSuccess, currentStep]);

  useEffect(() => {
    if (isDepositSuccess && currentStep === 2) {
      updateStepStatus(2, "completed");
      updateStepStatus(3, "active");
      setCurrentStep(3);
    }
  }, [isDepositSuccess, currentStep]);

  useEffect(() => {
    if (isAssignSuccess && currentStep === 3) {
      updateStepStatus(3, "completed");
      updateStepStatus(4, "active");
      setCurrentStep(4);
    }
  }, [isAssignSuccess, currentStep]);

  useEffect(() => {
    if (isRunSuccess && currentStep === 5) {
      updateStepStatus(5, "completed");
      setShowSuccessPopup(true);
    }
  }, [isRunSuccess, currentStep]);

  const updateStepStatus = (index: number, status: StepStatus) => {
    setSteps((prev) =>
      prev.map((step, i) => (i === index ? { ...step, status } : step))
    );
  };

  const handleStepAction = async () => {
    if (!isConnected || !address) return;

    switch (currentStep) {
      case 0:
        approveUsdt(amount0);
        break;
      case 1:
        approveEth(amount1);
        break;
      case 2:
        deposit(amount0, amount1, 0, 30);
        break;
      case 3:
        if (depositId && selectedApiAgent) {
          const strategy = selectedApiAgent.strategy as keyof typeof AGENT_ADDRESSES;
          assignAgent(depositId, strategy);
        }
        break;
      case 4:
        if (selectedApiAgent) {
          analyze(
            { strategy: selectedApiAgent.strategy },
            {
              onSuccess: (data) => {
                setAnalysisResult(data);
                updateStepStatus(4, "completed");
                updateStepStatus(5, "active");
                setCurrentStep(5);
              },
            }
          );
        }
        break;
      case 5:
        runAgent(undefined);
        break;
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessPopup(false);
    if (depositId) {
      onSuccess(depositId);
    }
    onClose();
  };

  const isPending = isDepositPending || isAssignPending || isAnalyzePending || isRunPending;
  const allCompleted = steps.every((s) => s.status === "completed");

  const totalAmount = (parseFloat(amount0) || 0) + (parseFloat(amount1) || 0);

  if (showSuccessPopup) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={handleSuccessClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-6 bg-brand/10 rounded-full flex items-center justify-center"
            >
              <FaCheck className="text-brand text-3xl" />
            </motion.div>
            <h2 className="text-gray-900 text-2xl font-bold mb-2">Position Created</h2>
            <p className="text-gray-500 text-sm mb-6">
              {runData?.depositsProcessed || 1} deposit(s) processed successfully
            </p>
            <button
              onClick={handleSuccessClose}
              className="w-full py-3 rounded-full bg-brand text-white font-semibold text-sm hover:bg-brand-hover transition-colors cursor-pointer"
            >
              Done
            </button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <FaArrowLeft className="text-gray-400 text-sm" />
            </button>
            <div className="w-8 h-1 bg-gray-200 rounded-full" />
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <FaTimes className="text-gray-400 text-sm" />
            </button>
          </div>

          <div className="px-6 pt-6 pb-4 text-center">
            <div className="mx-auto mb-4 relative rounded-full flex items-center justify-center overflow-hidden">
              <div className="rounded-full overflow-hidden">
                <Image
                  src="/Images/Logo/liqu.png"
                  alt="Liqu"
                  width={50}
                  height={50}
                  className="object-cover"
                />
              </div>
            </div>
            <h2 className="text-gray-900 text-xl font-bold mb-1">
              Deposit ${totalAmount.toLocaleString()}
            </h2>
            <p className="text-gray-500 text-sm">
              Via {selectedApiAgent?.domain || "AI Agent"}
            </p>
          </div>

          <div className="px-6 pb-4">
            <div className="flex justify-center gap-2 mb-5">
              <button
                onClick={() => setActiveTab("steps")}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === "steps"
                    ? "bg-brand text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                Steps
              </button>
              <button
                onClick={() => setActiveTab("info")}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === "info"
                    ? "bg-brand text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                Position Info
              </button>
            </div>

            {activeTab === "steps" && !allCompleted && (
              <div className="mb-5 grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 rounded-full overflow-hidden">
                      <Image
                        src="/Images/Logo/usdt-logo.png"
                        alt="USDT"
                        width={16}
                        height={16}
                        className="object-cover"
                      />
                    </div>
                    <span className="text-gray-500 text-xs font-medium">USDT</span>
                  </div>
                  <input
                    type="number"
                    value={amount0}
                    onChange={(e) => setAmount0(e.target.value)}
                    disabled={currentStep > 0}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:border-brand disabled:opacity-50"
                    placeholder="Amount"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 rounded-full overflow-hidden">
                      <Image
                        src="/Images/Logo/eth-logo.svg"
                        alt="ETH"
                        width={16}
                        height={16}
                        className="object-cover"
                      />
                    </div>
                    <span className="text-gray-500 text-xs font-medium">ETH</span>
                  </div>
                  <input
                    type="number"
                    value={amount1}
                    onChange={(e) => setAmount1(e.target.value)}
                    disabled={currentStep > 0}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:border-brand disabled:opacity-50"
                    placeholder="Amount"
                  />
                </div>
              </div>
            )}

            {activeTab === "steps" ? (
              <div className="space-y-2">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                      step.status === "active"
                        ? "bg-brand/5 border border-brand"
                        : "bg-gray-50 border border-transparent"
                    }`}
                  >
                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-white border border-gray-100">
                      {step.status === "completed" ? (
                        <div className="absolute inset-0 bg-brand flex items-center justify-center">
                          <FaCheck className="text-white text-xs" />
                        </div>
                      ) : step.status === "active" && isPending ? (
                        <div className="absolute inset-0 bg-brand/10 flex items-center justify-center">
                          <FaSpinner className="text-brand text-sm animate-spin" />
                        </div>
                      ) : (
                        <Image
                          src={step.icon}
                          alt={step.title}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold text-sm ${
                        step.status === "pending" ? "text-gray-400" : "text-gray-900"
                      }`}>
                        {step.title}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {step.subtitle}
                      </p>
                    </div>
                    {step.status === "active" && (
                      <button
                        onClick={handleStepAction}
                        disabled={isPending || !isConnected}
                        className="px-4 py-1.5 rounded-full bg-brand text-white text-xs font-semibold hover:bg-brand-hover transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                      >
                        {isPending ? "..." : "Start"}
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {analysisResult ? (
                  <>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-gray-50 rounded-xl p-3 text-center">
                        <p className="text-gray-400 text-xs mb-1">Lower</p>
                        <p className="text-gray-900 font-bold text-sm">{analysisResult.recommendation.tickLower}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3 text-center">
                        <p className="text-gray-400 text-xs mb-1">Current</p>
                        <p className="text-gray-900 font-bold text-sm">{analysisResult.pool.tick}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3 text-center">
                        <p className="text-gray-400 text-xs mb-1">Upper</p>
                        <p className="text-gray-900 font-bold text-sm">{analysisResult.recommendation.tickUpper}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-gray-400 text-xs">Confidence</p>
                        <p className="text-brand font-bold text-sm">{analysisResult.recommendation.confidence}%</p>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        {analysisResult.recommendation.reason}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400 text-sm">
                      Complete steps to see position info
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="px-6 pb-6 pt-3 border-t border-gray-100 mt-2">
            <div className="flex items-center justify-center gap-2">
              <p className="text-gray-400 text-xs">
                Powered by Liqu AI Agent
              </p>
              <div className="w-5 h-5 rounded-full overflow-hidden">
                <Image
                  src="/Images/Logo/liqu.png"
                  alt="Liqu"
                  width={20}
                  height={20}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
