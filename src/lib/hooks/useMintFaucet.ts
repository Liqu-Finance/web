"use client";

import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits } from "viem";
import { toast } from "sonner";
import { contracts } from "@/lib/contract";
import { usdtABI } from "@/lib/abis/usdtABI";
import { ETHABI } from "../abis/ethABI";

export type TokenType = "USDT" | "ETH";

interface UseMintFaucetProps {
  tokenType: TokenType;
  onSuccess?: () => void;
}

export function useMintFaucet({ tokenType, onSuccess }: UseMintFaucetProps) {
  const {
    data: hash,
    writeContract,
    isPending: isWritePending,
    error: writeError,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const mint = async (address: `0x${string}`) => {
    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      const contractAddress =
        tokenType === "USDT" ? contracts.USDT : contracts.ETH;
      const abi = tokenType === "USDT" ? usdtABI : ETHABI;
      const amount = parseUnits("1000", 18);

      writeContract(
        {
          address: contractAddress,
          abi,
          functionName: "mint",
          args: [address, amount],
        },
        {
          onSuccess: () => {
            toast.success(`Minting 1000 ${tokenType}...`);
          },
          onError: (error) => {
            toast.error(error.message || `Failed to mint ${tokenType}`);
          },
        }
      );
    } catch (error) {
      toast.error(`Failed to mint ${tokenType}`);
    }
  };

  if (isSuccess && onSuccess) {
    onSuccess();
    toast.success(`Successfully minted 1000 ${tokenType}`);
  }

  if (writeError) {
    toast.error(writeError.message || `Failed to mint ${tokenType}`);
  }

  return {
    mint,
    isPending: isWritePending || isConfirming,
    isSuccess,
    hash,
  };
}
