import { NextRequest, NextResponse } from "next/server";
import { validateStudentPin, getProgressKey } from "@/lib/auth-pin";
import { kv } from "@/lib/kv-client";
import { ProgressSyncRequestSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const pinHeader = req.headers.get("x-student-pin");
  const auth = validateStudentPin(pinHeader);

  if (!auth.valid) {
    return NextResponse.json(
      { error: auth.error || "Unauthorized Student PIN" },
      { status: 401 }
    );
  }

  const key = getProgressKey(auth.pin);
  const data = await kv.get(key);

  if (!data) {
    return NextResponse.json({
      found: false,
      pin: auth.pin,
      studentName: auth.studentName,
      message: "No cloud data found yet. Using local storage sync.",
    });
  }

  return NextResponse.json({
    found: true,
    pin: auth.pin,
    studentName: auth.studentName,
    data,
  });
}

export async function POST(req: NextRequest) {
  const pinHeader = req.headers.get("x-student-pin");
  const auth = validateStudentPin(pinHeader);

  if (!auth.valid) {
    return NextResponse.json(
      { error: auth.error || "Unauthorized Student PIN" },
      { status: 401 }
    );
  }

  try {
    const rawBody = await req.json();
    const parsed = ProgressSyncRequestSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid progress payload", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const key = getProgressKey(auth.pin);
    const success = await kv.set(key, parsed.data);

    return NextResponse.json({
      success: true,
      persistedToCloud: success,
      pin: auth.pin,
      studentName: auth.studentName,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to persist progress", details: (error as Error).message },
      { status: 500 }
    );
  }
}
