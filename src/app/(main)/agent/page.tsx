import { Navbar } from "@/components/pages/(main)/Pool";
import { AgentList } from "@/components/pages/(main)/Agent";

export default function AgentPage() {
  return (
    <div className="min-h-screen w-full bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-12 relative">
          <Navbar />
        </div>
        <div className="mb-8">
          <h1 className="text-text-main text-5xl font-bold mb-4">
            Agent Registry
          </h1>
          <p className="text-text-secondary">
            Discover and explore autonomous agents on the ERC-8004 registry
          </p>
        </div>
        <AgentList />
      </div>
    </div>
  );
}
