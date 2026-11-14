export type SubjectCode = "01K" | "31E" | "61H" | "81E" | "83E" | "85E";

export interface StudentProfile {
  pin: string;
  name: string;
  role: string;
  avatar: string;
  streakDays: number;
  xp: number;
  level: number;
  targetMarks: number;
}

export interface SubjectInfo {
  code: SubjectCode;
  name: string;
  kannadaName: string;
  theoryMax: number;
  iaMax: number;
  totalMax: number;
  questionsCount: number;
  examDate: string;
  examDay: string;
  examTime: string;
  icon: string;
  accentColor: string;
  subParts?: string[];
  ncertTextbookTitle: string;
  ktbsBookCode: string;
}

export interface SubjectMarks {
  theory: number;
  ia: number;
}

export interface MarksState {
  [key: string]: SubjectMarks;
}

export interface ValuationStep {
  stepName: string;
  maxMarks: number;
  awardedMarks: number;
  examinerNotes: string;
  isLeak: boolean;
}

export interface ValuationResult {
  awardedMarks: number;
  maxMarks: number;
  percentage: number;
  gradeStatus: "Full Marks" | "Minor Leak" | "Critical Revision";
  stepBreakdown: ValuationStep[];
  halfMarkLeaks: string[];
  examinerAdvice: string;
  modelAnswer: string;
  kannadaScriptAnswer?: string;
  keyDeductionRule: string;
  ktbsVerificationCitation?: string;
}

export interface PresetSample {
  id: string;
  title: string;
  subjectCode: SubjectCode;
  question: string;
  studentAnswerText: string;
  studentAnswerImage?: string;
  maxMarks: number;
  ktbsSource: string;
  probabilityScore: number; // e.g. 98%
  valuation: ValuationResult;
}

export interface PyqQuestion {
  id: string;
  subjectCode: SubjectCode;
  year: string;
  examType: "Exam-1" | "Exam-2 (Best-of-Two)";
  qNumber: number;
  marks: number;
  questionText: string;
  kannadaQuestionText?: string;
  chapter: string;
  ktbsSource: {
    book: string;
    chapterNumber: number | string;
    sectionOrPage: string;
    standard: "10th Standard (NCERT/KTBS 2026-27)";
  };
  probabilityRating: 5 | 4 | 3;
  probabilityScore: number; // e.g. 98%
  appearanceHistory: string[]; // e.g. ["2024 Exam-1", "2023 Exam-1", "2020 Model"]
  cognitiveLevel: "Skill (15%)" | "Application (25%)" | "Understanding (40%)" | "Knowledge (20%)";
  expectedTimeMinutes: number;
  schemeSteps: {
    point: string;
    marks: number;
  }[];
  modelAnswerText: string;
  tags: string[];
  choiceAlternative?: {
    questionText: string;
    examinerVerdict: "Preferred (High-Scoring)" | "Avoid (High Risk of Step Leak)";
    verdictReason: string;
  };
}

export interface MistakeItem {
  id: string;
  subjectCode: SubjectCode;
  topic: string;
  questionSummary: string;
  errorType: "Calculation" | "Unit Missing" | "Diagram Label" | "Formula Error" | "Grammar / Script" | "Incomplete Statement" | "MCQ Trap / Misread";
  markLost: number;
  howToAvoid: string;
  loggedDate: string;
  isMastered: boolean;
  ktbsChapterRef?: string;
}

export interface BlueprintTopic {
  id: string;
  subjectCode: SubjectCode;
  title: string;
  kannadaTitle?: string;
  marks: number;
  category:
    | "4M Theorem"
    | "4M Linear Graph"
    | "4M/5M Diagram"
    | "5M India Map"
    | "3M Numericals"
    | "4M/5M Essay"
    | "3M Sandarba"
    | "Grammar & Rules"
    | "Letter & Composition"
    | "Key Concept";
  frequency: "100% Guaranteed Every Year" | "High Probability (85%+)" | "Crucial 3M Pattern" | "High-Yield Core";
  probabilityScore: number;
  ktbsCitation: string;
  isCompleted: boolean;
  notes: string;
  safeChoiceAdvice?: string;
}
