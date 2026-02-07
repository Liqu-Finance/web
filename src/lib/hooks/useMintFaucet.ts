"use client";

import { useEffect, useRef } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits } from "viem";
import { toast } from "sonner";
import { contracts } from "@/lib/contract";
import { usdtABI } from "@/lib/abis/usdtABI";
import { ETHABI } from "../abis/ethABI";

const BLOCK_EXPLORER = "https://unichain-sepolia.blockscout.com/tx";

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

  const successToastShown = useRef(false);

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

      successToastShown.current = false;

      writeContract(
        {
          address: contractAddress,
          abi,
          functionName: "mint",
          args: [address, amount],
        },
        {
          onSuccess: (txHash) => {
            toast.loading(`Minting 1000 ${tokenType}...`, {
              id: `mint-${txHash}`,
              description: `Waiting for transaction hash...`,
            });
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

  useEffect(() => {
    if (isSuccess && hash && !successToastShown.current) {
      successToastShown.current = true;
      const shortHash = `${hash.slice(0, 6)}...${hash.slice(-4)}`;
      toast.dismiss(`mint-${hash}`);
      toast.success(`Successfully minted 1000 ${tokenType}`, {
        description: `Transaction: ${shortHash}`,
        action: {
          label: "View",
          onClick: () => window.open(`${BLOCK_EXPLORER}/${hash}`, "_blank"),
        },
      });
      if (onSuccess) {
        onSuccess();
      }
    }
  }, [isSuccess, hash, tokenType, onSuccess]);

  useEffect(() => {
    if (writeError) {
      toast.error(writeError.message || `Failed to mint ${tokenType}`);
    }
  }, [writeError, tokenType]);

  return {
    mint,
    isPending: isWritePending || isConfirming,
    isSuccess,
    hash,
  };
}
