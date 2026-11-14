"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Lock, ShieldCheck, Delete, ShieldAlert, Clock } from "lucide-react";
import { StudentProfile } from "../lib/types";
import { sounds } from "../lib/sound";

interface PinAccessGateProps {
  onUnlock: (student: StudentProfile) => void;
  noticeMessage?: string;
}

export const PinAccessGate: React.FC<PinAccessGateProps> = ({ onUnlock, noticeMessage }) => {
  const [pin, setPin] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  // Focus hidden input on click
  const handleContainerClick = () => {
    hiddenInputRef.current?.focus();
  };

  const submitPin = useCallback(async (pinToVerify: string) => {
    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pinToVerify }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Access Denied: Invalid Student PIN.");
      }

      sounds.playSuccessChime();
      onUnlock(data.student);
    } catch (err) {
      sounds.playWrong();
      setErrorMsg((err as Error).message || "Access Denied");
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
        setPin("");
      }, 600);
    } finally {
      setIsLoading(false);
    }
  }, [onUnlock]);

  const handleDigitPress = useCallback((digit: string) => {
    if (isLoading || pin.length >= 4) return;
    sounds.playClick();
    setErrorMsg("");
    const nextPin = pin + digit;
    setPin(nextPin);
    if (nextPin.length === 4) {
      submitPin(nextPin);
    }
  }, [isLoading, pin, submitPin]);

  const handleBackspace = useCallback(() => {
    if (isLoading || pin.length === 0) return;
    sounds.playClick();
    setErrorMsg("");
    setPin((prev) => prev.slice(0, -1));
  }, [isLoading, pin.length]);

  const handleClear = useCallback(() => {
    sounds.playClick();
    setPin("");
    setErrorMsg("");
  }, []);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        handleDigitPress(e.key);
      } else if (e.key === "Backspace") {
        handleBackspace();
      } else if (e.key === "Escape") {
        handleClear();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleDigitPress, handleBackspace, handleClear]);

  return (
    <div
      onClick={handleContainerClick}
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-slate-950 text-slate-100 select-none"
    >
      {/* Hidden real input for mobile keyboard accessibility */}
      <input
        ref={hiddenInputRef}
        type="password"
        inputMode="numeric"
        maxLength={4}
        value={pin}
        onChange={(e) => {
          const val = e.target.value.replace(/\D/g, "").slice(0, 4);
          setPin(val);
          if (val.length === 4) submitPin(val);
        }}
        className="opacity-0 absolute -z-10 w-0 h-0"
        aria-hidden="true"
      />

      <div className="w-full max-w-sm bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-indigo-950/40 text-center">
        {/* Security Padlock Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 mx-auto mb-4 shadow-lg shadow-indigo-500/20">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <Lock className="w-7 h-7 text-cyan-400" />
          </div>
        </div>

        {/* Header */}
        <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          KSEAB SSLC 2027
        </h1>
        <p className="text-xs text-slate-400 mt-1 mb-5">
          Private Cohort Accelerator • Restricted Access
        </p>

        {/* Inactivity Timeout or Security Notice */}
        {noticeMessage && (
          <div className="mb-5 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-center gap-2 animate-fadeIn text-left">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="leading-snug">{noticeMessage}</span>
          </div>
        )}

        {/* 4 Masked PIN Indicator Boxes */}
        <div className={`flex items-center justify-center gap-3.5 mb-5 ${isShaking ? "animate-shake" : ""}`}>
          {[0, 1, 2, 3].map((index) => {
            const isFilled = pin.length > index;
            return (
              <div
                key={index}
                className={`w-13 h-14 w-12 h-14 rounded-2xl border-2 flex items-center justify-center transition-all duration-200 ${
                  isFilled
                    ? "border-cyan-400 bg-cyan-950/60 shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-400/40 scale-105"
                    : "border-slate-800 bg-slate-950/80 text-slate-700"
                }`}
              >
                {isFilled ? (
                  <span className="w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-md shadow-cyan-400/80 animate-scaleIn" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-800" />
                )}
              </div>
            );
          })}
        </div>

        {/* Error Feedback Message */}
        <div className="min-h-[24px] mb-4">
          {errorMsg ? (
            <p className="text-xs text-rose-400 font-semibold flex items-center justify-center gap-1.5 animate-fadeIn">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMsg}</span>
            </p>
          ) : (
            <p className="text-[11px] text-slate-500 font-medium">
              Enter your confidential 4-digit student PIN
            </p>
          )}
        </div>

        {/* Tactile Mobile & Tablet Keypad (3x4 Grid) */}
        <div className="grid grid-cols-3 gap-2.5 max-w-[260px] mx-auto mb-6">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
            <button
              key={num}
              type="button"
              disabled={isLoading}
              onClick={(e) => {
                e.stopPropagation();
                handleDigitPress(num);
              }}
              className="h-14 rounded-2xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800/90 text-white font-mono text-xl font-bold flex items-center justify-center transition-all active:scale-95 active:bg-indigo-600 disabled:opacity-40"
            >
              {num}
            </button>
          ))}

          <button
            type="button"
            disabled={isLoading || pin.length === 0}
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            className="h-14 rounded-2xl bg-slate-950/40 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white text-xs font-bold uppercase transition-all active:scale-95 disabled:opacity-20"
          >
            Clear
          </button>

          <button
            type="button"
            disabled={isLoading}
            onClick={(e) => {
              e.stopPropagation();
              handleDigitPress("0");
            }}
            className="h-14 rounded-2xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800/90 text-white font-mono text-xl font-bold flex items-center justify-center transition-all active:scale-95 active:bg-indigo-600 disabled:opacity-40"
          >
            0
          </button>

          <button
            type="button"
            disabled={isLoading || pin.length === 0}
            onClick={(e) => {
              e.stopPropagation();
              handleBackspace();
            }}
            className="h-14 rounded-2xl bg-slate-950/40 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-all active:scale-95 disabled:opacity-20"
            title="Backspace"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>

        {/* Security & Isolation Footnote */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Server-Side PIN Isolation • Rate Limited</span>
        </div>
      </div>
    </div>
  );
};
