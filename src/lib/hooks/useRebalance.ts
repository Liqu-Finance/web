"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { RebalanceResponse } from "@/types";

const API_BASE_URL = "https://backend-agent-seven.vercel.app/api";

async function rebalance(depositId: number): Promise<RebalanceResponse> {
  const response = await fetch(`${API_BASE_URL}/rebalance/${depositId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to rebalance");
  }

  return response.json();
}

export function useRebalance() {
  return useMutation({
    mutationFn: rebalance,
    onError: (error) => {
      toast.error(error.message || "Failed to rebalance");
    },
  });
}
