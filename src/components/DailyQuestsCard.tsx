"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, Circle, Sparkles, Trophy, Flame } from "lucide-react";
import { sounds } from "../lib/sound";

interface Quest {
  id: string;
  title: string;
  xpReward: number;
  isDone: boolean;
  actionTabId?: string;
}

interface DailyQuestsCardProps {
  onEarnXp: (amount: number) => void;
  onNavigateTab: (tabId: string) => void;
}

export const DailyQuestsCard: React.FC<DailyQuestsCardProps> = ({
  onEarnXp,
  onNavigateTab,
}) => {
  const [quests, setQuests] = useState<Quest[]>([
    {
      id: "q1",
      title: "Complete 1 PYQ Board Sprint (15-Min Clock)",
      xpReward: 30,
      isDone: false,
      actionTabId: "pyq",
    },
    {
      id: "q2",
      title: "Review or Insulate 1 Half-Mark Defect in Vault",
      xpReward: 40,
      isDone: true,
      actionTabId: "mistakes",
    },
    {
      id: "q3",
      title: "Verify Q.38 India Map 5-Point Placement",
      xpReward: 30,
      isDone: false,
      actionTabId: "blueprint",
    },
  ]);

  const handleToggleQuest = (id: string) => {
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          const nextState = !q.isDone;
          if (nextState) {
            sounds.playSuccessChime();
            confetti({
              particleCount: 40,
              spread: 50,
              origin: { y: 0.7 },
              colors: ["#22d3ee", "#6366f1", "#10b981"],
            });
            setTimeout(() => {
              onEarnXp(q.xpReward);
            }, 0);
          } else {
            sounds.playClick();
          }
          return { ...q, isDone: nextState };
        }
        return q;
      })
    );
  };

  const completedCount = quests.filter((q) => q.isDone).length;
  const isAllDone = completedCount === quests.length;

  return (
    <div className="bg-gradient-to-r from-slate-900/90 via-slate-900 to-indigo-950/40 border border-slate-800 rounded-3xl p-5 sm:p-6 backdrop-blur-xl shadow-xl">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-white">
                Daily 98% Velocity Quests
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {completedCount} / {quests.length} Done
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Complete your 3 daily habits to maintain streak & insulate marks
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20">
          <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>+100 XP Target</span>
        </div>
      </div>

      {/* Quests Stack */}
      <div className="space-y-2">
        {quests.map((q) => (
          <div
            key={q.id}
            onClick={() => handleToggleQuest(q.id)}
            className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
              q.isDone
                ? "bg-emerald-950/20 border-emerald-500/30 opacity-80"
                : "bg-slate-950/70 border-slate-800 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center gap-3">
              {q.isDone ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-slate-500 shrink-0 hover:text-cyan-400" />
              )}
              <span
                className={`text-xs font-medium ${
                  q.isDone ? "text-emerald-200 line-through" : "text-slate-200"
                }`}
              >
                {q.title}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                +{q.xpReward} XP
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
