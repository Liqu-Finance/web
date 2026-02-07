"use client";

import { useQuery } from "@tanstack/react-query";
import type { AgentsResponse } from "@/types";

const API_BASE_URL = "https://backend-agent-seven.vercel.app/api";

async function fetchAgents(): Promise<AgentsResponse> {
  const response = await fetch(`${API_BASE_URL}/agents/all`);
  if (!response.ok) {
    throw new Error("Failed to fetch agents");
  }
  return response.json();
}

export function useAgents() {
  return useQuery({
    queryKey: ["agents"],
    queryFn: fetchAgents,
    staleTime: 1000 * 60 * 5,
  });
}
