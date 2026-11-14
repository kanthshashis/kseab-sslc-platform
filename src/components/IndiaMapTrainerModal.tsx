"use client";

import React, { useState, useRef, useMemo } from "react";
import {
  X,
  MapPin,
  Compass,
  Sparkles,
  CheckCircle2,
  Filter,
  Target,
  PenTool,
  RotateCcw,
  Check,
  AlertTriangle,
  ArrowRight,
  Eye,
  EyeOff,
  Palette,
  Search,
  BookOpen,
  Award,
  Zap,
} from "lucide-react";
import indiaMap from "@svg-maps/india";
import { sounds } from "../lib/sound";
import {
  MapLocationPin,
  MapLocationCategory,
  ALL_94_KSEAB_LOCATIONS,
  CATEGORY_META,
  STATE_POLITICAL_COLORS,
} from "../lib/kseab-map-data";

// Re-export for backward compatibility
export type { MapLocationPin };
export const COMPREHENSIVE_MAP_LOCATIONS = ALL_94_KSEAB_LOCATIONS;

interface IndiaMapTrainerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Approximate state center labels for on-map text
const STATE_LABELS: Record<string, { x: number; y: number; name: string; capital: string }> = {
  jk: { x: 173, y: 70, name: "JAMMU & KASHMIR", capital: "Srinagar / Jammu" },
  hp: { x: 191, y: 133, name: "HIMACHAL", capital: "Shimla" },
  pb: { x: 151, y: 155, name: "PUNJAB", capital: "Chandigarh" },
  ut: { x: 232, y: 175, name: "UTTARAKHAND", capital: "Dehradun" },
  hr: { x: 164, y: 195, name: "HARYANA", capital: "Chandigarh" },
  dl: { x: 186, y: 212, name: "DELHI", capital: "New Delhi" },
  rj: { x: 119, y: 257, name: "RAJASTHAN", capital: "Jaipur" },
  up: { x: 265, y: 245, name: "UTTAR PRADESH", capital: "Lucknow" },
  br: { x: 369, y: 275, name: "BIHAR", capital: "Patna" },
  sk: { x: 425, y: 235, name: "SIKKIM", capital: "Gangtok" },
  as: { x: 516, y: 271, name: "ASSAM", capital: "Dispur" },
  ar: { x: 550, y: 215, name: "ARUNACHAL", capital: "Itanagar" },
  nl: { x: 546, y: 270, name: "NAGALAND", capital: "Kohima" },
  mn: { x: 537, y: 301, name: "MANIPUR", capital: "Imphal" },
  mz: { x: 516, y: 337, name: "MIZORAM", capital: "Aizawl" },
  tr: { x: 493, y: 325, name: "TRIPURA", capital: "Agartala" },
  ml: { x: 484, y: 283, name: "MEGHALAYA", capital: "Shillong" },
  wb: { x: 412, y: 325, name: "WEST BENGAL", capital: "Kolkata" },
  jh: { x: 366, y: 327, name: "JHARKHAND", capital: "Ranchi" },
  or: { x: 340, y: 405, name: "ODISHA", capital: "Bhubaneswar" },
  ct: { x: 296, y: 388, name: "CHHATTISGARH", capital: "Raipur" },
  mp: { x: 214, y: 319, name: "MADHYA PRADESH", capital: "Bhopal" },
  gj: { x: 66, y: 355, name: "GUJARAT", capital: "Gandhinagar" },
  mh: { x: 180, y: 435, name: "MAHARASHTRA", capital: "Mumbai" },
  ga: { x: 122, y: 512, name: "GOA", capital: "Panaji" },
  tg: { x: 237, y: 457, name: "TELANGANA", capital: "Hyderabad" },
  ap: { x: 263, y: 510, name: "ANDHRA PRADESH", capital: "Amaravati" },
  ka: { x: 171, y: 525, name: "KARNATAKA", capital: "Bengaluru" },
  kl: { x: 166, y: 615, name: "KERALA", capital: "Thiruvananthapuram" },
  tn: { x: 211, y: 615, name: "TAMIL NADU", capital: "Chennai" },
  an: { x: 521, y: 609, name: "ANDAMAN & NICOBAR", capital: "Port Blair" },
  ld: { x: 99, y: 627, name: "LAKSHADWEEP", capital: "Kavaratti" },
};

export const IndiaMapTrainerModal: React.FC<IndiaMapTrainerModalProps> = ({ isOpen, onClose }) => {
  // Navigation & Display Modes
  const [activeMode, setActiveMode] = useState<"atlas" | "quiz" | "draw">("atlas");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showStateLabels, setShowStateLabels] = useState<boolean>(true);
  const [highlightKarnatakaOnly, setHighlightKarnatakaOnly] = useState<boolean>(false);
  const [hoveredStateId, setHoveredStateId] = useState<string | null>(null);

  // Selected Location for Inspector Dossier
  const [selectedPin, setSelectedPin] = useState<MapLocationPin>(ALL_94_KSEAB_LOCATIONS[0]);

  // Mode 2: Interactive 5-Mark Pin-Drop Quiz States
  const [quizQuestions, setQuizQuestions] = useState<MapLocationPin[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  // Mode 3: Interactive Drawing Canvas States
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [strokeColor, setStrokeColor] = useState<string>("#38bdf8");
  const [showGhostGuide, setShowGhostGuide] = useState<boolean>(true);
  const [activeStrokeStep, setActiveStrokeStep] = useState<number>(1);

  // Filter Categories
  const categoryFilters = [
    "ALL",
    "Nuclear Plant",
    "Thermal Plant",
    "Port",
    "Dam",
    "Steel & Industry",
    "Petroleum",
    "Airport",
    "Physical & Line",
    "National Park",
    "Capital & Hub",
  ];

  // Filtered Locations based on Category, Search Query, and Karnataka Spotlight
  const filteredLocations = useMemo(() => {
    return ALL_94_KSEAB_LOCATIONS.filter((loc) => {
      if (highlightKarnatakaOnly && !loc.state.toLowerCase().includes("karnataka")) {
        return false;
      }
      const matchesCategory = selectedCategory === "ALL" || loc.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        loc.name.toLowerCase().includes(q) ||
        loc.kannadaName.toLowerCase().includes(q) ||
        loc.state.toLowerCase().includes(q) ||
        loc.landmarkReference.toLowerCase().includes(q) ||
        loc.category.toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, searchQuery, highlightKarnatakaOnly]);

  const handleSelectPin = (pin: MapLocationPin) => {
    setSelectedPin(pin);
    sounds.playClick();
  };

  // Start a fresh 5-mark interactive map quiz
  const handleStartQuiz = () => {
    sounds.playClick();
    const shuffled = [...ALL_94_KSEAB_LOCATIONS].sort(() => 0.5 - Math.random()).slice(0, 5);
    setQuizQuestions(shuffled);
    setCurrentQuizIndex(0);
    setQuizScore(0);
    setQuizAnswered(false);
    setSelectedAnswerId(null);
    setIsQuizCompleted(false);
    setActiveMode("quiz");
  };

  const handleQuizAnswer = (pinId: string) => {
    if (quizAnswered) return;
    setSelectedAnswerId(pinId);
    setQuizAnswered(true);

    const currentTarget = quizQuestions[currentQuizIndex];
    if (pinId === currentTarget.id) {
      sounds.playSuccessChime();
      setQuizScore((prev) => prev + 1);
    } else {
      sounds.playClick();
    }
  };

  const handleNextQuizQuestion = () => {
    sounds.playClick();
    if (currentQuizIndex + 1 < quizQuestions.length) {
      setCurrentQuizIndex((prev) => prev + 1);
      setQuizAnswered(false);
      setSelectedAnswerId(null);
    } else {
      setIsQuizCompleted(true);
      sounds.playSuccessChime();
    }
  };

  // Canvas Drawing Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;

    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClearCanvas = () => {
    sounds.playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Get 4 random options for quiz: 1 correct + 3 distractors
  const currentQuizTarget = quizQuestions[currentQuizIndex];
  const quizOptions = useMemo(() => {
    if (!currentQuizTarget) return [];
    const distractors = ALL_94_KSEAB_LOCATIONS.filter((l) => l.id !== currentQuizTarget.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    return [currentQuizTarget, ...distractors].sort(() => 0.5 - Math.random());
  }, [currentQuizTarget]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-3 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-6xl w-full max-h-[96vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* ========================================================================= */}
        {/* TOP HEADER BAR                                                            */}
        {/* ========================================================================= */}
        <div className="p-3.5 sm:p-5 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-950/95 backdrop-blur z-30">
          <div className="flex items-center gap-2.5">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-400">
              <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                  Q.38 India Political Map Master Studio
                </h3>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Guaranteed 5/5 Marks
                </span>
                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                  {ALL_94_KSEAB_LOCATIONS.length} Syllabus Markers
                </span>
                <span className="text-[10px] font-semibold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
                  Karnataka KTBS Complete
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Outline Map (1M) + 4 Specific Location Pins (4M) • Social Science 85E
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/40 text-cyan-300 border border-cyan-800/50 text-xs font-semibold">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Boundary Outline Mode (No Fill)</span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3-MODE PRIMARY NAVIGATION TABS                                            */}
        {/* ========================================================================= */}
        <div className="px-3 sm:px-6 pt-3 pb-2 border-b border-slate-800/80 bg-slate-900/60 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => {
                setActiveMode("atlas");
                sounds.playClick();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeMode === "atlas"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-400/40"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>📍 Interactive Map Atlas ({filteredLocations.length})</span>
            </button>

            <button
              onClick={handleStartQuiz}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeMode === "quiz"
                  ? "bg-gradient-to-r from-amber-600 to-indigo-600 text-white shadow-md shadow-amber-600/30 border border-amber-400/40"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              <Target className="w-3.5 h-3.5 text-amber-300" />
              <span>🎯 5-Mark Pin-Drop Quiz (Test Mode)</span>
            </button>

            <button
              onClick={() => {
                setActiveMode("draw");
                sounds.playClick();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeMode === "draw"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-400/40"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              <PenTool className="w-3.5 h-3.5 text-emerald-400" />
              <span>✏️ 4-Stroke Quick Draw Canvas</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setShowStateLabels(!showStateLabels);
                sounds.playClick();
              }}
              className="text-[11px] font-semibold text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-1"
            >
              {showStateLabels ? (
                <>
                  <EyeOff className="w-3 h-3 text-cyan-400" /> Hide State Names
                </>
              ) : (
                <>
                  <Eye className="w-3 h-3 text-cyan-400" /> Show State Names
                </>
              )}
            </button>

            <button
              onClick={() => {
                setHighlightKarnatakaOnly(!highlightKarnatakaOnly);
                sounds.playClick();
              }}
              className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1 ${
                highlightKarnatakaOnly
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:text-amber-400"
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>⭐ Karnataka Only</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN BODY CONTENT                                                         */}
        {/* ========================================================================= */}
        <div className="p-3 sm:p-5 flex-1">
          {/* ========================================================================= */}
          {/* MODE 1: INTERACTIVE POLITICAL MAP ATLAS                                   */}
          {/* ========================================================================= */}
          {activeMode === "atlas" && (
            <div className="space-y-3.5">
              {/* Search Bar + Category Filter Row */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search all 94 board locations (e.g., Kaiga, Digboi, KRS, 82.5° E, Visakhapatnam)..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Counter Pill */}
                <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5 whitespace-nowrap self-end md:self-auto">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Showing <strong className="text-white">{filteredLocations.length}</strong> of 94 Markers
                </div>
              </div>

              {/* Category Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
                <span className="text-[11px] text-slate-500 font-semibold mr-1 flex items-center gap-1">
                  <Filter className="w-3 h-3 text-cyan-400" /> Filter:
                </span>
                {categoryFilters.map((cat) => {
                  const meta = cat === "ALL" ? null : CATEGORY_META[cat as MapLocationCategory];
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        sounds.playClick();
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all whitespace-nowrap flex items-center gap-1 ${
                        selectedCategory === cat
                          ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm"
                          : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
                      }`}
                    >
                      {meta && <span>{meta.icon}</span>}
                      <span>{cat === "ALL" ? "All (94)" : cat}</span>
                    </button>
                  );
                })}
              </div>

              {/* Map & Inspector Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Left (Col 7): Authentic School Political Wall Map SVG */}
                <div className="lg:col-span-7 bg-[#0b1329] border border-slate-800 rounded-3xl p-2 sm:p-4 relative min-h-[460px] flex items-center justify-center overflow-hidden shadow-inner">
                  <svg
                    viewBox="0 0 612 696"
                    className="w-full h-full max-h-[500px] select-none"
                    style={{ filter: "drop-shadow(0 0 16px rgba(15, 23, 42, 0.8))" }}
                  >
                    {/* Surrounding Ocean Background Gradient */}
                    <defs>
                      <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#081026" />
                        <stop offset="50%" stopColor="#0a1936" />
                        <stop offset="100%" stopColor="#06122c" />
                      </linearGradient>
                      <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {/* Surrounding Ocean Base */}
                    <rect width="612" height="696" fill="url(#oceanGrad)" />

                    {/* Neighbor Country Labels (Matching School Wall Map) */}
                    <g fill="#475569" fontSize="10" fontFamily="sans-serif" fontWeight="bold" opacity="0.75">
                      <text x="35" y="85">AFGHANISTAN</text>
                      <text x="50" y="185">PAKISTAN</text>
                      <text x="325" y="80">CHINA (TIBET)</text>
                      <text x="300" y="195">NEPAL</text>
                      <text x="430" y="215">BHUTAN</text>
                      <text x="445" y="315">BANGLADESH</text>
                      <text x="535" y="380">MYANMAR</text>
                      <text x="245" y="688">SRI LANKA</text>
                    </g>

                    {/* Water Body Primary Labels */}
                    <g fill="#1e3a5f" fontSize="13" fontFamily="sans-serif" fontWeight="900" letterSpacing="1.5">
                      <text x="45" y="520">ARABIAN SEA</text>
                      <text x="410" y="520">BAY OF BENGAL</text>
                      <text x="235" y="680">INDIAN OCEAN</text>
                    </g>

                    {/* Island Group Annotations */}
                    <g fill="#38bdf8" fontSize="8.5" fontFamily="sans-serif" fontWeight="bold">
                      <text x="20" y="640">LAKSHADWEEP (INDIA)</text>
                      <text x="470" y="555">ANDAMAN & NICOBAR</text>
                      <text x="505" y="568">ISLANDS (INDIA)</text>
                      <text x="495" y="694">INDIRA POINT (6°45' N)</text>
                    </g>

                    {/* Compass Rose (North Arrow in Top-Right) */}
                    <g transform="translate(535, 45)">
                      <circle cx="0" cy="0" r="18" fill="#0f172a" stroke="#334155" strokeWidth="1.2" />
                      <line x1="0" y1="-14" x2="0" y2="14" stroke="#94a3b8" strokeWidth="1.5" />
                      <line x1="-14" y1="0" x2="14" y2="0" stroke="#94a3b8" strokeWidth="1.5" />
                      <polygon points="0,-14 3,-3 0,0 -3,-3" fill="#ef4444" />
                      <polygon points="0,14 3,3 0,0 -3,3" fill="#94a3b8" />
                      <text x="-4" y="-17" fill="#ef4444" fontSize="9" fontWeight="bold">N</text>
                      <text x="17" y="3" fill="#94a3b8" fontSize="8" fontWeight="bold">E</text>
                      <text x="-25" y="3" fill="#94a3b8" fontSize="8" fontWeight="bold">W</text>
                      <text x="-3" y="24" fill="#94a3b8" fontSize="8" fontWeight="bold">S</text>
                    </g>

                    {/* 82°30' E Indian Standard Time (IST) Meridian */}
                    <line
                      x1="298"
                      y1="20"
                      x2="298"
                      y2="660"
                      stroke="#f59e0b"
                      strokeWidth="1.8"
                      strokeDasharray="6 4"
                      opacity="0.85"
                    />
                    <text
                      x="304"
                      y="42"
                      fill="#f59e0b"
                      fontSize="9.5"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      82°30' E Meridian
                    </text>

                    {/* 23°30' N Tropic of Cancer */}
                    <line
                      x1="20"
                      y1="328"
                      x2="590"
                      y2="328"
                      stroke="#ec4899"
                      strokeWidth="1.8"
                      strokeDasharray="6 4"
                      opacity="0.85"
                    />
                    <text
                      x="25"
                      y="322"
                      fill="#ec4899"
                      fontSize="9.5"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      23°30' N Tropic of Cancer
                    </text>

                    {/* All 36 Indian States & Union Territories (from @svg-maps/india) - Boundary Outlines Only (No Filled Colors) */}
                    {indiaMap.locations.map((loc: { id: string; name: string; path: string }) => {
                      const isKarnataka = loc.id === "ka";
                      const isHovered = hoveredStateId === loc.id;

                      let fill = "transparent";
                      let stroke = "#38bdf8"; // Clean cyan state boundary line
                      let strokeWidth = "1.2";

                      if (isKarnataka) {
                        stroke = "#f59e0b"; // Golden yellow boundary for Karnataka
                        strokeWidth = highlightKarnatakaOnly ? "3" : "2";
                        if (highlightKarnatakaOnly) {
                          fill = "rgba(245, 158, 11, 0.08)";
                        }
                      }

                      if (isHovered) {
                        stroke = "#ffffff";
                        strokeWidth = "2.2";
                        fill = "rgba(56, 189, 248, 0.08)";
                      }

                      return (
                        <path
                          key={loc.id}
                          id={loc.id}
                          d={loc.path}
                          fill={fill}
                          stroke={stroke}
                          strokeWidth={strokeWidth}
                          className="transition-colors duration-150 cursor-pointer"
                          onMouseEnter={() => setHoveredStateId(loc.id)}
                          onMouseLeave={() => setHoveredStateId(null)}
                        />
                      );
                    })}

                    {/* State Name Text Labels (Toggleable) */}
                    {showStateLabels &&
                      Object.entries(STATE_LABELS).map(([id, label]) => {
                        const isKarnataka = id === "ka";
                        return (
                          <g key={id} pointerEvents="none">
                            <text
                              x={label.x}
                              y={label.y}
                              textAnchor="middle"
                              fill="#94a3b8"
                              fontSize={isKarnataka ? "9" : "7"}
                              fontFamily="sans-serif"
                              fontWeight={isKarnataka ? "900" : "bold"}
                              stroke="#030712"
                              strokeWidth="2"
                              paintOrder="stroke"
                            >
                              {label.name}
                            </text>
                          </g>
                        );
                      })}

                    {/* 94 Interactive Location Pins */}
                    {filteredLocations.map((loc) => {
                      const isSelected = selectedPin.id === loc.id;
                      const catMeta = CATEGORY_META[loc.category];

                      return (
                        <g
                          key={loc.id}
                          onClick={() => handleSelectPin(loc)}
                          className="cursor-pointer group"
                        >
                          {/* Pulsing Outer Ring for Selected Pin */}
                          {isSelected && (
                            <circle
                              cx={loc.xSvg}
                              cy={loc.ySvg}
                              r={16}
                              fill="none"
                              stroke="#22d3ee"
                              strokeWidth="2.5"
                              className="animate-ping opacity-85"
                            />
                          )}

                          {/* Outer Pin Circle */}
                          <circle
                            cx={loc.xSvg}
                            cy={loc.ySvg}
                            r={isSelected ? 9 : 5}
                            fill={catMeta.color}
                            stroke="#020617"
                            strokeWidth="1.8"
                            className="transition-all duration-200 group-hover:scale-125"
                          />

                          {/* Inner Bright Center Dot */}
                          <circle
                            cx={loc.xSvg}
                            cy={loc.ySvg}
                            r={isSelected ? 3.5 : 1.8}
                            fill="#ffffff"
                          />

                          {/* Selected Pin Tooltip Tag */}
                          {isSelected && (
                            <g pointerEvents="none">
                              <rect
                                x={loc.xSvg > 400 ? loc.xSvg - 145 : loc.xSvg + 12}
                                y={loc.ySvg - 14}
                                width={138}
                                height={24}
                                rx={6}
                                fill="#020617"
                                stroke="#22d3ee"
                                strokeWidth="1.2"
                              />
                              <text
                                x={loc.xSvg > 400 ? loc.xSvg - 138 : loc.xSvg + 18}
                                y={loc.ySvg + 2}
                                fill="#ffffff"
                                fontSize="9"
                                fontFamily="sans-serif"
                                fontWeight="bold"
                              >
                                {loc.name.split(" ")[0]} ({loc.probabilityScore}%)
                              </text>
                            </g>
                          )}
                        </g>
                      );
                    })}
                  </svg>

                  {/* Bottom Map Floating Guide */}
                  <div className="absolute bottom-2.5 left-3 text-[10px] text-slate-300 font-mono bg-slate-950/85 px-3 py-1 rounded-xl border border-slate-800 backdrop-blur">
                    💡 Click any dot to view Chief Examiner Marking Rules
                  </div>
                </div>

                {/* Right (Col 5): Selected Location Chief Examiner Dossier */}
                <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
                  <div className="p-4 sm:p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3.5 shadow-xl">
                    {/* Category & Probability Header */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs uppercase font-extrabold px-3 py-1 rounded-xl border ${
                          CATEGORY_META[selectedPin.category].badge
                        }`}
                      >
                        {CATEGORY_META[selectedPin.category].icon} {selectedPin.category}
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30">
                        ★ {selectedPin.probabilityScore}% Board Probable
                      </span>
                    </div>

                    {/* Location Title & Kannada Script */}
                    <div>
                      <h4 className="text-lg sm:text-xl font-extrabold text-white leading-tight">
                        {selectedPin.name}
                      </h4>
                      <div className="text-sm font-semibold text-cyan-300 font-mono mt-0.5">
                        {selectedPin.kannadaName}
                      </div>
                      <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-rose-400" />
                        <span>{selectedPin.state}</span>
                      </div>
                    </div>

                    {/* Exact KTBS Reference */}
                    <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-300 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{selectedPin.ktbsReference}</span>
                    </div>

                    {/* Landmark Alignment Rule */}
                    <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                      <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Landmark Alignment:
                      </div>
                      <p className="text-xs text-slate-200 font-medium">
                        {selectedPin.landmarkReference}
                      </p>
                    </div>

                    {/* Chief Examiner Advice Alert (-1M Risk) */}
                    <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 space-y-1">
                      <div className="text-[11px] font-bold flex items-center gap-1.5 text-amber-400">
                        <AlertTriangle className="w-4 h-4" />
                        <span>CHIEF EXAMINER ADVICE (-1M RISK):</span>
                      </div>
                      <p className="text-xs text-amber-200/90 leading-relaxed font-normal">
                        {selectedPin.examinerTip}
                      </p>
                    </div>

                    {/* Test in Quiz Action CTA */}
                    <button
                      onClick={() => {
                        sounds.playClick();
                        setQuizQuestions([selectedPin, ...ALL_94_KSEAB_LOCATIONS.slice(1, 5)]);
                        setCurrentQuizIndex(0);
                        setQuizScore(0);
                        setQuizAnswered(false);
                        setSelectedAnswerId(null);
                        setIsQuizCompleted(false);
                        setActiveMode("quiz");
                      }}
                      className="w-full py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white transition-all shadow-md shadow-cyan-600/20 flex items-center justify-center gap-1.5"
                    >
                      <Target className="w-4 h-4 text-cyan-200" />
                      <span>Test "{selectedPin.name.split(" ")[0]}" in Quiz Drill →</span>
                    </button>
                  </div>

                  {/* Quick Browser List of Category Locations */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] text-slate-400 font-semibold px-1">
                      Explore Matching Locations ({filteredLocations.length}):
                    </div>
                    <div className="max-h-[160px] overflow-y-auto space-y-1 pr-1 scrollbar-thin">
                      {filteredLocations.map((loc) => (
                        <button
                          key={loc.id}
                          onClick={() => handleSelectPin(loc)}
                          className={`w-full px-3 py-1.5 rounded-xl text-left text-xs transition-all flex items-center justify-between border ${
                            selectedPin.id === loc.id
                              ? "bg-indigo-600/30 text-white border-indigo-500/60 font-bold"
                              : "bg-slate-900/60 text-slate-400 border-slate-800/80 hover:bg-slate-800 hover:text-slate-200"
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span
                              className="w-2 h-2 rounded-full flex-shrink-0"
                              style={{ backgroundColor: CATEGORY_META[loc.category].color }}
                            />
                            <span className="truncate">{loc.name}</span>
                          </div>
                          <span className="text-[10px] font-mono text-cyan-300 ml-2">
                            {loc.probabilityScore}%
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODE 2: 5-MARK PIN-DROP QUIZ (Q.38 BOARD DRILL)                           */}
          {/* ========================================================================= */}
          {activeMode === "quiz" && (
            <div className="max-w-3xl mx-auto space-y-5 py-2">
              {!isQuizCompleted && currentQuizTarget ? (
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-5 shadow-2xl">
                  {/* Quiz Header Tracker */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30">
                        Question {currentQuizIndex + 1} of {quizQuestions.length}
                      </span>
                      <span className="text-xs text-slate-400">Official Q.38 Drill</span>
                    </div>
                    <div className="text-xs font-mono font-bold text-emerald-400">
                      Score: {quizScore} / {currentQuizIndex + (quizAnswered ? 1 : 0)} Marks
                    </div>
                  </div>

                  {/* Question Prompt */}
                  <div className="text-center space-y-1.5 py-2">
                    <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">
                      Target Location Challenge:
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      Where is "{currentQuizTarget.name}"?
                    </h3>
                    <p className="text-sm text-cyan-300 font-mono">
                      {currentQuizTarget.kannadaName}
                    </p>
                  </div>

                  {/* 4 Interactive Answer Choices */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {quizOptions.map((option) => {
                      const isCorrect = option.id === currentQuizTarget.id;
                      const isSelected = selectedAnswerId === option.id;

                      let btnStyle =
                        "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900";

                      if (quizAnswered) {
                        if (isCorrect) {
                          btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                        } else if (isSelected) {
                          btnStyle = "bg-rose-500/20 border-rose-500 text-rose-300";
                        } else {
                          btnStyle = "bg-slate-950/40 border-slate-900 text-slate-600 opacity-50";
                        }
                      }

                      return (
                        <button
                          key={option.id}
                          disabled={quizAnswered}
                          onClick={() => handleQuizAnswer(option.id)}
                          className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 ${btnStyle}`}
                        >
                          <div>
                            <div className="text-[10px] uppercase font-bold text-slate-400">
                              {option.category}
                            </div>
                            <div className="text-sm font-bold text-white mt-0.5">
                              {option.name}
                            </div>
                            <div className="text-xs text-slate-400 mt-1">{option.state}</div>
                          </div>
                          {quizAnswered && isCorrect && (
                            <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" /> Correct Location
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Instant Examiner Feedback Rationale */}
                  {quizAnswered && (
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 animate-fadeIn">
                      <div className="flex items-center gap-2">
                        {selectedAnswerId === currentQuizTarget.id ? (
                          <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>+1.0 Mark! Correct Location Pinpoint.</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-rose-400 font-bold text-xs">
                            <AlertTriangle className="w-4 h-4" />
                            <span>-1.0 Mark Penalty. Incorrect Location.</span>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        <strong className="text-amber-300">Chief Examiner Tip:</strong>{" "}
                        {currentQuizTarget.examinerTip}
                      </p>
                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={handleNextQuizQuestion}
                          className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all flex items-center gap-1.5"
                        >
                          <span>Next Challenge</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Completed Quiz Scorecard */
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-2xl">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <Award className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">Q.38 Drill Completed!</h3>
                    <p className="text-sm text-slate-400 mt-1">
                      You scored <strong className="text-emerald-400">{quizScore} / 5 Marks</strong> on this board simulation drill.
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={handleStartQuiz}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all"
                    >
                      Take Another 5-Mark Drill
                    </button>
                    <button
                      onClick={() => setActiveMode("atlas")}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all"
                    >
                      Back to Map Atlas
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODE 3: 4-STROKE QUICK DRAW CANVAS (1-MARK OUTLINE TRAINER)               */}
          {/* ========================================================================= */}
          {activeMode === "draw" && (
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/60 flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-indigo-300">
                    Official 4-Stroke 45-Second Outline Technique:
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    KSEAB evaluators do not expect cartographic perfection. Practice the 4 landmarks below to secure 1.0 mark!
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowGhostGuide(!showGhostGuide)}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
                  >
                    Ghost Guide {showGhostGuide ? "Off" : "On"}
                  </button>
                  <button
                    onClick={handleClearCanvas}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3 text-rose-400" />
                    <span>Clear Pad</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Canvas Drawing Surface */}
                <div className="md:col-span-7 bg-slate-950 border border-slate-800 rounded-3xl p-3 relative flex items-center justify-center min-h-[440px]">
                  {/* Ghost Guide Outline Behind Canvas */}
                  {showGhostGuide && (
                    <svg
                      viewBox="0 0 612 696"
                      className="absolute inset-0 w-full h-full p-4 pointer-events-none opacity-25"
                    >
                      {indiaMap.locations.map((loc: { id: string; name: string; path: string }) => (
                        <path
                          key={loc.id}
                          d={loc.path}
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="1.2"
                          strokeDasharray="3 3"
                        />
                      ))}
                    </svg>
                  )}

                  {/* HTML5 Interactive Canvas */}
                  <canvas
                    ref={canvasRef}
                    width={520}
                    height={460}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="w-full h-full max-h-[440px] cursor-crosshair touch-none relative z-10"
                  />

                  <div className="absolute bottom-2 left-3 text-[10px] text-slate-500 font-mono">
                    ✏️ Draw with your finger or mouse over the ghost guide
                  </div>
                </div>

                {/* 4-Stroke Technique Guide */}
                <div className="md:col-span-5 space-y-2.5">
                  <div
                    onClick={() => setActiveStrokeStep(1)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      activeStrokeStep === 1
                        ? "bg-cyan-950/40 border-cyan-500/60"
                        : "bg-slate-900 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="text-xs font-bold text-cyan-300">
                      Stroke 1: Northern Crown (Kashmir & Ladakh)
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Inverted bell shape with two symmetric humps for Ladakh and Jammu.
                    </p>
                  </div>

                  <div
                    onClick={() => setActiveStrokeStep(2)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      activeStrokeStep === 2
                        ? "bg-amber-950/40 border-amber-500/60"
                        : "bg-slate-900 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="text-xs font-bold text-amber-300">
                      Stroke 2: Western Horns (Gujarat Kutch & Kathiawar)
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Two horizontal scoops forming the Rann of Kutch hook and Saurashtra nose.
                    </p>
                  </div>

                  <div
                    onClick={() => setActiveStrokeStep(3)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      activeStrokeStep === 3
                        ? "bg-emerald-950/40 border-emerald-500/60"
                        : "bg-slate-900 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="text-xs font-bold text-emerald-300">
                      Stroke 3: Peninsular 'V' (Konkan to Kanyakumari)
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Taper both western and eastern coasts into an inverted triangle pointing south.
                    </p>
                  </div>

                  <div
                    onClick={() => setActiveStrokeStep(4)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      activeStrokeStep === 4
                        ? "bg-rose-950/40 border-rose-500/60"
                        : "bg-slate-900 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="text-xs font-bold text-rose-300">
                      Stroke 4: Eastern Corridor (Siliguri & Assam Hook)
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Narrow chicken-neck expanding into the Brahmaputra hook for Assam and Northeast.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
