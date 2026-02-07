"use client";

import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi";
import { parseUnits } from "viem";
import { toast } from "sonner";
import { contracts } from "@/lib/contract";
import { CLMMABI } from "@/lib/abis/clmmABI";
import { usdtABI } from "@/lib/abis/usdtABI";
import { ETHABI } from "@/lib/abis/ethABI";
import { useState, useCallback, useEffect, useRef } from "react";

interface UseDepositProps {
  onSuccess?: (depositId: bigint) => void;
}

export function useDeposit({ onSuccess }: UseDepositProps = {}) {
  const [depositId, setDepositId] = useState<bigint | null>(null);
  const [step, setStep] = useState<"idle" | "approving_usdt" | "approving_eth" | "depositing">("idle");
  const depositConfirmedRef = useRef(false);

  const { data: nextDepositId, refetch: refetchNextDepositId } = useReadContract({
    address: contracts.CLMMLiquidityAgent,
    abi: CLMMABI,
    functionName: "nextDepositId",
  });

  const {
    data: approveUsdtHash,
    writeContract: writeApproveUsdt,
    isPending: isApproveUsdtPending,
  } = useWriteContract();

  const {
    data: approveEthHash,
    writeContract: writeApproveEth,
    isPending: isApproveEthPending,
  } = useWriteContract();

  const {
    data: depositHash,
    writeContract: writeDeposit,
    isPending: isDepositPending,
  } = useWriteContract();

  const { isLoading: isApproveUsdtConfirming, isSuccess: isApproveUsdtSuccess } =
    useWaitForTransactionReceipt({ hash: approveUsdtHash });

  const { isLoading: isApproveEthConfirming, isSuccess: isApproveEthSuccess } =
    useWaitForTransactionReceipt({ hash: approveEthHash });

  const { isLoading: isDepositConfirming, isSuccess: isDepositSuccess } =
    useWaitForTransactionReceipt({ hash: depositHash });

  const approveUsdt = useCallback(
    (amount: string) => {
      const parsedAmount = parseUnits(amount, 18);
      setStep("approving_usdt");
      writeApproveUsdt(
        {
          address: contracts.USDT,
          abi: usdtABI,
          functionName: "approve",
          args: [contracts.CLMMLiquidityAgent, parsedAmount],
        },
        {
          onSuccess: () => {
            toast.success("USDT approval submitted");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to approve USDT");
            setStep("idle");
          },
        }
      );
    },
    [writeApproveUsdt]
  );

  const approveEth = useCallback(
    (amount: string) => {
      const parsedAmount = parseUnits(amount, 18);
      setStep("approving_eth");
      writeApproveEth(
        {
          address: contracts.ETH,
          abi: ETHABI,
          functionName: "approve",
          args: [contracts.CLMMLiquidityAgent, parsedAmount],
        },
        {
          onSuccess: () => {
            toast.success("ETH approval submitted");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to approve ETH");
            setStep("idle");
          },
        }
      );
    },
    [writeApproveEth]
  );

  const deposit = useCallback(
    async (amount0: string, amount1: string, strategy: number = 0, lockDays: number = 30) => {
      const result = await refetchNextDepositId();
      const currentNextDepositId = result.data as bigint;

      if (currentNextDepositId) {
        setDepositId(currentNextDepositId);
      }

      const parsedAmount0 = parseUnits(amount0, 18);
      const parsedAmount1 = parseUnits(amount1, 18);
      const lockPeriodSeconds = lockDays * 24 * 60 * 60;
      depositConfirmedRef.current = false;
      setStep("depositing");
      writeDeposit(
        {
          address: contracts.CLMMLiquidityAgent,
          abi: CLMMABI,
          functionName: "deposit",
          args: [parsedAmount0, parsedAmount1, strategy, BigInt(lockPeriodSeconds)],
        },
        {
          onSuccess: () => {
            toast.success("Deposit submitted");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to deposit");
            setStep("idle");
          },
        }
      );
    },
    [writeDeposit, refetchNextDepositId]
  );

  useEffect(() => {
    if (isDepositSuccess && depositHash && !depositConfirmedRef.current) {
      depositConfirmedRef.current = true;
      toast.success("Deposit confirmed");
      setStep("idle");
      if (onSuccess && depositId) {
        onSuccess(depositId);
      }
    }
  }, [isDepositSuccess, depositHash, onSuccess, depositId]);

  const isPending =
    isApproveUsdtPending ||
    isApproveEthPending ||
    isDepositPending ||
    isApproveUsdtConfirming ||
    isApproveEthConfirming ||
    isDepositConfirming;

  return {
    approveUsdt,
    approveEth,
    deposit,
    isPending,
    step,
    isApproveUsdtSuccess,
    isApproveEthSuccess,
    isDepositSuccess,
    depositId,
    setDepositId,
    nextDepositId,
  };
}
