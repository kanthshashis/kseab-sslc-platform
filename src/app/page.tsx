"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { PinAccessGate } from "../components/PinAccessGate";
import { HeaderBar } from "../components/HeaderBar";
import { MobileBottomNav } from "../components/MobileBottomNav";
import { MissionControlTab } from "../components/MissionControlTab";
import { AnswerGraderTab } from "../components/AnswerGraderTab";
import { PyqArenaTab } from "../components/PyqArenaTab";
import { MistakeVaultTab } from "../components/MistakeVaultTab";
import { BlueprintChecklistTab } from "../components/BlueprintChecklistTab";
import { DailyQuestsCard } from "../components/DailyQuestsCard";
import { IndiaMapTrainerModal } from "../components/IndiaMapTrainerModal";
import { SiUnitTrainerModal } from "../components/SiUnitTrainerModal";
import { SubjectCheatSheetModal } from "../components/SubjectCheatSheetModal";
import { INITIAL_MARKS, INITIAL_MISTAKES } from "../lib/kseab-data";
import { StudentProfile, MarksState, MistakeItem, SubjectCode } from "../lib/types";
import { sounds } from "../lib/sound";

const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes

export default function Home() {
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [currentTab, setCurrentTab] = useState<string>("mission");
  const [marks, setMarks] = useState<MarksState>(INITIAL_MARKS);
  const [mistakes, setMistakes] = useState<MistakeItem[]>(INITIAL_MISTAKES);
  const [isClientLoaded, setIsClientLoaded] = useState<boolean>(false);
  const [sessionNotice, setSessionNotice] = useState<string | null>(null);
  const [graderPrefill, setGraderPrefill] = useState<{
    subject: SubjectCode;
    questionText: string;
    maxMarks: number;
    officialScheme?: string;
  } | null>(null);

  const handleSendToGrader = (data: {
    subject: SubjectCode;
    questionText: string;
    maxMarks: number;
    officialScheme?: string;
  }) => {
    setGraderPrefill(data);
    setCurrentTab("grader");
  };

  // Inactivity tracking ref
  const lastActivityRef = useRef<number>(Date.now());

  // Cloud sync states
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<string | null>(null);
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Modals state
  const [isMapTrainerOpen, setIsMapTrainerOpen] = useState<boolean>(false);
  const [isSiTrainerOpen, setIsSiTrainerOpen] = useState<boolean>(false);
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState<boolean>(false);

  // Record user interaction timestamp
  const recordActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
    try {
      sessionStorage.setItem("kseab_last_activity", Date.now().toString());
    } catch {}
  }, []);

  // Secure Lock / Logout Handler
  const handleLock = useCallback((notice?: string) => {
    setStudent(null);
    if (notice) setSessionNotice(notice);
    try {
      sessionStorage.removeItem("kseab_current_pin");
      sessionStorage.removeItem("kseab_last_activity");
      localStorage.removeItem("kseab_current_pin");
    } catch {}
  }, []);

  // Cloud Fetch on Login
  const fetchProgressFromCloud = useCallback(async (pin: string) => {
    try {
      setIsSyncing(true);
      const res = await fetch("/api/progress", {
        headers: { "x-student-pin": pin },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.found && data.data) {
          const cloud = data.data;
          if (cloud.marks) setMarks(cloud.marks);
          if (cloud.mistakes) setMistakes(cloud.mistakes);
          if (cloud.xp || cloud.level || cloud.streakDays) {
            setStudent((curr) => {
              if (!curr) return null;
              return {
                ...curr,
                xp: cloud.xp ?? curr.xp,
                level: cloud.level ?? curr.level,
                streakDays: cloud.streakDays ?? curr.streakDays,
              };
            });
          }
          const nowStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          setLastSyncedTime(nowStr);
        }
      }
    } catch {
      // Local fallback silently maintains state
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // Manual or Auto Sync to Upstash KV Cloud
  const persistProgressToCloud = useCallback(async (
    targetPin: string,
    targetMarks: MarksState,
    targetMistakes: MistakeItem[],
    targetXp: number,
    targetLevel: number,
    targetStreak: number
  ) => {
    try {
      setIsSyncing(true);
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-student-pin": targetPin,
        },
        body: JSON.stringify({
          marks: targetMarks,
          mistakes: targetMistakes,
          streakDays: targetStreak,
          xp: targetXp,
          level: targetLevel,
          blueprintCompletedIds: [],
        }),
      });
      if (res.ok) {
        const nowStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        setLastSyncedTime(nowStr);
      }
    } catch {
      // Graceful local persistence
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // Initial client mount: session check and storage hydration
  useEffect(() => {
    try {
      // Strictly purge any legacy pin in localStorage so closing the browser requires re-entry
      localStorage.removeItem("kseab_current_pin");

      const sessionPin = sessionStorage.getItem("kseab_current_pin");
      const lastActiveStr = sessionStorage.getItem("kseab_last_activity");

      if (sessionPin && sessionPin.length === 4) {
        const lastActive = lastActiveStr ? parseInt(lastActiveStr, 10) : 0;
        const elapsed = Date.now() - lastActive;

        if (lastActive > 0 && elapsed >= INACTIVITY_TIMEOUT_MS) {
          // Inactivity expired while tab was closed or backgrounded
          sessionStorage.removeItem("kseab_current_pin");
          sessionStorage.removeItem("kseab_last_activity");
          setSessionNotice("Session expired due to 10 minutes of inactivity. Please re-enter your PIN.");
        } else {
          // Active within the current browser session -> verify server-side
          fetch("/api/auth/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pin: sessionPin }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.success && data.student) {
                setStudent(data.student);
                recordActivity();
                fetchProgressFromCloud(sessionPin);
              } else {
                sessionStorage.removeItem("kseab_current_pin");
              }
            })
            .catch(() => {
              sessionStorage.removeItem("kseab_current_pin");
            });
        }
      }

      const savedMarks = localStorage.getItem("kseab_student_marks");
      if (savedMarks) {
        setMarks(JSON.parse(savedMarks));
      }

      const savedMistakes = localStorage.getItem("kseab_student_mistakes");
      if (savedMistakes) {
        setMistakes(JSON.parse(savedMistakes));
      }
    } catch {
      // Graceful fallback
    }
    setIsClientLoaded(true);
  }, [fetchProgressFromCloud, recordActivity]);

  // Inactivity Auto-Logout Watcher (10 mins default, or URL query ?test_inactivity_sec=X for automated verification)
  useEffect(() => {
    if (!student) return;

    recordActivity();

    // Determine timeout duration (default 10 minutes)
    let timeoutMs = INACTIVITY_TIMEOUT_MS;
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const testSec = urlParams.get("test_inactivity_sec");
      if (testSec) {
        const parsed = parseInt(testSec, 10);
        if (!isNaN(parsed) && parsed > 0) {
          timeoutMs = parsed * 1000;
        }
      }
    } catch {}

    const activityEvents = ["mousedown", "keydown", "touchstart", "scroll", "click"];
    const handleUserActivity = () => recordActivity();

    activityEvents.forEach((ev) => window.addEventListener(ev, handleUserActivity, { passive: true }));

    // Periodic check every 1 second against persisted sessionStorage timestamp
    const interval = setInterval(() => {
      let lastActive = lastActivityRef.current;
      try {
        const stored = sessionStorage.getItem("kseab_last_activity");
        if (stored) lastActive = parseInt(stored, 10);
      } catch {}

      const elapsed = Date.now() - lastActive;
      if (elapsed >= timeoutMs) {
        sounds.playWrong();
        handleLock("Session locked due to 10 minutes of inactivity. Please re-enter your PIN.");
      }
    }, 1000);

    // Immediate check when student re-opens or switches back to tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        let lastActive = lastActivityRef.current;
        try {
          const stored = sessionStorage.getItem("kseab_last_activity");
          if (stored) lastActive = parseInt(stored, 10);
        } catch {}

        const elapsed = Date.now() - lastActive;
        if (elapsed >= timeoutMs) {
          sounds.playWrong();
          handleLock("Session locked due to 10 minutes of inactivity. Please re-enter your PIN.");
        } else {
          recordActivity();
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      activityEvents.forEach((ev) => window.removeEventListener(ev, handleUserActivity));
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [student, recordActivity, handleLock]);

  // Debounced auto-save hook
  useEffect(() => {
    if (!student || !isClientLoaded) return;

    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }

    syncTimeoutRef.current = setTimeout(() => {
      persistProgressToCloud(
        student.pin,
        marks,
        mistakes,
        student.xp,
        student.level,
        student.streakDays
      );
    }, 2500);

    return () => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
    };
  }, [marks, mistakes, student, isClientLoaded, persistProgressToCloud]);

  // Save marks whenever updated
  const handleUpdateSubjectMarks = (code: string, theory: number, ia: number) => {
    setMarks((prev) => {
      const updated = {
        ...prev,
        [code]: { theory, ia },
      };
      try {
        localStorage.setItem("kseab_student_marks", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleResetToGolden = () => {
    sounds.playClick();
    setMarks(INITIAL_MARKS);
    try {
      localStorage.setItem("kseab_student_marks", JSON.stringify(INITIAL_MARKS));
    } catch {}
  };

  const handleUnlock = (selectedStudent: StudentProfile) => {
    sounds.playLevelUp();
    setStudent(selectedStudent);
    setSessionNotice(null);
    try {
      sessionStorage.setItem("kseab_current_pin", selectedStudent.pin);
      sessionStorage.setItem("kseab_last_activity", Date.now().toString());
      localStorage.removeItem("kseab_current_pin");
    } catch {}
    recordActivity();
    fetchProgressFromCloud(selectedStudent.pin);
  };

  const handleEarnXp = (amount: number) => {
    if (!student) return;
    setStudent((curr) => {
      if (!curr) return null;
      const newXp = curr.xp + amount;
      const newLevel = Math.floor(newXp / 400) + 1;
      return {
        ...curr,
        xp: newXp,
        level: newLevel,
      };
    });
  };

  // Mistake Vault Handlers
  const handleAddMistake = (newItem: Omit<MistakeItem, "id" | "loggedDate" | "isMastered">) => {
    const created: MistakeItem = {
      ...newItem,
      id: `mistake-${Date.now()}`,
      loggedDate: new Date().toISOString().split("T")[0],
      isMastered: false,
    };
    setMistakes((prev) => {
      const updated = [created, ...prev];
      try {
        localStorage.setItem("kseab_student_mistakes", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleToggleMastery = (id: string) => {
    setMistakes((prev) => {
      const updated = prev.map((m) => {
        if (m.id === id) {
          const nextMastered = !m.isMastered;
          if (nextMastered) {
            sounds.playSuccessChime();
            handleEarnXp(40);
          } else {
            sounds.playClick();
          }
          return { ...m, isMastered: nextMastered };
        }
        return m;
      });
      try {
        localStorage.setItem("kseab_student_mistakes", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleAddMistakeFromValuation = (
    subjectCode: SubjectCode,
    topic: string,
    summary: string,
    marksLost: number,
    howToAvoid: string
  ) => {
    sounds.playClick();
    handleAddMistake({
      subjectCode,
      topic,
      questionSummary: summary,
      errorType: "Diagram Label",
      markLost: marksLost,
      howToAvoid,
    });
  };

  const handleTriggerManualSync = () => {
    if (!student) return;
    sounds.playClick();
    persistProgressToCloud(
      student.pin,
      marks,
      mistakes,
      student.xp,
      student.level,
      student.streakDays
    );
  };

  if (!isClientLoaded) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-cyan-400 rounded-full animate-spin" />
      </div>
    );
  }

  // Screen 0: PIN Access Gate
  if (!student) {
    return (
      <PinAccessGate
        onUnlock={handleUnlock}
        noticeMessage={sessionNotice || undefined}
      />
    );
  }

  // Authenticated Workspace
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Top Header */}
      <HeaderBar
        student={student}
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onLock={() => handleLock("Session locked.")}
        onOpenMapTrainer={() => setIsMapTrainerOpen(true)}
        onOpenSiTrainer={() => setIsSiTrainerOpen(true)}
        onOpenCheatSheet={() => setIsCheatSheetOpen(true)}
        isSyncing={isSyncing}
        lastSyncedTime={lastSyncedTime}
        onTriggerSync={handleTriggerManualSync}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-5 sm:py-8 pb-28 lg:pb-8 space-y-6">
        {currentTab === "mission" && (
          <DailyQuestsCard
            onEarnXp={handleEarnXp}
            onNavigateTab={setCurrentTab}
          />
        )}

        {currentTab === "mission" && (
          <MissionControlTab
            student={student}
            marks={marks}
            onUpdateSubjectMarks={handleUpdateSubjectMarks}
            onResetToGolden={handleResetToGolden}
          />
        )}

        {currentTab === "grader" && (
          <AnswerGraderTab
            studentPin={student.pin}
            onAddMistakeFromValuation={handleAddMistakeFromValuation}
            initialQuestion={graderPrefill}
          />
        )}

        {currentTab === "pyq" && (
          <PyqArenaTab
            studentPin={student.pin}
            onEarnXp={handleEarnXp}
            onAddMistake={handleAddMistake}
            onNavigateTab={setCurrentTab}
            onSendToGrader={handleSendToGrader}
          />
        )}

        {currentTab === "mistakes" && (
          <MistakeVaultTab
            mistakes={mistakes}
            onAddMistake={handleAddMistake}
            onToggleMastery={handleToggleMastery}
          />
        )}

        {currentTab === "blueprint" && <BlueprintChecklistTab />}
      </main>

      {/* Floating Bottom Navigation Dock */}
      <MobileBottomNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
      />

      {/* Interactive Modal Trainers & Cheat Sheets */}
      <SubjectCheatSheetModal
        isOpen={isCheatSheetOpen}
        onClose={() => setIsCheatSheetOpen(false)}
      />

      <IndiaMapTrainerModal
        isOpen={isMapTrainerOpen}
        onClose={() => setIsMapTrainerOpen(false)}
      />

      <SiUnitTrainerModal
        isOpen={isSiTrainerOpen}
        onClose={() => setIsSiTrainerOpen(false)}
      />

      {/* Gamified Footer */}
      <footer className="hidden lg:block mt-auto border-t border-slate-900 bg-slate-950/80 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>KSEAB SSLC 2027 Accelerator • Mobile & Tablet Optimized</span>
          </div>
          <div>
            Target: <strong className="text-cyan-400">613+ / 625 (98.08%+)</strong> • 12-Mark Max Loss Budget
          </div>
        </div>
      </footer>
    </div>
  );
}
