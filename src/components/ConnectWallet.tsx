"use client";

import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaWallet } from "react-icons/fa";

export function ConnectWallet() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="flex items-center gap-2 px-6 py-2 bg-brand hover:bg-brand-hover text-white rounded-full font-semibold text-sm transition-colors cursor-pointer shadow-sm"
                  >
                    <FaWallet className="text-sm" />
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="flex items-center gap-2 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold text-sm transition-colors cursor-pointer shadow-sm"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="flex items-center gap-2">
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-border-main hover:border-brand text-text-main rounded-full font-medium text-sm transition-colors cursor-pointer"
                  >
                    <Image
                      src="/Images/Logo/unichain-logo.png"
                      alt="Unichain"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </button>

                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-brand text-brand rounded-full font-medium text-sm transition-colors cursor-pointer hover:bg-brand/5"
                  >
                    <FaWallet className="text-sm" />
                    {account.displayName}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
