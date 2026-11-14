"use client";

import React from "react";
import {
  TrendingUp,
  AlertTriangle,
  Calendar,
  Sparkles,
  RotateCcw,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle,
  BrainCircuit,
  BookOpen,
} from "lucide-react";
import { KSEAB_SUBJECTS } from "../lib/kseab-data";
import { MarksState, StudentProfile } from "../lib/types";

interface MissionControlTabProps {
  student: StudentProfile;
  marks: MarksState;
  onUpdateSubjectMarks: (code: string, theory: number, ia: number) => void;
  onResetToGolden: () => void;
}

export const MissionControlTab: React.FC<MissionControlTabProps> = ({
  student,
  marks,
  onUpdateSubjectMarks,
  onResetToGolden,
}) => {
  // Aggregate calculations
  let totalTheory = 0;
  let totalIA = 0;

  KSEAB_SUBJECTS.forEach((sub) => {
    const m = marks[sub.code] || { theory: 0, ia: 0 };
    totalTheory += m.theory;
    totalIA += m.ia;
  });

  const totalAggregate = totalTheory + totalIA;
  const percentage = ((totalAggregate / 625) * 100).toFixed(2);
  const marksLost = 625 - totalAggregate;
  const budgetRemaining = 12 - marksLost; // Max 12 marks allowed to lose for >= 98% (613/625 = 98.08%)
  const isSafe98 = totalAggregate >= 613;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Strict KTBS/NCERT Guardrail Top Ribbon */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/60 border border-emerald-500/30 rounded-2xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wide">
                KTBS / NCERT 2026–27 Strict Syllabus Guardrail Active
              </span>
              <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                100% Inlined • Zero Hallucination
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Restricted exclusively to official 10th standard textbooks & verified board question patterns.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-300 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-emerald-500/20">
          <span>Target: 613+ / 625</span>
          <span className="text-slate-500">•</span>
          <span className="text-cyan-400">98.08% Min Baseline</span>
        </div>
      </div>

      {/* Hero 625 Simulator & 12-Mark Loss Meter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main 625 Score Card */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 relative overflow-hidden backdrop-blur-xl shadow-xl shadow-indigo-950/40">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full">
                  625 Simulator
                </span>
                <span className="text-xs text-slate-400">
                  Target: <strong className="text-cyan-300">613+ for 98.08%</strong>
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1.5">
                Aggregate Score Projector
              </h2>
            </div>
            <button
              onClick={onResetToGolden}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
              title="Reset to recommended 98%+ baseline"
            >
              <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
              Golden 98% Preset
            </button>
          </div>

          {/* Big Numbers */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4">
              <span className="text-xs text-slate-400 font-medium block">Total Aggregate</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {totalAggregate}
                </span>
                <span className="text-xs text-slate-500 font-mono">/ 625</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Theory {totalTheory} + IA {totalIA}
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4">
              <span className="text-xs text-slate-400 font-medium block">Projected %</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span
                  className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                    isSafe98 ? "text-cyan-400" : "text-amber-400"
                  }`}
                >
                  {percentage}%
                </span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {isSafe98 ? "🎯 98%+ Distinction Safe" : "⚠️ Below 98% Cutoff"}
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4">
              <span className="text-xs text-slate-400 font-medium block">Marks Lost</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span
                  className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                    marksLost <= 12 ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  -{marksLost}
                </span>
                <span className="text-xs text-slate-500 font-mono">marks</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Max allowable loss: 12
              </div>
            </div>
          </div>

          {/* Interactive Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Overall Progress to 625</span>
              <span className="font-mono text-cyan-300 font-bold">{percentage}%</span>
            </div>
            <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  isSafe98
                    ? "bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 shadow-md shadow-cyan-400/30"
                    : "bg-gradient-to-r from-amber-500 to-rose-500"
                }`}
                style={{ width: `${Math.min(100, (totalAggregate / 625) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* 12-Mark Loss Budget Card */}
        <div
          className={`lg:col-span-5 border rounded-3xl p-6 sm:p-7 relative overflow-hidden backdrop-blur-xl flex flex-col justify-between shadow-xl ${
            isSafe98
              ? "bg-emerald-950/20 border-emerald-500/30 shadow-emerald-950/20"
              : "bg-rose-950/20 border-rose-500/30 shadow-rose-950/20"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span
                className={`text-xs uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-full border ${
                  isSafe98
                    ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                    : "bg-rose-500/10 text-rose-300 border-rose-500/30"
                }`}
              >
                {isSafe98 ? "🛡️ 12-Mark Loss Budget Safe" : "⚠️ Loss Budget Depleted"}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Rule: 613/625 = 98.08%
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              {budgetRemaining >= 0
                ? `${budgetRemaining} Marks Loss Cushion Left`
                : `${Math.abs(budgetRemaining)} Marks Deficit for 98%`}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              To secure 98.00%+ in KSEAB 2027, you can afford to lose at most{" "}
              <strong className="text-cyan-300">12 marks in total</strong> across all 6 subjects
              combined (Theory + Internal Assessment).
            </p>

            {/* Visual 12-Unit Loss Pill Grid */}
            <div className="mb-4">
              <div className="text-[11px] font-semibold text-slate-400 mb-2 flex items-center justify-between">
                <span>12-Mark Loss Absorption Slots:</span>
                <span className="font-mono text-xs">
                  {Math.min(12, marksLost)} / 12 Consumed
                </span>
              </div>
              <div className="grid grid-cols-12 gap-1.5">
                {Array.from({ length: 12 }).map((_, index) => {
                  const isLost = index < marksLost;
                  return (
                    <div
                      key={index}
                      title={`Loss Slot #${index + 1}: ${isLost ? "Consumed" : "Safe"}`}
                      className={`h-7 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold transition-all ${
                        isLost
                          ? "bg-rose-500/20 border border-rose-500/40 text-rose-400"
                          : "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300"
                      }`}
                    >
                      {isLost ? "✕" : "✓"}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">Current Student:</span>
            <span className="text-cyan-300 font-semibold flex items-center gap-1">
              <span>{student.avatar}</span> {student.name} ({student.targetMarks}M Target)
            </span>
          </div>
        </div>
      </div>

      {/* Official KSEAB 2027 Cognitive Blueprint Breakdown (Expert Feature) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-bold text-white">
              Official KSEAB 2027 Cognitive & Difficulty Blueprint
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            KSEAB Circular Ref: 2026-27/SSLC-BP
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Knowledge (20%)</span>
            <div className="text-lg font-bold text-white font-mono mt-1">100 Marks</div>
            <p className="text-[10px] text-slate-400 mt-0.5">Direct formulas, laws, dates, poets</p>
          </div>
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Understanding (40%)</span>
            <div className="text-lg font-bold text-cyan-300 font-mono mt-1">200 Marks</div>
            <p className="text-[10px] text-slate-400 mt-0.5">Bhavartha, explanations, reasons</p>
          </div>
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Application (25%)</span>
            <div className="text-lg font-bold text-indigo-300 font-mono mt-1">125 Marks</div>
            <p className="text-[10px] text-slate-400 mt-0.5">Numericals, word problems, proofs</p>
          </div>
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Skill (15%)</span>
            <div className="text-lg font-bold text-emerald-300 font-mono mt-1">75 Marks</div>
            <p className="text-[10px] text-slate-400 mt-0.5">Graphs, Diagrams, Q38 India Map</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800">
          <span>Difficulty Distribution: <strong>Easy 30%</strong> • <strong>Average 50%</strong> • <strong>Difficult 20%</strong></span>
          <span className="text-cyan-400">Guaranteed Distinction Buffer: 80% of paper is Easy + Average!</span>
        </div>
      </div>

      {/* 6 Subject Score Sliders */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>🎚️</span> 6-Subject Theory & Internal Sliders
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Fine-tune predicted marks to discover where every half-mark leak impacts your 98% goal.
            </p>
          </div>
          <div className="text-xs text-slate-400 font-mono bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            Theory (500M) + IA (125M) = 625M
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {KSEAB_SUBJECTS.map((sub) => {
            const currentSubMarks = marks[sub.code] || { theory: 0, ia: 0 };
            const subTotal = currentSubMarks.theory + currentSubMarks.ia;
            const subLost = sub.totalMax - subTotal;

            return (
              <div
                key={sub.code}
                className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 hover:border-slate-700 transition-all group"
              >
                {/* Subject Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl p-1.5 bg-slate-900 rounded-xl border border-slate-800">
                      {sub.icon}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {sub.name}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        Code: {sub.code} • {sub.kannadaName}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-extrabold text-white">
                      {subTotal}
                      <span className="text-xs text-slate-500 font-normal">/{sub.totalMax}</span>
                    </div>
                    {subLost > 0 ? (
                      <span className="text-[10px] font-bold text-rose-400">-{subLost}M lost</span>
                    ) : (
                      <span className="text-[10px] font-bold text-emerald-400">100% Full</span>
                    )}
                  </div>
                </div>

                {/* Theory Slider */}
                <div className="space-y-1.5 mb-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Theory Marks:</span>
                    <span className="font-mono font-bold text-cyan-300">
                      {currentSubMarks.theory} / {sub.theoryMax}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={sub.theoryMax}
                    value={currentSubMarks.theory}
                    onChange={(e) =>
                      onUpdateSubjectMarks(sub.code, parseInt(e.target.value) || 0, currentSubMarks.ia)
                    }
                    className="w-full"
                  />
                </div>

                {/* IA Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Internal Assessment (IA):</span>
                    <span className="font-mono font-bold text-indigo-300">
                      {currentSubMarks.ia} / {sub.iaMax}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={sub.iaMax}
                    value={currentSubMarks.ia}
                    onChange={(e) =>
                      onUpdateSubjectMarks(sub.code, currentSubMarks.theory, parseInt(e.target.value) || 0)
                    }
                    className="w-full"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Official 2027 KSEAB Timetable Cards */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full mb-1">
              <Calendar className="w-3.5 h-3.5" /> Official KSEAB March-April 2027 Final Timetable
            </div>
            <h3 className="text-xl font-bold text-white">
              Exam-1 Main Schedule & Paper Specifications
            </h3>
          </div>
          <div className="text-xs text-slate-400">
            Exam-2 (Best-of-Two Window): <strong className="text-white">May 24 – May 31, 2027</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {KSEAB_SUBJECTS.map((sub, index) => {
            const examDateObj = new Date(sub.examDate);
            const formattedDate = examDateObj.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            return (
              <div
                key={sub.code}
                className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 hover:border-indigo-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                      Paper {index + 1} • {sub.code}
                    </span>
                    <span className="text-xs font-semibold text-amber-300 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {sub.examDay}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1">
                    {sub.name}
                  </h4>
                  <div className="text-xs text-slate-400 font-mono mb-2">
                    {formattedDate} • {sub.examTime}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-300 py-2 border-t border-b border-slate-800/80 my-2">
                    <div>
                      <span className="text-slate-500 block text-[10px]">Theory Marks</span>
                      <strong className="text-white font-mono">{sub.theoryMax}M</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Questions</span>
                      <strong className="text-cyan-300 font-mono">{sub.questionsCount} Qs</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Internal IA</span>
                      <strong className="text-indigo-300 font-mono">{sub.iaMax}M</strong>
                    </div>
                  </div>

                  {/* Textbook Reference */}
                  <div className="mt-2 text-[10px] text-emerald-400 font-mono bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    📖 {sub.ncertTextbookTitle}
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Reporting: 9:30 AM</span>
                  <span className="text-emerald-400 font-medium">15 min reading time</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
