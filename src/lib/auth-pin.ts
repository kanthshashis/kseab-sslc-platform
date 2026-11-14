export interface PinValidationResult {
  valid: boolean;
  pin: string;
  studentName: string;
  error?: string;
}

const DEFAULT_COHORT_MAP: Record<string, string> = {
  "2011": "Tharika N",
};

export function parseAllowedPins(): Record<string, string> {
  const envPins = process.env.ALLOWED_PINS;
  if (!envPins || !envPins.trim()) {
    return DEFAULT_COHORT_MAP;
  }

  const result: Record<string, string> = {};
  const entries = envPins.split(",");

  for (const entry of entries) {
    const trimmed = entry.trim();
    if (!trimmed) continue;

    if (trimmed.includes(":")) {
      const [pin, name] = trimmed.split(":");
      const cleanPin = pin.trim();
      const cleanName = name ? name.trim() : `Student ${cleanPin}`;
      if (cleanPin) result[cleanPin] = cleanName;
    } else {
      result[trimmed] = `Student ${trimmed}`;
    }
  }

  return Object.keys(result).length > 0 ? result : DEFAULT_COHORT_MAP;
}

export function validateStudentPin(pinHeader: string | null | undefined): PinValidationResult {
  if (!pinHeader) {
    return {
      valid: false,
      pin: "",
      studentName: "",
      error: "Missing x-student-pin header.",
    };
  }

  const cleanPin = pinHeader.trim();
  const allowed = parseAllowedPins();

  if (allowed[cleanPin]) {
    return {
      valid: true,
      pin: cleanPin,
      studentName: allowed[cleanPin],
    };
  }

  return {
    valid: false,
    pin: cleanPin,
    studentName: "",
    error: "Invalid Student PIN. Access restricted to authorized student.",
  };
}

export function getProgressKey(pin: string): string {
  return `sslc2027:progress:${pin}`;
}

export function getDailyQuotaKey(pin: string, dateStr?: string): string {
  const date = dateStr || new Date().toISOString().split("T")[0];
  return `sslc2027:quota:${pin}:${date}`;
}

export function getDailyQuotaLimit(): number {
  const envLimit = process.env.DAILY_AI_QUOTA_PER_PIN;
  if (envLimit) {
    const parsed = parseInt(envLimit, 10);
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }
  return 30; // Default: 30 valuations per PIN per day
}
