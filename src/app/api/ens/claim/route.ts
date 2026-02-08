import { NextRequest, NextResponse } from "next/server";

const ENS_BASE_DOMAIN = process.env.ENS_BASE_DOMAIN || "liqu.finance.eth";
const ENS_APP_URL = "https://app.ens.domains";

interface ClaimEnsRequest {
  agentId: number;
  customName: string;
  walletAddress: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ClaimEnsRequest = await request.json();

    const { agentId, customName, walletAddress } = body;

    if (!agentId || !customName || !walletAddress) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const sanitizedName = customName
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "")
      .slice(0, 32);

    if (!sanitizedName) {
      return NextResponse.json(
        { success: false, message: "Invalid ENS name" },
        { status: 400 }
      );
    }

    const fullEnsName = `${sanitizedName}.${ENS_BASE_DOMAIN}`;

    const ensAppUrl = `${ENS_APP_URL}/name/${fullEnsName}`;

    return NextResponse.json({
      success: true,
      ensName: fullEnsName,
      ensAppUrl,
      message: `Successfully prepared ENS name: ${fullEnsName}`,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to process ENS claim" },
      { status: 500 }
    );
  }
}
