import { NextRequest, NextResponse } from "next/server";
import { validateStudentPin, getProgressKey } from "@/lib/auth-pin";
import { kv } from "@/lib/kv-client";
import { StudentProfile } from "@/lib/types";

export const dynamic = "force-dynamic";

// In-memory rate limiting for brute-force protection
const failedAttempts: Record<string, { count: number; lockedUntil: number }> = {};

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();
    const { pin } = rawBody;

    if (!pin || typeof pin !== "string" || pin.trim().length !== 4) {
      return NextResponse.json(
        { error: "Invalid PIN format. Enter a 4-digit student PIN." },
        { status: 400 }
      );
    }

    const cleanPin = pin.trim();
    const clientIp = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "client";
    const now = Date.now();
    const record = failedAttempts[clientIp] || { count: 0, lockedUntil: 0 };

    // Check if cooldown is active
    if (record.lockedUntil > now) {
      const waitSec = Math.ceil((record.lockedUntil - now) / 1000);
      return NextResponse.json(
        { error: `Too many incorrect attempts. Please wait ${waitSec}s before retrying.` },
        { status: 429 }
      );
    }

    // Verify PIN against process.env.ALLOWED_PINS
    const auth = validateStudentPin(cleanPin);

    if (!auth.valid) {
      record.count += 1;
      if (record.count >= 5) {
        record.lockedUntil = now + 45 * 1000; // 45s lockout
        record.count = 0;
      }
      failedAttempts[clientIp] = record;

      return NextResponse.json(
        { error: "Access Denied: Invalid Student PIN." },
        { status: 401 }
      );
    }

    // Reset failed counter on successful authentication
    delete failedAttempts[clientIp];

    // Check if cloud data exists for this student
    const progressKey = getProgressKey(auth.pin);
    let cloudData: { streakDays?: number; xp?: number; level?: number } | null = null;
    try {
      cloudData = (await kv.get(progressKey)) as { streakDays?: number; xp?: number; level?: number } | null;
    } catch {}

    const defaultAvatars: Record<string, string> = {
      "2011": "⭐",
    };

    const studentProfile: StudentProfile = {
      pin: auth.pin,
      name: auth.studentName || "Tharika N",
      role: "Rank 1 Aspirant • 98% Accelerator",
      avatar: defaultAvatars[auth.pin] || "⭐",
      streakDays: cloudData?.streakDays ?? 24,
      xp: cloudData?.xp ?? 2840,
      level: cloudData?.level ?? 7,
      targetMarks: 618,
    };

    return NextResponse.json({
      success: true,
      student: studentProfile,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Authentication service error", details: (err as Error).message },
      { status: 500 }
    );
  }
}
