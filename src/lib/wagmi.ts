import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { defineChain } from "viem";

export const unichainSepolia = defineChain({
  id: 1301,
  name: "Unichain Sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://sepolia.unichain.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "Unichain Sepolia Explorer",
      url: "https://sepolia.uniscan.xyz",
    },
  },
  testnet: true,
});

export const config = getDefaultConfig({
  appName: "Liqu Finance",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
  chains: [unichainSepolia],
  ssr: true,
});
