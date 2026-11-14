import { z } from "zod";

export const SubjectCodeEnum = z.enum(["01K", "31E", "61H", "81E", "83E", "85E"]);

export const GradeRequestSchema = z.object({
  subject: SubjectCodeEnum,
  question: z.string().min(3, "Question text is required.").max(1500, "Question text too long."),
  maxMarks: z.number().int().min(1).max(5),
  studentAnswer: z.string().max(5000).optional().default(""),
  officialScheme: z.string().max(2000).optional(),
  imageBase64: z.string().optional(),
  imageMimeType: z.enum(["image/jpeg", "image/png", "image/webp"]).optional(),
}).refine((data) => {
  // If base64 is provided, ensure decoded size does not exceed 4MB
  if (data.imageBase64) {
    const approximateBytes = (data.imageBase64.length * 3) / 4;
    return approximateBytes <= 4 * 1024 * 1024; // 4MB
  }
  return true;
}, {
  message: "Image file size exceeds maximum 4MB limit.",
  path: ["imageBase64"],
});

export const ValuationStepSchema = z.object({
  stepName: z.string(),
  maxMarks: z.number().min(0).max(5),
  awardedMarks: z.number().min(0).max(5),
  examinerNotes: z.string(),
  isLeak: z.boolean(),
});

export const ValuationResultSchema = z.object({
  awardedMarks: z.number().min(0).max(5),
  maxMarks: z.number().min(1).max(5),
  percentage: z.number().min(0).max(100),
  gradeStatus: z.enum(["Full Marks", "Minor Leak", "Critical Revision"]),
  stepBreakdown: z.array(ValuationStepSchema),
  halfMarkLeaks: z.array(z.string()),
  examinerAdvice: z.string(),
  modelAnswer: z.string(),
  keyDeductionRule: z.string(),
  kannadaScriptAnswer: z.string().optional(),
  ktbsVerificationCitation: z.string().optional(),
});

export const QuizGenerateRequestSchema = z.object({
  subject: SubjectCodeEnum,
  chapterNumber: z.union([z.number(), z.string()]).optional(),
  count: z.number().int().min(1).max(15).optional().default(5),
});

export const InteractiveQuizQuestionSchema = z.object({
  id: z.string(),
  questionText: z.string(),
  kannadaQuestionText: z.string().optional(),
  options: z.array(z.string()).min(2).max(4),
  correctOptionIndex: z.number().int().min(0).max(3),
  explanation: z.string(),
  ktbsCitation: z.string(),
  marks: z.number().default(1),
  chapter: z.string(),
});

export const ProgressSyncRequestSchema = z.object({
  marks: z.record(
    z.string(),
    z.object({
      theory: z.number().min(0).max(100),
      ia: z.number().min(0).max(25),
    })
  ),
  mistakes: z.array(
    z.object({
      id: z.string(),
      subjectCode: SubjectCodeEnum,
      topic: z.string(),
      questionSummary: z.string(),
      errorType: z.string(),
      markLost: z.number(),
      howToAvoid: z.string(),
      loggedDate: z.string(),
      isMastered: z.boolean(),
      ktbsChapterRef: z.string().optional(),
    })
  ),
  streakDays: z.number().int().min(0).default(1),
  xp: z.number().int().min(0).default(0),
  level: z.number().int().min(1).default(1),
  blueprintCompletedIds: z.array(z.string()).default([]),
});

export type GradeRequest = z.infer<typeof GradeRequestSchema>;
export type ValuationResult = z.infer<typeof ValuationResultSchema>;
export type QuizGenerateRequest = z.infer<typeof QuizGenerateRequestSchema>;
export type InteractiveQuizQuestion = z.infer<typeof InteractiveQuizQuestionSchema>;
export type ProgressSyncRequest = z.infer<typeof ProgressSyncRequestSchema>;
