"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AgentRunResponse } from "@/types";

const API_BASE_URL = "https://backend-agent-seven.vercel.app/api";

async function runAgent(): Promise<AgentRunResponse> {
  const response = await fetch(`${API_BASE_URL}/agent/run`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to run agent");
  }

  return response.json();
}

export function useAgentRun() {
  return useMutation({
    mutationFn: runAgent,
    onSuccess: () => {
      toast.success("AI Position created successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create AI position");
    },
  });
}
