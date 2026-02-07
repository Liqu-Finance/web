"use client";

import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { toast } from "sonner";
import { contracts } from "@/lib/contract";
import { CLMMABI } from "@/lib/abis/clmmABI";
import { useCallback, useEffect } from "react";

export const AGENT_ADDRESSES = {
  CONSERVATIVE: "0x5b6A404F8958E7e10028301549e61435925725Bf" as `0x${string}`,
  BALANCED: "0x6c52aAD1Cbb66C0f666b62b36261d2f2205A8607" as `0x${string}`,
  DEGEN: "0x5B20B5a4Bba73bC6363fBE90E6b2Ab4fFF5C820e" as `0x${string}`,
} as const;

export type AgentStrategy = keyof typeof AGENT_ADDRESSES;

interface UseAssignAgentProps {
  onSuccess?: () => void;
}

export function useAssignAgent({ onSuccess }: UseAssignAgentProps = {}) {
  const {
    data: hash,
    writeContract,
    isPending: isWritePending,
    error: writeError,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const assignAgent = useCallback(
    (depositId: bigint, strategy: AgentStrategy = "CONSERVATIVE") => {
      const agentAddress = AGENT_ADDRESSES[strategy];
      writeContract(
        {
          address: contracts.CLMMLiquidityAgent,
          abi: CLMMABI,
          functionName: "assignAgent",
          args: [depositId, agentAddress],
        },
        {
          onSuccess: () => {
            toast.success("Agent assignment submitted");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to assign agent");
          },
        }
      );
    },
    [writeContract]
  );

  useEffect(() => {
    if (isSuccess && onSuccess) {
      toast.success("Agent assigned successfully");
      onSuccess();
    }
  }, [isSuccess, onSuccess]);

  useEffect(() => {
    if (writeError) {
      toast.error(writeError.message || "Failed to assign agent");
    }
  }, [writeError]);

  return {
    assignAgent,
    isPending: isWritePending || isConfirming,
    isSuccess,
    hash,
  };
}
