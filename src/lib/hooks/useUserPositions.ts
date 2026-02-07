"use client";

import { useAccount, useReadContract, useReadContracts } from "wagmi";
import { contracts } from "@/lib/contract";
import { CLMMABI } from "@/lib/abis/clmmABI";
import type { UserDeposit, UserPosition } from "@/types";
import type { Abi } from "viem";

const clmmAbi = CLMMABI as Abi;

export function useUserPositions() {
  const { address } = useAccount();

  const { data: depositIds, isLoading: isLoadingIds, refetch } = useReadContract({
    address: contracts.CLMMLiquidityAgent,
    abi: clmmAbi,
    functionName: "getUserDeposits",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  const depositContracts = (depositIds as bigint[] | undefined)?.map((id) => ({
    address: contracts.CLMMLiquidityAgent,
    abi: clmmAbi,
    functionName: "getDeposit",
    args: [id],
  })) || [];

  const { data: depositsData, isLoading: isLoadingDeposits } = useReadContracts({
    contracts: depositContracts,
    query: {
      enabled: depositContracts.length > 0,
    },
  });

  const positions: UserPosition[] = [];

  if (depositIds && depositsData) {
    (depositIds as bigint[]).forEach((depositId, index) => {
      const depositResult = depositsData[index];
      if (depositResult?.status === "success" && depositResult.result) {
        const raw = depositResult.result;
        let deposit: UserDeposit;

        if (Array.isArray(raw)) {
          deposit = {
            user: raw[0] ?? "",
            amount0Remaining: raw[1] ?? BigInt(0),
            amount1Remaining: raw[2] ?? BigInt(0),
            depositTime: raw[3] ?? BigInt(0),
            lockUntil: raw[4] ?? BigInt(0),
            strategy: raw[5] ?? 0,
            assignedAgent: raw[6] ?? "",
            status: raw[7] ?? 0,
            positionTokenIds: raw[8] ?? [],
          };
        } else {
          const obj = raw as Record<string, unknown>;
          deposit = {
            user: (obj.user as string) ?? "",
            amount0Remaining: (obj.amount0Remaining as bigint) ?? BigInt(0),
            amount1Remaining: (obj.amount1Remaining as bigint) ?? BigInt(0),
            depositTime: (obj.depositTime as bigint) ?? BigInt(0),
            lockUntil: (obj.lockUntil as bigint) ?? BigInt(0),
            strategy: (obj.strategy as number) ?? 0,
            assignedAgent: (obj.assignedAgent as string) ?? "",
            status: (obj.status as number) ?? 0,
            positionTokenIds: (obj.positionTokenIds as bigint[]) ?? [],
          };
        }

        positions.push({ depositId, deposit });
      }
    });
  }

  return {
    positions,
    isLoading: isLoadingIds || isLoadingDeposits,
    refetch,
  };
}
