import { Navbar, PoolList } from "@/components/pages/(main)/Pool";

export default function PoolPage() {
  return (
    <div className="min-h-screen w-full bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12 relative">
          <h1 className="text-text-main text-5xl font-bold">Pool</h1>
          <div className="absolute left-1/2 -translate-x-1/2">
            <Navbar />
          </div>
        </div>
        <PoolList />
      </div>
    </div>
  );
}
