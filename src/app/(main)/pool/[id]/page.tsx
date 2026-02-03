import { notFound } from "next/navigation";
import { Navbar } from "@/components/pages/(main)/Pool";
import {
  PoolDetailHeader,
  CLMMChart,
  AgentSelector,
  StrategyRecommendation,
} from "@/components/pages/(main)/PoolDetail";
import { getPoolDetail, poolDetailsData } from "@/data/poolDetails";

interface PoolDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return Object.keys(poolDetailsData).map((id) => ({
    id,
  }));
}

export default async function PoolDetailPage({ params }: PoolDetailPageProps) {
  const { id } = await params;
  const poolDetail = getPoolDetail(id);

  if (!poolDetail) {
    notFound();
  }

  return (
    <div className="min-h-screen w-full bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center mb-8 relative">
          <Navbar />
        </div>
        <PoolDetailHeader pool={poolDetail} />
        <CLMMChart />
        <AgentSelector />
        <StrategyRecommendation />
      </div>
    </div>
  );
}
