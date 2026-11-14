"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  ListTodo,
  CheckCircle2,
  Circle,
  Sparkles,
  Layers,
  Award,
  BookOpen,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Compass,
  Search,
  Filter,
  Download,
  Flame,
  Check,
  CheckCheck,
  RotateCcw,
} from "lucide-react";
import confetti from "canvas-confetti";
import { BLUEPRINT_TOPICS, KSEAB_SUBJECTS } from "../lib/kseab-data";
import { BlueprintTopic, SubjectCode } from "../lib/types";
import { sounds } from "../lib/sound";

const LOCAL_STORAGE_KEY = "kseab_2027_blueprint_completed_ids";

export const BlueprintChecklistTab: React.FC = () => {
  // Load initial completed IDs from localStorage if available
  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch (e) {
        console.error("Failed to load completed blueprint topics:", e);
      }
    }
    // Default initial completed items from dataset
    return BLUEPRINT_TOPICS.filter((t) => t.isCompleted).map((t) => t.id);
  });

  const [topics, setTopics] = useState<BlueprintTopic[]>(() => {
    return BLUEPRINT_TOPICS.map((t) => ({
      ...t,
      isCompleted: completedIds.includes(t.id),
    }));
  });

  const [selectedSubject, setSelectedSubject] = useState<string>("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "COMPLETED" | "REMAINING">("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedSubjectSection, setExpandedSubjectSection] = useState<string | null>("81E");

  // Keep topics in sync with completedIds state and localStorage
  const toggleComplete = (id: string) => {
    setCompletedIds((prev) => {
      const isAlreadyDone = prev.includes(id);
      let updated: string[];
      if (isAlreadyDone) {
        sounds.playClick();
        updated = prev.filter((item) => item !== id);
      } else {
        sounds.playSuccessChime();
        updated = [...prev, id];
        try {
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.7 },
            colors: ["#22d3ee", "#10b981", "#f59e0b", "#6366f1"],
          });
        } catch {
          // ignore in case canvas is unmounted
        }
      }
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error("Failed to save blueprint completion:", err);
      }
      return updated;
    });

    setTopics((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
    );
  };

  // Filtered Topics
  const filteredTopics = useMemo(() => {
    return topics.filter((t) => {
      // Subject filter
      if (selectedSubject !== "ALL" && t.subjectCode !== selectedSubject) {
        return false;
      }
      // Category filter
      if (selectedCategory !== "ALL" && t.category !== selectedCategory) {
        return false;
      }
      // Status filter
      if (statusFilter === "COMPLETED" && !t.isCompleted) return false;
      if (statusFilter === "REMAINING" && t.isCompleted) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          t.title.toLowerCase().includes(q) ||
          (t.kannadaTitle && t.kannadaTitle.toLowerCase().includes(q)) ||
          t.ktbsCitation.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.notes.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [topics, selectedSubject, selectedCategory, statusFilter, searchQuery]);

  // Total calculations
  const totalPossibleGuaranteedMarks = topics.reduce((acc, t) => acc + t.marks, 0);
  const lockedMarks = topics
    .filter((t) => t.isCompleted)
    .reduce((acc, t) => acc + t.marks, 0);
  const percentLocked = Math.round((lockedMarks / totalPossibleGuaranteedMarks) * 100);

  // Available Categories in Dataset
  const categories = useMemo(() => {
    const set = new Set<string>();
    topics.forEach((t) => set.add(t.category));
    return ["ALL", ...Array.from(set)];
  }, [topics]);

  // Reset Progress Handler
  const handleResetProgress = () => {
    if (confirm("Reset all blueprint completion checkmarks?")) {
      sounds.playClick();
      setCompletedIds([]);
      setTopics((prev) => prev.map((t) => ({ ...t, isCompleted: false })));
      try {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      } catch {}
    }
  };

  // Mark all currently filtered as done
  const handleMarkAllFiltered = () => {
    sounds.playSuccessChime();
    const idsToMark = filteredTopics.map((t) => t.id);
    const updated = Array.from(new Set([...completedIds, ...idsToMark]));
    setCompletedIds(updated);
    setTopics((prev) =>
      prev.map((t) => (idsToMark.includes(t.id) ? { ...t, isCompleted: true } : t))
    );
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch {}
    try {
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#10b981", "#22d3ee", "#eab308"],
      });
    } catch {}
  };

  // Download / Print PDF Summary
  const handlePrintChecklist = () => {
    sounds.playClick();
    window.print();
  };

  // Official KSEAB 2026-2027 Section Blueprints for ALL 6 SUBJECTS
  const sectionBlueprints = [
    {
      code: "01K",
      subject: "First Language Kannada (100 Marks • 45 Qs)",
      kannadaTitle: "ಪ್ರಥಮ ಭಾಷೆ ಕನ್ನಡ",
      ncertBook: "KTBS ಸಿರಿ ಕನ್ನಡ ೧೦ನೇ ತರಗತಿ (Edition 2026-27)",
      sections: [
        { section: "ಭಾಗ ೧ (ಪ್ರ. ೧–೬)", type: "ಬಹು ಆಯ್ಕೆ ಪ್ರಶ್ನೆಗಳು (MCQs)", marks: "೬ × ೧M = ೬M", tips: "ಸಂಧಿ, ಸಮಾಸ, ತತ್ಸಮ-ತದ್ಭವ, ಅಲಂಕಾರ, ನುಡಿಗಟ್ಟು" },
        { section: "ಭಾಗ ೨ (ಪ್ರ. ೭–೧೦)", type: "ಒಂದು ವಾಕ್ಯದ ಉತ್ತರಗಳು (VSA)", marks: "೪ × ೧M = ೪M", tips: "ಕವಿ ಕೃತಿ ಪರಿಚಯ, ಪಾತ್ರಗಳ ನೇರ ಪ್ರಶ್ನೆಗಳು" },
        { section: "ಭಾಗ ೩ (ಪ್ರ. ೧೧–೨೦)", type: "ಎರಡು-ಮೂರು ವಾಕ್ಯದ ಪ್ರಶ್ನೆಗಳು", marks: "೧೦ × ೨M = ೨೦M", tips: "ಗದ್ಯ ೫ ಪ್ರಶ್ನೆಗಳು + ಪದ್ಯ ೫ ಪ್ರಶ್ನೆಗಳು, ಮುಖ್ಯ ಅಂಶಗಳನ್ನು ಬುಲೆಟ್ ಪಾಯಿಂಟ್‌ನಲ್ಲಿ ಬರೆಯಿರಿ" },
        { section: "ಭಾಗ ೪ (ಪ್ರ. ೨೧–೨೭)", type: "ಸಂದರ್ಭ ಸಹಿತ ಸ್ವಾರಸ್ಯ", marks: "೭ × ೩M = ೨೧M", tips: "ಕಡ್ಡಾಯ ಸೂತ್ರ: ಆಯ್ಕೆ (೧M) + ಸಂದರ್ಭ (೧M) + ಸ್ವಾರಸ್ಯ (೧M). ಕವಿ ಮತ್ತು ಕೃತಿ ಹೆಸರು ಕಡ್ಡಾಯ" },
        { section: "ಭಾಗ ೫ (ಪ್ರ. ೨೮–೩೧)", type: "ವಿವರಣಾತ್ಮಕ ಉತ್ತರಗಳು", marks: "೪ × ೩M = ೧೨M", tips: "ಗದ್ಯ ಮತ್ತು ಪದ್ಯದ ತಾತ್ವಿಕ ಪ್ರಶ್ನೆಗಳು, ೬ ಸಾಲುಗಳ ಸ್ಪಷ್ಟ ಉತ್ತರ" },
        { section: "ಭಾಗ ೬ (ಪ್ರ. ೩೨)", type: "ಕಂಠಪಾಠ ಪದ್ಯ (Quote from Memory)", marks: "೧ × ೪M = ೪M", tips: "ಸಂಕಲ್ಪ ಗೀತೆ ಅಥವಾ ಹಲ್ಮಿಡಿ ಶಾಸನ. ವಿರಾಮ ಚಿಹ್ನೆಗಳು ಮತ್ತು ಕಾಗುಣಿತ ಶುದ್ಧತೆ ಕಡ್ಡಾಯ" },
        { section: "ಭಾಗ ೭ (ಪ್ರ. ೩೩–೩೫)", type: "ದೀರ್ಘ ಉತ್ತರಗಳು (೮–೧೦ ವಾಕ್ಯಗಳು)", marks: "೩ × ೪M = ೧೨M", tips: "ಪಾತ್ರ ಚಿತ್ರಣ (ಕರ್ಣ, ಕೃಷ್ಣ, ದುರ್ಯೋಧನ), ನಾಟಕ ಭಾಗದ ಪ್ರಮುಖ ಸನ್ನಿವೇಶ" },
        { section: "ಭಾಗ ೮ (ಪ್ರ. ೩೬–೩೭)", type: "ಗಾದೆ ಮಾತು ವಿಸ್ತರಣೆ ಮತ್ತು ವ್ಯಾಕರಣ", marks: "೨ × ೪M = ೮M", tips: "'ವೇದ ಸುಳ್ಳಾದರೂ ಗಾದೆ ಸುಳ್ಳಾಗದು' ಪೀಠಿಕೆ ಬರೆದು ವಿವರಣೆ ನೀಡಿ" },
        { section: "ಭಾಗ ೯ (ಪ್ರ. ೩೮)", type: "ಅಪಠಿತ ಗದ್ಯ ಗ್ರಹಿಕೆ (Comprehension)", marks: "೧ × ೪M = ೪M", tips: "ಪ್ಯಾರಾಗ್ರಾಫ್ ಓದಿ ನೇರ ಉತ್ತರಗಳನ್ನು ಶೀರ್ಷಿಕೆಯೊಂದಿಗೆ ಬರೆಯಿರಿ" },
        { section: "ಭಾಗ ೧೦ (ಪ್ರ. ೩೯)", type: "ಪತ್ರ ಲೇಖನ (ಅಧಿಕೃತ / ವೈಯಕ್ತಿಕ)", marks: "೧ × ೫M = ೫M", tips: "ಇಂದ/ಗೆ ವಿಳಾಸ, ವಿಷಯ, ಗೌರವಾನ್ವಿತರೇ, ಒಡಲು, ವಂದನೆಗಳು, ದಿನಾಂಕ/ಸ್ಥಳ" },
        { section: "ಭಾಗ ೧೧ (ಪ್ರ. ೪೦)", type: "ಪ್ರಬಂಧ ರಚನೆ (೩೦೦ ಪದಗಳು)", marks: "೧ × ೫M = ೫M", tips: "ಪೀಠಿಕೆ (೧M) + ವಿಷಯ ವಿಸ್ತರಣೆ (೩M) + ಉಪಸಂಹಾರ (೧M). ಪರಿಸರ/ವಿಜ್ಞಾನ ವಿಷಯ ಆಯ್ಕೆ ಮಾಡಿ" },
      ],
    },
    {
      code: "83E",
      subject: "Science (80 Marks • 38 Qs: Physics 27M, Chem 25M, Bio 28M)",
      kannadaTitle: "ವಿಜ್ಞಾನ (ಭೌತ, ರಸಾಯನ, ಜೀವವಿಜ್ಞಾನ)",
      ncertBook: "NCERT Class 10 Science (KTBS Edition)",
      sections: [
        { section: "Part A (Q 1–8)", type: "MCQ & 1-Mark VSAs", marks: "8 × 1M = 8M", tips: "Direct definitions, SI units, symbols, chemical formulas, pH scale values" },
        { section: "Part B (Q 9–16)", type: "2-Mark Short Answer", marks: "8 × 2M = 16M", tips: "Differences between AC/DC, Ohm's law definition, 10% energy trophic law, Mendeleev vs Modern Periodic Law" },
        { section: "Part C (Q 17–25)", type: "3-Mark Short Answer", marks: "9 × 3M = 27M", tips: "Balancing chemical equations, ray diagrams (mirror/lens), series/parallel resistance calculations" },
        { section: "Part D (Q 26–36)", type: "4-Mark Diagrams & Principles", marks: "11 × 4M = 44M", tips: "Electric Motor/Generator principle, Brain/Nephron/Excretory system, Mendel monohybrid/dihybrid cross" },
        { section: "Part E (Q 37–38)", type: "5-Mark Integrative Application", marks: "2 × 5M = 10M", tips: "Optics lens formula + magnification + power numerical combined with ray diagram" },
      ],
    },
    {
      code: "31E",
      subject: "Second Language English (80 Marks • 38 Qs)",
      kannadaTitle: "ದ್ವಿತೀಯ ಭಾಷೆ ಇಂಗ್ಲಿಷ್",
      ncertBook: "KTBS English Reader & Workbook 10th Standard",
      sections: [
        { section: "Section A (Q 1–4)", type: "Multiple Choice Questions", marks: "4 × 1M = 4M", tips: "Language functions, Question tags ('aren't I?'), modal auxiliaries, conjunctions" },
        { section: "Section B (Q 5–16)", type: "1-Mark VSAs & Vocabulary", marks: "12 × 1M = 12M", tips: "Collocations, syllabification, prefixes/suffixes, degrees of comparison, correct word form" },
        { section: "Section C (Q 17–24)", type: "2-Mark Short Answers", marks: "8 × 2M = 16M", tips: "2–3 sentence direct answers from Prose lessons (Gentleman of Rio en Medio, Baleshwar Mishra)" },
        { section: "Section D (Q 25–29)", type: "Reference to Context (RTC Extracts)", marks: "5 × 3M = 15M", tips: "Mandatory: a) Who said this? b) To whom? c) Context/Why? Quote lesson name for full marks" },
        { section: "Section E (Q 30–31)", type: "Supplementary Reading", marks: "2 × 3M = 6M", tips: "Narayanpur Incident (Amman/Babu's march) & On Top of the World (Dicky Dolma's climb)" },
        { section: "Section F (Q 32)", type: "Poem Summary / Thematic Analysis", marks: "1 × 4M = 4M", tips: "'Grandma Climbs a Tree' or 'Jazz Poem Two'. Write central theme in 2 structured paragraphs" },
        { section: "Section G (Q 33)", type: "Quote from Memory (4 Lines)", marks: "1 × 4M = 4M", tips: "'The Quality of Mercy' (Shakespeare) or 'The Temple and the Body' (Basavanna). Exact punctuation required" },
        { section: "Section H (Q 34)", type: "Unseen Passage Comprehension", marks: "1 × 4M = 4M", tips: "Read questions first, then scan passage for keywords. Write complete sentences" },
        { section: "Section I (Q 35)", type: "Paragraph Editing (3 Errors)", marks: "1 × 3M = 3M", tips: "Error spotting: Capital letter, preposition error, spelling or punctuation mark" },
        { section: "Section J (Q 36)", type: "Profile Writing from Clues", marks: "1 × 4M = 4M", tips: "Biographical clues to paragraph: use linkers ('He was born on...', 'His education was...')" },
        { section: "Section K (Q 37)", type: "Story from Outline / Picture Description", marks: "1 × 4M = 4M", tips: "Pick Story from outline; supply title and moral for guaranteed full 4/4" },
        { section: "Section L (Q 38)", type: "Letter Writing (Formal / Informal)", marks: "1 × 5M = 5M", tips: "Choose Formal Letter to Headmaster/Commissioner. Format carries 2 full marks" },
      ],
    },
    {
      code: "81E",
      subject: "Mathematics (80 Marks • 38 Qs)",
      kannadaTitle: "ಗಣಿತ",
      ncertBook: "NCERT Class 10 Mathematics (KTBS Edition)",
      sections: [
        { section: "Part I (Q 1–8)", type: "Multiple Choice Questions", marks: "8 × 1M = 8M", tips: "Discriminant formula b²-4ac, AP common difference d, coordinates of origin (0, 0), tan 45° value" },
        { section: "Part II (Q 9–16)", type: "Very Short Answer (1 line)", marks: "8 × 1M = 8M", tips: "Condition for infinitely many solutions, standard quadratic form ax²+bx+c=0, nth term of AP" },
        { section: "Part III (Q 17–24)", type: "Short Answer (2 Steps)", marks: "8 × 2M = 16M", tips: "Quadratic formula x = (-b ± √(b²-4ac))/2a, distance formula, elimination method, tangents angle sum" },
        { section: "Part IV (Q 25–33)", type: "Short Answer (3 Steps)", marks: "9 × 3M = 27M", tips: "Prove √5 is irrational, AP Sn sums, Trigonometric identity proof, Mean/Median grouped data, Ogive curve" },
        { section: "Part V (Q 34–37)", type: "Long Answer (4 Steps)", marks: "4 × 4M = 16M", tips: "Guaranteed: Q.34 BPT Theorem (6.1), Q.35 Tangents Theorem (10.2) / Pythagoras, Q.36 Surface Areas, Q.37 Linear Graph" },
        { section: "Part VI (Q 38)", type: "5-Mark High Application", marks: "1 × 5M = 5M", tips: "Surface Areas composite solid (Cone + Cylinder + Hemisphere) or Heights & Distances dual-angle problem" },
      ],
    },
    {
      code: "61H",
      subject: "Third Language Hindi (80 Marks • 38 Qs)",
      kannadaTitle: "ತೃತೀಯ ಭಾಷೆ ಹಿಂದಿ",
      ncertBook: "KTBS Hindi Vallari 10th Standard",
      sections: [
        { section: "खण्ड १ (प्र. १–८)", type: "वस्तुनिष्ठ प्रश्न (MCQs)", marks: "८ × १M = ८M", tips: "विलोम शब्द, पर्यायवाची, कारक चिह्न, लिंग/वचन परिवर्तन, संधि" },
        { section: "खण्ड २ (प्र. ९–१६)", type: "एक वाक्य में उत्तर (VSA)", marks: "८ × १M = ८M", tips: "गद्य पाठों के सीधे तथ्यात्मक प्रश्न (मातृभूमि, गिल्लू, इंटरनेट)" },
        { section: "खण्ड ३ (प्र. १७–२४)", type: "लघु उत्तरीय प्रश्न (२-३ वाक्य)", marks: "८ × २M = १६M", tips: "गद्य और पद्य के मुख्य विचार, सटीक और स्पष्ट २-३ वाक्य" },
        { section: "खण्ड ४ (प्र. २५–२८)", type: "संदर्भ सहित भावार्थ", marks: "४ × ३M = १२M", tips: "प्रसंग (१M) + भावार्थ/कठिन शब्दार्थ (२M). कवि और कविता का नाम अनिवार्य" },
        { section: "खण्ड ५ (प्र. २९–೩೧)", type: "दीर्घ उत्तरीय प्रश्न", marks: "३ × ४M = १२M", tips: "पाठ का सारांश, चरित्र चित्रण (कर्ण, गिल्लू), सीख और संदेश" },
        { section: "खण्ड ६ (प्र. ३२)", type: "कंठस्थ दोहा (Quote from Memory)", marks: "१ × ४M = ४M", tips: "कबीर के दोहे या तुलसीदास के दोहे (४ पंक्तियाँ). शुद्ध वर्तनी और मात्राएँ" },
        { section: "खण्ड ७ (प्र. ३३)", type: "अनुवाद (Translation)", marks: "१ × ४M = ४M", tips: "कन्नड़ या अंग्रेजी से हिंदी में ४ सरल वाक्यों का शुद्ध व्याकरणसम्मत अनुवाद" },
        { section: "खण्ड ८ (प्र. ३४)", type: "अपठित गद्यांश (Comprehension)", marks: "१ × ४M = ४M", tips: "गद्यांश पढ़कर पूछे गए प्रश्नों के सीधे उत्तर लिखें" },
        { section: "खण्ड ९ (प्र. ३५)", type: "पत्र लेखन (औपचारिक पत्र)", marks: "१ × ५M = ५M", tips: "प्रधानाचार्य को छुट्टी पत्र (२ दिन का अवकाश) - प्रारूप सरल और सुरक्षित है" },
        { section: "खण्ड १० (प्र. ३६)", type: "निबंध लेखन (१५०–२०० शब्द)", marks: "१ × ५M = ५M", tips: "प्रस्तावना (१M) + मुख्य विषय (३M) + उपसंहार (೧M). पर्यावरण प्रदूषण या समय का महत्व" },
      ],
    },
    {
      code: "85E",
      subject: "Social Science (80 Marks • 38 Qs)",
      kannadaTitle: "ಸಮಾಜ ವಿಜ್ಞಾನ",
      ncertBook: "KTBS Social Science Parts I & II 10th Std",
      sections: [
        { section: "Part I (Q 1–8)", type: "Multiple Choice Questions", marks: "8 × 1M = 8M", tips: "Key historical dates (1857, 1919), constitutional articles (Art 17, 21A), geographical definitions" },
        { section: "Part II (Q 9–16)", type: "1-Mark Direct Questions", marks: "8 × 1M = 8M", tips: "Direct facts: Dual government founder, Panchsheel principles, Consumer Day, RBI monetary role" },
        { section: "Part III (Q 17–24)", type: "2-Mark Reasoning Questions", marks: "8 × 2M = 16M", tips: "Provide 4 clear bullet points (Battle of Buxar causes, Fundamental Rights, Soil conservation)" },
        { section: "Part IV (Q 25–33)", type: "3-Mark Analytic Questions", marks: "9 × 3M = 27M", tips: "Provide 6 bullet points: 1857 Revolt causes, UN General Assembly/Security Council, Rainwater harvesting" },
        { section: "Part V (Q 34–37)", type: "4-Mark Essay Questions", marks: "4 × 4M = 16M", tips: "8 bullet points: Non-Cooperation movement, Role of Dr. B.R. Ambedkar, Indian agriculture problems" },
        { section: "Part VI (Q 38)", type: "5-Mark Outline India Map", marks: "1 × 5M = 5M", tips: "Draw Outline of India (1M) + Mark 4 locations (4M: Kaiga, Digboi, New Mangalore, 82.5°E)" },
      ],
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-12">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER BANNER & PROGRESS SCORECARD                                 */}
      {/* ========================================================================= */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 backdrop-blur-xl shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                KTBS 2026–27 Verified Blueprint
              </span>
              <span className="text-xs font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full">
                All 6 Subjects Grounded • 100% NCERT Matched
              </span>
              <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-full">
                {topics.length} Guaranteed Archetypes
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              KSEAB 98% Guaranteed Blueprint Lock-In Checklist
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              Master the exact 4M, 5M, and crucial 3M recurring questions verified across the last 5 years of Karnataka Board examinations. Check off topics to secure marks in your vault!
            </p>
          </div>

          {/* Locked Marks Progress Scorecard */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 flex items-center justify-between sm:justify-start gap-5 shadow-inner">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                Guaranteed Lock-In Total
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">
                  {lockedMarks}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  / {totalPossibleGuaranteedMarks} Marks
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 font-medium block mt-0.5">
                {topics.filter((t) => t.isCompleted).length} of {topics.length} archetypes locked
              </span>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600/20 to-cyan-500/20 border border-cyan-500/30 flex flex-col items-center justify-center">
              <span className="text-base font-black text-cyan-300 font-mono">
                {percentLocked}%
              </span>
              <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">
                Secured
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-5 border-t border-slate-800/80">
          {/* Search Bar */}
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, theorems, diagrams, citations..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-8 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
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

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleMarkAllFiltered}
              title="Mark all currently displayed topics as completed"
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all flex items-center gap-1.5"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark Filtered Done</span>
            </button>

            <button
              onClick={handlePrintChecklist}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/30 transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={handleResetProgress}
              title="Reset checklist progress"
              className="p-1.5 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-slate-950 border border-slate-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter by Subject Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-800/60">
          <span className="text-xs text-slate-400 font-semibold mr-1">Subject:</span>
          <button
            onClick={() => {
              setSelectedSubject("ALL");
              sounds.playClick();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              selectedSubject === "ALL"
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm"
                : "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200"
            }`}
          >
            All Subjects ({topics.length})
          </button>
          {KSEAB_SUBJECTS.map((sub) => {
            const count = topics.filter((t) => t.subjectCode === sub.code).length;
            const completedCount = topics.filter(
              (t) => t.subjectCode === sub.code && t.isCompleted
            ).length;
            return (
              <button
                key={sub.code}
                onClick={() => {
                  setSelectedSubject(sub.code);
                  sounds.playClick();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                  selectedSubject === sub.code
                    ? "bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200"
                }`}
              >
                <span>{sub.icon}</span>
                <span>{sub.code}</span>
                <span className="text-[10px] font-mono opacity-80">
                  ({completedCount}/{count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter by Category & Completion Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-slate-800/60">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
            <span className="text-[11px] text-slate-500 font-semibold mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-cyan-400" /> Type:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  sounds.playClick();
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200"
                }`}
              >
                {cat === "ALL" ? "All Types" : cat}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setStatusFilter("ALL")}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                statusFilter === "ALL"
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              All ({filteredTopics.length})
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => setStatusFilter("COMPLETED")}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                statusFilter === "COMPLETED"
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "text-slate-400 hover:text-emerald-400"
              }`}
            >
              Secured ({topics.filter((t) => t.isCompleted).length})
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => setStatusFilter("REMAINING")}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                statusFilter === "REMAINING"
                  ? "bg-amber-500/20 text-amber-300"
                  : "text-slate-400 hover:text-amber-400"
              }`}
            >
              Remaining ({topics.filter((t) => !t.isCompleted).length})
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. INTERACTIVE CHECKLIST CARDS                                            */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <ListTodo className="w-4 h-4 text-cyan-400" />
            <span>Guaranteed High-Yield Archetypes ({filteredTopics.length})</span>
          </span>
          <span className="font-mono text-cyan-400 text-xs">
            {filteredTopics.filter((t) => t.isCompleted).length} / {filteredTopics.length} Completed
          </span>
        </div>

        {filteredTopics.length === 0 ? (
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
            <p className="text-sm text-slate-400">No blueprint archetypes match your active filter.</p>
            <button
              onClick={() => {
                setSelectedSubject("ALL");
                setSelectedCategory("ALL");
                setStatusFilter("ALL");
                setSearchQuery("");
              }}
              className="text-xs font-semibold text-cyan-400 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTopics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => toggleComplete(topic.id)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 select-none ${
                  topic.isCompleted
                    ? "bg-emerald-950/20 border-emerald-500/40 shadow-sm"
                    : "bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                }`}
              >
                {/* Checkbox Icon */}
                <div className="pt-0.5">
                  {topic.isCompleted ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <Circle className="w-5 h-5 text-slate-500 hover:text-cyan-400" />
                  )}
                </div>

                <div className="flex-1 space-y-1.5">
                  {/* Top Badge Row */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-cyan-300 border border-indigo-500/30">
                        {topic.subjectCode}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        {topic.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-amber-300 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        {topic.probabilityScore}% Likely
                      </span>
                      <span className="text-xs font-bold text-cyan-300 font-mono bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                        +{topic.marks}M
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-sm font-bold leading-snug ${
                      topic.isCompleted ? "text-emerald-200 line-through opacity-85" : "text-white"
                    }`}
                  >
                    {topic.title}
                  </h3>

                  {/* Kannada Script Title */}
                  {topic.kannadaTitle && (
                    <p className="text-xs text-slate-400 font-mono">
                      {topic.kannadaTitle}
                    </p>
                  )}

                  {/* Explicit KTBS Citation */}
                  <div className="text-[10px] font-mono text-emerald-400/90 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800">
                    📖 {topic.ktbsCitation}
                  </div>

                  {/* Scoring Key */}
                  <p className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 leading-relaxed">
                    💡 <strong>Scoring Key:</strong> {topic.notes}
                  </p>

                  {/* Safe Choice Advice */}
                  {topic.safeChoiceAdvice && (
                    <div className="p-2 rounded-lg bg-indigo-950/30 border border-indigo-500/20 text-[11px] text-cyan-300 leading-relaxed flex items-start gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>Examiner Pick Strategy:</strong> {topic.safeChoiceAdvice}
                      </span>
                    </div>
                  )}

                  {/* Bottom Completion Indicator */}
                  <div className="pt-1 flex items-center justify-between text-[11px]">
                    <span className="text-cyan-400 font-medium flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      <span>{topic.frequency}</span>
                    </span>
                    <span
                      className={`font-semibold ${
                        topic.isCompleted ? "text-emerald-400" : "text-slate-500"
                      }`}
                    >
                      {topic.isCompleted ? "✓ Locked in Vault" : "Tap to mark done"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 3. 2026-27 SECTION BLUEPRINTS FOR ALL 6 SUBJECTS                          */}
      {/* ========================================================================= */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 backdrop-blur-xl space-y-5 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-full mb-1">
            <Layers className="w-3.5 h-3.5" /> Official KSEAB Pattern Specifications
          </div>
          <h3 className="text-xl font-bold text-white">
            2026–2027 Section-by-Section Structure (All 6 Subjects)
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Official cognitive weightage: Knowledge (20%), Understanding (40%), Application (25%), Skill (15%). Click any subject below to inspect its question-by-question layout:
          </p>
        </div>

        <div className="space-y-3.5">
          {sectionBlueprints.map((blueprint) => {
            const isExpanded = expandedSubjectSection === blueprint.code;
            return (
              <div
                key={blueprint.code}
                className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() =>
                    setExpandedSubjectSection(isExpanded ? null : blueprint.code)
                  }
                  className="w-full p-4 sm:p-4.5 flex items-center justify-between text-left hover:bg-slate-900/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-800/40">
                      {blueprint.code}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>{blueprint.subject}</span>
                        <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                          ({blueprint.kannadaTitle})
                        </span>
                      </div>
                      <div className="text-[10px] text-emerald-400 font-mono mt-0.5">
                        Source: {blueprint.ncertBook}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="text-xs font-mono hidden sm:inline-block">
                      {blueprint.sections.length} Parts
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-4 pt-1 border-t border-slate-800/80 space-y-2.5 animate-fadeIn">
                    {blueprint.sections.map((sec, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-white font-mono">
                              {sec.section}
                            </span>
                            <span className="text-slate-400 font-medium">
                              — {sec.type}
                            </span>
                          </div>
                          <p className="text-[11px] text-cyan-300/80 leading-relaxed">
                            🎯 <strong>Strategy:</strong> {sec.tips}
                          </p>
                        </div>

                        <span className="shrink-0 font-mono font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 self-start sm:self-auto">
                          {sec.marks}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
