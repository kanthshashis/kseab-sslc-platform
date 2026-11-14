"use client";

import React, { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import {
  Sparkles,
  Zap,
  CheckCircle2,
  XCircle,
  Clock,
  Flame,
  Award,
  RotateCcw,
  BookOpen,
  ShieldCheck,
  BookmarkPlus,
  ArrowRight,
  Trophy,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import { KSEAB_SUBJECTS } from "../lib/kseab-data";
import { SubjectCode, MistakeItem } from "../lib/types";
import { InteractiveQuizQuestion } from "../lib/schemas";
import { sounds } from "../lib/sound";

interface InteractiveQuizRunnerProps {
  studentPin?: string;
  onEarnXp: (amount: number) => void;
  onAddMistake: (mistake: Omit<MistakeItem, "id" | "loggedDate" | "isMastered">) => void;
  onBackToArchive?: () => void;
}

export const InteractiveQuizRunner: React.FC<InteractiveQuizRunnerProps> = ({
  studentPin = "2011",
  onEarnXp,
  onAddMistake,
  onBackToArchive,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectCode>("81E");
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [quizState, setQuizState] = useState<"idle" | "loading" | "active" | "completed">("idle");
  const [questions, setQuestions] = useState<InteractiveQuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [earnedXpTotal, setEarnedXpTotal] = useState<number>(0);
  const [isAiGenerated, setIsAiGenerated] = useState<boolean>(false);
  const [mistakeSavedForCurrent, setMistakeSavedForCurrent] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(45);

  const fireConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#38bdf8", "#818cf8", "#34d399", "#f59e0b"],
      });
    } catch {}
  }, []);

  const handleSelectOption = useCallback((index: number) => {
    if (isAnswerRevealed) return;

    setSelectedOption(index);
    setIsAnswerRevealed(true);

    const currentQ = questions[currentIndex];
    if (!currentQ) return;
    const isCorrect = index === currentQ.correctOptionIndex;

    if (isCorrect) {
      sounds.playSuccessChime();
      const newStreak = streak + 1;
      setStreak(newStreak);
      const points = 10 + (newStreak >= 3 ? 5 : 0);
      setScore((prev) => prev + 1);
      setEarnedXpTotal((prev) => prev + points);
      onEarnXp(points);

      if (newStreak === 3 || newStreak === 5) {
        sounds.playStreakFire();
        fireConfetti();
      }
    } else {
      sounds.playWrong();
      setStreak(0);
    }
  }, [currentIndex, isAnswerRevealed, onEarnXp, questions, streak, fireConfetti]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizState === "active" && !isAnswerRevealed) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            handleSelectOption(-1); // -1 means timed out
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizState, isAnswerRevealed, handleSelectOption]);

  const handleStartQuiz = async () => {
    sounds.playClick();
    setQuizState("loading");
    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-student-pin": studentPin,
        },
        body: JSON.stringify({
          subject: selectedSubject,
          count: questionCount,
        }),
      });

      if (!res.ok) {
        throw new Error("Quiz API failed");
      }

      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
        setIsAiGenerated(!!data.isAiGenerated);
        setCurrentIndex(0);
        setSelectedOption(null);
        setIsAnswerRevealed(false);
        setScore(0);
        setStreak(0);
        setEarnedXpTotal(0);
        setSecondsRemaining(45);
        setMistakeSavedForCurrent(false);
        setQuizState("active");
        sounds.playStreakFire();
      } else {
        throw new Error("No questions returned");
      }
    } catch {
      // Fallback
      setQuizState("idle");
      alert("Unable to generate quiz at this moment. Please check network connection.");
    }
  };

  const handleNextQuestion = () => {
    sounds.playClick();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerRevealed(false);
      setSecondsRemaining(45);
      setMistakeSavedForCurrent(false);
    } else {
      // Quiz completed!
      setQuizState("completed");
      sounds.playLevelUp();
      fireConfetti();
    }
  };

  const handleSaveToMistakeVault = () => {
    const currentQ = questions[currentIndex];
    sounds.playSuccessChime();
    onAddMistake({
      subjectCode: selectedSubject,
      topic: currentQ.chapter || "Interactive Quiz Review",
      questionSummary: currentQ.questionText.slice(0, 110),
      errorType: "MCQ Trap / Misread",
      markLost: 1,
      howToAvoid: currentQ.explanation,
    });
    setMistakeSavedForCurrent(true);
  };

  const activeSubjectInfo = KSEAB_SUBJECTS.find((s) => s.code === selectedSubject) || KSEAB_SUBJECTS[3];

  // ----------------------------------------------------
  // IDLE STATE: Configuration & Topic Selection Screen
  // ----------------------------------------------------
  if (quizState === "idle" || quizState === "loading") {
    return (
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl animate-fadeIn space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/70 border border-cyan-500/30 px-3 py-1 rounded-full">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                Live Interactive Board MCQ Blitz
              </span>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-1 rounded-full font-mono">
                Instant Marking & +XP
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              KSEAB Chapter Rapid Quiz Arena
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Practice 1-mark board MCQs generated directly from KTBS / NCERT textbooks. Test your recall, discover examiner traps, and protect your 98% loss budget.
            </p>
          </div>

          {onBackToArchive && (
            <button
              onClick={() => {
                sounds.playClick();
                onBackToArchive();
              }}
              className="text-xs font-semibold text-slate-400 hover:text-white px-3 py-1.5 rounded-xl border border-slate-800 hover:bg-slate-800 transition-colors"
            >
              ← Back to Board Archive
            </button>
          )}
        </div>

        {/* Step 1: Choose Subject */}
        <div>
          <label className="text-xs uppercase font-bold text-slate-400 tracking-wider block mb-3">
            Step 1: Select Board Subject
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {KSEAB_SUBJECTS.map((sub) => {
              const isSelected = selectedSubject === sub.code;
              return (
                <button
                  key={sub.code}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedSubject(sub.code);
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all active:scale-95 ${
                    isSelected
                      ? "bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400/50"
                      : "bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900"
                  }`}
                >
                  <div className="text-2xl mb-1.5">{sub.icon}</div>
                  <div className="text-xs font-bold leading-tight truncate">{sub.name}</div>
                  <div className="text-[10px] font-mono text-cyan-300 mt-1">{sub.code}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Choose Length */}
        <div>
          <label className="text-xs uppercase font-bold text-slate-400 tracking-wider block mb-3">
            Step 2: Sprint Length
          </label>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                sounds.playClick();
                setQuestionCount(5);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                questionCount === 5
                  ? "bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-md shadow-cyan-500/20"
                  : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
              }`}
            >
              ⚡ 5-Question Rapid Blitz (3 mins)
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setQuestionCount(10);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                questionCount === 10
                  ? "bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-md shadow-cyan-500/20"
                  : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
              }`}
            >
              🎯 10-Question Master Sprint (6 mins)
            </button>
          </div>
        </div>

        {/* Start Button */}
        <div className="pt-2">
          <button
            onClick={handleStartQuiz}
            disabled={quizState === "loading"}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/30 transition-all active:scale-95 disabled:opacity-50"
          >
            {quizState === "loading" ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Generating Board Questions from KTBS Syllabus...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Start Interactive {activeSubjectInfo.name} Quiz →</span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // COMPLETED STATE: Scorecard & Confetti Screen
  // ----------------------------------------------------
  if (quizState === "completed") {
    const percentage = Math.round((score / questions.length) * 100);
    const isTopper = percentage >= 80;

    return (
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl animate-fadeIn text-center space-y-6 max-w-2xl mx-auto">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 via-indigo-500 to-cyan-400 p-1 mx-auto shadow-xl shadow-amber-500/20">
          <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
            {isTopper ? (
              <Trophy className="w-10 h-10 text-amber-400 animate-bounce" />
            ) : (
              <Award className="w-10 h-10 text-cyan-400" />
            )}
          </div>
        </div>

        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
            {isTopper ? "🏆 Gold Board Topper Track" : "🥈 Revision Check Completed"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-3">
            Quiz Blitz Finished!
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Subject: {activeSubjectInfo.name} ({activeSubjectInfo.code})
          </p>
        </div>

        {/* Score Ring / Bar */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-around">
          <div>
            <div className="text-xs text-slate-400 uppercase font-bold">Accuracy</div>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono mt-0.5">
              {score} / {questions.length}
            </div>
            <div className="text-xs text-emerald-400 font-semibold mt-0.5">
              {percentage}% Correct
            </div>
          </div>

          <div className="h-12 w-px bg-slate-800" />

          <div>
            <div className="text-xs text-slate-400 uppercase font-bold">XP Awarded</div>
            <div className="text-3xl sm:text-4xl font-black text-cyan-300 font-mono mt-0.5">
              +{earnedXpTotal}
            </div>
            <div className="text-xs text-indigo-400 font-semibold mt-0.5">
              Cohort Rank Boosted
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => {
              sounds.playClick();
              setQuizState("idle");
            }}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Take Another Quiz</span>
          </button>

          {onBackToArchive && (
            <button
              onClick={() => {
                sounds.playClick();
                onBackToArchive();
              }}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition-all"
            >
              Return to Board PYQs
            </button>
          )}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // ACTIVE QUIZ RUNNER INTERFACE
  // ----------------------------------------------------
  const currentQ = questions[currentIndex];
  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Quiz Header: Progress bar, Timer & Streak */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-indigo-500/20 text-cyan-300 border border-indigo-500/30">
              {activeSubjectInfo.code} • Q {currentIndex + 1} of {questions.length}
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              {currentQ.chapter}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Streak Counter */}
            {streak >= 2 && (
              <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-xl text-amber-300 text-xs font-bold animate-pulse">
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>{streak} Streak!</span>
              </div>
            )}

            {/* Score Pill */}
            <div className="text-xs font-mono font-bold text-slate-300 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800">
              Score: <span className="text-emerald-400">{score}</span> / {currentIndex + (isAnswerRevealed ? 1 : 0)}
            </div>

            {/* 45s Countdown */}
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-300 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span className={secondsRemaining <= 10 ? "text-rose-400 animate-pulse" : "text-white"}>
                {secondsRemaining}s
              </span>
            </div>
          </div>
        </div>

        {/* Progress Line */}
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="flex items-center gap-1 text-emerald-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              1 Mark Board Objective Question
            </span>
            {isAiGenerated && (
              <span className="text-[10px] text-cyan-300 font-mono bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                ✨ Live Syllabus Grounded
              </span>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
            {currentQ.questionText}
          </h3>

          {currentQ.kannadaQuestionText && (
            <p className="text-xs sm:text-sm text-cyan-300/90 font-sans mt-2 pt-2 border-t border-slate-800 leading-relaxed">
              {currentQ.kannadaQuestionText}
            </p>
          )}
        </div>

        {/* 4 Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctOptionIndex;

            let buttonStyle = "bg-slate-950/80 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-900";
            let icon = null;

            if (isAnswerRevealed) {
              if (isCorrect) {
                buttonStyle = "bg-emerald-950/80 border-emerald-500 text-white shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-500/40";
                icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
              } else if (isSelected && !isCorrect) {
                buttonStyle = "bg-rose-950/80 border-rose-500 text-white shadow-lg shadow-rose-500/20 ring-2 ring-rose-500/40";
                icon = <XCircle className="w-5 h-5 text-rose-400 shrink-0" />;
              } else {
                buttonStyle = "bg-slate-950/40 border-slate-900 text-slate-500 opacity-60";
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswerRevealed}
                onClick={() => handleSelectOption(idx)}
                className={`p-4 rounded-2xl border text-left flex items-start justify-between gap-3 transition-all active:scale-[0.98] ${buttonStyle}`}
              >
                <div className="flex items-start gap-3">
                  <span className={`w-7 h-7 rounded-xl font-bold font-mono text-xs flex items-center justify-center shrink-0 border ${
                    isSelected
                      ? "bg-indigo-600 border-indigo-400 text-white"
                      : "bg-slate-900 border-slate-700 text-slate-400"
                  }`}>
                    {optionLabels[idx]}
                  </span>
                  <span className="text-xs sm:text-sm font-medium leading-relaxed pt-0.5">
                    {option}
                  </span>
                </div>
                {icon}
              </button>
            );
          })}
        </div>

        {/* Answer Revealed Explanation Box */}
        {isAnswerRevealed && (
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                Chief Examiner Solution & Trap Warning
              </span>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                {currentQ.ktbsCitation}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentQ.explanation}
            </p>

            {/* Quick Actions: Add to Mistake Vault + Next Question */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
              <button
                onClick={handleSaveToMistakeVault}
                disabled={mistakeSavedForCurrent}
                className={`text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
                  mistakeSavedForCurrent
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    : "bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700"
                }`}
              >
                <BookmarkPlus className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {mistakeSavedForCurrent ? "Saved to Mistake Vault!" : "Add Question to Mistake Vault"}
                </span>
              </button>

              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all active:scale-95 ml-auto"
              >
                <span>{currentIndex + 1 < questions.length ? "Next Question" : "See Final Score"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
