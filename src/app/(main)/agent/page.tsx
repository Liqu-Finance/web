import Image from "next/image";
import { Navbar } from "@/components/pages/(main)/Pool";
import { AgentList } from "@/components/pages/(main)/Agent";

export default function AgentPage() {
  return (
    <div className="min-h-screen w-full bg-white p-15">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute left-1/2 -translate-x-1/2">
            <Navbar />
          </div>
        </div>
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Image
              src="/Images/Logo/liqu.png"
              alt="Liqu"
              width={56}
              height={56}
              className="object-contain rounded-full"
            />
            <h1 className="text-text-main text-5xl font-bold">
              Agent Registry
            </h1>
          </div>
          <p className="text-text-secondary ml-20">
            Discover and explore autonomous agents on the ERC-8004 registry
          </p>
        </div>
        <AgentList />
      </div>
    </div>
  );
}
