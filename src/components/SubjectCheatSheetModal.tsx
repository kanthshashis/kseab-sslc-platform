"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  X,
  BookOpen,
  Sparkles,
  Download,
  Printer,
  Search,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Star,
  Copy,
  Check,
  CheckSquare,
  Square,
  FileText,
  Filter,
  ChevronDown,
  ChevronUp,
  Award,
  ExternalLink,
  Flame,
  BookmarkCheck,
} from "lucide-react";
import { sounds } from "../lib/sound";
import { SubjectCode } from "../lib/types";

export interface ChapterCheatData {
  chapterNumber: number | string;
  chapterName: string;
  kannadaName?: string;
  category: string;
  formulasAndRules: {
    ruleName: string;
    formulaOrKey: string;
    trapWarning: string;
    isHighProbability?: boolean;
  }[];
}

export const COMPREHENSIVE_CHAPTER_CHEATS: Record<SubjectCode, ChapterCheatData[]> = {
  // 1. MATHEMATICS (81E) - 80M Theory
  "81E": [
    {
      chapterNumber: 1,
      chapterName: "Real Numbers",
      category: "Algebra",
      formulasAndRules: [
        {
          ruleName: "Fundamental Theorem of Arithmetic (FTA)",
          formulaOrKey: "• HCF(a, b) × LCM(a, b) = a × b\n• LCM(a, b) = [a × b] / HCF(a, b)\n• Every composite number can be uniquely expressed as product of primes.",
          trapWarning: "This formula holds ONLY for 2 numbers. For 3 numbers: HCF(a, b, c) × LCM(a, b, c) ≠ a × b × c!",
          isHighProbability: true,
        },
        {
          ruleName: "Proving Irrationality of √2, √3, √5 (3 Marks)",
          formulaOrKey: "1. Assume √5 = p/q is rational where p, q are co-prime integers (q ≠ 0, HCF=1).\n2. Squaring: 5 = p²/q² → 5q² = p² → 5 divides p² → 5 divides p.\n3. Let p = 5c → 5q² = (5c)² = 25c² → q² = 5c² → 5 divides q.\n4. Both p and q share common factor 5, contradicting co-prime assumption. Hence √5 is irrational.",
          trapWarning: "Must explicitly write: 'p and q are co-prime integers'. Omitting 'co-prime' loses 0.5M in KSEAB valuation.",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: 2,
      chapterName: "Polynomials",
      category: "Algebra",
      formulasAndRules: [
        {
          ruleName: "Zeroes & Coefficients of Quadratic Polynomial",
          formulaOrKey: "For p(x) = ax² + bx + c (a ≠ 0) with zeroes α and β:\n• Sum of Zeroes: α + β = -b / a = -(Coefficient of x) / (Coefficient of x²)\n• Product of Zeroes: αβ = c / a = (Constant term) / (Coefficient of x²)\n• Quadratic Polynomial with zeroes α, β: p(x) = k[x² - (α + β)x + αβ]",
          trapWarning: "Never miss the MINUS sign in sum of zeroes: -b/a. If b = -7, then α+β = -(-7)/a = +7/a.",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: 3,
      chapterName: "Pair of Linear Equations in Two Variables",
      category: "Algebra",
      formulasAndRules: [
        {
          ruleName: "Consistency & Graphical Lines Ratio Table (1M-2M)",
          formulaOrKey: "For lines a1*x + b1*y + c1 = 0 and a2*x + b2*y + c2 = 0:\n1. a1/a2 ≠ b1/b2 → Intersecting Lines | Unique Solution | Consistent\n2. a1/a2 = b1/b2 = c1/c2 → Coincident Lines | Infinitely Many Solutions | Consistent/Dependent\n3. a1/a2 = b1/b2 ≠ c1/c2 → Parallel Lines | No Solution | Inconsistent",
          trapWarning: "Constants c1 and c2 MUST both be on the same side of the equal sign before comparing ratios!",
          isHighProbability: true,
        },
        {
          ruleName: "Q.37 Graphical Method Checklist (4 Marks Guaranteed)",
          formulaOrKey: "• Minimum 3 integer coordinate pairs for each equation.\n• Top-Right Corner: Write Scale: X-axis: 1cm = 1 unit, Y-axis: 1cm = 1 unit.\n• Both line ends must have arrowheads (↔) and equations written alongside.\n• Circle & label intersection point: P(x, y). Conclude: 'x = ..., y = ...'",
          trapWarning: "Missing scale loses 0.5M. Not explicitly writing intersection coordinates loses 0.5M.",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: 4,
      chapterName: "Quadratic Equations",
      category: "Algebra",
      formulasAndRules: [
        {
          ruleName: "Quadratic Formula & Nature of Roots (Discriminant Δ)",
          formulaOrKey: "• Quadratic Formula: x = [-b ± √(b² - 4ac)] / (2a)\n• Discriminant: Δ = b² - 4ac\n  - Δ > 0 → Two distinct real roots\n  - Δ = 0 → Two equal real roots (each root = -b / 2a)\n  - Δ < 0 → No real roots",
          trapWarning: "When b is negative (e.g. b = -6), b² = (-6)² = +36 (never write -36), and -b = -(-6) = +6.",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: 5,
      chapterName: "Arithmetic Progressions (AP)",
      category: "Algebra",
      formulasAndRules: [
        {
          ruleName: "nth Term & Sum of First n Terms",
          formulaOrKey: "• nth term: an = a + (n - 1)d\n• Common difference: d = a2 - a1 = an - an-1\n• Sum of n terms: Sn = (n / 2)[2a + (n - 1)d]\n• When first term 'a' and last term 'l' are known: Sn = (n / 2)[a + l]\n• Fundamental link: an = Sn - Sn-1",
          trapWarning: "n (number of terms) MUST always be a positive natural number (1, 2, 3...). If n is negative or a fraction, write 'not possible'.",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: 6,
      chapterName: "Triangles (Theorems - 4M Guaranteed)",
      category: "Geometry",
      formulasAndRules: [
        {
          ruleName: "Basic Proportionality Theorem (BPT / Thales - Thm 6.1)",
          formulaOrKey: "Given: In ΔABC, line DE || BC intersects AB at D and AC at E.\nTo Prove: AD / DB = AE / EC\nConstruction: Join BE and CD. Draw EN ⊥ AB and DM ⊥ AC.\nProof: Area(ΔADE) / Area(ΔBDE) = (1/2 × AD × EN) / (1/2 × DB × EN) = AD / DB ... (1)\nArea(ΔADE) / Area(ΔDEC) = (1/2 × AE × DM) / (1/2 × EC × DM) = AE / EC ... (2)\nSince ΔBDE and ΔDEC lie on same base DE and between parallels DE || BC:\nArea(ΔBDE) = Area(ΔDEC) ... (3)\nFrom (1), (2), (3): AD / DB = AE / EC. Hence proved.",
          trapWarning: "KSEAB Marking Scheme: 1M Statement, 1M Given/To Prove/Construction/Figure, 2M Proof body.",
          isHighProbability: true,
        },
        {
          ruleName: "Pythagoras Theorem (Thm 6.8 - 4 Marks)",
          formulaOrKey: "Given: In right triangle ABC, ∠B = 90°.\nTo Prove: AC² = AB² + BC²\nConstruction: Draw BD ⊥ AC.\nProof: In ΔADB and ΔABC: ∠ADB = ∠ABC = 90°, ∠A is common. So ΔADB ~ ΔABC (AA criterion).\n→ AD / AB = AB / AC → AB² = AD × AC ... (1)\nSimilarly ΔBDC ~ ΔABC → CD / BC = BC / AC → BC² = CD × AC ... (2)\nAdding (1) & (2): AB² + BC² = AC(AD + CD) = AC × AC = AC².",
          trapWarning: "Draw neat right-angle marks at ∠ABC and at ∠ADB.",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: 7,
      chapterName: "Coordinate Geometry",
      category: "Geometry",
      formulasAndRules: [
        {
          ruleName: "Distance, Section & Midpoint Formulas",
          formulaOrKey: "• Distance: d = √[(x2 - x1)² + (y2 - y1)²]\n• Distance from Origin: d = √(x² + y²)\n• Section Formula (Ratio m1:m2): P(x, y) = [(m1*x2 + m2*x1)/(m1+m2), (m1*y2 + m2*y1)/(m1+m2)]\n• Midpoint: M = [(x1 + x2)/2, (y1 + y2)/2]\n• Area of Triangle: (1/2)|x1(y2 - y3) + x2(y3 - y1) + x3(y1 - y2)|",
          trapWarning: "Point on X-axis is always (x, 0). Point on Y-axis is always (0, y). If points are collinear, Area of Δ = 0.",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: 8,
      chapterName: "Introduction to Trigonometry",
      category: "Trigonometry",
      formulasAndRules: [
        {
          ruleName: "Trigonometric Table Values & Core Identities",
          formulaOrKey: "• sin: 0 (0°), 1/2 (30°), 1/√2 (45°), √3/2 (60°), 1 (90°)\n• cos: 1 (0°), √3/2 (30°), 1/√2 (45°), 1/2 (60°), 0 (90°)\n• tan: 0 (0°), 1/√3 (30°), 1 (45°), √3 (60°), Not Defined (90°)\n• 3 Fundamental Identities:\n  1. sin²θ + cos²θ = 1  →  sin²θ = 1 - cos²θ\n  2. 1 + tan²θ = sec²θ  →  sec²θ - tan²θ = 1\n  3. 1 + cot²θ = cosec²θ →  cosec²θ - cot²θ = 1",
          trapWarning: "tan 45° = 1 and cot 45° = 1. tan 90° and cosec 0° are NOT DEFINED.",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: 9,
      chapterName: "Some Applications of Trigonometry (Heights & Distances)",
      category: "Trigonometry",
      formulasAndRules: [
        {
          ruleName: "Elevation, Depression & Rapid Triangle Ratios",
          formulaOrKey: "• Angle of Elevation: Observer looks UP towards object (above horizontal line of sight).\n• Angle of Depression: Observer looks DOWN towards object (below horizontal). Angle of depression = Angle of elevation (alternate interior angles).\n• Rapid Ratios:\n  - In 45°-45°-90°: Opposite = Adjacent (Height = Distance) because tan 45° = 1\n  - In 30°-60°-90°: Opposite to 30° = h → Adjacent = h√3 (tan 30° = 1/√3)",
          trapWarning: "Always draw horizontal sight line from observer's eye before showing angle of depression!",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: 10,
      chapterName: "Circles (4M Tangent Theorems)",
      category: "Geometry",
      formulasAndRules: [
        {
          ruleName: "Theorem 10.2: Tangents from External Point are Equal (4M)",
          formulaOrKey: "Given: Circle C(O, r), external point P, tangents PQ and PR.\nTo Prove: PQ = PR\nConstruction: Join OP, OQ, and OR.\nProof: In right ΔOQP and right ΔORP:\n• ∠OQP = ∠ORP = 90° (Radius is perpendicular to tangent at point of contact)\n• OQ = OR (Radii of same circle)\n• OP = OP (Common hypotenuse)\nTherefore ΔOQP ≅ ΔORP (by RHS Congruence Criterion).\nHence PQ = PR (Corresponding Parts of Congruent Triangles - CPCT).",
          trapWarning: "Fastest 4 marks in KSEAB board exam! Remember to cite 'RHS' and 'CPCT'.",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: 12,
      chapterName: "Areas Related to Circles",
      category: "Mensuration",
      formulasAndRules: [
        {
          ruleName: "Sector, Segment & Arc Length Formulas",
          formulaOrKey: "• Area of Sector of angle θ: A = (θ / 360°) × πr²\n• Length of an Arc of angle θ: l = (θ / 360°) × 2πr\n• Area of Minor Segment: Area of Sector - Area of corresponding Δ\n• Area of Major Sector: πr² - Area of Minor Sector\n• Area of Major Segment: πr² - Area of Minor Segment",
          trapWarning: "Do not mix arc length (2πr) with sector area (πr²)! Check which one question demands.",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: 13,
      chapterName: "Surface Areas and Volumes",
      category: "Mensuration",
      formulasAndRules: [
        {
          ruleName: "Complete 3D Solid Mensuration Table",
          formulaOrKey: "• Cylinder: CSA = 2πrh | TSA = 2πr(r+h) | Vol = πr²h\n• Cone: Slant height l = √(r² + h²) | CSA = πrl | TSA = πr(r+l) | Vol = (1/3)πr²h\n• Sphere: TSA = 4πr² | Vol = (4/3)πr³\n• Hemisphere: CSA = 2πr² | TSA = 3πr² | Vol = (2/3)πr³\n• Frustum of Cone: Slant height l = √[h² + (r1 - r2)²]\n  CSA = π(r1 + r2)l | TSA = π(r1 + r2)l + πr1² + πr2² | Vol = (1/3)πh(r1² + r2² + r1*r2)",
          trapWarning: "Hemisphere TSA is 3πr² (includes circular base flat area πr²), not 2πr²!",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: 14,
      chapterName: "Statistics & Probability",
      category: "Statistics",
      formulasAndRules: [
        {
          ruleName: "Mean, Mode, Median & Empirical Relationship",
          formulaOrKey: "• Direct Mean: x̄ = Σ(fi*xi) / Σfi\n• Mode = l + [(f1 - f0) / (2f1 - f0 - f2)] × h (f1 = modal class freq, f0 = preceding, f2 = succeeding)\n• Median = l + [((n/2) - cf) / f] × h (cf = cumulative freq of class PRECEDING median class)\n• Empirical Formula: 3 Median = Mode + 2 Mean\n• Probability: P(E) = n(E) / n(S). 0 ≤ P(E) ≤ 1. P(E) + P(not E) = 1.",
          trapWarning: "In Median, 'cf' is ALWAYS taken from the row ABOVE the median class, not the median class itself!",
          isHighProbability: true,
        },
      ],
    },
  ],

  // 2. SCIENCE (83E) - 80M Theory (Physics 27M, Chemistry 25M, Biology 28M)
  "83E": [
    {
      chapterNumber: 1,
      chapterName: "Chemical Reactions and Equations",
      category: "Chemistry",
      formulasAndRules: [
        {
          ruleName: "4 Core Reaction Types & Distinct Visual Clues",
          formulaOrKey: "• Combination: CaO(s) + H2O(l) → Ca(OH)2(aq) + Heat (Slaked lime, exothermic)\n• Decomposition (Heat/Light/Electricity):\n  - 2FeSO4(s) → Fe2O3(s) + SO2(g) + SO3(g) (Green crystals turn reddish-brown)\n  - 2Pb(NO3)2(s) → 2PbO(s) + 4NO2(g) (Brown fumes!) + O2(g)\n  - 2AgCl(s) (Sunlight) → 2Ag(s) + Cl2(g) (White turns grey)\n• Displacement: Fe + CuSO4(aq) (blue) → FeSO4(aq) (pale green) + Cu(s)\n• Double Displacement: Na2SO4(aq) + BaCl2(aq) → BaSO4↓(white ppt) + 2NaCl(aq)\n• Redox: In CuO + H2 → Cu + H2O, CuO is REDUCED to Cu; H2 is OXIDIZED to H2O.",
          trapWarning: "Brown fumes = Nitrogen Dioxide (NO2). White precipitate = Barium Sulphate (BaSO4).",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: 2,
      chapterName: "Acids, Bases and Salts",
      category: "Chemistry",
      formulasAndRules: [
        {
          ruleName: "Commercial Salts & Chemical Formulas Table",
          formulaOrKey: "• Bleaching Powder: CaOCl2 (Action of Cl2 on dry slaked lime Ca(OH)2)\n• Baking Soda: NaHCO3 (Sodium hydrogen carbonate - mild non-corrosive base)\n• Washing Soda: Na2CO3·10H2O (Sodium carbonate decahydrate - permanent water hardness removal)\n• Plaster of Paris (POP): CaSO4·(1/2)H2O (Produced by heating Gypsum at 373 K / 100°C)\n• Gypsum: CaSO4·2H2O (Sets hard when POP is mixed with water)\n• pH Scale: 7 = Neutral, < 7 = Acidic, > 7 = Basic. Tooth decay starts below pH 5.5.",
          trapWarning: "POP has HALF water: CaSO4·(1/2)H2O. If heated above 373 K, it loses all water and becomes 'dead burnt plaster'.",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: 3,
      chapterName: "Metals and Non-metals",
      category: "Chemistry",
      formulasAndRules: [
        {
          ruleName: "Reactivity Order, Metallurgy & Amphoteric Oxides",
          formulaOrKey: "• Reactivity Mnemonic: Please Send Cats Monkeys And Zebras In Lead cages [H] Calling Me Silver Gold (K > Na > Ca > Mg > Al > Zn > Fe > Pb > [H] > Cu > Hg > Ag > Au)\n• Roasting: Heating Sulphide ores in excess air (2ZnS + 3O2 → 2ZnO + 2SO2)\n• Calcination: Heating Carbonate ores in limited air (ZnCO3 → ZnO + CO2)\n• Thermite Reaction: Fe2O3 + 2Al → 2Fe(l) + Al2O3 + Heat (Joining railway tracks)\n• Amphoteric Oxides: Al2O3 and ZnO react with BOTH acids and bases to yield salt and water.",
          trapWarning: "Roasting is for Sulphide ores (S). Calcination is for Carbonate ores (C). Do not swap them!",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: 4,
      chapterName: "Carbon and its Compounds",
      category: "Chemistry",
      formulasAndRules: [
        {
          ruleName: "Functional Groups, Saponification & Micelles",
          formulaOrKey: "• Functional Groups: Alcohol (-OH), Aldehyde (-CHO), Ketone (>C=O), Carboxylic Acid (-COOH)\n• Saponification: Alkaline hydrolysis of esters: CH3COOC2H5 + NaOH → CH3COONa (Soap) + C2H5OH\n• Esterification: CH3COOH + C2H5OH (Conc H2SO4) → CH3COOC2H5 (Sweet-smelling ester) + H2O\n• Soap Micelle Structure:\n  - Hydrophilic ionic head (COO- Na+) pointing OUT towards water\n  - Hydrophobic carbon tail pointing IN towards grease/oil droplet",
          trapWarning: "Soap cannot form lather in hard water because Ca²⁺ and Mg²⁺ ions form insoluble curds (scum). Synthetic detergents work in both soft and hard water.",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: 5,
      chapterName: "Life Processes",
      category: "Biology",
      formulasAndRules: [
        {
          ruleName: "Cellular Respiration & Human Excretory/Circulatory Systems",
          formulaOrKey: "• Glucose Breakdown Pathways:\n  1. In Yeast (Anaerobic): Ethanol + CO2 + 2 ATP\n  2. In Muscle cells (Lack of O2): Lactic acid + 2 ATP (causes muscle cramps!)\n  3. In Mitochondria (Aerobic): CO2 + H2O + 38 ATP\n• Double Circulation: Blood passes through heart twice in one complete cycle (Pulmonary + Systemic).\n• Nephron Filtration Units: Bowman's capsule, Glomerulus, Henle's loop, Collecting duct.\n• Human Excretory Checklist: Left/Right Kidney, Ureter, Urinary Bladder, Urethra.",
          trapWarning: "Left ventricle has much thicker muscular walls than the right ventricle because it must pump blood to distant body parts.",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: 6,
      chapterName: "Control and Coordination",
      category: "Biology",
      formulasAndRules: [
        {
          ruleName: "Human Brain Functional Division & 4 Plant Hormones",
          formulaOrKey: "• Forebrain (Cerebrum): Conscious thinking, memory, intelligence, sensory interpretation.\n• Hindbrain Components:\n  - Cerebellum: Body posture, equilibrium, balance, precision of voluntary acts (walking in a straight line)\n  - Medulla Oblongata: Involuntary actions (blood pressure, salivation, vomiting)\n  - Pons: Regulates respiration rhythm\n• 4 Key Plant Hormones:\n  - Auxin: Synthesized at shoot tips, promotes cell elongation towards light (Phototropism)\n  - Gibberellin: Promotes stem growth and fruit expansion\n  - Cytokinin: Promotes rapid cell division (present in fruits and seeds)\n  - Abscisic Acid (ABA): Stress hormone, causes wilting/falling of leaves, inhibits growth",
          trapWarning: "Cerebellum controls posture and balance. Cerebrum controls conscious thinking. Never mix the two!",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: 7,
      chapterName: "How do Organisms Reproduce?",
      category: "Biology",
      formulasAndRules: [
        {
          ruleName: "Flower Anatomy, Pollination & Reproductive Health",
          formulaOrKey: "• Flower Reproductive Organs:\n  - Male: Stamen (Anther produces pollen grains + Filament)\n  - Female: Carpel / Pistil (Stigma + Style + Ovary containing ovules)\n• Pollination: Self-pollination (same flower/plant) vs Cross-pollination (wind, water, insects)\n• Contraceptive Methods:\n  - Barrier: Condoms (also prevents STDs like AIDS, Syphilis, Gonorrhoea)\n  - Chemical: Oral pills (hormonal alteration)\n  - Surgical: Vasectomy (blocking vas deferens in males) vs Tubectomy (blocking fallopian tubes in females)",
          trapWarning: "Zygote forms inside the OVARY. Ovule develops into SEED; Ovary ripens into FRUIT.",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: 8,
      chapterName: "Heredity and Evolution",
      category: "Biology",
      formulasAndRules: [
        {
          ruleName: "Mendelian Crosses & Human Sex Determination",
          formulaOrKey: "• Monohybrid Cross (TT × tt):\n  - F1 generation: All Tall (Tt)\n  - F2 Phenotypic Ratio: 3 Tall : 1 Dwarf (3:1)\n  - F2 Genotypic Ratio: 1 TT : 2 Tt : 1 tt (1:2:1)\n• Dihybrid Cross (RRYY × rryy):\n  - F2 Phenotypic Ratio: 9 Round Yellow : 3 Round Green : 3 Wrinkled Yellow : 1 Wrinkled Green (9:3:3:1)\n• Sex Determination: Female has XX; Male has XY.\n  - Egg receives X from mother.\n  - Sperm carries either X (results in XX girl) or Y (results in XY boy).\n  - The father's sperm strictly determines the biological sex of the child.",
          trapWarning: "Write both Phenotypic (3:1) and Genotypic (1:2:1) ratios explicitly when asked about F2 monohybrid.",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: 9,
      chapterName: "Light - Reflection and Refraction",
      category: "Physics",
      formulasAndRules: [
        {
          ruleName: "Mirror & Lens Formulas, Sign Conventions & Ray Diagram Rules",
          formulaOrKey: "• Mirror Formula: 1/f = 1/v + 1/u | Magnification: m = -v/u = h'/h\n• Lens Formula: 1/f = 1/v - 1/u | Magnification: m = +v/u = h'/h\n• Sign Conventions (Cartesian):\n  - Object distance 'u' is ALWAYS NEGATIVE (-)\n  - Concave Mirror / Lens: Focal length 'f' is NEGATIVE (-)\n  - Convex Mirror / Lens: Focal length 'f' is POSITIVE (+)\n• Power of Lens: P = 1 / f(in meters). Unit: Dioptre (D). 1 D = 1 m⁻¹.",
          trapWarning: "Light ray directional arrowheads (→) are mandatory on every ray diagram. A ray drawn without an arrow loses 0.5M.",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: 10,
      chapterName: "Human Eye and the Colourful World",
      category: "Physics",
      formulasAndRules: [
        {
          ruleName: "Defects of Vision & Atmospheric Refraction Phenomena",
          formulaOrKey: "• Myopia (Short-sightedness): Distant objects blurred. Image forms BEFORE retina. Corrected with CONCAVE lens.\n• Hypermetropia (Far-sightedness): Nearby objects blurred. Image forms BEHIND retina. Corrected with CONVEX lens.\n• Dispersion: Splitting of white light into VIBGYOR through glass prism (Red deviates least, Violet deviates most).\n• Twinkling of Stars: Caused by atmospheric refraction due to continuously changing optical density of air layers.\n• Advanced Sunrise & Delayed Sunset: Sun appears 2 minutes earlier and 2 minutes later due to atmospheric refraction.",
          trapWarning: "Myopia = Concave lens. Hypermetropia = Convex lens. Red has longest wavelength and deviates least.",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: 11,
      chapterName: "Electricity",
      category: "Physics",
      formulasAndRules: [
        {
          ruleName: "Ohm's Law, Resistor Combinations & Joule's Heating",
          formulaOrKey: "• Ohm's Law: V = I × R (at constant temperature)\n• Series Combination: Rs = R1 + R2 + R3 (Current I remains constant throughout)\n• Parallel Combination: 1/Rp = 1/R1 + 1/R2 + 1/R3 (Potential difference V remains constant)\n• Electric Power: P = V × I = I²R = V² / R (Unit: Watt W)\n• Joule's Law of Heating: H = I²Rt (Unit: Joule J)\n• Commercial Unit of Energy: 1 kWh = 1 Unit = 3.6 × 10⁶ Joules (3.6 MJ)",
          trapWarning: "Box final numerical answers with correct SI units: [R = 24 Ω], [I = 0.5 A]. Missing units causes a 0.5M deduction.",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: 12,
      chapterName: "Magnetic Effects of Electric Current",
      category: "Physics",
      formulasAndRules: [
        {
          ruleName: "Fleming's Left-Hand Rule & Electric Motor Commutator",
          formulaOrKey: "• Fleming's Left-Hand Rule (Electric Motor):\n  - Forefinger = Magnetic Field (B: North to South)\n  - Middle finger = Current (I: +ve to -ve)\n  - Thumb = Direction of Force / Motion (F)\n• Electric Motor: Converts electrical energy into mechanical energy. Split ring commutator reverses current direction every half rotation.\n• Domestic Circuit Safety:\n  - Live wire (Red insulation - 220V)\n  - Neutral wire (Black insulation - 0V)\n  - Earth wire (Green insulation - connected to metal casing to conduct leakage safely to ground)",
          trapWarning: "Left-Hand Rule is for Motors (Force on conductor). Right-Hand Rule is for Induced Current.",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: 13,
      chapterName: "Our Environment",
      category: "Biology",
      formulasAndRules: [
        {
          ruleName: "10% Energy Transfer Law, Biomagnification & Ozone Layer",
          formulaOrKey: "• 10% Law (Lindeman): Only 10% of the energy is transferred from one trophic level to the next. 90% is lost as heat to environment.\n• Biological Magnification: Concentration of non-biodegradable harmful chemicals (like pesticides/DDT) increases progressively at each trophic level (maximum in top carnivore/humans).\n• Ozone Layer (O3): Formed in stratosphere by UV splitting O2 → O + O, followed by O + O2 → O3. Protects Earth from skin cancer and cataracts. Depleted by Chlorofluorocarbons (CFCs).",
          trapWarning: "Energy flow in an ecosystem is always UNIDIRECTIONAL (one-way), never cyclic.",
          isHighProbability: true,
        },
      ],
    },
  ],

  // 3. SOCIAL SCIENCE (85E) - 80M Theory (History, Pol Sci, Sociology, Geography, Economics)
  "85E": [
    {
      chapterNumber: "History 1-4",
      chapterName: "Advent of Europeans & Expansion of British Rule",
      category: "History",
      formulasAndRules: [
        {
          ruleName: "Subsidiary Alliance & Doctrine of Lapse",
          formulaOrKey: "• Subsidiary Alliance (1798): Introduced by Lord Wellesley. Nizam of Hyderabad was the first to sign. Conditions: Keep British military contingent, pay for maintenance, keep British resident, no war without British permission.\n• Doctrine of Lapse (1848): Introduced by Lord Dalhousie. If an Indian native ruler died without natural male heir, adopted children could not inherit the throne. Annexed states: Satara, Jhansi, Nagpur, Sambalpur, Jaitpur.\n• Battle of Plassey (1757): Robert Clive defeated Siraj-ud-Daula (Mir Jafar betrayed).\n• Battle of Buxar (1764): Hector Munro defeated combined forces; British gained Diwani rights over Bengal, Bihar, and Odisha.",
          trapWarning: "Subsidiary Alliance = Wellesley. Doctrine of Lapse = Dalhousie. Do not swap governors general!",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: "History 6-8",
      chapterName: "1857 First War of Independence & Freedom Movement",
      category: "History",
      formulasAndRules: [
        {
          ruleName: "1857 Revolt Causes & Freedom Movement Chronology",
          formulaOrKey: "• 1857 Immediate Cause: Introduction of Royal Enfield rifle cartridges greased with cow and pig fat. Mangal Pandey shot British officer at Barrackpore.\n• 4 Categories of 1857 Causes (for 4M): Political, Economic (ruin of handicrafts), Administrative, Military.\n• Freedom Movement Milestones:\n  - 1919: Jallianwala Bagh Massacre (General Dyer opened fire at Amritsar on Baisakhi day)\n  - 1920: Non-Cooperation Movement launched (Gandhiji returned Kaiser-i-Hind medal)\n  - 1922: Chauri Chaura incident (Gandhiji suspended movement after 22 policemen were burnt)\n  - 1930: Dandi Salt March (Sabarmati to Dandi, launched Civil Disobedience Movement)\n  - 1942: Quit India Movement ('Do or Die' slogan given by Gandhiji)",
          trapWarning: "When asked for 4M causes of 1857, write 2 clear points under each heading: Political, Economic, Administrative, Military.",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: "Pol Sci 1-3",
      chapterName: "Indian Constitution, Fundamental Rights & Foreign Policy",
      category: "Civics",
      formulasAndRules: [
        {
          ruleName: "Essential Constitutional Articles & Panchsheel",
          formulaOrKey: "• Article 17: Abolition of Untouchability (practicing it is a punishable offence)\n• Article 21A: Right to free and compulsory education for all children aged 6 to 14 years\n• Article 24: Prohibition of child labour in hazardous factories, mines, or workshops\n• Article 371(J): Special development status for Kalyana-Karnataka (Hyderabad-Karnataka)\n• Article 51: Directive Principle to promote international peace and security\n• Panchsheel Principles (1954): 5 principles of peaceful coexistence signed by Jawaharlal Nehru and Chinese Premier Zhou Enlai.",
          trapWarning: "Writing incorrect article numbers earns 0 marks. Commit 17, 21A, 24, 371J to memory.",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: "Sociology 1-2",
      chapterName: "Social Stratification & Labour",
      category: "Sociology",
      formulasAndRules: [
        {
          ruleName: "Untouchability Eradication & Organised vs Unorganised Labour",
          formulaOrKey: "• Untouchability Eradication Measures:\n  1. Article 17 abolished untouchability.\n  2. Protection of Civil Rights Act (1955) and SC/ST Prevention of Atrocities Act (1989).\n  3. Universal franchise (Article 326) and reservation in education and employment.\n• Organised Sector vs Unorganised Sector:\n  - Organised: Governed by legal rules, job security, fixed working hours, pension/PF benefits (e.g. Govt teachers, bank staff).\n  - Unorganised: No written contract, no job security, irregular wages, no social security (e.g. agricultural labourers, street vendors).",
          trapWarning: "Highlight specific legal acts: 'Protection of Civil Rights Act 1955' to secure full 3 marks.",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: "Geography 1-4",
      chapterName: "Indian Soils, Multipurpose River Projects & Agriculture",
      category: "Geography",
      formulasAndRules: [
        {
          ruleName: "Soil Types, Multipurpose Dams & Kharif vs Rabi Crops",
          formulaOrKey: "• Black Soil (Regur): Formed by basaltic rock weathering; rich in iron, lime; high moisture retention; best for cotton and sugarcane.\n• Red Soil: Formed by granite weathering; porous; ideal for ragi, groundnut, pulses.\n• Multipurpose Dams:\n  - Bhakra Nangal: Highest gravity dam on Sutlej River (Punjab/HP)\n  - Hirakud: Longest earthen dam on Mahanadi River (Odisha)\n  - Nagarjuna Sagar: Krishna River (Andhra Pradesh/Telangana)\n  - Tungabhadra: Tungabhadra River near Hosapete (Karnataka)\n• Cropping Seasons:\n  - Kharif: Sown in June-July (monsoon), harvested in Sep-Oct (Paddy, Maize, Cotton)\n  - Rabi: Sown in Oct-Nov (winter), harvested in Feb-Mar (Wheat, Gram, Mustard)",
          trapWarning: "Black soil = Regur soil = Cotton. Do not confuse Kharif (monsoon) with Rabi (winter).",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: "Geography Map",
      chapterName: "Question 38: 5-Mark Guaranteed India Map Master Reference",
      category: "Geography",
      formulasAndRules: [
        {
          ruleName: "Top 8 KSEAB Guaranteed Map Locations",
          formulaOrKey: "1. 82°30' E Longitude: Standard Meridian of India passing through Mirzapur (UP) and Kakinada (AP).\n2. 23°30' N Tropic of Cancer: Bisects India through 8 states (Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, WB, Tripura, Mizoram).\n3. Kaiga: Nuclear power station in Uttara Kannada district, Western Ghats, Karnataka.\n4. Digboi: Oldest operating oil refinery in Assam.\n5. Nhava Sheva (JNPT): Major modern container seaport near Mumbai, Maharashtra.\n6. Bhakra Nangal Dam: Sutlej River on Punjab-Himachal Pradesh border.\n7. New Mangalore Port: Gateway seaport of Karnataka.\n8. Tuticorin (V.O.C.): Major seaport on southeastern coast of Tamil Nadu.",
          trapWarning: "Draw sharp dots (•) using a pencil and draw neat horizontal ruler pointer lines with capital letters.",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: "Economics & Business",
      chapterName: "Banking, Consumer Protection & Public Finance",
      category: "Economics",
      formulasAndRules: [
        {
          ruleName: "RBI Functions, COPRA Consumer Rights & 3 Forums",
          formulaOrKey: "• RBI (Reserve Bank of India - est. April 1, 1935): Mother of banks, prints currency notes, regulates monetary policy and credit, banker to the government.\n• Consumer Protection Act (COPRA 1986): Rights include Right to Safety, Information, Choice, Representation, Redressal, and Education.\n• 3 Consumer Grievance Tiers:\n  1. District Forum: Claims up to 20 Lakhs\n  2. State Commission: Claims from 20 Lakhs to 1 Crore\n  3. National Commission: Claims above 1 Crore\n• Direct Tax (Income tax, Corporate tax) vs Indirect Tax (GST - Goods and Services Tax).",
          trapWarning: "Savings account has withdrawal restrictions. Current account has overdraft facility and pays no interest.",
          isHighProbability: true,
        },
      ],
    },
  ],

  // 4. FIRST LANGUAGE KANNADA (01K) - 100M Theory
  "01K": [
    {
      chapterNumber: "ಸಾಹಿತ್ಯ 1",
      chapterName: "ವಚನಕಾರರು & ಅಂಕಿತನಾಮಗಳ ಕೋಷ್ಟಕ (ಕಡ್ಡಾಯ ೧-೨ ಅಂಕಗಳು)",
      category: "Literature",
      formulasAndRules: [
        {
          ruleName: "೮ ಪ್ರಮುಖ ಕವಿಗಳು ಮತ್ತು ಅವರ ಅಂಕಿತನಾಮಗಳು",
          formulaOrKey: "೧. ಅಲ್ಲಮಪ್ರಭು → 'ಗುಹೇಶ್ವರ'\n೨. ಬಸವಣ್ಣ → 'ಕೂಡಲಸಂಗಮದೇವ'\n೩. ಅಕ್ಕಮಹಾದೇವಿ → 'ಚನ್ನಮಲ್ಲಿಕಾರ್ಜುನ'\n೪. ಜೇಡರ ದಾಸಿಮಯ್ಯ → 'ರಾಮನಾಥ'\n೫. ಸಿದ್ಧರಾಮ → 'ಕಪಿಲಸಿದ್ಧ ಮಲ್ಲಿಕಾರ್ಜುನ'\n೬. ಅಂಬಿಗರ ಚೌಡಯ್ಯ → 'ಅಂಬಿಗರ ಚೌಡಯ್ಯ'\n೭. ಪುರಂದರದಾಸರು → 'ಪುರಂದರವಿಠಲ'\n೮. ಕನಕದಾಸರು → 'ಕಾಗಿನೆಲೆಯಾದಿಕೇಶವ'",
          trapWarning: "ಸಂದರ್ಭ ಸಹಿತ ಸ್ವಾರಸ್ಯದ 'ಆಯ್ಕೆ' ಬರೆಯುವಾಗ ಕವಿ ಹೆಸರಿನ ಜೊತೆಗೆ ಅವರ ಅಂಕಿತನಾಮ ಬರೆಯದಿದ್ದರೆ ೦.೫ ಅಂಕ ಕಡಿತವಾಗುತ್ತದೆ!",
          isHighProbability: true,
        },
        {
          ruleName: "ಸಂದರ್ಭ ಸಹಿತ ಸ್ವಾರಸ್ಯದ ೩ ಹಂತಗಳ ವಿನ್ಯಾಸ (೩ ಅಂಕಗಳು)",
          formulaOrKey: "• ಆಯ್ಕೆ (೧ ಅಂಕ): ಈ ವಾಕ್ಯವನ್ನು ಹತ್ತನೇ ತರಗತಿಯ '...' ಎಂಬ ಪದ್ಯ/ಗದ್ಯ ಭಾಗದಿಂದ ಆರಿಸಲಾಗಿದ್ದು, ಇದನ್ನು '...' ಅವರು ರಚಿಸಿದ್ದಾರೆ.\n• ಸಂದರ್ಭ (೧ ಅಂಕ): ಯಾರು, ಯಾರಿಗೆ, ಯಾವ ಸನ್ನಿವೇಶದಲ್ಲಿ ಹೇಳಿದರು ಎಂಬ ಸ್ಪಷ್ಟ ವಿವರಣೆ.\n• ಸ್ವಾರಸ್ಯ (೧ ಅಂಕ): ವಾಕ್ಯದ ಒಳಾರ್ಥ, ಭಾಷಾ ಸೊಬಗು ಮತ್ತು ನೈತಿಕ ಸಂದೇಶವನ್ನು ವಿವರಿಸುವುದು.",
          trapWarning: "ಆಯ್ಕೆ, ಸಂದರ್ಭ, ಸ್ವಾರಸ್ಯ ಎಂಬ ಮೂರು ಪ್ರತ್ಯೇಕ ಉಪಶೀರ್ಷಿಕೆಗಳನ್ನು ಅಂಡರ್‌ಲೈನ್ ಮಾಡಿ ಬರೆಯುವುದು ಕಡ್ಡಾಯ.",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: "ವ್ಯಾಕರಣ 1",
      chapterName: "ಸಮಾಸಗಳು (೬ ಪ್ರಮುಖ ವಿಧಗಳು)",
      category: "Grammar",
      formulasAndRules: [
        {
          ruleName: "೬ ಪ್ರಮುಖ ಸಮಾಸಗಳ ಸೂತ್ರಗಳು ಹಾಗೂ ಉದಾಹರಣೆಗಳು",
          formulaOrKey: "• ಕರ್ಮಧಾರಯ: ವಿಶೇಷಣ + ವಿಶೇಷ್ಯ (ಹಿರಿದಾದ + ಮರ = ಹೆಮ್ಮರ, ಇನಿದಾದ + ನುಡಿ = ಇನ್ನುಡಿ)\n• ತತ್ಪುರುಷ: ಉತ್ತರಪದ ಪ್ರಧಾನ (ಅರಸನ + ಮನೆ = ಅರಮನೆ, ಕಣ್ಣಿನಿಂದ + ಕುರುಡ = ಕಣ್ಣುಗುರುಡ)\n• ದ್ವಿಗು: ಪೂರ್ವಪದ ಸಂಖ್ಯಾವಾಚಕ (ಮೂರು + ಕಣ್ಣ = ಮುಕ್ಕಣ್ಣ, ಏಳು + ಕಡಲು = ಏಳ್ಗಡಲು)\n• ದ್ವಂದ್ವ: ಎಲ್ಲ ಪದಗಳ ಅರ್ಥವೂ ಪ್ರಧಾನ (ಹಣ್ಣು + ಕಾಯಿ = ಹಣ್ಣುಕಾಯಿ, ಗಿಡ + ಮರ + ಬಳ್ಳಿ = ಗಿಡಮರಬಳ್ಳಿ)\n• ಬಹುವ್ರೀಹಿ: ಅನ್ಯಪದ ಪ್ರಧಾನ (ಮುಕ್ಕಣ್ಣ = ಶಿವ, ಚಕ್ರಪಾಣಿ = ವಿಷ್ಣು, ಫಾಲನೇತ್ರ = ಈಶ್ವರ)\n• ಕ್ರಿಯಾಸಮಾಸ: ಪೂರ್ವಪದ ನಾಮಪದ + ಉತ್ತರಪದ ಕ್ರಿಯಾಪದ (ಮೈ + ಮುರಿ = ಮೈಮುರಿ, ಕೈ + ಮುಗಿ = ಕೈಮುಗಿ)",
          trapWarning: "ಪೂರ್ವಪದ ಸಂಖ್ಯೆಯಾಗಿದ್ದರೂ ಅದು ಮೂರನೆಯ ವ್ಯಕ್ತಿಯನ್ನು ಸೂಚಿಸಿದರೆ ಬಹುವ್ರೀಹಿ ಸಮಾಸವಾಗುತ್ತದೆ (ಮುಕ್ಕಣ್ಣ = ಶಿವ).",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: "ವ್ಯಾಕರಣ 2",
      chapterName: "ಸಂಧಿಗಳು (ಕನ್ನಡ & ಸಂಸ್ಕೃತ ಸಂಧಿಗಳು)",
      category: "Grammar",
      formulasAndRules: [
        {
          ruleName: "ಕನ್ನಡ & ಸಂಸ್ಕೃತ ಸಂಧಿಗಳ ನಿಯಮಗಳು",
          formulaOrKey: "• ಲೋಪ ಸಂಧಿ (ಕನ್ನಡ ಸ್ವರಸಂಧಿ): ಸ್ವರದ ಮುಂದೆ ಸ್ವರ ಬಂದಾಗ ಅರ್ಥ ಕೆಡದಿದ್ದರೆ ಪೂರ್ವಸ್ವರ ಲೋಪ (ಮಾತು + ಇಲ್ಲ = ಮಾತಿಲ್ಲ, ಬೇರೆ + ಒಬ್ಬ = ಬೇರೊಬ್ಬ)\n• ಆಗಮ ಸಂಧಿ (ಕನ್ನಡ ಸ್ವರಸಂಧಿ): ಸ್ವರದ ಮುಂದೆ ಸ್ವರ ಬಂದಾಗ 'ಯ' ಅಥವಾ 'ವ' ಕಾರ ಹೊಸದಾಗಿ ಸೇರುವುದು (ಮನೆ + ಅನ್ನು = ಮನೆಯನ್ನು, ಗುರು + ಅನ್ನು = ಗುರುವನ್ನು)\n• ಆದೇಶ ಸಂಧಿ (ಕನ್ನಡ ವ್ಯಂಜನಸಂಧಿ): ಉತ್ತರಪದದ ಕ, ತ, ಪ ಗಳಿಗೆ ಕ್ರಮವಾಗಿ ಗ, ದ, ಬ ಗಳು ಆದೇಶ (ಮಳೆ + ಕಾಲ = ಮಳೆಗಾಲ, ಬೆಟ್ಟ + ತಾವರೆ = ಬೆಟ್ಟದಾವರೆ, ಕಣ್ + ಪನಿ = ಕಣ್ಬನಿ)\n• ಸವರ್ಣದೀರ್ಘ ಸಂಧಿ (ಸಂಸ್ಕೃತ): ಸವರ್ಣಸ್ವರಗಳು ಒಂದಾದಾಗ ದೀರ್ಘಸ್ವರ (ದೇವ + ಆಲಯ = ದೇವಾಲಯ)\n• ಗುಣ ಸಂಧಿ (ಸಂಸ್ಕೃತ): ಅ/ಆ ಕಾರಕ್ಕೆ ಇ/ಈ ಪರವಾದರೆ 'ಏ', ಉ/ಊ ಪರವಾದರೆ 'ಓ', ಋ ಪರವಾದರೆ 'ಅರ್' (ಮಹಾ + ಈಶ್ವರ = ಮಹೇಶ್ವರ, ಸೂರ್ಯ + ಉದಯ = ಸೂರ್ಯೋದಯ)",
          trapWarning: "ಆದೇಶ ಸಂಧಿಯು ವ್ಯಂಜನ ಸಂಧಿಯಾಗಿದೆ; ಲೋಪ ಮತ್ತು ಆಗಮ ಸಂಧಿಗಳು ಸ್ವರ ಸಂಧಿಗಳಾಗಿವೆ.",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: "ವ್ಯಾಕರಣ 3",
      chapterName: "ಛಂದಸ್ಸು (ಮಾತ್ರಾಗಣ & ಷಟ್ಪದಿಗಳು - ೩ ಅಂಕಗಳು)",
      category: "Grammar",
      formulasAndRules: [
        {
          ruleName: "ಲಘು-ಗುರು ನಿಯಮ ಹಾಗೂ ಭಾಮಿನಿ-ವಾರ್ಧಕ ಷಟ್ಪದಿ ಸೂತ್ರ",
          formulaOrKey: "• ಲಘು (∪ - ೧ ಮಾತ್ರೆ): ಹ್ರಸ್ವ ಸ್ವರಗಳು ಮತ್ತು ಹ್ರಸ್ವ ಸ್ವರ ಕೂಡಿದ ವ್ಯಂಜನಗಳು.\n• ಗುರು (— - ೨ ಮಾತ್ರೆಗಳು): ದೀರ್ಘ ಸ್ವರಗಳು, ಅನುಸ್ವಾರ (ಅಂ), ವಿಸರ್ಗ (ಅಃ), ಒತ್ತಕ್ಷರದ ಹಿಂದಿನ ಅಕ್ಷರ.\n• ಕಂದ ಪದ್ಯ: ೪ ಸಾಲುಗಳು; ೧ ಮತ್ತು ೩ನೇ ಸಾಲಿನಲ್ಲಿ ೧೨ ಮಾತ್ರೆಗಳು, ೨ ಮತ್ತು ೪ನೇ ಸಾಲಿನಲ್ಲಿ ೨೦ ಮಾತ್ರೆಗಳು.\n• ಭಾಮಿನಿ ಷಟ್ಪದಿ: ೬ ಸಾಲುಗಳು; ೧, ೨, ೪, ೫ ಸಾಲುಗಳಲ್ಲಿ ೩-೪-೩-೪ (೧೪ ಮಾತ್ರೆಗಳು), ೩ ಮತ್ತು ೬ನೇ ಸಾಲುಗಳಲ್ಲಿ ೩-೪-೩-೪-೩-೪ + ಗುರು (೨೧ ಮಾತ್ರೆಗಳು).\n• ವಾರ್ಧಕ ಷಟ್ಪದಿ: ೬ ಸಾಲುಗಳು; ಸಾಲಿಗೆ ೪-೪-೪-೪-೪-೪ (೬ ಚತುರ್ಮಾತ್ರೆಗಳು = ೨೬ ಮಾತ್ರೆಗಳು).",
          trapWarning: "ಒತ್ತಕ್ಷರದ ಹಿಂದಿನ ಅಕ್ಷರವು ಲಘುವಾಗಿದ್ದರೂ ಗುರುವಾಗುತ್ತದೆ! (ಉದಾ: 'ಭಕ್ತ' ದಲ್ಲಿ 'ಭ' ಗುರು).",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: "ವ್ಯಾಕರಣ 4",
      chapterName: "ಅಲಂಕಾರಗಳು (೩ ಅಂಕಗಳು)",
      category: "Grammar",
      formulasAndRules: [
        {
          ruleName: "ಉಪಮಾ, ರೂಪಕ ಮತ್ತು ದೃಷ್ಟಾಂತ ಅಲಂಕಾರ ಲಕ್ಷಣಗಳು",
          formulaOrKey: "• ಉಪಮಾ ಅಲಂಕಾರ: ಎರಡು ವಸ್ತುಗಳ ನಡುವಿನ ಸಾದೃಶ್ಯ ಅಥವಾ ಹೋಲಿಕೆ.\n  - ೪ ಅಂಗಗಳು: ಉಪಮೇಯ (ವರ್ಣಿಸುವ ವಸ್ತು), ಉಪಮಾನ (ಹೋಲಿಸುವ ವಸ್ತು), ಉಪಮಾವಾಚಕ (ಅಂತೆ, ವೋಲ್, ಹಾಗೆ), ಸಮಾನ ಧರ್ಮ.\n• ರೂಪಕ ಅಲಂಕಾರ: ಉಪಮೇಯ ಮತ್ತು ಉಪಮಾನಗಳಲ್ಲಿ ಯಾವುದೇ ಭೇದವಿಲ್ಲದೆ ಒಂದೇ ಎಂದು ವರ್ಣಿಸುವುದು (ಉದಾ: 'ಮುಖಕಮಲ').\n• ದೃಷ್ಟಾಂತ ಅಲಂಕಾರ: ಎರಡು ಬೇರೆ ಬೇರೆ ವಾಕ್ಯಗಳ ಅರ್ಥವು ಬಿಂಬ-ಪ್ರತಿಬಿಂಬ ಭಾವದಿಂದ ಹೊಂದುವಂತೆ ಹೇಳುವುದು.",
          trapWarning: "ಉಪಮಾ ಅಲಂಕಾರ ಬರೆಯುವಾಗ ನಾಲ್ಕೂ ಅಂಗಗಳನ್ನು ಪ್ರತ್ಯೇಕವಾಗಿ ಬರೆದು ಸಮನ್ವಯಗೊಳಿಸುವುದು ಕಡ್ಡಾಯ.",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: "ವ್ಯಾಕರಣ 5",
      chapterName: "ತತ್ಸಮ - ತದ್ಭವಗಳ ಪಟ್ಟಿ (೧ ಅಂಕ)",
      category: "Grammar",
      formulasAndRules: [
        {
          ruleName: "ಪರೀಕ್ಷೆಯ ಪ್ರಮುಖ ತತ್ಸಮ - ತದ್ಭವ ಜೋಡಿಗಳು",
          formulaOrKey: "• ಆಶ್ಚರ್ಯ → ಅಚ್ಚರ್ಯ\n• ಬ್ರಹ್ಮ → ಬೊಮ್ಮ\n• ಶೃಂಗಾರ → ಸಿಂಗಾರ\n• ಯುದ್ಧ → ಜುದ್ಧ\n• ಕಾರ್ಯ → ಕಜ್ಜ\n• ದೂತ → ದೂವ\n• ಮುಖ → ಮೊಗ\n• ರಾಜ → ರಾಯ\n• ವರ್ಷ → ವರುಷ\n• ಭಕ್ತಿ → ಬತ್ತಿ\n• ಲಕ್ಷ್ಮಿ → ಲಕ್ಕಿ\n• ವಿದ್ಯಾ → ಬಿಜ್ಜೆ",
          trapWarning: "ತತ್ಸಮವೆಂದರೆ ಸಂಸ್ಕೃತ ಪದ; ತದ್ಭವವೆಂದರೆ ಸಂಸ್ಕೃತದಿಂದ ಕನ್ನಡಕ್ಕೆ ಮಾರ್ಪಟ್ಟ ಪದ.",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: "ಲೇಖನ",
      chapterName: "ಪತ್ರ ಲೇಖನ, ಪ್ರಬಂಧ ಹಾಗೂ ಗಾದೆ ಮಾತು ವಿಸ್ತರಣೆ (೫ ಅಂಕಗಳು)",
      category: "Writing",
      formulasAndRules: [
        {
          ruleName: "ಅಧಿಕೃತ ಪತ್ರ ಲೇಖನ ಹಾಗೂ ಗಾದೆ ವಿಸ್ತರಣೆ ಚೌಕಟ್ಟು",
          formulaOrKey: "• ಅಧಿಕೃತ ಪತ್ರದ ೮ ಹಂತಗಳು:\n  ೧. ಇವರಿಂದ (ಮೇಲ್ಭಾಗದಲ್ಲಿ ಎಡಕ್ಕೆ)\n  ೨. ದಿನಾಂಕ & ಸ್ಥಳ (ಬಲಕ್ಕೆ)\n  ೩. ಇವರಿಗೆ (ವಿಳಾಸ)\n  ೪. ಮಾನ್ಯರೆ,\n  ೫. ವಿಷಯ: ... ಕುರಿತು.\n  ೬. ಪತ್ರದ ಒಡಲು (೩ ಪ್ಯಾರಾಗ್ರಾಫ್‌ಗಳು)\n  ೭. ವಂದನೆಗಳೊಂದಿಗೆ,\n  ೮. ತಮ್ಮ ನಂಬಿಕಸ್ಥ / ವಿಧೇಯ.\n• ಗಾದೆ ಮಾತು ವಿಸ್ತರಣೆ (೩ ಅಂಕಗಳು): ಪೀಠಿಕೆ ('ವೇದ ಸುಳ್ಳಾದರೂ ಗಾದೆ ಸುಳ್ಳಾಗದು') + ಗಾದೆಯ ಒಳಾರ್ಥ ವಿವರಣೆ + ದೈನಂದಿನ ಜೀವನಕ್ಕೆ ಸಮನ್ವಯ + ಉಪಸಂಹಾರ.",
          trapWarning: "ಅಧಿಕೃತ ಪತ್ರದಲ್ಲಿ 'ಮಾನ್ಯರೆ' ಸಂಬೋಧನೆ ಮತ್ತು ವೈಯಕ್ತಿಕ ಪತ್ರದಲ್ಲಿ 'ತೀರ್ಥರೂಪ ತಂದೆಯವರಿಗೆ' ಇರಬೇಕು.",
          isHighProbability: true,
        },
      ],
    },
  ],

  // 5. SECOND LANGUAGE ENGLISH (31E) - 80M Theory
  "31E": [
    {
      chapterNumber: "Poem 3",
      chapterName: "Quality of Mercy (William Shakespeare - 4M Quote from Memory)",
      category: "Literature",
      formulasAndRules: [
        {
          ruleName: "Exact 14-Line Verbatim Text with Punctuation",
          formulaOrKey: "The quality of mercy is not strain'd;\nIt droppeth as the gentle rain from heaven\nUpon the place beneath: it is twice blest;\nIt blesseth him that gives and him that takes:\n'Tis mightiest in the mightiest; it becomes\nThe throned monarch better than his crown;\nHis sceptre shows the force of temporal power,\nThe attribute to awe and majesty,\nWherein doth sit the dread and fear of kings;\nBut mercy is above this sceptred sway;\nIt is enthroned in the heart of kings,\nIt is an attribute to God himself;\nAnd earthly power doth then show likest God's\nWhen mercy seasons justice.",
          trapWarning: "Watch semicolons (;): strain'd;, blest;, kings;. Note apostrophes: strain'd, 'Tis, God's. Missing punctuation loses 0.5M.",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: "Grammar 1",
      chapterName: "Reported Speech, Passive Voice & Question Tags",
      category: "Grammar",
      formulasAndRules: [
        {
          ruleName: "Core Structural Transformation Rules",
          formulaOrKey: "• Reported Speech (Direct → Indirect):\n  - Present Simple → Past Simple (is → was, do → did)\n  - Present Continuous → Past Continuous (is reading → was reading)\n  - Past Simple → Past Perfect (went → had gone)\n  - Time words: today → that day, tomorrow → the next day, yesterday → the previous day\n• Active to Passive Voice: Object + appropriate form of 'be' (am/is/are/was/were/been/being) + Past Participle (V3) + by + Subject.\n• Question Tags:\n  - Positive statement → Negative tag (She is singing, isn't she?)\n  - Negative statement → Positive tag (They don't know, do they?)\n  - With 'I am' → aren't I?",
          trapWarning: "Question tags must ALWAYS use contracted forms: isn't he?, won't they?, didn't she? Never write 'is not he?'.",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: "Grammar 2",
      chapterName: "If Clause / Conditionals (Guaranteed 1M Board Question)",
      category: "Grammar",
      formulasAndRules: [
        {
          ruleName: "3 Conditional Types Formula Table",
          formulaOrKey: "• Type 1 (Possible condition): If + Present Simple, will + V1 (base verb)\n  Example: If it rains, we will stay at home.\n• Type 2 (Improbable/hypothetical): If + Past Simple, would + V1\n  Example: If I won the lottery, I would buy a car.\n• Type 3 (Impossible past condition - MOST FREQUENT IN KSEAB):\n  If + had + Past Participle (V3), would have + Past Participle (V3)\n  Example: If she had worked hard, she would have scored 98%.",
          trapWarning: "Board questions always test Type 3! Look for 'had + V3' and choose 'would have + V3'.",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: "Grammar 3",
      chapterName: "Degrees of Comparison (Positive, Comparative, Superlative)",
      category: "Grammar",
      formulasAndRules: [
        {
          ruleName: "Transformation Rules Across 3 Degrees",
          formulaOrKey: "• Superlative: Lead is the heaviest of all metals.\n• Comparative: Lead is heavier than any other metal.\n• Positive: No other metal is as heavy as lead.\n• With 'One of the...':\n  - Superlative: Bengaluru is one of the biggest cities in India.\n  - Comparative: Bengaluru is bigger than most other cities in India.\n  - Positive: Very few cities in India are as big as Bengaluru.",
          trapWarning: "'No other' is followed by singular noun ('No other metal'). 'Very few' is followed by plural noun ('Very few cities').",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: "Grammar 4",
      chapterName: "Collocations & Syllable Counting (1M Each)",
      category: "Vocabulary",
      formulasAndRules: [
        {
          ruleName: "High-Frequency Board Collocations & Syllables",
          formulaOrKey: "• Collocations (words that naturally co-occur):\n  - curly + hair | brisk + walk | heavy + rain | prompt + action\n  - commit + a crime | pay + attention | make + a difference | strong + coffee\n• Syllables (counting vowel sounds):\n  - Monosyllabic (1): school, eye, boy, tongue\n  - Disyllabic (2): fa-ther, a-gain, wa-ter, beau-ty\n  - Trisyllabic (3): ac-ci-dent, to-mor-row, beau-ti-ful\n  - Polysyllabic (4+): con-ver-sa-tion, ex-a-mi-na-tion",
          trapWarning: "Count vowel SOUNDS, not letters. 'Smile' has 5 letters but only 1 syllable (monosyllabic).",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: "Writing",
      chapterName: "Formal Letter Writing & Profile Writing (5M + 3M)",
      category: "Writing",
      formulasAndRules: [
        {
          ruleName: "Official 7-Block Letter Structure & Profile Writing",
          formulaOrKey: "• Formal Letter 7 Blocks:\n  1. From Address (Top-left, no commas at end)\n  2. Date (e.g. 27th March, 2027)\n  3. To Address (e.g. The Commissioner / Headmaster)\n  4. Salutation (Respected Sir / Madam,)\n  5. Subject: Requesting ...\n  6. Body (3 paragraphs: Purpose, Details, Concluding action)\n  7. Subscription: Yours faithfully / Yours obediently (NEVER an apostrophe!)\n• Profile Writing (3M): Convert given clues into 4-5 continuous grammatically correct sentences with appropriate cohesive linkers.",
          trapWarning: "Writing 'Your's faithfully' with an apostrophe loses 0.5M immediately! It is strictly 'Yours faithfully'.",
          isHighProbability: true,
        },
      ],
    },
  ],

  // 6. THIRD LANGUAGE HINDI (61H) - 80M Theory
  "61H": [
    {
      chapterNumber: "मुहावरे",
      chapterName: "बोर्ड परीक्षा के सर्वाधिक पूछे जाने वाले मुहावरे (२ अंक)",
      category: "Grammar",
      formulasAndRules: [
        {
          ruleName: "शीर्ष ८ मुहावरे और उनके सटीक वाक्य प्रयोग",
          formulaOrKey: "• आँखों का तारा होना → बहुत प्यारा होना (वाक्य: रोहन अपने माता-पिता की आँखों का तारा है।)\n• नौ दो ग्यारह होना → भाग जाना (वाक्य: पुलिस को देखते ही चोर नौ दो ग्यारह हो गए।)\n• दाँत खट्टे करना → पराजित करना বা हराना (वाक्य: भारतीय सैनिकों ने युद्ध में शत्रुओं के दाँत खट्टे कर दिए।)\n• पीठ थपथपाना → शाबाशी देना (वाक्य: परीक्षा में प्रथम आने पर शिक्षक ने मेरी पीठ थपथपाई।)\n• अक्ल पर पत्थर पड़ना → बुद्धि भ्रष्ट होना।\n• हाथ बँटाना → काम में सहायता करना।\n• फूला न समाना → बहुत प्रसन्न होना।\n• कान भरना → चुगली करना।",
          trapWarning: "वाक्य प्रयोग करते समय हमेशा मुहावरे का प्रयोग करें, मुहावरे के अर्थ का नहीं!",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: "व्याकरण 1",
      chapterName: "लिंग, वचन और कारक चिह्न (३ अंक)",
      category: "Grammar",
      formulasAndRules: [
        {
          ruleName: "वचन, लिंग परिवर्तन नियम एवं ८ कारक",
          formulaOrKey: "• आकारांत पुल्लिंग → एकारांत: लड़का → लड़के, घोड़ा → घोड़े, बच्चा → बच्चे\n• इकारांत स्त्रीलिंग → इयाँ (ह्रस्व मात्रा अनिवार्य): नदी → नदियाँ, लड़की → लड़कियाँ, रोटी → रोटियाँ, रानी → रानियाँ\n• ८ कारक और उनकी विभक्तियाँ:\n  १. कर्ता نے\n  २. कर्म کو\n  ३. करण से / के द्वारा (साधन)\n  ४. संप्रदान को / के लिए\n  ५. अपादान से (अलग होना)\n  ६. संबंध का / के / की\n  ७. अधिकरण में / पर\n  ८. संबोधन हे / अरे",
          trapWarning: "'लड़की' में दीर्घ 'ई' होती है, पर 'लड़कियाँ' में ह्रस्व 'इ' हो जाती है। दीर्घ मात्रा लगाने पर ೦.೫ अंक कटता है!",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: "व्याकरण 2",
      chapterName: "काल परिवर्तन (२ अंक Guaranteed)",
      category: "Grammar",
      formulasAndRules: [
        {
          ruleName: "वर्तमान, भूत एवं भविष्यत् काल परिवर्तन के नियम",
          formulaOrKey: "• सामान्य वर्तमान काल: ता है / ती है / ते हैं (मोहन पत्र लिखता है।)\n• सामान्य भूतकाल: आ / ई / ए या 'ने' का प्रयोग (मोहन ने पत्र लिखा।)\n• अपूर्ण भूतकाल: रहा था / रही थी / रहे थे (मोहन पत्र लिख रहा था।)\n• पूर्ण भूतकाल: चुका था / चुके थे (मोहन पत्र लिख चुका था।)\n• सामान्य भविष्यत् काल: गा / गी / गे (मोहन पत्र लिखेगा।)",
          trapWarning: "सकर्मक क्रिया में भूतकाल में कर्ता के साथ 'ने' प्रत्यय का प्रयोग करना न भूलें (जैसे: राम ने सेब खाया)।",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: "व्याकरण 3",
      chapterName: "विलोम शब्द एवं पर्यायवाची शब्द (२ अंक)",
      category: "Vocabulary",
      formulasAndRules: [
        {
          ruleName: "बोर्ड के सबसे महत्वपूर्ण विलोम ও पर्यायवाची",
          formulaOrKey: "• विलोम शब्द:\n  - प्रकाश ↔ अंधकार | अमृत ↔ विष | वरदान ↔ अभिशाप\n  - अनुकूल ↔ प्रतिकूल | आदि ↔ अंत | राजा ↔ रंक\n  - नवीन ↔ प्राचीन | सफल ↔ विफल | सुगंध ↔ दुर्गंध\n• पर्यायवाची शब्द:\n  - सूर्य: रवि, दिनकर, भास्कर\n  - जल: पानी, नीर, तोय\n  - कमल: पंकज, जलज, नीरज\n  - हवा: वायु, समीर, पवन",
          trapWarning: "तत्सम शब्द का विलोम तत्सम और तद्भव का विलोम तद्भव ही लिखें।",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: "पद्य कंठस्थ",
      chapterName: "कबीर दास जी के दोहे (४ अंक कंठस्थ)",
      category: "Literature",
      formulasAndRules: [
        {
          ruleName: "कबीर के प्रसिद्ध दोहे (अक्षरशः कंठस्थ)",
          formulaOrKey: "१. काल करे सो आज कर, आज करे सो अब।\n   पल में प्रलय होएगी, बहुरि करेगा कब॥\n\n२. ऐसी बानी बोलिए, मन का आपा खोइ।\n   औरन को सीतल करै, आपहु सीतल होइ॥\n\n३. बड़ा हुआ तो क्या हुआ, जैसे पेड़ खजूर।\n   पंथी को छाया नहीं, फल लागै अति दूर॥",
          trapWarning: "विराम चिह्न (।) और दोहरे विराम चिह्न (॥) का सटीक प्रयोग करें।",
          isHighProbability: true,
        },
      ],
    },
    {
      chapterNumber: "लेखन",
      chapterName: "पत्र लेखन ढांचा एवं सरल अनुवाद (४M + ५M)",
      category: "Writing",
      formulasAndRules: [
        {
          ruleName: "प्रधानाचार्य को प्रार्थना पत्र एवं अनुवाद नियम",
          formulaOrKey: "• औपचारिक पत्र के ६ मुख्य भाग:\n  १. सेवा में / प्रधानाचार्य जी\n  २. विद्यालय का नाम व पता एवं दिनांक\n  ३. विषय: तीन दिन के अवकाश हेतु प्रार्थना पत्र।\n  ४. महोदय / महोदया,\n  ५. पत्र का मुख्य भाग (कारण एवं प्रार्थना)\n  ೬. आपका आज्ञाकारी छात्र / छात्रा, नाम, कक्षा, अनुक्रमांक।\n• अनुवाद नियम (SOV): हिंदी में वाक्य का क्रम हमेशा कर्ता + कर्म + क्रिया (Subject + Object + Verb) होता है।",
          trapWarning: "लड़के 'आज्ञाकारी छात्र' और लड़कियाँ 'आज्ञाकारिणी छात्रा' लिखें।",
          isHighProbability: true,
        },
      ],
    },
  ],
};

interface SubjectCheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSubject?: SubjectCode;
}

export const SubjectCheatSheetModal: React.FC<SubjectCheatSheetModalProps> = ({
  isOpen,
  onClose,
  initialSubject = "81E",
}) => {
  const [activeSubject, setActiveSubject] = useState<SubjectCode>(initialSubject);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [completedRules, setCompletedRules] = useState<Record<string, boolean>>({});
  const [collapsedChapters, setCollapsedChapters] = useState<Record<string, boolean>>({});
  const [downloadingPdf, setDownloadingPdf] = useState<boolean>(false);

  // Initialize/Load memorized rules from sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = sessionStorage.getItem("kseab_memorized_rules");
        if (saved) {
          setCompletedRules(JSON.parse(saved));
        }
      } catch (e) {
        // ignore
      }
    }
  }, []);

  if (!isOpen) return null;

  const subjectTabs: { code: SubjectCode; label: string; icon: string; count: number; fullName: string }[] = [
    { code: "81E", label: "Maths (81E)", icon: "📐", count: COMPREHENSIVE_CHAPTER_CHEATS["81E"].length, fullName: "Mathematics (81E)" },
    { code: "83E", label: "Science (83E)", icon: "⚡", count: COMPREHENSIVE_CHAPTER_CHEATS["83E"].length, fullName: "Science (83E)" },
    { code: "85E", label: "Social (85E)", icon: "🌍", count: COMPREHENSIVE_CHAPTER_CHEATS["85E"].length, fullName: "Social Science (85E)" },
    { code: "01K", label: "Kannada (01K)", icon: "📜", count: COMPREHENSIVE_CHAPTER_CHEATS["01K"].length, fullName: "First Lang Kannada (01K)" },
    { code: "31E", label: "English (31E)", icon: "📖", count: COMPREHENSIVE_CHAPTER_CHEATS["31E"].length, fullName: "Second Lang English (31E)" },
    { code: "61H", label: "Hindi (61H)", icon: "🕉️", count: COMPREHENSIVE_CHAPTER_CHEATS["61H"].length, fullName: "Third Lang Hindi (61H)" },
  ];

  const chapters = COMPREHENSIVE_CHAPTER_CHEATS[activeSubject] || [];

  // Filter chapters based on category and search
  const filteredChapters = chapters
    .map((chap) => ({
      ...chap,
      formulasAndRules: chap.formulasAndRules.filter((r) => {
        if (selectedCategory !== "ALL" && chap.category !== selectedCategory) return false;
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          r.ruleName.toLowerCase().includes(q) ||
          r.formulaOrKey.toLowerCase().includes(q) ||
          r.trapWarning.toLowerCase().includes(q) ||
          chap.chapterName.toLowerCase().includes(q)
        );
      }),
    }))
    .filter((chap) => chap.formulasAndRules.length > 0);

  const categories = ["ALL", ...Array.from(new Set(chapters.map((c) => c.category)))];

  // Calculate mastery statistics for active subject
  const totalSubjectRules = chapters.reduce((acc, c) => acc + c.formulasAndRules.length, 0);
  const memorizedSubjectRules = chapters.reduce((acc, c, cIdx) => {
    return (
      acc +
      c.formulasAndRules.filter((_, rIdx) => {
        const id = `${activeSubject}-${c.chapterNumber}-${rIdx}`;
        return !!completedRules[id];
      }).length
    );
  }, 0);
  const masteryPercentage = totalSubjectRules > 0 ? Math.round((memorizedSubjectRules / totalSubjectRules) * 100) : 0;

  const handleCopy = (text: string, id: string) => {
    sounds.playClick();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleCheck = (id: string) => {
    const updated = {
      ...completedRules,
      [id]: !completedRules[id],
    };
    if (!completedRules[id]) {
      sounds.playSuccessChime();
    } else {
      sounds.playClick();
    }
    setCompletedRules(updated);
    try {
      sessionStorage.setItem("kseab_memorized_rules", JSON.stringify(updated));
    } catch (e) {
      // ignore
    }
  };

  const toggleChapterCollapse = (chapKey: string) => {
    sounds.playClick();
    setCollapsedChapters((prev) => ({
      ...prev,
      [chapKey]: !prev[chapKey],
    }));
  };

  const handleExpandAll = () => {
    sounds.playClick();
    setCollapsedChapters({});
  };

  const handleCollapseAll = () => {
    sounds.playClick();
    const allCollapsed: Record<string, boolean> = {};
    chapters.forEach((c) => {
      allCollapsed[`${activeSubject}-${c.chapterNumber}`] = true;
    });
    setCollapsedChapters(allCollapsed);
  };

  // Dedicated Attractive PDF Download Handler
  const handleDownloadPdf = () => {
    sounds.playClick();
    setDownloadingPdf(true);

    // Give visual feedback and then trigger print / PDF save
    setTimeout(() => {
      window.print();
      setDownloadingPdf(false);
    }, 400);
  };

  // Instant Offline Notes Export (.txt / .md)
  const handleDownloadOfflineNotes = () => {
    sounds.playSuccessChime();
    const currentSubjectInfo = subjectTabs.find((s) => s.code === activeSubject);
    let content = `========================================================================\n`;
    content += `KSEAB SSLC 2027 SCORE ACCELERATOR — REVISION CHEAT SHEET\n`;
    content += `Subject: ${currentSubjectInfo?.fullName || activeSubject}\n`;
    content += `Student: Tharika N (PIN: 2011) | Target: 613+/625 (98%+)\n`;
    content += `Official Grounding: KTBS & NCERT 10th Standard Syllabus\n`;
    content += `========================================================================\n\n`;

    chapters.forEach((chap) => {
      content += `------------------------------------------------------------------------\n`;
      content += `[${typeof chap.chapterNumber === "number" ? `Chapter ${chap.chapterNumber}` : chap.chapterNumber}] ${chap.chapterName} (${chap.category})\n`;
      content += `------------------------------------------------------------------------\n\n`;

      chap.formulasAndRules.forEach((rule, idx) => {
        content += `${idx + 1}. ${rule.ruleName}\n`;
        content += `   FORMULA / KEY ANSWER:\n   ${rule.formulaOrKey.replace(/\n/g, "\n   ")}\n\n`;
        if (rule.trapWarning) {
          content += `   [!] CHIEF EXAMINER TRAP (-0.5M Risk):\n   ${rule.trapWarning}\n\n`;
        }
      });
      content += `\n`;
    });

    content += `========================================================================\n`;
    content += `Generated on: ${new Date().toLocaleDateString("en-IN", { dateStyle: "full" })}\n`;
    content += `Keep revising daily to eliminate every 0.5M leak!\n`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `KSEAB_SSLC_${activeSubject}_CheatSheet_TharikaN.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const currentTabInfo = subjectTabs.find((s) => s.code === activeSubject);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn print:p-0 print:bg-white print:fixed print:inset-0 print:overflow-visible">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-5xl w-full max-h-[94vh] overflow-y-auto shadow-2xl flex flex-col print:border-none print:bg-white print:max-h-full print:shadow-none print:overflow-visible">
        
        {/* Printable Title Banner for physical paper / PDF export */}
        <div className="hidden print:block p-6 border-b-2 border-slate-900 text-black">
          <div className="flex items-center justify-between pb-3 border-b border-slate-300">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-slate-500">
                KSEAB MARCH–APRIL 2027 EXAM ACCELERATOR • KTBS / NCERT CURATED
              </span>
              <h1 className="text-2xl font-black text-black tracking-tight mt-0.5">
                {currentTabInfo?.fullName} — Rapid Revision Handbook
              </h1>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded border border-slate-300">
                Target: 613+/625 (98%)
              </span>
              <p className="text-[11px] text-slate-600 mt-1 font-mono">
                Student: <strong>Tharika N</strong> (PIN 2011)
              </p>
            </div>
          </div>
          <div className="mt-2 text-xs text-slate-700 flex items-center justify-between">
            <span>Formula Vault, High-Leak Chief Examiner Traps & Guaranteed Step Proofs</span>
            <span className="font-mono text-[10px]">
              Printed on {new Date().toLocaleDateString("en-IN", { dateStyle: "medium" })}
            </span>
          </div>
        </div>

        {/* Screen Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/95 backdrop-blur z-20 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  6-Subject Chapter Cheat Sheets
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                  <Star className="w-2.5 h-2.5 fill-cyan-300" />
                  All 6 Subjects Ready
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  KTBS Verified
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                High-probability formulas, theorems, grammar keys, map pointers & 0.5M Chief Examiner traps.
              </p>
            </div>
          </div>

          {/* Action Buttons: Download as PDF (Prominent) + Close */}
          <div className="flex items-center gap-2">
            {/* Highly Attractive Download PDF Button */}
            <button
              onClick={handleDownloadPdf}
              disabled={downloadingPdf}
              className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold transition-all flex items-center gap-2 text-xs shadow-lg shadow-emerald-500/25 ring-1 ring-emerald-400/50 hover:scale-[1.02] active:scale-[0.98]"
              title="Download print-ready PDF Handbook"
            >
              <Download className={`w-4 h-4 text-slate-950 ${downloadingPdf ? "animate-bounce" : ""}`} />
              <span className="font-extrabold tracking-tight">
                {downloadingPdf ? "Generating PDF..." : "Download as PDF"}
              </span>
            </button>

            {/* Offline Text Notes Button */}
            <button
              onClick={handleDownloadOfflineNotes}
              className="hidden md:flex px-3 py-2 sm:py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors items-center gap-1.5 text-xs font-semibold border border-slate-700"
              title="Save text revision file to device"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Offline Notes</span>
            </button>

            {/* Close Modal */}
            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 6-Subject Selector Grid */}
        <div className="p-3 sm:px-6 border-b border-slate-800/80 bg-slate-950/70 print:hidden">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {subjectTabs.map((tab) => {
              const isActive = activeSubject === tab.code;
              return (
                <button
                  key={tab.code}
                  onClick={() => {
                    setActiveSubject(tab.code);
                    setSelectedCategory("ALL");
                    sounds.playClick();
                  }}
                  className={`p-2.5 rounded-2xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 border relative overflow-hidden ${
                    isActive
                      ? "bg-gradient-to-b from-indigo-600 via-indigo-700 to-indigo-800 text-white shadow-lg shadow-indigo-600/40 border-indigo-400/60 scale-[1.02]"
                      : "bg-slate-900/90 text-slate-300 hover:bg-slate-800/80 border-slate-800"
                  }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span className="truncate w-full text-center leading-tight">
                    {tab.label.split(" ")[0]}
                  </span>
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                      isActive
                        ? "bg-cyan-400 text-black font-extrabold shadow-sm"
                        : "text-slate-400 bg-slate-950 border border-slate-800"
                    }`}
                  >
                    {tab.count} Units
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Subject Progress & Mastery Bar */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-950/90 border-b border-slate-800/60 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <BookmarkCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-white">Memorization Mastery:</span>
              <span className="font-mono font-bold text-cyan-400">
                {memorizedSubjectRules} of {totalSubjectRules} Formulas Memorized
              </span>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              {masteryPercentage}% Ready
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExpandAll}
              className="text-[11px] font-semibold text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800/60 hover:bg-slate-800 transition-colors"
            >
              Expand All
            </button>
            <button
              onClick={handleCollapseAll}
              className="text-[11px] font-semibold text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800/60 hover:bg-slate-800 transition-colors"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Search & Category Filter Sub-Bar */}
        <div className="px-4 sm:px-6 py-3 border-b border-slate-800/60 flex flex-wrap items-center justify-between gap-2.5 print:hidden">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={`Search ${currentTabInfo?.label} formulas, theorems, rules, or traps...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-white outline-none focus:border-cyan-400 font-sans transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
            <span className="text-[11px] text-slate-500 font-semibold mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Chapter Grid Content */}
        <div className="p-4 sm:p-6 space-y-4 flex-1 print:p-0 print:space-y-4">
          {filteredChapters.length > 0 ? (
            filteredChapters.map((chap) => {
              const chapKey = `${activeSubject}-${chap.chapterNumber}`;
              const isCollapsed = !!collapsedChapters[chapKey];

              return (
                <div
                  key={chapKey}
                  className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden transition-all print:border-slate-300 print:bg-white print:rounded-none print:shadow-none print:break-inside-avoid print:page-break-inside-avoid print:mb-4"
                >
                  {/* Chapter Accordion Banner */}
                  <div
                    onClick={() => toggleChapterCollapse(chapKey)}
                    className="p-3.5 sm:p-4 bg-slate-900/60 hover:bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between cursor-pointer transition-colors print:bg-slate-100 print:border-slate-300 print:p-2"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/40 print:text-black print:bg-slate-200 print:border-slate-400">
                        {typeof chap.chapterNumber === "number" ? `Ch ${chap.chapterNumber}` : chap.chapterNumber}
                      </span>
                      <h4 className="text-sm font-bold text-white print:text-black">
                        {chap.chapterName}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase font-bold text-slate-400 bg-slate-950 px-2.5 py-0.5 rounded-full border border-slate-800 print:text-slate-700 print:bg-white print:border-slate-300">
                        {chap.category}
                      </span>
                      <span className="text-slate-400 print:hidden">
                        {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                      </span>
                    </div>
                  </div>

                  {/* Rules & Formulas within this Chapter */}
                  {!isCollapsed && (
                    <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-3.5 print:grid-cols-2 print:p-2 print:gap-3">
                      {chap.formulasAndRules.map((rule, rIdx) => {
                        const ruleId = `${activeSubject}-${chap.chapterNumber}-${rIdx}`;
                        const isChecked = !!completedRules[ruleId];

                        return (
                          <div
                            key={rIdx}
                            className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all ${
                              isChecked
                                ? "bg-slate-950/50 border-emerald-500/40 ring-1 ring-emerald-500/20"
                                : "bg-slate-900/90 border-slate-800 hover:border-slate-700"
                            } print:bg-white print:border-slate-300 print:rounded print:p-2 print:break-inside-avoid`}
                          >
                            <div>
                              {/* Rule Title & Actions */}
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => toggleCheck(ruleId)}
                                    className="text-slate-400 hover:text-emerald-400 transition-colors print:hidden shrink-0 mt-0.5"
                                    title={isChecked ? "Mark unmemorized" : "Mark formula memorized"}
                                  >
                                    {isChecked ? (
                                      <CheckSquare className="w-4 h-4 text-emerald-400 fill-emerald-500/10" />
                                    ) : (
                                      <Square className="w-4 h-4 text-slate-500 hover:text-slate-300" />
                                    )}
                                  </button>
                                  <h5
                                    className={`text-xs font-bold leading-snug ${
                                      isChecked ? "text-emerald-300" : "text-cyan-300"
                                    } print:text-black`}
                                  >
                                    {rule.ruleName}
                                  </h5>
                                </div>

                                <div className="flex items-center gap-1 print:hidden">
                                  {rule.isHighProbability && (
                                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-0.5">
                                      <Flame className="w-2.5 h-2.5 fill-amber-300" />
                                      High Yield
                                    </span>
                                  )}
                                  <button
                                    onClick={() =>
                                      handleCopy(`${rule.ruleName}\n\n${rule.formulaOrKey}\n\nChief Examiner Trap: ${rule.trapWarning}`, ruleId)
                                    }
                                    className="p-1 rounded text-slate-500 hover:text-slate-200 hover:bg-slate-800 transition-colors shrink-0"
                                    title="Copy formula & trap key"
                                  >
                                    {copiedId === ruleId ? (
                                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    ) : (
                                      <Copy className="w-3.5 h-3.5" />
                                    )}
                                  </button>
                                </div>
                              </div>

                              {/* Formula / Key Box */}
                              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/90 text-xs font-mono text-slate-200 leading-relaxed whitespace-pre-line mb-2.5 select-text print:bg-slate-50 print:border-slate-300 print:text-black print:text-[11px] print:leading-snug">
                                {rule.formulaOrKey}
                              </div>
                            </div>

                            {/* Chief Examiner Trap */}
                            {rule.trapWarning && (
                              <div className="p-2.5 rounded-lg bg-amber-950/25 border border-amber-500/30 text-[11px] text-amber-200/95 leading-relaxed print:bg-amber-50 print:text-amber-950 print:border-amber-300 print:text-[10px]">
                                <strong className="text-amber-400 print:text-amber-900 font-bold flex items-center gap-1 mb-0.5">
                                  <AlertTriangle className="w-3 h-3 shrink-0 text-amber-400" />
                                  Chief Examiner Trap (-0.5M Risk):
                                </strong>
                                {rule.trapWarning}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-12 text-center text-slate-500 bg-slate-950/40 rounded-2xl border border-slate-800">
              <Search className="w-8 h-8 mx-auto mb-2 text-slate-600" />
              <p className="font-semibold text-slate-400">No matching formulas or rules found for "{searchQuery}".</p>
              <p className="text-xs text-slate-600 mt-1">Try another keyword or select a different category filter.</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:px-6 border-t border-slate-800/80 bg-slate-950/70 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px]">
              Showing {filteredChapters.reduce((acc, c) => acc + c.formulasAndRules.length, 0)} essential rules for {currentTabInfo?.label}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadPdf}
              className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 text-[11px]"
            >
              <Download className="w-3.5 h-3.5" />
              Direct PDF Save Available
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors text-[11px] font-semibold"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
