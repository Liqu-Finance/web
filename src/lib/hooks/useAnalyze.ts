"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AnalyzeResponse } from "@/types";

const API_BASE_URL = "https://backend-agent-seven.vercel.app/api";

interface AnalyzeParams {
  strategy: "CONSERVATIVE" | "BALANCED" | "DEGEN";
}

async function analyzeStrategy(params: AnalyzeParams): Promise<AnalyzeResponse> {
  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error("Failed to analyze strategy");
  }

  return response.json();
}

export function useAnalyze() {
  return useMutation({
    mutationFn: analyzeStrategy,
    onSuccess: () => {
      toast.success("Analysis completed");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to analyze strategy");
    },
  });
}
