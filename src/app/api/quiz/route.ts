import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { QuizGenerateRequestSchema, InteractiveQuizQuestion } from "@/lib/schemas";
import { BOARD_QUIZ_BANK } from "@/lib/quiz-bank";
import { SubjectCode } from "@/lib/types";

export const dynamic = "force-dynamic";

function getFallbackQuestions(
  subject: SubjectCode,
  count: number = 5
): InteractiveQuizQuestion[] {
  const bank = BOARD_QUIZ_BANK[subject] || BOARD_QUIZ_BANK["81E"];
  
  // Shuffle array randomly
  const shuffled = [...bank].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();
    const parsed = QuizGenerateRequestSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid quiz request payload", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { subject, count } = parsed.data;
    const apiKey = process.env.GEMINI_API_KEY;

    // Dynamic AI Generation via Gemini 2.5 Flash if API Key is configured
    if (apiKey && apiKey.trim().length > 10 && apiKey !== "your-google-ai-studio-key") {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `You are a Chief Paper Setter for Karnataka KSEAB SSLC Board Exam (March-April 2027).
Generate ${count} authentic, syllabus-grounded 1-mark Multiple Choice Questions (MCQs) for Subject Code: ${subject}.

Strict Guardrails:
1. Ground strictly in the official KTBS / NCERT 10th standard textbook for ${subject}.
2. Provide 4 plausible options (index 0, 1, 2, or 3), where exactly one is 100% correct according to KTBS key.
3. Include an authentic Kannada translation (kannadaQuestionText) if helpful for bilingual students.
4. Provide a clear textbook explanation explaining why the correct answer is chosen and warning of common examiner traps.
5. Provide exact KTBS/NCERT book citation with chapter name and approximate page reference.

Output ONLY a JSON array of objects strictly matching this structure:
[
  {
    "id": "q1",
    "questionText": "...",
    "kannadaQuestionText": "...",
    "options": ["...", "...", "...", "..."],
    "correctOptionIndex": 0,
    "explanation": "...",
    "ktbsCitation": "...",
    "marks": 1,
    "chapter": "..."
  }
]`;

        const res = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [prompt],
          config: {
            temperature: 0.25,
            responseMimeType: "application/json",
          },
        });

        const cleaned = (res.text || "").replace(/```json/g, "").replace(/```/g, "").trim();
        const questions: InteractiveQuizQuestion[] = JSON.parse(cleaned);

        if (Array.isArray(questions) && questions.length > 0) {
          return NextResponse.json({
            questions: questions.slice(0, count),
            isAiGenerated: true,
            subject,
          });
        }
      } catch (geminiError) {
        console.warn("Gemini Quiz Generation failed, falling back to KTBS verified bank:", (geminiError as Error).message);
      }
    }

    // High-Probability Verified KTBS Fallback Bank
    const fallbackQuestions = getFallbackQuestions(subject, count);
    return NextResponse.json({
      questions: fallbackQuestions,
      isAiGenerated: false,
      subject,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to generate quiz", details: (err as Error).message },
      { status: 500 }
    );
  }
}
