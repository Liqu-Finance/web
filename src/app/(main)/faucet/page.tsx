import { Navbar } from "@/components/pages/(main)/Pool";
import { FaucetCard } from "@/components/pages/(main)/Faucet";

export default function FaucetPage() {
  return (
    <div className="min-h-screen w-full bg-white p-15">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute left-1/2 -translate-x-1/2">
            <Navbar />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-main">Token Faucet</h1>
            <p className="text-text-secondary mt-2">
              Get test tokens for Unichain Sepolia testnet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <FaucetCard
              tokenType="ETH"
              tokenName="Ethereum"
              logoPath="/Images/Logo/eth-logo.svg"
            />
            <FaucetCard
              tokenType="USDT"
              tokenName="Tether USD"
              logoPath="/Images/Logo/usdt-logo.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
