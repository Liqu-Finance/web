import { useMutation } from "@tanstack/react-query";

interface ClaimEnsRequest {
  agentId: number;
  customName: string;
  walletAddress: string;
}

interface ClaimEnsResponse {
  success: boolean;
  ensName: string;
  ensAppUrl: string;
  message: string;
}

async function claimEns(data: ClaimEnsRequest): Promise<ClaimEnsResponse> {
  const response = await fetch("/api/ens/claim", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to claim ENS");
  }

  return response.json();
}

export function useClaimEns() {
  return useMutation({
    mutationFn: claimEns,
  });
}
