"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  BookOpenCheck,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Camera,
  CheckCircle,
  Eye,
  EyeOff,
  Sparkles,
  Filter,
  FileText,
  ShieldCheck,
  Star,
  CheckCheck,
  Compass,
  AlertCircle,
  Zap,
  ArrowRight,
  TrendingUp,
  Award,
  Search,
  CheckSquare,
  PlusCircle,
  Send,
  Loader2,
  Flame,
} from "lucide-react";
import { PYQ_QUESTIONS, KSEAB_SUBJECTS } from "../lib/kseab-data";
import { PyqQuestion, SubjectCode, MistakeItem } from "../lib/types";
import { InteractiveQuizRunner } from "./InteractiveQuizRunner";
import { sounds } from "../lib/sound";

interface PyqArenaTabProps {
  studentPin?: string;
  onEarnXp?: (amount: number) => void;
  onAddMistake?: (mistake: Omit<MistakeItem, "id" | "loggedDate" | "isMastered">) => void;
  onNavigateTab?: (tab: string) => void;
  onSendToGrader?: (data: {
    subject: SubjectCode;
    questionText: string;
    maxMarks: number;
    officialScheme?: string;
  }) => void;
}

export const PyqArenaTab: React.FC<PyqArenaTabProps> = ({
  studentPin = "2011",
  onEarnXp = () => {},
  onAddMistake = () => {},
  onNavigateTab,
  onSendToGrader,
}) => {
  const [arenaMode, setArenaMode] = useState<"archive" | "quiz">("archive");
  const [questionsList, setQuestionsList] = useState<PyqQuestion[]>(PYQ_QUESTIONS);
  const [selectedSubject, setSelectedSubject] = useState<string>("ALL");
  const [selectedMarks, setSelectedMarks] = useState<string>("ALL");
  const [selectedYear, setSelectedYear] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeQuestionId, setActiveQuestionId] = useState<string>(PYQ_QUESTIONS[0].id);
  const [unlockedSchemes, setUnlockedSchemes] = useState<Record<string, boolean>>({});
  const [uploadedPhotos, setUploadedPhotos] = useState<Record<string, string>>({});

  // Question-Specific Pacing Speedometer States
  const [activePacingQuestionId, setActivePacingQuestionId] = useState<string | null>(null);
  const [pacingSeconds, setPacingSeconds] = useState<number>(0);
  const [isPacingRunning, setIsPacingRunning] = useState<boolean>(false);
  const [pacingHistory, setPacingHistory] = useState<
    Record<string, { timeTaken: number; withinBudget: boolean }>
  >({});

  // Dynamic AI Question Generator States
  const [isGenModalOpen, setIsGenModalOpen] = useState<boolean>(false);
  const [genSubject, setGenSubject] = useState<SubjectCode>("81E");
  const [genMarks, setGenMarks] = useState<number>(4);
  const [genTopic, setGenTopic] = useState<string>("Theorems / Proofs");
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);

  // Pacing Speedometer Interval
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPacingRunning) {
      interval = setInterval(() => {
        setPacingSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPacingRunning]);

  const formatPacingTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartPacing = (qId: string) => {
    sounds.playClick();
    setActivePacingQuestionId(qId);
    setPacingSeconds(0);
    setIsPacingRunning(true);
  };

  const handlePausePacing = () => {
    sounds.playClick();
    setIsPacingRunning(false);
  };

  const handleResumePacing = () => {
    sounds.playClick();
    setIsPacingRunning(true);
  };

  const handleFinishPacing = (q: PyqQuestion) => {
    setIsPacingRunning(false);
    const budgetSeconds = q.expectedTimeMinutes * 60;
    const isWithin = pacingSeconds <= budgetSeconds;

    setPacingHistory((prev) => ({
      ...prev,
      [q.id]: {
        timeTaken: pacingSeconds,
        withinBudget: isWithin,
      },
    }));

    if (isWithin) {
      sounds.playSuccessChime();
      onEarnXp(25);
    } else {
      sounds.playClick();
    }
  };

  const toggleScheme = (qId: string) => {
    sounds.playClick();
    setUnlockedSchemes((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  const handlePracticePhotoUpload = (qId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      sounds.playClick();
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedPhotos((prev) => ({
          ...prev,
          [qId]: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // 1-Click Send to AI Answer Grader
  const handleTransferToGrader = (q: PyqQuestion) => {
    sounds.playClick();
    if (onSendToGrader) {
      onSendToGrader({
        subject: q.subjectCode,
        questionText: q.questionText,
        maxMarks: q.marks,
        officialScheme: q.modelAnswerText,
      });
    } else if (onNavigateTab) {
      onNavigateTab("grader");
    }
  };

  // AI Board Question Generator Simulation (Instant Dynamic Board standard)
  const handleGenerateFreshQuestion = () => {
    setIsGeneratingAi(true);
    sounds.playClick();

    setTimeout(() => {
      const newId = `ai-gen-${Date.now()}`;
      const newQuestion: PyqQuestion = {
        id: newId,
        subjectCode: genSubject,
        year: "2027 Model",
        examType: "Exam-1",
        qNumber: Math.floor(Math.random() * 8) + 30,
        marks: genMarks,
        chapter: genTopic,
        ktbsSource: {
          book: `KTBS Class 10 ${genSubject} Blueprint`,
          chapterNumber: "Blueprint Section",
          sectionOrPage: "KTBS 2026-27 Practice Bank",
          standard: "10th Standard (NCERT/KTBS 2026-27)",
        },
        probabilityRating: 5,
        probabilityScore: 98,
        appearanceHistory: ["2027 AI Blueprint Drill", "High-Yield Probability"],
        cognitiveLevel: genMarks >= 4 ? "Skill (15%)" : "Application (25%)",
        expectedTimeMinutes: genMarks === 5 ? 8 : genMarks === 4 ? 10 : genMarks === 3 ? 7 : 4,
        questionText: `[2027 AI Board Drill - ${genSubject} ${genMarks}M]: State and solve the standard examination problem on ${genTopic} according to the latest KSEAB blueprint. Provide step-by-step reasoning and boxed final results.`,
        kannadaQuestionText: `[೨೦೨೭ ಬೋರ್ಡ್ ಪರೀಕ್ಷಾ ಅಭ್ಯಾಸ]: ${genTopic} ವಿಷಯದ ಮೇಲಿನ ಅಧಿಕೃತ ಮಾದರಿ ಪ್ರಶ್ನೆಗೆ ಹಂತ-ಹಂತವಾಗಿ ಪರಿಹಾರ ಬರೆಯಿರಿ.`,
        tags: ["AI Generated", `${genMarks}-Marks`, "2027 Blueprint", genTopic],
        schemeSteps: [
          { point: "Initial statement / formula / given parameters correctly written", marks: Math.max(0.5, genMarks * 0.25) },
          { point: "Core derivation / calculation / proof body logically constructed", marks: genMarks * 0.5 },
          { point: "Final answer boxed with correct SI units / concluding statement", marks: Math.max(0.5, genMarks * 0.25) },
        ],
        modelAnswerText: `Official KSEAB 2027 Scoring Benchmark for ${genTopic}:\n1. Write Given & Formula explicitly.\n2. Complete intermediate arithmetic with no skipped lines.\n3. Box the final answer with required unit symbols.\n4. Avoid 0.5M trap: Never omit SI units or formula labels.`,
      };

      setQuestionsList((prev) => [newQuestion, ...prev]);
      setActiveQuestionId(newId);
      setIsGeneratingAi(false);
      setIsGenModalOpen(false);
      sounds.playSuccessChime();
    }, 600);
  };

  // Filtered Questions Pipeline
  const filteredQuestions = useMemo(() => {
    return questionsList.filter((q) => {
      if (selectedSubject !== "ALL" && q.subjectCode !== selectedSubject) return false;
      if (selectedMarks !== "ALL" && q.marks.toString() !== selectedMarks) return false;
      if (selectedYear !== "ALL" && !q.year.includes(selectedYear)) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          q.questionText.toLowerCase().includes(query) ||
          q.chapter.toLowerCase().includes(query) ||
          q.tags.some((t) => t.toLowerCase().includes(query)) ||
          q.subjectCode.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [questionsList, selectedSubject, selectedMarks, selectedYear, searchQuery]);

  const activeQuestion =
    filteredQuestions.find((q) => q.id === activeQuestionId) ||
    filteredQuestions[0] ||
    questionsList[0];

  // Calculations for Active Question Pacing Speedometer
  const isCurrentlyPacingThisQuestion =
    activeQuestion && activePacingQuestionId === activeQuestion.id;
  const currentBudgetSeconds = activeQuestion ? activeQuestion.expectedTimeMinutes * 60 : 600;
  const isPacingOvertime = pacingSeconds > currentBudgetSeconds;
  const pacingPercentage = Math.min(100, Math.round((pacingSeconds / currentBudgetSeconds) * 100));
  const previousPacingRecord = activeQuestion ? pacingHistory[activeQuestion.id] : undefined;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Mode Navigation Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 bg-slate-900/90 border border-slate-800 rounded-2xl backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sounds.playClick();
              setArenaMode("archive");
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              arenaMode === "archive"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/40"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <BookOpenCheck className="w-4 h-4" />
            <span>Verified Board PYQ Archive</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-400 text-black font-extrabold ml-1">
              {questionsList.length} Qs
            </span>
          </button>

          <button
            onClick={() => {
              sounds.playStreakFire();
              setArenaMode("quiz");
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              arenaMode === "quiz"
                ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/30 border border-cyan-400/40"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Zap className="w-4 h-4 text-amber-300" />
            <span>⚡ Interactive Live AI Quiz Blitz</span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
              Live
            </span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-mono pr-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Strict KTBS / NCERT 2026–27 Guardrails</span>
        </div>
      </div>

      {/* Conditionally Render Mode */}
      {arenaMode === "quiz" ? (
        <InteractiveQuizRunner
          studentPin={studentPin}
          onEarnXp={onEarnXp}
          onAddMistake={onAddMistake}
          onBackToArchive={() => setArenaMode("archive")}
        />
      ) : (
        <>
          {/* Top Board Archive Command Banner */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    2022–2024 Exam-1 & Exam-2 Audited Archive
                  </span>
                  <span className="text-xs font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-1 rounded-full font-mono">
                    All 6 Subjects Covered
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  KSEAB SSLC Official Board PYQ Vault & Master Practice
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                  Solve verified past examination questions with step-by-step Chief Examiner marking keys, pacing time budgets, and instant multimodal AI grading.
                </p>
              </div>

              {/* Action Button: AI Question Generator Drill */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sounds.playClick();
                    setIsGenModalOpen(true);
                  }}
                  className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 ring-1 ring-cyan-400/40 transition-all hover:scale-[1.02]"
                >
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  <span>Generate 2027 Board PYQ (AI)</span>
                </button>
              </div>
            </div>

            {/* Filter Pipeline: Subjects + Marks + Years + Search */}
            <div className="mt-6 pt-5 border-t border-slate-800 space-y-3">
              {/* Row 1: Subject Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-400 font-semibold mr-1 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5 text-cyan-400" /> Subject:
                </span>
                <button
                  onClick={() => {
                    sounds.playClick();
                    setSelectedSubject("ALL");
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    selectedSubject === "ALL"
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                      : "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200"
                  }`}
                >
                  All Subjects ({questionsList.length})
                </button>
                {KSEAB_SUBJECTS.map((sub) => {
                  const count = questionsList.filter((q) => q.subjectCode === sub.code).length;
                  return (
                    <button
                      key={sub.code}
                      onClick={() => {
                        sounds.playClick();
                        setSelectedSubject(sub.code);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                        selectedSubject === sub.code
                          ? "bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30"
                          : "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200"
                      }`}
                    >
                      <span>{sub.icon}</span>
                      <span>{sub.code}</span>
                      <span className="text-[10px] font-mono opacity-80">({count})</span>
                    </button>
                  );
                })}
              </div>

              {/* Row 2: Marks Tier & Year Filters & Search */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] text-slate-500 font-semibold mr-1">Marks:</span>
                  {["ALL", "2", "3", "4", "5"].map((m) => (
                    <button
                      key={m}
                      onClick={() => {
                        sounds.playClick();
                        setSelectedMarks(m);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all ${
                        selectedMarks === m
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                          : "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200"
                      }`}
                    >
                      {m === "ALL" ? "All Marks" : `${m} Marks`}
                    </button>
                  ))}

                  <span className="text-[11px] text-slate-500 font-semibold ml-2 mr-1">Series:</span>
                  {["ALL", "2024", "2023", "2022"].map((yr) => (
                    <button
                      key={yr}
                      onClick={() => {
                        sounds.playClick();
                        setSelectedYear(yr);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all ${
                        selectedYear === yr
                          ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                          : "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200"
                      }`}
                    >
                      {yr === "ALL" ? "All Years" : yr}
                    </button>
                  ))}
                </div>

                {/* Search Bar */}
                <div className="relative min-w-[200px] flex-1 max-w-xs">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search question, chapter, tag..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white outline-none focus:border-cyan-400 font-sans"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Grid: Question Selection List (Left) + Question Workspace (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: PYQ Question Selection Cards */}
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
                <span>Verified Board Questions</span>
                <span className="font-mono text-cyan-400 font-bold">
                  {filteredQuestions.length} Matches Found
                </span>
              </div>

              <div className="space-y-3 max-h-[850px] overflow-y-auto pr-1 scrollbar-none">
                {filteredQuestions.length > 0 ? (
                  filteredQuestions.map((q) => {
                    const isSelected = activeQuestion?.id === q.id;
                    const hasUploaded = !!uploadedPhotos[q.id];
                    const isUnlocked = !!unlockedSchemes[q.id];
                    const pacingRecord = pacingHistory[q.id];

                    return (
                      <div
                        key={q.id}
                        onClick={() => {
                          sounds.playClick();
                          setActiveQuestionId(q.id);
                        }}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? "bg-slate-900 border-indigo-500/70 shadow-lg shadow-indigo-950/60 ring-1 ring-indigo-500/30"
                            : "bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                              {q.subjectCode} • Q.{q.qNumber}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">
                              {q.year} {q.examType}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded font-mono">
                              {q.marks}M
                            </span>
                            <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 px-1.5 py-0.5 rounded text-[10px] font-bold text-amber-300 font-mono">
                              <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                              <span>{q.probabilityScore}%</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-slate-200 font-medium line-clamp-2 mb-2 leading-relaxed">
                          {q.questionText}
                        </p>

                        {/* Textbook Grounding Pill */}
                        <div className="bg-slate-950/90 rounded-lg px-2.5 py-1 border border-slate-800/80 text-[10px] text-emerald-400 font-mono mb-2 truncate">
                          📖 {q.ktbsSource.book} • {q.ktbsSource.sectionOrPage}
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                          <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded">
                            {q.cognitiveLevel}
                          </span>

                          <div className="flex items-center gap-2">
                            {pacingRecord && (
                              <span
                                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                  pacingRecord.withinBudget
                                    ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                                    : "bg-rose-500/15 text-rose-300 border border-rose-500/30"
                                }`}
                              >
                                ⏱️ {formatPacingTime(pacingRecord.timeTaken)}
                              </span>
                            )}
                            {hasUploaded && (
                              <span className="text-emerald-400 font-medium text-[10px]">📷 Photo</span>
                            )}
                            {isUnlocked && (
                              <span className="text-cyan-400 font-medium text-[10px]">🔑 Scheme</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 text-center text-slate-500 bg-slate-950 rounded-2xl border border-slate-800">
                    No questions found matching your filter criteria.
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Question Execution Workspace, Pacing Speedometer & Marking Key */}
            <div className="lg:col-span-7">
              {activeQuestion ? (
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 backdrop-blur-xl space-y-6">
                  {/* Question Header & Timing Banner */}
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-indigo-500/20 text-cyan-300 border border-indigo-500/30">
                          {activeQuestion.subjectCode} • Question No. {activeQuestion.qNumber}
                        </span>
                        <span className="text-xs text-slate-400">
                          {activeQuestion.year} {activeQuestion.examType}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/30 font-mono">
                          {activeQuestion.marks} Marks
                        </span>
                        <span className="text-xs text-cyan-300 font-mono bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-800/40">
                          ⏱️ KSEAB Budget: {activeQuestion.expectedTimeMinutes} mins
                        </span>
                      </div>
                    </div>

                    {/* Strict Textbook Citation Card */}
                    <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 mb-3 flex items-center justify-between text-xs">
                      <div className="space-y-0.5">
                        <span className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" /> Official KTBS / NCERT Source Reference:
                        </span>
                        <p className="text-slate-200 font-mono text-[11px]">
                          {activeQuestion.ktbsSource.book} • Chapter {activeQuestion.ktbsSource.chapterNumber} ({activeQuestion.ktbsSource.sectionOrPage})
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block">Board Probability</span>
                        <span className="text-sm font-black text-amber-300 font-mono">
                          {activeQuestion.probabilityScore}%
                        </span>
                      </div>
                    </div>

                    {/* Primary Question Box */}
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 relative group">
                      <p className="text-sm font-semibold text-white leading-relaxed">
                        {activeQuestion.questionText}
                      </p>
                      {activeQuestion.kannadaQuestionText && (
                        <p className="text-xs text-cyan-300/90 font-sans mt-2 pt-2 border-t border-slate-800/80 leading-relaxed">
                          {activeQuestion.kannadaQuestionText}
                        </p>
                      )}
                    </div>

                    {/* Question Tags & Past History */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mt-2.5">
                      <div className="flex flex-wrap gap-1.5">
                        {activeQuestion.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-semibold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-700/60"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                        <span className="font-bold">Past Records:</span>
                        {activeQuestion.appearanceHistory.slice(0, 2).map((yr, idx) => (
                          <span key={idx} className="bg-slate-800 px-1.5 py-0.5 rounded text-cyan-300 border border-slate-700">
                            {yr}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* KSEAB Question Pacing Speedometer (Killing the useless sprint clock) */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">
                            Question Pacing Speedometer
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            Board Budget: {activeQuestion.expectedTimeMinutes}m 00s (Strict 2.25 min/mark constraint)
                          </span>
                        </div>
                      </div>

                      {/* Timer Display */}
                      <div className="text-right">
                        <span
                          className={`text-xl font-black font-mono tracking-wider ${
                            isPacingOvertime
                              ? "text-rose-400 animate-pulse"
                              : isCurrentlyPacingThisQuestion
                              ? "text-cyan-300"
                              : "text-slate-400"
                          }`}
                        >
                          {isCurrentlyPacingThisQuestion ? formatPacingTime(pacingSeconds) : "00:00"}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono block">
                          / {activeQuestion.expectedTimeMinutes}:00 min
                        </span>
                      </div>
                    </div>

                    {/* Speedometer Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                      <div
                        className={`h-full transition-all duration-300 ${
                          isPacingOvertime
                            ? "bg-rose-500"
                            : pacingPercentage > 75
                            ? "bg-amber-400"
                            : "bg-emerald-400"
                        }`}
                        style={{ width: `${pacingPercentage}%` }}
                      />
                    </div>

                    {/* Speedometer Controls & Finish Action */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        {!isCurrentlyPacingThisQuestion || !isPacingRunning ? (
                          <button
                            onClick={() => {
                              if (!isCurrentlyPacingThisQuestion) {
                                handleStartPacing(activeQuestion.id);
                              } else {
                                handleResumePacing();
                              }
                            }}
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
                          >
                            <Play className="w-3.5 h-3.5" />
                            <span>{isCurrentlyPacingThisQuestion ? "Resume Attack" : "Start Pacing Attack"}</span>
                          </button>
                        ) : (
                          <button
                            onClick={handlePausePacing}
                            className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
                          >
                            <Pause className="w-3.5 h-3.5" />
                            <span>Pause Timer</span>
                          </button>
                        )}

                        {isCurrentlyPacingThisQuestion && (
                          <button
                            onClick={() => handleFinishPacing(activeQuestion)}
                            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
                          >
                            <CheckCheck className="w-3.5 h-3.5 text-cyan-300" />
                            <span>I Finished Solving (+25 XP)</span>
                          </button>
                        )}
                      </div>

                      {/* Pacing Speed Status Badge */}
                      <div>
                        {previousPacingRecord ? (
                          <span
                            className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                              previousPacingRecord.withinBudget
                                ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                                : "bg-rose-500/15 text-rose-300 border-rose-500/30"
                            }`}
                          >
                            {previousPacingRecord.withinBudget
                              ? `✓ Solved in ${formatPacingTime(previousPacingRecord.timeTaken)} (Pacing Perfect!)`
                              : `⚠ Took ${formatPacingTime(previousPacingRecord.timeTaken)} (Over Budget)`}
                          </span>
                        ) : isPacingOvertime ? (
                          <span className="text-xs font-bold text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-800">
                            Time Budget Exceeded
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-500 font-mono">
                            Aim to solve within {activeQuestion.expectedTimeMinutes} minutes
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 1-Click Send to AI Answer Grader */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-slate-950 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        AI Multimodal Answer Evaluation
                      </span>
                      <p className="text-[11px] text-slate-300">
                        Solve on paper, snap a photo, and let Chief Examiner AI grade your steps against the official key.
                      </p>
                    </div>

                    <button
                      onClick={() => handleTransferToGrader(activeQuestion)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/25 ring-1 ring-emerald-400/40 transition-all hover:scale-[1.02]"
                    >
                      <span>🚀 Evaluate in AI Grader</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* KSEAB Internal Choice Optimizer (OR Option) */}
                  {activeQuestion.choiceAlternative && (
                    <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-cyan-400" />
                          Examiner "OR" Choice Strategy (Max Mark Decision)
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {activeQuestion.choiceAlternative.examinerVerdict}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        <strong>Alternative Option:</strong> {activeQuestion.choiceAlternative.questionText}
                      </p>
                      <p className="text-[11px] text-cyan-200 bg-slate-950/60 p-2.5 rounded-xl border border-indigo-500/20 leading-relaxed">
                        💡 <strong>Chief Examiner Rule:</strong> {activeQuestion.choiceAlternative.verdictReason}
                      </p>
                    </div>
                  )}

                  {/* Student Practice Handwriting Upload Box */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5 text-cyan-400" />
                        Handwritten Paper Practice Record
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Solve on notebook & upload
                      </span>
                    </div>

                    {uploadedPhotos[activeQuestion.id] ? (
                      <div className="space-y-2">
                        <img
                          src={uploadedPhotos[activeQuestion.id]}
                          alt="Practice submission"
                          className="max-h-48 rounded-xl mx-auto border border-slate-700 object-contain"
                        />
                        <div className="flex items-center justify-between text-xs pt-1">
                          <span className="text-emerald-400 font-medium flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" /> Answer Paper Snapshot Saved
                          </span>
                          <label className="text-cyan-400 hover:underline cursor-pointer">
                            Retake
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handlePracticePhotoUpload(activeQuestion.id, e)}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    ) : (
                      <label className="border-2 border-dashed border-slate-800 hover:border-cyan-400/50 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors">
                        <Camera className="w-5 h-5 text-slate-400 mb-1" />
                        <span className="text-xs text-slate-300 font-medium">
                          Capture answer sheet with camera
                        </span>
                        <span className="text-[10px] text-slate-500 mt-0.5">
                          Verify spacing, diagrams, and step layout against NCERT
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handlePracticePhotoUpload(activeQuestion.id, e)}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  {/* Scheme of Valuation Unlock Button & View */}
                  <div className="pt-2">
                    <button
                      onClick={() => toggleScheme(activeQuestion.id)}
                      className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                        unlockedSchemes[activeQuestion.id]
                          ? "bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-750"
                          : "bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white shadow-lg shadow-amber-600/20"
                      }`}
                    >
                      {unlockedSchemes[activeQuestion.id] ? (
                        <>
                          <EyeOff className="w-4 h-4" />
                          <span>Hide Official Valuation Scheme</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" />
                          <span>Unlock KSEAB Official Scheme of Valuation</span>
                        </>
                      )}
                    </button>

                    {/* Unlocked Scheme Details */}
                    {unlockedSchemes[activeQuestion.id] && (
                      <div className="mt-4 p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-4 animate-fadeIn">
                        <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5" /> Chief Examiner Step Marking Scheme
                          </span>
                          <span className="text-xs font-mono font-bold text-amber-400">
                            Total {activeQuestion.marks}M
                          </span>
                        </div>

                        <div className="space-y-2">
                          {activeQuestion.schemeSteps.map((step, idx) => (
                            <div
                              key={idx}
                              className="flex items-start justify-between gap-3 text-xs p-2.5 rounded-xl bg-slate-950/60 border border-amber-500/20"
                            >
                              <span className="text-slate-200 leading-relaxed">
                                {idx + 1}. {step.point}
                              </span>
                              <span className="shrink-0 font-mono font-bold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                                +{step.marks}M
                              </span>
                            </div>
                          ))}
                        </div>

                        <div>
                          <span className="text-[11px] font-bold text-slate-400 block mb-1 uppercase tracking-wide">
                            Official Chief Examiner Solution Notes:
                          </span>
                          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 whitespace-pre-line leading-relaxed">
                            {activeQuestion.modelAnswerText}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-500">
                  Select a question from the left column to practice.
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* AI Board Question Generator Modal */}
      {isGenModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Generate 2027 Board PYQ</h3>
                  <p className="text-[11px] text-slate-400">AI Syllabus-Grounded Question Drill</p>
                </div>
              </div>
              <button
                onClick={() => setIsGenModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">Select Subject:</label>
                <div className="grid grid-cols-3 gap-2">
                  {KSEAB_SUBJECTS.map((s) => (
                    <button
                      key={s.code}
                      onClick={() => setGenSubject(s.code)}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                        genSubject === s.code
                          ? "bg-indigo-600 text-white border-indigo-400"
                          : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                      }`}
                    >
                      {s.icon} {s.code}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">Question Marks:</label>
                <div className="grid grid-cols-4 gap-2">
                  {[2, 3, 4, 5].map((m) => (
                    <button
                      key={m}
                      onClick={() => setGenMarks(m)}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                        genMarks === m
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                          : "bg-slate-950 text-slate-400 border-slate-800"
                      }`}
                    >
                      {m} Marks
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">Topic / Focus:</label>
                <input
                  type="text"
                  value={genTopic}
                  onChange={(e) => setGenTopic(e.target.value)}
                  placeholder="e.g. Electricity Numerical, India Map, BPT..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <button
              onClick={handleGenerateFreshQuestion}
              disabled={isGeneratingAi}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
            >
              {isGeneratingAi ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Synthesizing KSEAB 2027 Question...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  <span>Generate Question & Add to Vault</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
