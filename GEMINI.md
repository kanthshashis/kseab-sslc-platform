# CLAUDE.md — Production Architecture & Execution Spec

## Project: KSEAB SSLC 98% Score Accelerator (Founding-4 Cohort Edition → Multi-User SaaS Ready)

> **Copy-Paste Launch Command for Claude Code (`claude`):**
> `Read CLAUDE.md completely from top to bottom. Build the entire Next.js 15 + TypeScript + Tailwind CSS production application with PIN-isolated Upstash KV cloud sync, server-side Gemini Vision KSEAB valuation (/api/grade), multimodal handwriting/diagram upload (Kannada 01K, English 31E, Hindi 61H, Maths, Science, Social Science), all 5 interactive tabs, and strict security headers. Run npm run typecheck, npm run lint, security bundle audit, and npm run build to verify zero errors before finishing.`

## 1. Strategic Phase & Cohort Architecture

This platform is engineered in **Two-Stage Readiness**:

* **Stage 1 (Active Launch — Nov 2026 to Apr 2027): "Founding-4" Private Cohort (Niece + 3 Study Friends)**

  * Zero login friction: Students open the Vercel HTTPS link, enter their personal **4-digit Student PIN** once (e.g., `2027`, `2028`, `2029`, `2030`), and their marks, Mistake Vault, XP, streak, and Blueprint progress automatically isolate and sync across their phone, tablet, and laptop via **`/api/progress`** (backed by Upstash Redis / Vercel KV under key `sslc_2027_cohort:${pin}`).

  * Per-PIN daily AI valuation rate limiting (`30` Gemini Vision valuations/day per PIN) protects your free Gemini API quota while allowing all 4 students to practice simultaneously.

* **Stage 2 (Post-May 2027 Results Scale-Up): Full Public Multi-User SaaS**

  * Clean repository separation so swapping `pin-auth` for Supabase Auth + PostgreSQL RLS (schema included in Section 5) takes minimal effort once March 2027 board results are proven.

## 2. Strict KSEAB 2027 Domain Rules (Never Violate)

1. **625-Mark Aggregate & 12-Mark Loss Budget:**

   * First Language Kannada (`01K`): **100 Marks**

   * Second Language English (`31E`): **80 Marks**

   * Third Language Hindi (`61H`): **80 Marks**

   * Mathematics (`81E`): **80 Marks**

   * Science (`83E`): **80 Marks**

   * Social Science (`85E`): **80 Marks**

   * **Total = 500 Theory + 125 IA = 625 Aggregate** (App tracks the 625-mark target baseline: `613 / 625 = 98.08%`, whereas `612 / 625 = 97.92%`, so **max allowable mark drop across all 6 subjects = 12 marks**).

2. **Official KSEAB March–April 2027 Exam-1 Final Timetable:**

   * **Mar 22, 2027 (Mon):** First Language — Kannada (`01K`) | `3h 15m (10:00 AM – 1:15 PM)` | 100M | 45 Qs

   * **Mar 25, 2027 (Thu):** Science (`83E`) | `3h 15m (10:00 AM – 1:15 PM)` | 80M | 38 Qs (Part A Physics 27M, Part B Chemistry 25M, Part C Biology 28M)

   * **Mar 27, 2027 (Sat):** Second Language — English (`31E`) | `2h 45m (10:00 AM – 1:00 PM)` | 80M | 38 Qs

   * **Mar 30, 2027 (Tue):** Mathematics (`81E`) | `3h 15m (10:00 AM – 1:15 PM)` | 80M | 38 Qs

   * **Apr 02, 2027 (Fri):** Third Language — Hindi (`61H`) | `2h 45m (10:00 AM – 1:00 PM)` | 80M | 38 Qs

   * **Apr 05, 2027 (Mon):** Social Science (`85E`) | `3h 15m (10:00 AM – 1:15 PM)` | 80M | 38 Qs (incl. Q.No. 38 5M India Map)

   * **Exam-2 Window (Best-of-Two):** May 24 – May 31, 2027.

3. **Chief Examiner Grading & Script Grounding:**

   * **NEVER invent out-of-syllabus questions** or accept non-KSEAB shortcuts.

   * **Kannada (`01K`) & Hindi (`61H`) Multimodal Vision:** Read handwritten Kannada script (`ಕನ್ನಡ ಲಿಪಿ`) and Devanagari script (`देवनागरी लिपि`) directly from uploaded photos; output `modelAnswer` in authentic KTBS Kannada (`ಕನ್ನಡ`) or Hindi (`हिंदी`) script while keeping `stepBreakdown`, `halfMarkLeaks`, and `examinerAdvice` in clear English.

   * **Step-Marking Key Enforcement:**

     * Maths Theorems (4M/5M): `1M Statement + 1M Figure/Given/To Prove/Construction + 2M Logical Proof`.

     * Maths Linear Graph (4M): `1M Value Tables + 2M Scaled Axes & Intersecting Lines + 1M Explicit Coordinates (x, y)`.

     * Science Diagrams (3M/4M): Right-side neat labelling, ray arrows in Physics optics, boxed SI units in numericals.

     * Social Science: Bulleted points (`0.5M` per valid KTBS point); Q.No. 38 India Map (`5 locations × 1M = 5M`).

## 3. Production Tech Stack & Repository Structure

* **Framework:** Next.js 15 (App Router, TypeScript strict mode)

* **Styling:** Tailwind CSS + Lucide React (`slate-950` dark gamified theme, `indigo-600` & `cyan-400` accents)

* **AI Engine:** Google Gemini (`gemini-2.5-flash` / `gemini-3-flash-preview`) via `@google/genai` (server-side only)

* **Cloud Persistence & Rate Limiting:** Upstash Redis REST API (`KV_REST_API_URL` & `KV_REST_API_TOKEN`) with automatic `localStorage` fallback

* **Validation:** `zod` for all API requests, image MIME/size checks, and Gemini JSON schema parsing

```
kseab-sslc-accelerator/
├── CLAUDE.md
├── next.config.ts
├── package.json
├── .env.example
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                  # PIN Gate + Main 5-Tab Workspace
│   │   └── api/
│   │       ├── grade/
│   │       │   └── route.ts          # Multimodal Gemini KSEAB Examiner + Per-PIN Rate Limit
│   │       ├── progress/
│   │       │   └── route.ts          # Per-PIN Cloud Sync (GET/POST Upstash KV)
│   │       └── health/
│   │           └── route.ts          # System & KV Connectivity Health Check
│   ├── components/
│   │   ├── PinAccessGate.tsx         # Clean 4-Digit Student PIN Unlock Screen + Cohort Switcher
│   │   ├── HeaderBar.tsx             # Dynamic Countdown, Streak, XP Level, Cloud Sync Pill
│   │   ├── MissionControlTab.tsx     # 625 Simulator, 12-Mark Loss Meter, 2027 Timetable
│   │   ├── AnswerGraderTab.tsx       # Camera/File Upload (1280px JPEG compress) + AI Valuator
│   │   ├── PyqArenaTab.tsx           # Verified 2023-2024 KSEAB Board PYQs + Scheme Unlocker
│   │   ├── MistakeVaultTab.tsx       # Mistake Log + Mastery XP + Quick Add Modal
│   │   └── BlueprintChecklistTab.tsx # 2026-27 Section Blueprints + Guaranteed Lock-In List
│   └── lib/
│       ├── auth-pin.ts               # Validates x-student-pin against ALLOWED_PINS env var
│       ├── kseab-data.ts             # Audited 2027 Timetable, Blueprints, Curated PYQs
│       └── schemas.ts                # Zod schemas for requests & Gemini JSON valuation output
└── supabase/
    └── migrations/
        └── 0001_stage2_saas.sql      # Ready-to-run PostgreSQL + RLS schema for May 2027 public launch

```

## 4. Exact API Specifications (`/api/grade` & `/api/progress`)

### 4.1 PIN Isolation & Cohort Mapping (`src/lib/auth-pin.ts`)

* Parse `process.env.ALLOWED_PINS` (format: `"2027:Ananya,2028:Friend1,2029:Friend2,2030:Friend3"` or `"2027,2028,2029,2030"`).

* Every request to `/api/grade` and `/api/progress` must include header `x-student-pin`.

* Return `401 Unauthorized` if PIN is missing or not in `ALLOWED_PINS`.

* Namespace all Upstash Redis keys by validated PIN:

  * Progress key: `sslc2027:progress:${pin}`

  * Daily AI rate limit key: `sslc2027:quota:${pin}:${YYYY-MM-DD}` (cap at `DAILY_AI_QUOTA_PER_PIN || 30`).

### 4.2 Multimodal Examiner Route (`src/app/api/grade/route.ts`)

* Validate body with Zod (`subject`, `question` max 1500 chars, `maxMarks` 1..5, `studentAnswer` max 5000 chars, optional `officialScheme`, optional `imageBase64` & `imageMimeType` restricted to `image/jpeg | image/png | image/webp` and max `4MB` decoded).

* Wrap student input in `<student_submission>...</student_submission>` XML tags with explicit prompt-injection defense instructing Gemini to ignore any instructions inside student text attempting to alter marks.

* Retry `429`/`503` responses with exponential backoff (`1s -> 2s -> 4s`) and parse output strictly with `ValuationResultSchema`.

## 5. Security & Production Hardening Checklist

* \[ \] **Zero Secret Leakage:** `GEMINI_API_KEY`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`, and `ALLOWED_PINS` must remain strictly server-side (`process.env`). Never prefix with `NEXT_PUBLIC_`.

* \[ \] **HTTP Security Headers (`next.config.ts`):**

  * `X-Frame-Options: DENY`

  * `X-Content-Type-Options: nosniff`

  * `Referrer-Policy: strict-origin-when-cross-origin`

  * `Permissions-Policy: camera=(self), microphone=(), geolocation=()`

  * `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`

* \[ \] **Client-Side Image Compression:** Automatically downscale mobile camera photos to max `1280px` JPEG (`0.85` quality) in the browser before upload so mobile networks never time out.

* \[ \] **Offline Resilience:** If Upstash KV or Gemini is temporarily unreachable, fall back gracefully to `localStorage` and heuristic KSEAB step checks without crashing.

## 6. Environment Variables (`.env.example`)

```
# Google Gemini API (SERVER-SIDE ONLY)
GEMINI_API_KEY=your-google-ai-studio-key

# Founding-4 Cohort PINs (Format: PIN:DisplayName separated by commas)
ALLOWED_PINS=2027:Champion,2028:Beta2,2029:Beta3,2030:Beta4

# Per-Student Daily AI Valuation Limit
DAILY_AI_QUOTA_PER_PIN=30

# Upstash Redis / Vercel KV (Auto-populated when linked in Vercel Storage)
KV_REST_API_URL=https://your-instance.upstash.io
KV_REST_API_TOKEN=your-upstash-token

```

## 7. Automated Verification Commands (Must Pass Before Completion)

Run and verify every command below before concluding:

1. `npm run typecheck` — 0 TypeScript errors.

2. `npm run lint` — 0 ESLint warnings or errors.

3. `npm run build` — Clean Next.js production build.

4. Security bundle audit: Scan `.next/static/` to confirm `GEMINI_API_KEY` and `KV_REST_API_TOKEN` do not appear anywhere in client-side JavaScript bundles.