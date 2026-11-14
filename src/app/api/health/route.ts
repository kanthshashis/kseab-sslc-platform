import { NextResponse } from "next/server";
import { parseAllowedPins, getDailyQuotaLimit } from "@/lib/auth-pin";
import { kv } from "@/lib/kv-client";

export const dynamic = "force-dynamic";

export async function GET() {
  const allowedPins = parseAllowedPins();
  const dailyQuotaLimit = getDailyQuotaLimit();
  const hasGeminiKey = !!process.env.GEMINI_API_KEY;
  const hasKvConfigured = kv.isConfigured;

  return NextResponse.json({
    status: "healthy",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
    kseabDomain: "Karnataka SSLC Examination 2027 (KSEAB)",
    targetBaseline: "613+ / 625 (98.08%+ Aggregate)",
    cohort: {
      activePinsCount: Object.keys(allowedPins).length,
      members: Object.keys(allowedPins).map((pin) => ({
        pin,
        displayName: allowedPins[pin],
      })),
      dailyAiQuotaPerPin: dailyQuotaLimit,
    },
    integrations: {
      geminiVision: {
        configured: hasGeminiKey,
        mode: hasGeminiKey ? "gemini-2.5-flash live" : "KTBS heuristic valuation fallback active",
      },
      upstashKv: {
        configured: hasKvConfigured,
        mode: hasKvConfigured ? "Upstash Redis cloud sync active" : "Local browser persistence fallback active",
      },
    },
  });
}
