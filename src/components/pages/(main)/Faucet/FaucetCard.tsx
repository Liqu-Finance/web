"use client";

import Image from "next/image";
import { useAccount } from "wagmi";
import { useMintFaucet, TokenType } from "@/lib/hooks/useMintFaucet";

interface FaucetCardProps {
  tokenType: TokenType;
  tokenName: string;
  logoPath: string;
}

export function FaucetCard({
  tokenType,
  tokenName,
  logoPath,
}: FaucetCardProps) {
  const { address, isConnected } = useAccount();
  const { mint, isPending } = useMintFaucet({ tokenType });

  const handleMint = () => {
    if (!isConnected || !address) {
      return;
    }
    mint(address);
  };

  return (
    <div className="bg-surface border border-border-main rounded-xl p-6 shadow-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-20 h-20">
          <Image
            src={logoPath}
            alt={tokenName}
            fill
            className="object-contain"
          />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-main">{tokenName}</h3>
          <p className="text-sm text-text-secondary mt-1">
            Mint 1000 {tokenType} tokens
          </p>
        </div>
        <button
          onClick={handleMint}
          disabled={!isConnected || isPending}
          className={`w-full px-6 py-3 rounded-full text-sm font-medium transition-colors cursor-pointer ${
            !isConnected || isPending
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-brand text-white hover:bg-pink-600"
          }`}
        >
          {!isConnected
            ? "Connect Wallet"
            : isPending
              ? "Minting..."
              : `Mint ${tokenType}`}
        </button>
      </div>
    </div>
  );
}
