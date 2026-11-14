"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  ShieldAlert,
  Plus,
  CheckCircle2,
  Sparkles,
  Filter,
  AlertOctagon,
  X,
  Award,
  Trash2,
} from "lucide-react";
import { KSEAB_SUBJECTS } from "../lib/kseab-data";
import { MistakeItem, SubjectCode } from "../lib/types";

interface MistakeVaultTabProps {
  mistakes: MistakeItem[];
  onAddMistake: (item: Omit<MistakeItem, "id" | "loggedDate" | "isMastered">) => void;
  onToggleMastery: (id: string) => void;
}

export const MistakeVaultTab: React.FC<MistakeVaultTabProps> = ({
  mistakes,
  onAddMistake,
  onToggleMastery,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PENDING" | "MASTERED">("ALL");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Form State for new mistake modal
  const [formSubject, setFormSubject] = useState<SubjectCode>("81E");
  const [formTopic, setFormTopic] = useState<string>("");
  const [formSummary, setFormSummary] = useState<string>("");
  const [formErrorType, setFormErrorType] = useState<MistakeItem["errorType"]>("Formula Error");
  const [formMarksLost, setFormMarksLost] = useState<number>(0.5);
  const [formHowToAvoid, setFormHowToAvoid] = useState<string>("");

  const handleMasteryClick = (id: string, isCurrentlyMastered: boolean) => {
    if (!isCurrentlyMastered) {
      // Trigger festive confetti explosion
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.65 },
        colors: ["#22d3ee", "#6366f1", "#10b981", "#f59e0b"],
      });
    }
    onToggleMastery(id);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTopic.trim() || !formSummary.trim() || !formHowToAvoid.trim()) {
      alert("Please fill out all fields to register the mistake.");
      return;
    }

    onAddMistake({
      subjectCode: formSubject,
      topic: formTopic.trim(),
      questionSummary: formSummary.trim(),
      errorType: formErrorType,
      markLost: formMarksLost,
      howToAvoid: formHowToAvoid.trim(),
    });

    // Reset Form & Close Modal
    setFormTopic("");
    setFormSummary("");
    setFormHowToAvoid("");
    setIsModalOpen(false);
  };

  const filteredMistakes = mistakes.filter((item) => {
    if (selectedSubject !== "ALL" && item.subjectCode !== selectedSubject) {
      return false;
    }
    if (statusFilter === "PENDING" && item.isMastered) return false;
    if (statusFilter === "MASTERED" && !item.isMastered) return false;
    return true;
  });

  const pendingCount = mistakes.filter((m) => !m.isMastered).length;
  const masteredCount = mistakes.filter((m) => m.isMastered).length;
  const totalMarksAtRisk = mistakes
    .filter((m) => !m.isMastered)
    .reduce((acc, m) => acc + m.markLost, 0);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-full mb-2">
              <ShieldAlert className="w-3.5 h-3.5" /> High-Yield Defect Insulation
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Half-Mark Mistake Vault & XP Mastery Tracker
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Top state ranks are determined by 0.5-mark slip-ups. Log every recurring leak and earn +40 XP upon mastery.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-rose-600 via-indigo-600 to-cyan-500 hover:from-rose-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>+ Log New Mistake</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800">
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
            <span className="text-[11px] text-slate-400 block">Total Logged</span>
            <span className="text-xl font-bold text-white font-mono">{mistakes.length}</span>
          </div>
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
            <span className="text-[11px] text-rose-400 block font-medium">Active Leaks</span>
            <span className="text-xl font-bold text-rose-400 font-mono">{pendingCount}</span>
          </div>
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
            <span className="text-[11px] text-emerald-400 block font-medium">Mastered (+XP)</span>
            <span className="text-xl font-bold text-emerald-300 font-mono">{masteredCount}</span>
          </div>
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
            <span className="text-[11px] text-amber-400 block font-medium">Marks at Risk</span>
            <span className="text-xl font-bold text-amber-300 font-mono">
              -{totalMarksAtRisk.toFixed(1)}M
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-5 pt-4 border-t border-slate-800/80">
          {/* Subject Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-400 font-semibold mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-cyan-400" /> Subject:
            </span>
            <button
              onClick={() => setSelectedSubject("ALL")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                selectedSubject === "ALL"
                  ? "bg-indigo-600 text-white border-indigo-400"
                  : "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200"
              }`}
            >
              All
            </button>
            {KSEAB_SUBJECTS.map((sub) => (
              <button
                key={sub.code}
                onClick={() => setSelectedSubject(sub.code)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                  selectedSubject === sub.code
                    ? "bg-indigo-600 text-white border-indigo-400"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200"
                }`}
              >
                {sub.code}
              </button>
            ))}
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setStatusFilter("ALL")}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                statusFilter === "ALL"
                  ? "bg-slate-800 text-white font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              All ({mistakes.length})
            </button>
            <button
              onClick={() => setStatusFilter("PENDING")}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                statusFilter === "PENDING"
                  ? "bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => setStatusFilter("MASTERED")}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                statusFilter === "MASTERED"
                  ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Mastered ({masteredCount})
            </button>
          </div>
        </div>
      </div>

      {/* Mistake Cards Grid */}
      {filteredMistakes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMistakes.map((item) => (
            <div
              key={item.id}
              className={`rounded-3xl p-5 border flex flex-col justify-between transition-all backdrop-blur-xl ${
                item.isMastered
                  ? "bg-slate-950/60 border-emerald-500/30 opacity-80"
                  : "bg-slate-900/90 border-slate-800 hover:border-slate-700 shadow-xl"
              }`}
            >
              <div>
                {/* Card Top Pill */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-cyan-300 border border-indigo-500/30">
                      {item.subjectCode}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                      {item.errorType}
                    </span>
                  </div>

                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                      item.isMastered
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                    }`}
                  >
                    -{item.markLost}M
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mb-1.5 leading-snug">
                  {item.topic}
                </h3>

                <p className="text-xs text-slate-300 mb-3 bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 leading-relaxed font-sans">
                  <strong className="text-slate-400 block text-[10px] uppercase font-bold mb-0.5">
                    Question Context:
                  </strong>
                  {item.questionSummary}
                </p>

                {/* How to Avoid / Chief Examiner Fix */}
                <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200/90 leading-relaxed mb-4">
                  <strong className="text-cyan-300 block text-[10px] uppercase font-bold mb-0.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Prevention Key:
                  </strong>
                  {item.howToAvoid}
                </div>
              </div>

              {/* Action Button: Mark Mastered (+40 XP) */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">
                  {item.loggedDate}
                </span>

                <button
                  onClick={() => handleMasteryClick(item.id, item.isMastered)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
                    item.isMastered
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-md shadow-emerald-600/20"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{item.isMastered ? "Mastered (Completed)" : "Mark Mastered (+40 XP)"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-500">
          No mistakes found for the selected filter. Keep up the flawless prep!
        </div>
      )}

      {/* Modal: Log New Mistake */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
                Log Half-Mark Leak
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Subject
                  </label>
                  <select
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value as SubjectCode)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-400"
                  >
                    {KSEAB_SUBJECTS.map((s) => (
                      <option key={s.code} value={s.code}>
                        {s.code} — {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Defect Category
                  </label>
                  <select
                    value={formErrorType}
                    onChange={(e) => setFormErrorType(e.target.value as MistakeItem["errorType"])}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-400"
                  >
                    <option value="Formula Error">Formula Error</option>
                    <option value="Calculation">Calculation</option>
                    <option value="Unit Missing">Unit Missing (e.g. cm, m/s)</option>
                    <option value="Diagram Label">Diagram / Arrow Missing</option>
                    <option value="Grammar / Script">Grammar / Script (Kannada/Hindi)</option>
                    <option value="Incomplete Statement">Incomplete Statement</option>
                    <option value="MCQ Trap / Misread">MCQ Trap / Misread</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Topic / Sub-Chapter Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pair of Linear Equations - Graphic Scale"
                  value={formTopic}
                  onChange={(e) => setFormTopic(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Question Description & Slip-up Summary
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe the exact question and where the examiner penalized you..."
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Mark Deducted
                  </label>
                  <select
                    value={formMarksLost}
                    onChange={(e) => setFormMarksLost(parseFloat(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-400 font-mono"
                  >
                    <option value={0.5}>-0.5 Marks (Half-mark leak)</option>
                    <option value={1.0}>-1.0 Mark</option>
                    <option value={1.5}>-1.5 Marks</option>
                    <option value={2.0}>-2.0 Marks</option>
                  </select>
                </div>

                <div className="flex flex-col justify-end">
                  <span className="text-[10px] text-slate-400 pb-2">
                    Affects 12-mark budget tracking
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  How to Avoid in Final Exam (Actionable rule to remember)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Box final numerical answer with units in square brackets..."
                  value={formHowToAvoid}
                  onChange={(e) => setFormHowToAvoid(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shadow-rose-600/20"
                >
                  Save to Mistake Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
