"use client";

import React from "react";
import {
  Target,
  FileCheck2,
  BookOpenCheck,
  ShieldAlert,
  ListTodo,
} from "lucide-react";
import { sounds } from "../lib/sound";

interface MobileBottomNavProps {
  currentTab: string;
  onSelectTab: (tabId: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onSelectTab,
}) => {
  const tabs = [
    { id: "mission", label: "Mission", icon: Target },
    { id: "grader", label: "Grader", icon: FileCheck2 },
    { id: "pyq", label: "PYQs", icon: BookOpenCheck },
    { id: "mistakes", label: "Vault", icon: ShieldAlert },
    { id: "blueprint", label: "Checklist", icon: ListTodo },
  ];

  const handleTabClick = (tabId: string) => {
    sounds.playClick();
    onSelectTab(tabId);
  };

  return (
    <nav className="lg:hidden fixed bottom-3 left-3 right-3 z-50 bg-slate-950/90 backdrop-blur-2xl border border-slate-800/90 rounded-3xl p-1.5 shadow-2xl shadow-indigo-950/60 safe-area-pb">
      <div className="grid grid-cols-5 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-2xl transition-all relative ${
                isActive
                  ? "bg-gradient-to-b from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/40"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-transform ${
                  isActive ? "text-cyan-300 scale-110" : "text-slate-400"
                }`}
              />
              <span
                className={`text-[10px] font-semibold mt-1 tracking-tight truncate max-w-full ${
                  isActive ? "text-white" : "text-slate-400"
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 absolute -bottom-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
