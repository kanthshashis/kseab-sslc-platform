"use client";

import React, { useState, useEffect } from "react";
import {
  Flame,
  Award,
  Clock,
  Sparkles,
  LogOut,
  Target,
  FileCheck2,
  BookOpenCheck,
  ShieldAlert,
  ListTodo,
  CheckCircle2,
  Volume2,
  VolumeX,
  Compass,
  Zap,
  BookOpen,
} from "lucide-react";
import { StudentProfile } from "../lib/types";
import { sounds } from "../lib/sound";

interface HeaderBarProps {
  student: StudentProfile;
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onLock: () => void;
  onOpenMapTrainer: () => void;
  onOpenSiTrainer: () => void;
  onOpenCheatSheet: () => void;
  isSyncing?: boolean;
  lastSyncedTime?: string | null;
  onTriggerSync?: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  student,
  currentTab,
  onSelectTab,
  onLock,
  onOpenMapTrainer,
  onOpenSiTrainer,
  onOpenCheatSheet,
  isSyncing = false,
  lastSyncedTime = null,
  onTriggerSync,
}) => {
  // Real-time calculation to March 22, 2027 10:00 AM IST
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  useEffect(() => {
    const examDate = new Date("2027-03-22T10:00:00+05:30").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = examDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.setEnabled(next);
    if (next) sounds.playClick();
  };

  const navItems = [
    { id: "mission", label: "Mission Control", icon: Target, badge: "625 Simulator" },
    { id: "grader", label: "AI Answer Grader", icon: FileCheck2, badge: "KSEAB AI" },
    { id: "pyq", label: "PYQ Arena", icon: BookOpenCheck, badge: "2023-24" },
    { id: "mistakes", label: "Mistake Vault", icon: ShieldAlert, badge: "-0.5M Leaks" },
    { id: "blueprint", label: "98% Checklist", icon: ListTodo, badge: "4M/5M Lock" },
  ];

  const handleTabClick = (tabId: string) => {
    sounds.playClick();
    onSelectTab(tabId);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
      {/* Top Utility Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-md shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span className="text-base font-bold text-cyan-400">⚡</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base text-white tracking-tight">
                KSEAB 98%
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                98% Accelerator
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              Exam-1: <span className="text-cyan-400 font-semibold">March 22, 2027</span>
            </div>
          </div>
        </div>

        {/* Live Exam Countdown (Desktop / Tablet) */}
        <div className="hidden md:flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl">
          <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
          <div className="text-xs">
            <span className="text-slate-400 font-medium mr-1.5">Countdown:</span>
            <span className="font-mono font-bold text-amber-300">
              {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </span>
          </div>
        </div>

        {/* Quick Launchers: Cheat Sheet, Q.38 Map & SI Units */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Rapid Revision Cheat Sheet Button */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenCheatSheet();
            }}
            className="py-1 px-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all active:scale-95"
            title="Open Rapid Revision Cheat Sheets"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
            <span>Cheat Sheets</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onOpenMapTrainer();
            }}
            className="p-1.5 sm:px-2.5 sm:py-1 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1 transition-all"
            title="Q.38 India Map 5M Trainer"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Map (5M)</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onOpenSiTrainer();
            }}
            className="p-1.5 sm:px-2.5 sm:py-1 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold flex items-center gap-1 transition-all"
            title="Boxed SI Unit Vault (-0.5M prevention)"
          >
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">SI Units</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title={soundEnabled ? "Mute sounds" : "Enable sound effects"}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>
        </div>

        {/* Gamified Badges & Student Pill */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak Badge */}
          <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-xl text-amber-300 text-xs font-bold">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>{student.streakDays}d</span>
          </div>

          {/* XP & Level Badge */}
          <div className="flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/30 px-2.5 py-1 rounded-xl text-indigo-300 text-xs font-bold">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>Lvl {student.level}</span>
            <span className="text-[10px] text-indigo-200/70 font-mono">({student.xp} XP)</span>
          </div>

          {/* Student Profile Pill & Switcher */}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1">
            <span className="text-sm">{student.avatar}</span>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-semibold text-slate-200 leading-none">
                {student.name}
              </div>
              <div className="text-[10px] text-cyan-400 font-mono leading-tight">
                PIN: {student.pin}
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                onLock();
              }}
              title="Lock / Switch Cohort PIN"
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors ml-1"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main 5-Tab Navigation Bar (Visible on Desktop & Tablet) */}
      <div className="hidden lg:block max-w-7xl mx-auto px-3 sm:px-6 py-1.5 overflow-x-auto scrollbar-none">
        <nav className="flex items-center gap-1.5 sm:gap-2 min-w-max pb-1">
          {navItems.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all relative ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/30"
                    : "bg-slate-900/60 text-slate-300 hover:bg-slate-800/80 hover:text-white border border-slate-800/60"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? "text-cyan-300" : "text-slate-400"
                  }`}
                />
                <span>{tab.label}</span>
                {isActive && (
                  <span className="text-[10px] font-normal px-1.5 py-0.2 bg-cyan-400/20 text-cyan-200 rounded border border-cyan-400/30">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Cloud Sync Status Indicator */}
          <button
            onClick={() => {
              if (onTriggerSync) {
                sounds.playClick();
                onTriggerSync();
              }
            }}
            title={isSyncing ? "Syncing with Upstash KV cloud..." : "Click to sync data with cloud"}
            className={`ml-auto flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-lg transition-all ${
              isSyncing
                ? "text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 animate-pulse"
                : "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 active:scale-95"
            }`}
          >
            {isSyncing ? (
              <>
                <div className="w-3 h-3 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                <span>Syncing Cloud...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lastSyncedTime ? `Cloud Synced (${lastSyncedTime})` : "Cloud Sync Active"}</span>
              </>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};
