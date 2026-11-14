import {
  StudentProfile,
  SubjectInfo,
  PresetSample,
  PyqQuestion,
  MistakeItem,
  BlueprintTopic,
} from "./types";

export const COHORT_STUDENTS: Record<string, StudentProfile> = {
  "2011": {
    pin: "2011",
    name: "Tharika N",
    role: "Rank 1 Aspirant • 98% Accelerator",
    avatar: "⭐",
    streakDays: 24,
    xp: 2840,
    level: 7,
    targetMarks: 618,
  },
};

export const KSEAB_SUBJECTS: SubjectInfo[] = [
  {
    code: "01K",
    name: "First Language Kannada",
    kannadaName: "ಪ್ರಥಮ ಭಾಷೆ ಕನ್ನಡ",
    theoryMax: 100,
    iaMax: 25,
    totalMax: 125,
    questionsCount: 45,
    examDate: "2027-03-22",
    examDay: "Monday",
    examTime: "10:00 AM – 1:15 PM (3h 15m)",
    icon: "📜",
    accentColor: "from-amber-500 to-rose-500",
    ncertTextbookTitle: "KTBS ಸಿರಿ ಕನ್ನಡ (Siri Kannada) 10th Standard Edition 2026-27",
    ktbsBookCode: "KTBS-10-K-01",
  },
  {
    code: "83E",
    name: "Science (English Medium)",
    kannadaName: "ವಿಜ್ಞಾನ",
    theoryMax: 80,
    iaMax: 20,
    totalMax: 100,
    questionsCount: 38,
    examDate: "2027-03-25",
    examDay: "Thursday",
    examTime: "10:00 AM – 1:15 PM (3h 15m)",
    icon: "⚡",
    accentColor: "from-emerald-400 to-cyan-500",
    subParts: ["Part A: Physics (27M)", "Part B: Chemistry (25M)", "Part C: Biology (28M)"],
    ncertTextbookTitle: "NCERT Class 10 Science (Reprinted by KTBS Karnataka 2026-27)",
    ktbsBookCode: "NCERT-KTBS-10-S-83",
  },
  {
    code: "31E",
    name: "Second Language English",
    kannadaName: "ದ್ವಿತೀಯ ಭಾಷೆ ಇಂಗ್ಲಿಷ್",
    theoryMax: 80,
    iaMax: 20,
    totalMax: 100,
    questionsCount: 38,
    examDate: "2027-03-27",
    examDay: "Saturday",
    examTime: "10:00 AM – 1:00 PM (2h 45m)",
    icon: "📖",
    accentColor: "from-blue-500 to-indigo-500",
    ncertTextbookTitle: "KTBS English Reader (Second Language) 10th Standard 2026-27",
    ktbsBookCode: "KTBS-10-E-31",
  },
  {
    code: "81E",
    name: "Mathematics",
    kannadaName: "ಗಣಿತ",
    theoryMax: 80,
    iaMax: 20,
    totalMax: 100,
    questionsCount: 38,
    examDate: "2027-03-30",
    examDay: "Tuesday",
    examTime: "10:00 AM – 1:15 PM (3h 15m)",
    icon: "📐",
    accentColor: "from-indigo-500 to-purple-600",
    ncertTextbookTitle: "NCERT Class 10 Mathematics (Reprinted by KTBS Karnataka 2026-27)",
    ktbsBookCode: "NCERT-KTBS-10-M-81",
  },
  {
    code: "61H",
    name: "Third Language Hindi",
    kannadaName: "ತೃತೀಯ ಭಾಷೆ ಹಿಂದಿ",
    theoryMax: 80,
    iaMax: 20,
    totalMax: 100,
    questionsCount: 38,
    examDate: "2027-04-02",
    examDay: "Friday",
    examTime: "10:00 AM – 1:00 PM (2h 45m)",
    icon: "🕉️",
    accentColor: "from-orange-500 to-amber-600",
    ncertTextbookTitle: "KTBS Hindi Vallari-3 (Third Language) 10th Standard 2026-27",
    ktbsBookCode: "KTBS-10-H-61",
  },
  {
    code: "85E",
    name: "Social Science",
    kannadaName: "ಸಮಾಜ ವಿಜ್ಞಾನ",
    theoryMax: 80,
    iaMax: 20,
    totalMax: 100,
    questionsCount: 38,
    examDate: "2027-04-05",
    examDay: "Monday",
    examTime: "10:00 AM – 1:15 PM (3h 15m)",
    icon: "🌍",
    accentColor: "from-teal-400 to-emerald-600",
    subParts: ["History & Pol Sci (40M)", "Geography (22M)", "Econ & Bus Studies (13M)", "Q.38 India Map (5M)"],
    ncertTextbookTitle: "KTBS Social Science Parts I & II 10th Standard 2026-27",
    ktbsBookCode: "KTBS-10-SS-85",
  },
];

export const INITIAL_MARKS = {
  "01K": { theory: 98, ia: 25 },
  "83E": { theory: 79, ia: 20 },
  "31E": { theory: 78, ia: 20 },
  "81E": { theory: 80, ia: 20 },
  "61H": { theory: 79, ia: 20 },
  "85E": { theory: 79, ia: 20 },
};

export const PRESET_SAMPLES: PresetSample[] = [
  {
    "id": "preset-kannada-sandarba",
    "title": "Kannada 01K: ಸಂದರ್ಭ ಸಹಿತ ಸ್ವಾರಸ್ಯ (3 Marks)",
    "subjectCode": "01K",
    "question": "“ಸ್ವರ್ಗಕ್ಕೆ ಕಿಚ್ಚು ಹಚ್ಚೆಂದ...” — ಈ ವಾಕ್ಯದ ಸಂದರ್ಭ ಸಹಿತ ಸ್ವಾರಸ್ಯವನ್ನು ಬರೆಯಿರಿ. (3 ಅಂಕಗಳು)",
    "studentAnswerText": "ಆಯ್ಕೆ: ಈ ಮೇಲಿನ ವಾಕ್ಯವನ್ನು ಅಲ್ಲಮಪ್ರಭುಗಳ ವಚನದಿಂದ ಆರಿಸಲಾಗಿದೆ.\nಸಂದರ್ಭ: ಶಿವಶರಣರ ಅನುಭವ ಮಂಟಪದಲ್ಲಿ ಚರ್ಚೆ ನಡೆಯುವಾಗ ಐಹಿಕ ಸುಖ-ಭೋಗಗಳಿಗಿಂತ ಶಿವನ ಭಕ್ತಿಯೇ ಶ್ರೇಷ್ಠ ಎಂದು ಹೇಳುವ ಸಂದರ್ಭದಲ್ಲಿ ಈ ಮಾತನ್ನು ಹೇಳಲಾಗಿದೆ.\nಸ್ವಾರಸ್ಯ: ಲೌಕಿಕವಾದ ಸ್ವರ್ಗದ ಸುಖವು ಕ್ಷಣಿಕ, ಆದರೆ ಭಕ್ತಿಯ ಆನಂದವು ಶಾಶ್ವತ ಎಂಬುದು ಇಲ್ಲಿಯ ಸ್ವಾರಸ್ಯ.",
    "maxMarks": 3,
    "ktbsSource": "KTBS 10th Kannada Siri Kannada, Padya 3: ವಚನಾಮೃತ (Allama Prabhu), Page 34",
    "probabilityScore": 97,
    "valuation": {
      "awardedMarks": 2.5,
      "maxMarks": 3,
      "percentage": 83.3,
      "gradeStatus": "Minor Leak",
      "stepBreakdown": [
        {
          "stepName": "ಆಯ್ಕೆ / ಆಕರ ಗ್ರಂಥ ಮತ್ತು ಕವಿ ಪರಿಚಯ (Source & Poet)",
          "maxMarks": 1,
          "awardedMarks": 0.5,
          "examinerNotes": "ವಚನಕಾರ ಅಲ್ಲಮಪ್ರಭು ಅವರ ಹೆಸರಿದೆ, ಆದರೆ ಅವರ ಅಂಕಿತನಾಮ 'ಗುಹೇಶ್ವರ' ಮತ್ತು ಪಠ್ಯಪುಸ್ತಕದ ನಿರ್ದಿಷ್ಟ ಪಾಠದ ಹೆಸರನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ನಮೂದಿಸಿಲ್ಲ.",
          "isLeak": true
        },
        {
          "stepName": "ಸಂದರ್ಭ ನಿರೂಪಣೆ (Context setting)",
          "maxMarks": 1,
          "awardedMarks": 1,
          "examinerNotes": "ಅನುಭವ ಮಂಟಪದ ಪ್ರಸಂಗ ಹಾಗೂ ಯಾರ ಯಾರ ನಡುವಿನ ಸಂವಾದ ಎಂಬುದು ಸರಿಯಾಗಿ ಮೂಡಿಬಂದಿದೆ.",
          "isLeak": false
        },
        {
          "stepName": "ಸ್ವಾರಸ್ಯ ಮತ್ತು ಭಾಷಾ ಪ್ರೌಢಿಮೆ (Significance & Expression)",
          "maxMarks": 1,
          "awardedMarks": 1,
          "examinerNotes": "ಲೌಕಿಕ ಸುಖವನ್ನು ಧಿಕ್ಕರಿಸಿ ಆಧ್ಯಾತ್ಮಿಕ ಉನ್ನತಿಯನ್ನು ಎತ್ತಿಹಿಡಿಯುವ ಸ್ವಾರಸ್ಯ ಸ್ಪಷ್ಟವಾಗಿದೆ.",
          "isLeak": false
        }
      ],
      "halfMarkLeaks": [
        "ಕವಿ ಪರಿಚಯದಲ್ಲಿ ಅಂಕಿತನಾಮ ('ಗುಹೇಶ್ವರ') ಅಥವಾ ಪಠ್ಯಪುಸ್ತಕದ ಸಂಕಲನದ ಉಲ್ಲೇಖ ಬಿಟ್ಟುಹೋಗಿದೆ (-0.5 Marks)."
      ],
      "examinerAdvice": "KSEAB First Language Kannada valuation key strictly allots 1.0 full mark for complete citation (ಕೃತಿ, ಕವಿ, ಅಂಕಿತನಾಮ). Always mention the Vachanakaara's Ankita Naama in brackets for 100% full-mark security.",
      "modelAnswer": "ಆಯ್ಕೆ: ಈ ವಾಕ್ಯವನ್ನು ಹತ್ತನೇ ತರಗತಿಯ ಪ್ರಥಮ ಭಾಷೆ ಕನ್ನಡ ಪಠ್ಯಪುಸ್ತಕದ 'ವಚನಾಮೃತ' ಭಾಗದಿಂದ ಆರಿಸಲಾಗಿದ್ದು, ಇದನ್ನು ೧೨ನೆಯ ಶತಮಾನದ ಶ್ರೇಷ್ಠ ವಚನಕಾರರಾದ ಶ್ರೀ ಅಲ್ಲಮಪ್ರಭು (ಅಂಕಿತನಾಮ: 'ಗುಹೇಶ್ವರ') ಅವರು ರಚಿಸಿದ್ದಾರೆ.\nಸಂದರ್ಭ: ಐಹಿಕ ಸ್ವರ್ಗ ಸುಖಕ್ಕಿಂತ ಶರಣರ ಕಾಯಕ-ದಾಸೋಹ ಹಾಗೂ ಶಿವಾನುಭವವೇ ಅತ್ಯುನ್ನತವೆಂದು ಪ್ರತಿಪಾದಿಸುವ ಸಂದರ್ಭದಲ್ಲಿ ಅಲ್ಲಮಪ್ರಭುಗಳು ಈ ಮಾರ್ಮಿಕ ನುಡಿಯನ್ನು ಆಡಿದ್ದಾರೆ.\nಸ್ವಾರಸ್ಯ: ಲೌಕಿಕ ಸ್ವರ್ಗದ ಭೋಗ ಲಾಲಸೆಯನ್ನು ಕಿಚ್ಚಿನಿಂದ ಸುಟ್ಟು, ನಿಷ್ಕಾಮ ಭಕ್ತಿ ಮತ್ತು ಅನುಭಾವದ ಪರಮ ಸತ್ಯವನ್ನು ಹೊಂದುವುದೇ ನಿಜವಾದ ಮುಕ್ತಿ ಎಂಬ ಆಧ್ಯಾತ್ಮಿಕ ತೇಜಸ್ಸು ಈ ಮಾತಿನಲ್ಲಿ ಸ್ವಾರಸ್ಯಪೂರ್ಣವಾಗಿ ಅಭಿವ್ಯಕ್ತಗೊಂಡಿದೆ.",
      "kannadaScriptAnswer": "ಆಯ್ಕೆ (೧ ಅಂಕ) + ಸಂದರ್ಭ (೧ ಅಂಕ) + ಸ್ವಾರಸ್ಯ (೧ ಅಂಕ) = ೩ ಅಂಕಗಳು",
      "keyDeductionRule": "KTBS 01K Marking Scheme Clause 4.2: Incomplete citation of poet/work causes mandatory 0.5M penalty.",
      "ktbsVerificationCitation": "KTBS Text Siri Kannada 10th Std, Chapter 3 Vachanamruta, Page 34, Stanza 2"
    }
  },
  {
    "id": "preset-physics-ray-diagram",
    "title": "Science 83E: Convex Lens Ray Diagram (3 Marks)",
    "subjectCode": "83E",
    "question": "Draw a neat ray diagram showing the formation of image when an object is placed between F1 and 2F1 of a convex lens. State the position and nature of the image formed. (3 Marks)",
    "studentAnswerText": "[Student uploaded image showing convex lens with object AB between F1 and 2F1, image formed beyond 2F2]\nWritten text in answer booklet:\nPosition: Image formed beyond 2F2.\nNature: Real, inverted and magnified.",
    "maxMarks": 3,
    "ktbsSource": "NCERT Class 10 Science, Chapter 9: Light - Reflection and Refraction, Figure 9.16(c), Page 155",
    "probabilityScore": 98,
    "valuation": {
      "awardedMarks": 2.5,
      "maxMarks": 3,
      "percentage": 83.3,
      "gradeStatus": "Minor Leak",
      "stepBreakdown": [
        {
          "stepName": "Lens Drawing & Principal Axis alignment",
          "maxMarks": 1,
          "awardedMarks": 1,
          "examinerNotes": "Convex lens outline, optical center O, F1, 2F1, F2, 2F2 marked at equal symmetric intervals.",
          "isLeak": false
        },
        {
          "stepName": "Light Rays Path & Directional Arrows",
          "maxMarks": 1,
          "awardedMarks": 0.5,
          "examinerNotes": "Incident ray parallel to principal axis passes through F2. Ray through optical center passes undeviated. BUT: Directional arrowheads are missing on the refracted rays!",
          "isLeak": true
        },
        {
          "stepName": "Image Characteristics (Position & Nature)",
          "maxMarks": 1,
          "awardedMarks": 1,
          "examinerNotes": "Correctly stated: Beyond 2F2; Real, inverted, and magnified.",
          "isLeak": false
        }
      ],
      "halfMarkLeaks": [
        "Missing directional arrows (→) on light rays after refraction through the convex lens (-0.5 Marks)."
      ],
      "examinerAdvice": "KSEAB Chief Examiner Rule: In optics ray diagrams, a line without an arrow is considered a geometric line, not a light ray. Always put directional arrowheads on both incident and refracted/reflected rays.",
      "modelAnswer": "Steps to secure full 3/3 Marks:\n1. Draw convex lens with symmetrical focal points: OF1 = F1(2F1) = OF2 = F2(2F2).\n2. Place object AB perpendicular to principal axis between F1 and 2F1.\n3. Draw Ray 1 parallel to principal axis with arrow (→) entering lens, refracting through F2 with arrow (→).\n4. Draw Ray 2 passing straight through optical center O with arrow (→).\n5. Mark intersection point A'B' beyond 2F2 with inverted arrow.\n6. Explicitly state:\n   - Position: Beyond 2F2\n   - Nature: Real and inverted\n   - Size: Magnified (enlarged)",
      "keyDeductionRule": "KSEAB Science Valuation Key Rule 6.1: 0.5 Mark strictly deducted if ray arrowheads are missing in ray diagrams.",
      "ktbsVerificationCitation": "NCERT Class 10 Science, Ch 9, Fig 9.16(c), Page 155, Table 9.4"
    }
  },
  {
    "id": "preset-maths-bpt-theorem",
    "title": "Maths 81E: Basic Proportionality Theorem (4 Marks)",
    "subjectCode": "81E",
    "question": "State and prove Basic Proportionality Theorem (Thales Theorem). (4 Marks)",
    "studentAnswerText": "Statement: If a line is drawn parallel to one side of a triangle intersecting the other two sides in distinct points, then the other two sides are divided in the same ratio.\nProof:\nArea of triangle = 1/2 * base * height\nArea(ADE) = 1/2 * AD * EN\nArea(BDE) = 1/2 * DB * EN\nArea(ADE) / Area(BDE) = AD / DB  --- (1)\nSimilarly:\nArea(ADE) / Area(ECD) = AE / EC  --- (2)\nSince triangle BDE and triangle ECD are on same base DE and between same parallels DE and BC:\nArea(BDE) = Area(ECD)\nTherefore from (1) and (2):\nAD / DB = AE / EC.\nHence proved.",
    "maxMarks": 4,
    "ktbsSource": "NCERT Class 10 Mathematics, Chapter 6: Triangles, Theorem 6.1 (BPT), Page 124",
    "probabilityScore": 99,
    "valuation": {
      "awardedMarks": 3.5,
      "maxMarks": 4,
      "percentage": 87.5,
      "gradeStatus": "Minor Leak",
      "stepBreakdown": [
        {
          "stepName": "Statement of Theorem",
          "maxMarks": 1,
          "awardedMarks": 1,
          "examinerNotes": "Word-to-word KTBS NCERT statement accurately reproduced.",
          "isLeak": false
        },
        {
          "stepName": "Figure, Given, To Prove & Construction",
          "maxMarks": 1,
          "awardedMarks": 0.5,
          "examinerNotes": "Figure drawn, but explicit written sections 'Given: In ΔABC, DE || BC', 'To Prove: AD/DB = AE/EC' and 'Construction: Join BE, CD and draw EN ⊥ AB, DM ⊥ AC' were omitted as formal headings.",
          "isLeak": true
        },
        {
          "stepName": "Area Ratio Proof Equations (1) & (2)",
          "maxMarks": 1,
          "awardedMarks": 1,
          "examinerNotes": "Formulas and altitude cancellations are crystal clear.",
          "isLeak": false
        },
        {
          "stepName": "Same Base & Parallels Axiom + Conclusion",
          "maxMarks": 1,
          "awardedMarks": 1,
          "examinerNotes": "Cited Theorem 9.2 correctly: Triangles on the same base and between same parallels have equal area.",
          "isLeak": false
        }
      ],
      "halfMarkLeaks": [
        "Omitted formal 'Given', 'To Prove', and 'Construction' labels before the proof body (-0.5 Marks)."
      ],
      "examinerAdvice": "In 4M/5M KSEAB Board Theorems, the Chief Examiner scheme assigns discrete marks: 1M Statement, 1M Figure + Given/To Prove/Construction, 2M Proof. Never jump straight from Statement into Area calculations without the 3 formal header blocks.",
      "modelAnswer": "1. Statement (1M): If a line is drawn parallel to one side of a triangle to intersect the other two sides in distinct points, the other two sides are divided in the same ratio.\n2. Figure + Formal Blocks (1M):\n   - Given: In ΔABC, a line DE || BC intersects AB at D and AC at E.\n   - To Prove: AD / DB = AE / EC.\n   - Construction: Join BE and CD. Draw DM ⊥ AC and EN ⊥ AB.\n3. Proof (2M):\n   - Area(ΔADE) = 1/2 × AD × EN\n   - Area(ΔBDE) = 1/2 × DB × EN\n   - Therefore, Area(ΔADE)/Area(ΔBDE) = AD/DB ... (1)\n   - Similarly, Area(ΔADE) = 1/2 × AE × DM and Area(ΔECD) = 1/2 × EC × DM\n   - Area(ΔADE)/Area(ΔECD) = AE/EC ... (2)\n   - Note that ΔBDE and ΔECD are on the same base DE and between the same parallel lines DE and BC.\n   - So, Area(ΔBDE) = Area(ΔECD) ... (3)\n   - From (1), (2) and (3): AD / DB = AE / EC. (Hence Proved)",
      "keyDeductionRule": "KSEAB Maths Valuation Circular Rule 4: Discrete 0.5M awarded for Given/To Prove/Construction headings.",
      "ktbsVerificationCitation": "NCERT Class 10 Mathematics, Ch 6 Triangles, Theorem 6.1, Page 124"
    }
  },
  {
    "id": "preset-social-india-map",
    "title": "Social 85E: Question 38 India Map (5 Marks)",
    "subjectCode": "85E",
    "question": "Draw an outline map of India and mark: (a) 82°30' East Longitude (b) Kaiga Nuclear Plant (c) Bhakra Nangal Dam (d) Digboi (5 Marks)",
    "studentAnswerText": "[Student sketched outline map of India]\nMarked:\n(a) 82°30' E dotted line passing through Uttar Pradesh and Andhra Pradesh.\n(b) Kaiga marked on Karnataka coastline near Mangalore instead of Uttara Kannada.\n(c) Bhakra Nangal marked on Sutlej river in Punjab/HP border.\n(d) Digboi marked in eastern Assam.",
    "maxMarks": 5,
    "ktbsSource": "KTBS 10th Social Science Part-2 (Geography), India Maps Series, Page 88",
    "probabilityScore": 99,
    "valuation": {
      "awardedMarks": 4,
      "maxMarks": 5,
      "percentage": 80,
      "gradeStatus": "Minor Leak",
      "stepBreakdown": [
        {
          "stepName": "Outline Map of India Shape & Coastline",
          "maxMarks": 1,
          "awardedMarks": 1,
          "examinerNotes": "Proportional contour of Peninsular India, Gujarat Gulfs and Kashmir apex.",
          "isLeak": false
        },
        {
          "stepName": "82°30' E Longitude Meridian Line",
          "maxMarks": 1,
          "awardedMarks": 1,
          "examinerNotes": "Accurately passes through Mirzapur (UP) and Kakinada (AP).",
          "isLeak": false
        },
        {
          "stepName": "Bhakra Nangal Dam & Digboi Oil Refinery",
          "maxMarks": 2,
          "awardedMarks": 2,
          "examinerNotes": "Both marked accurately with clean dot pointers and capital lettering.",
          "isLeak": false
        },
        {
          "stepName": "Kaiga Nuclear Power Station Location",
          "maxMarks": 1,
          "awardedMarks": 0,
          "examinerNotes": "Kaiga marked in Dakshina Kannada (Mangalore region). Kaiga is in Uttara Kannada district near Karwar/Western Ghats.",
          "isLeak": true
        }
      ],
      "halfMarkLeaks": [
        "Kaiga Nuclear Power Station marked in southern coastal Karnataka instead of Uttara Kannada district (-1.0 Mark)."
      ],
      "examinerAdvice": "Kaiga is located on the Kali River in Uttara Kannada district (North Karnataka coast). Marking it near Mangalore or Udupi results in total loss of that location mark.",
      "modelAnswer": "KSEAB Map Marking Key:\n1. Outline of India (1M)\n2. 82°30' E Longitude: Line through Allahabad/Mirzapur down to Kakinada (1M)\n3. Bhakra Nangal: Sutlej River, Punjab-HP border (1M)\n4. Digboi: Far east Assam valley near Tinsukia (1M)\n5. Kaiga: Western Ghats, Uttara Kannada district, interior from Karwar (1M)",
      "keyDeductionRule": "KSEAB Social Science Map Key Clause 38: Pinpoint dot must be within 1.5cm radius of actual district location.",
      "ktbsVerificationCitation": "KTBS Geography Ch 8 India Power Resources, Page 140"
    }
  },
  {
    "id": "preset-english-formal-letter",
    "title": "English 31E: Formal Letter Writing (4 Marks)",
    "subjectCode": "31E",
    "question": "Write an official letter to the Municipal Commissioner complaining about contaminated water supply in your area. (4 Marks)",
    "studentAnswerText": "From:\nTharika N, 10th Standard,\nVivekananda Nagar, Bengaluru.\n\nDate: 27th March, 2027\n\nTo:\nThe Municipal Commissioner,\nBBMP, Bengaluru.\n\nRespected Sir,\nSubject: Complaint regarding contaminated drinking water.\n\nI am writing to bring to your kind notice that our locality has been receiving muddy and contaminated drinking water for the past two weeks. Many children have fallen ill.\nKindly inspect the pipeline leakage and arrange safe drinking water immediately.\n\nThanking you,\nYour's faithfully,\nTharika N.",
    "maxMarks": 4,
    "ktbsSource": "KTBS 10th English Reader, Writing Skills Section, Page 142",
    "probabilityScore": 96,
    "valuation": {
      "awardedMarks": 3.5,
      "maxMarks": 4,
      "percentage": 87.5,
      "gradeStatus": "Minor Leak",
      "stepBreakdown": [
        {
          "stepName": "From Address, Date & To Address Format",
          "maxMarks": 1,
          "awardedMarks": 1,
          "examinerNotes": "Clean top-left block formatting with correct designation.",
          "isLeak": false
        },
        {
          "stepName": "Salutation & Subject Line",
          "maxMarks": 0.5,
          "awardedMarks": 0.5,
          "examinerNotes": "Respected Sir and concise subject stated clearly.",
          "isLeak": false
        },
        {
          "stepName": "Body of the Letter (Grievance & Appeal)",
          "maxMarks": 1.5,
          "awardedMarks": 1.5,
          "examinerNotes": "Clear 2 paragraphs stating problem, illness consequence, and appeal for pipeline inspection.",
          "isLeak": false
        },
        {
          "stepName": "Subscription & Sign-off",
          "maxMarks": 1,
          "awardedMarks": 0.5,
          "examinerNotes": "Wrote 'Your's faithfully' with an apostrophe. In English grammar, possessive pronoun 'Yours' NEVER takes an apostrophe.",
          "isLeak": true
        }
      ],
      "halfMarkLeaks": [
        "Wrote 'Your's faithfully' with an apostrophe instead of 'Yours faithfully' (-0.5 Marks)."
      ],
      "examinerAdvice": "Apostrophe error in 'Your's' is the single most penalized defect in KSEAB English letters. Always write: 'Yours faithfully' or 'Yours obediently' without any punctuation.",
      "modelAnswer": "From Address\nDate\n\nTo Address\nRespected Sir,\nSubject: ...\nBody (3 distinct paragraphs)\nThanking you,\nYours faithfully (NO APOSTROPHE)\nSignature",
      "keyDeductionRule": "KSEAB Second Language English Key Rule 8: Apostrophe in possessive 'Yours' deducts 0.5M.",
      "ktbsVerificationCitation": "KTBS English 31E Official Grammar & Composition Section, Page 142"
    }
  },
  {
    "id": "preset-hindi-vachan-karak",
    "title": "Hindi 61H: वचन एवं कारक परिवर्तन (3 Marks)",
    "subjectCode": "61H",
    "question": "निम्नलिखित शब्दों के वचन बदलकर लिखिए: (क) लड़का (ख) नदी (ग) रोटी। (3 Marks)",
    "studentAnswerText": "(क) लड़का → लड़के\n(ख) नदी → नदियाँ\n(ಗ) रोटी → रोतीयॉं",
    "maxMarks": 3,
    "ktbsSource": "KTBS 10th Hindi Third Language, Vyakarana Section, Page 118",
    "probabilityScore": 95,
    "valuation": {
      "awardedMarks": 2.5,
      "maxMarks": 3,
      "percentage": 83.3,
      "gradeStatus": "Minor Leak",
      "stepBreakdown": [
        {
          "stepName": "आकारांत पुल्लिंग शब्द (लड़का → लड़के)",
          "maxMarks": 1,
          "awardedMarks": 1,
          "examinerNotes": "आकारांत से एकारांत परिवर्तन सही है।",
          "isLeak": false
        },
        {
          "stepName": "इकारांत स्त्रीलिंग शब्द (नदी → नदियाँ)",
          "maxMarks": 1,
          "awardedMarks": 1,
          "examinerNotes": "दीर्घ 'ई' का ह्रस्व 'इ' में परिवर्तन एवं चंद्रबिंदु सही है।",
          "isLeak": false
        },
        {
          "stepName": "इकारांत स्त्रीलिंग शब्द (रोटी → रोटियाँ)",
          "maxMarks": 1,
          "awardedMarks": 0.5,
          "examinerNotes": "वर्तनी त्रुटि: 'रोतीयॉं' लिखा गया है, जबकि सही शब्द 'रोटियाँ' (ट पर ह्रस्व 'इ' की मात्रा) है।",
          "isLeak": true
        }
      ],
      "halfMarkLeaks": [
        "'रोटी' का बहुवचन 'रोटियाँ' लिखने के बजाय वर्तनी अशुद्धि की गई (-0.5 Marks)।"
      ],
      "examinerAdvice": "हिंदी व्याकरण में इकारांत स्त्रीलिंग शब्दों का बहुवचन बनाते समय अंतिम दीर्घ 'ई' को ह्रस्व 'इ' में बदलकर 'याँ' जोड़ा जाता है (रोटी → रोटियाँ, लड़की → लड़कियाँ)।",
      "modelAnswer": "(क) लड़का → लड़के\n(ख) नदी → नदियाँ\n(ग) रोटी → रोटियाँ",
      "keyDeductionRule": "KSEAB Hindi Key Rule 3.2: 0.5 Mark deduction for spelling mistake in matra.",
      "ktbsVerificationCitation": "KTBS Hindi 10th Std Vyakarana Section, Page 118"
    }
  }
];

export const PYQ_QUESTIONS: PyqQuestion[] = [
  {
    "id": "pyq-maths-2024-e1-q37",
    "subjectCode": "81E",
    "year": "2024",
    "examType": "Exam-1",
    "qNumber": 37,
    "marks": 4,
    "chapter": "Pair of Linear Equations in Two Variables",
    "ktbsSource": {
      "book": "NCERT Class 10 Mathematics",
      "chapterNumber": 3,
      "sectionOrPage": "Section 3.2, Exercise 3.2, Page 44",
      "standard": "10th Standard (NCERT/KTBS 2026-27)"
    },
    "probabilityRating": 5,
    "probabilityScore": 99,
    "appearanceHistory": [
      "2024 Exam-1 (Q.37)",
      "2023 Exam-1 (Q.37)",
      "2022 Exam-1 (Q.37)",
      "2020 Board Model"
    ],
    "cognitiveLevel": "Skill (15%)",
    "expectedTimeMinutes": 12,
    "questionText": "Find the solution of the following pair of linear equations graphically: 2x + y = 8 and x - y = 1.",
    "kannadaQuestionText": "ಕೆಳಗಿನ ರೇಖಾತ್ಮಕ ಸಮೀಕರಣಗಳ ಜೋಡಿಗೆ ನಕ್ಷೆಯ ವಿಧಾನದಿಂದ ಪರಿಹಾರ ಕಂಡುಕೊಳ್ಳಿ: 2x + y = 8 ಮತ್ತು x - y = 1.",
    "tags": [
      "Graph",
      "4-Marks",
      "100% Guaranteed Topic",
      "NCERT Ch 3"
    ],
    "schemeSteps": [
      {
        "point": "Table of minimum 2-3 coordinate pairs for 2x + y = 8: (0, 8), (4, 0), (2, 4)",
        "marks": 1
      },
      {
        "point": "Table of minimum 2-3 coordinate pairs for x - y = 1: (0, -1), (1, 0), (3, 2)",
        "marks": 1
      },
      {
        "point": "Plotting axes with scale on graph paper (X-axis: 1cm = 1 unit, Y-axis: 1cm = 1 unit) and straight lines",
        "marks": 1
      },
      {
        "point": "Identifying intersection point (3, 2) and writing x = 3, y = 2 explicitly",
        "marks": 1
      }
    ],
    "modelAnswerText": "Values for 2x + y = 8: (1, 6), (2, 4), (3, 2).\nValues for x - y = 1: (1, 0), (2, 1), (3, 2).\nIntersection Point P(3, 2). Hence Solution: x = 3, y = 2.",
    "choiceAlternative": {
      "questionText": "Linear equation graph is mandatory in Part V (Q.37) with NO internal choice. Must master 100%.",
      "examinerVerdict": "Preferred (High-Scoring)",
      "verdictReason": "Fixed 4/4 scoring key. Zero ambiguity if scale and intersection point (x, y) are stated."
    }
  },
  {
    "id": "pyq-maths-2023-e1-q38",
    "subjectCode": "81E",
    "year": "2023",
    "examType": "Exam-1",
    "qNumber": 38,
    "marks": 4,
    "chapter": "Triangles (Theorems)",
    "ktbsSource": {
      "book": "NCERT Class 10 Mathematics",
      "chapterNumber": 6,
      "sectionOrPage": "Theorem 6.1 (BPT / Thales), Page 124",
      "standard": "10th Standard (NCERT/KTBS 2026-27)"
    },
    "probabilityRating": 5,
    "probabilityScore": 98,
    "appearanceHistory": [
      "2023 Exam-1 (Q.38)",
      "2021 Model (Q.38)",
      "2019 Board (Q.38)"
    ],
    "cognitiveLevel": "Skill (15%)",
    "expectedTimeMinutes": 10,
    "questionText": "State and prove Basic Proportionality Theorem (Thales Theorem).",
    "kannadaQuestionText": "ಮೂಲ ಸಮಾನುಪಾತತೆಯ ಪ್ರಮೇಯವನ್ನು (ಥೇಲ್ಸ್ ಪ್ರಮೇಯ) ನಿರೂಪಿಸಿ ಮತ್ತು ಸಾಧಿಸಿ.",
    "tags": [
      "Theorems",
      "4-Marks",
      "Triangles",
      "NCERT Ch 6"
    ],
    "schemeSteps": [
      {
        "point": "Statement: If a line is drawn parallel to one side of a triangle intersecting other two sides, sides are divided in same ratio (1M)",
        "marks": 1
      },
      {
        "point": "Given, To Prove, Construction headings and neat figure with perpendiculars EN ⊥ AB, DM ⊥ AC (1M)",
        "marks": 1
      },
      {
        "point": "Area equations: Area(ADE)/Area(BDE) = AD/DB and Area(ADE)/Area(DEC) = AE/EC (1M)",
        "marks": 1
      },
      {
        "point": "Triangles on same base DE between parallels have equal area axiom and conclusion AD/DB = AE/EC (1M)",
        "marks": 1
      }
    ],
    "modelAnswerText": "Follow the 4 standard KSEAB headings: Statement, Figure + Given/To Prove/Construction, Proof equations (1) and (2), and Parallels Axiom conclusion.",
    "choiceAlternative": {
      "questionText": "OR: State and prove Pythagoras Theorem (AC² = AB² + BC² in right triangle).",
      "examinerVerdict": "Preferred (High-Scoring)",
      "verdictReason": "Both BPT and Pythagoras carry exact 4-mark step schemes. Choose the one with the cleaner diagram."
    }
  },
  {
    "id": "pyq-maths-2024-e1-q35",
    "subjectCode": "81E",
    "year": "2024",
    "examType": "Exam-1",
    "qNumber": 35,
    "marks": 3,
    "chapter": "Arithmetic Progressions (AP)",
    "ktbsSource": {
      "book": "NCERT Class 10 Mathematics",
      "chapterNumber": 5,
      "sectionOrPage": "Section 5.3 Sum of First n Terms, Exercise 5.3 Q1, Page 112",
      "standard": "10th Standard (NCERT/KTBS 2026-27)"
    },
    "probabilityRating": 5,
    "probabilityScore": 95,
    "appearanceHistory": [
      "2024 Exam-1 (Q.35)",
      "2023 Exam-2 (Q.34)",
      "2022 Exam-1 (Q.33)"
    ],
    "cognitiveLevel": "Application (25%)",
    "expectedTimeMinutes": 7,
    "questionText": "Find the sum of the first 20 terms of the Arithmetic Progression: 3, 8, 13, 18 ... using the formula.",
    "kannadaQuestionText": "೩, ೮, ೧೩, ೧೮ ... ಈ ಸಮಾಂತರ ಶ್ರೇಢಿಯ ಮೊದಲ ೨೦ ಪದಗಳ ಮೊತ್ತವನ್ನು ಸೂತ್ರದ ಸಹಾಯದಿಂದ ಕಂಡುಹಿಡಿಯಿರಿ.",
    "tags": [
      "AP",
      "3-Marks",
      "Formula Application",
      "NCERT Ch 5"
    ],
    "schemeSteps": [
      {
        "point": "Identifying first term a = 3, common difference d = 8 - 3 = 5, n = 20",
        "marks": 1
      },
      {
        "point": "Writing formula: Sn = (n / 2)[2a + (n - 1)d]",
        "marks": 1
      },
      {
        "point": "Substitution & calculation: S20 = 10[2(3) + 19(5)] = 10[6 + 95] = 10(101) = 1010 (Boxed)",
        "marks": 1
      }
    ],
    "modelAnswerText": "a = 3, d = 5, n = 20.\nSn = (n / 2)[2a + (n - 1)d]\nS20 = (20 / 2)[2(3) + (20 - 1)5] = 10[6 + 95] = 10 × 101 = 1010.\nHence the sum of first 20 terms is 1010."
  },
  {
    "id": "pyq-maths-2024-e1-q36",
    "subjectCode": "81E",
    "year": "2024",
    "examType": "Exam-1",
    "qNumber": 36,
    "marks": 3,
    "chapter": "Quadratic Equations",
    "ktbsSource": {
      "book": "NCERT Class 10 Mathematics",
      "chapterNumber": 4,
      "sectionOrPage": "Section 4.4 Quadratic Formula, Page 88",
      "standard": "10th Standard (NCERT/KTBS 2026-27)"
    },
    "probabilityRating": 5,
    "probabilityScore": 96,
    "appearanceHistory": [
      "2024 Exam-1 (Q.36)",
      "2023 Exam-1 (Q.36)",
      "2022 Model (Q.35)"
    ],
    "cognitiveLevel": "Understanding (40%)",
    "expectedTimeMinutes": 6,
    "questionText": "Find the roots of the quadratic equation 2x² - 5x + 3 = 0 using the quadratic formula.",
    "kannadaQuestionText": "೨x² - ೫x + ೩ = ೦ ವರ್ಗ ಸಮೀಕರಣದ ಮೂಲಗಳನ್ನು ಸೂತ್ರದ ಸಹಾಯದಿಂದ ಕಂಡುಹಿಡಿಯಿರಿ.",
    "tags": [
      "Quadratic Formula",
      "3-Marks",
      "Algebra",
      "NCERT Ch 4"
    ],
    "schemeSteps": [
      {
        "point": "Identifying coefficients: a = 2, b = -5, c = 3",
        "marks": 0.5
      },
      {
        "point": "Writing quadratic formula: x = [-b ± √(b² - 4ac)] / (2a)",
        "marks": 1
      },
      {
        "point": "Calculating discriminant: b² - 4ac = (-5)² - 4(2)(3) = 25 - 24 = 1",
        "marks": 0.5
      },
      {
        "point": "Finding roots: x = [5 ± 1] / 4 → x = 6/4 = 3/2 and x = 4/4 = 1",
        "marks": 1
      }
    ],
    "modelAnswerText": "a = 2, b = -5, c = 3.\nx = [-(-5) ± √((-5)² - 4*2*3)] / (2*2) = [5 ± √1] / 4.\nx = (5 + 1)/4 = 6/4 = 3/2  or  x = (5 - 1)/4 = 4/4 = 1.\nRoots: x = 3/2, 1."
  },
  {
    "id": "pyq-science-2024-e1-q36",
    "subjectCode": "83E",
    "year": "2024",
    "examType": "Exam-1",
    "qNumber": 36,
    "marks": 4,
    "chapter": "Life Processes (Biology)",
    "ktbsSource": {
      "book": "NCERT Class 10 Science",
      "chapterNumber": 5,
      "sectionOrPage": "Section 5.4.1 Excretion in Human Beings, Fig 5.13, Page 96",
      "standard": "10th Standard (NCERT/KTBS 2026-27)"
    },
    "probabilityRating": 5,
    "probabilityScore": 96,
    "appearanceHistory": [
      "2024 Exam-1 (Q.36)",
      "2023 Exam-2 (Q.35)",
      "2021 Model (Q.36)"
    ],
    "cognitiveLevel": "Skill (15%)",
    "expectedTimeMinutes": 10,
    "questionText": "Draw a neat diagram of the Human Excretory System and label the following parts: (i) Kidney (ii) Ureter (iii) Urinary Bladder (iv) Urethra.",
    "kannadaQuestionText": "ಮಾನವನ ವಿಸರ್ಜನಾಂಗ ವ್ಯೂಹದ ಅಂದವಾದ ಚಿತ್ರ ಬರೆದು ಈ ಕೆಳಗಿನ ಭಾಗಗಳನ್ನು ಗುರುತಿಸಿ: (i) ಮೂತ್ರಪಿಂಡ (ii) ಮೂತ್ರನಾಳ (iii) ಮೂತ್ರಕೋಶ (iv) ಮೂತ್ರದ್ವಾರ.",
    "tags": [
      "Diagram",
      "4-Marks",
      "Biology High-Yield",
      "NCERT Ch 5"
    ],
    "schemeSteps": [
      {
        "point": "Neat proportional diagram of paired kidneys, renal vessels, bladder and urethra",
        "marks": 2
      },
      {
        "point": "Correct right-side labelling of Kidney (0.5M) and Ureter (0.5M)",
        "marks": 1
      },
      {
        "point": "Correct right-side labelling of Urinary Bladder (0.5M) and Urethra (0.5M)",
        "marks": 1
      }
    ],
    "modelAnswerText": "Draw two bean-shaped kidneys at lumbar level, left slightly higher than right. Lead ureters to urinary bladder. Label all 4 parts neatly on right side with straight ruled pointer lines.",
    "choiceAlternative": {
      "questionText": "OR: Draw the structure of Nephron and label Bowman's capsule, Glomerulus, Collecting duct.",
      "examinerVerdict": "Preferred (High-Scoring)",
      "verdictReason": "Excretory System has cleaner geometric symmetry and fewer microscopic convoluted tubules than Nephron, reducing drawing time by 4 minutes."
    }
  },
  {
    "id": "pyq-science-2024-e1-q35",
    "subjectCode": "83E",
    "year": "2024",
    "examType": "Exam-1",
    "qNumber": 35,
    "marks": 4,
    "chapter": "Light - Reflection and Refraction (Physics)",
    "ktbsSource": {
      "book": "NCERT Class 10 Science",
      "chapterNumber": 9,
      "sectionOrPage": "Section 9.3.3 Ray Diagrams for Lenses, Fig 9.16(c), Page 155",
      "standard": "10th Standard (NCERT/KTBS 2026-27)"
    },
    "probabilityRating": 5,
    "probabilityScore": 97,
    "appearanceHistory": [
      "2024 Exam-1 (Q.35)",
      "2023 Exam-1 (Q.35)",
      "2022 Exam-1 (Q.34)"
    ],
    "cognitiveLevel": "Skill (15%)",
    "expectedTimeMinutes": 9,
    "questionText": "Draw the ray diagram showing the image formation by a convex lens when the object is placed between F1 and 2F1. State the position, nature, and size of the image formed.",
    "kannadaQuestionText": "ವಸ್ತುವನ್ನು ಪೀನ ಮಸೂರದ F1 ಮತ್ತು 2F1 ನಡುವೆ ಇರಿಸಿದಾಗ ಉಂಟಾಗುವ ಪ್ರತಿಬಿಂಬವನ್ನು ತೋರಿಸುವ ಕಿರಣ ಚಿತ್ರ ಬರೆಯಿರಿ. ಪ್ರತಿಬಿಂಬದ ಸ್ಥಾನ, ಸ್ವಭಾವ ಮತ್ತು ಗಾತ್ರವನ್ನು ತಿಳಿಸಿ.",
    "tags": [
      "Ray Diagram",
      "4-Marks",
      "Optics",
      "NCERT Ch 9"
    ],
    "schemeSteps": [
      {
        "point": "Accurate convex lens diagram with symmetrical F1, 2F1, F2, 2F2 along principal axis",
        "marks": 1
      },
      {
        "point": "Two light rays: Ray parallel to axis refracting through F2 and Ray through optical center undeviated with arrows (→)",
        "marks": 1.5
      },
      {
        "point": "Image formed beyond 2F2 with inverted arrow",
        "marks": 0.5
      },
      {
        "point": "Image properties: Position: Beyond 2F2 | Nature: Real and inverted | Size: Magnified (enlarged)",
        "marks": 1
      }
    ],
    "modelAnswerText": "Convex lens with symmetrical focal points. Ray 1 parallel to principal axis refracts through F2. Ray 2 passes through O undeviated. Intersection beyond 2F2.\nPosition: Beyond 2F2\nNature: Real and inverted\nSize: Magnified"
  },
  {
    "id": "pyq-science-2024-e1-q34",
    "subjectCode": "83E",
    "year": "2024",
    "examType": "Exam-1",
    "qNumber": 34,
    "marks": 3,
    "chapter": "Electricity (Physics)",
    "ktbsSource": {
      "book": "NCERT Class 10 Science",
      "chapterNumber": 11,
      "sectionOrPage": "Section 11.6 Combination of Resistors, Example 11.8, Page 189",
      "standard": "10th Standard (NCERT/KTBS 2026-27)"
    },
    "probabilityRating": 5,
    "probabilityScore": 95,
    "appearanceHistory": [
      "2024 Exam-1 (Q.34)",
      "2023 Exam-2 (Q.33)",
      "2022 Exam-1 (Q.32)"
    ],
    "cognitiveLevel": "Application (25%)",
    "expectedTimeMinutes": 8,
    "questionText": "An electric lamp of resistance 20 Ω and a conductor of 4 Ω resistance are connected in series to a 6 V battery. Calculate: (a) total resistance of the circuit (b) the current flowing through the circuit (c) potential difference across the electric lamp and the conductor.",
    "kannadaQuestionText": "೨೦ Ω ರೋಧವಿರುವ ವಿದ್ಯುತ್ ದೀಪ ಮತ್ತು ೪ Ω ರೋಧವಿರುವ ವಾಹಕವನ್ನು ೬ V ಬ್ಯಾಟರಿಯೊಂದಿಗೆ ಸರಣಿ ಕ್ರಮದಲ್ಲಿ ಜೋಡಿಸಲಾಗಿದೆ. ಲೆಕ್ಕಾಚಾರ ಮಾಡಿ: (ಅ) ಮಂಡಲದ ಒಟ್ಟು ರೋಧ (ಆ) ಮಂಡಲದಲ್ಲಿ ಹರಿಯುವ ವಿದ್ಯುತ್ ಪ್ರವಾಹ (ಇ) ದೀಪ ಮತ್ತು ವಾಹಕದ ನಡುವಿನ ವಿಭವಾಂತರ.",
    "tags": [
      "Numerical",
      "3-Marks",
      "Electricity",
      "NCERT Ch 11"
    ],
    "schemeSteps": [
      {
        "point": "Formula R = R1 + R2 = 20 + 4 = 24 Ω (boxed with unit)",
        "marks": 1
      },
      {
        "point": "Ohm's Law: I = V / R = 6 / 24 = 0.25 A (boxed with unit A)",
        "marks": 1
      },
      {
        "point": "V1 = I × R1 = 0.25 × 20 = 5 V; V2 = 0.25 × 4 = 1 V (both with unit V)",
        "marks": 1
      }
    ],
    "modelAnswerText": "(a) Total R = 24 Ω\n(b) Current I = 0.25 A\n(c) V_lamp = 5 V, V_conductor = 1 V",
    "choiceAlternative": {
      "questionText": "OR: Explain Joule's law of heating and write its mathematical equation H = I²Rt.",
      "examinerVerdict": "Preferred (High-Scoring)",
      "verdictReason": "The numerical question has a purely mathematical marking key with no subjective deductions for handwriting length."
    }
  },
  {
    "id": "pyq-science-2023-e1-q30",
    "subjectCode": "83E",
    "year": "2023",
    "examType": "Exam-1",
    "qNumber": 30,
    "marks": 3,
    "chapter": "Metals and Non-metals (Chemistry)",
    "ktbsSource": {
      "book": "NCERT Class 10 Science",
      "chapterNumber": 3,
      "sectionOrPage": "Section 3.4.3 Extracting Metals, Pages 51-52",
      "standard": "10th Standard (NCERT/KTBS 2026-27)"
    },
    "probabilityRating": 5,
    "probabilityScore": 94,
    "appearanceHistory": [
      "2023 Exam-1 (Q.30)",
      "2022 Exam-1 (Q.30)",
      "2020 Model"
    ],
    "cognitiveLevel": "Understanding (40%)",
    "expectedTimeMinutes": 7,
    "questionText": "Differentiate between Roasting and Calcination with balanced chemical equations. What is the thermite reaction?",
    "kannadaQuestionText": "ಹುರಿಯುವಿಕೆ ಮತ್ತು ಕಾಯಿಸುವಿಕೆ ಪ್ರಕ್ರಿಯೆಗಳ ನಡುವಿನ ವ್ಯತ್ಯಾಸವನ್ನು ಸರಿದೂಗಿಸಿದ ಸಮೀಕರಣಗಳೊಂದಿಗೆ ತಿಳಿಸಿ. ಥರ್ಮೈಟ್ ಕ್ರಿಯೆ ಎಂದರೇನು?",
    "tags": [
      "Chemistry",
      "3-Marks",
      "Metallurgy",
      "NCERT Ch 3"
    ],
    "schemeSteps": [
      {
        "point": "Roasting: Heating sulphide ores strongly in excess air: 2ZnS + 3O2 → 2ZnO + 2SO2 (1M)",
        "marks": 1
      },
      {
        "point": "Calcination: Heating carbonate ores strongly in limited air: ZnCO3 → ZnO + CO2 (1M)",
        "marks": 1
      },
      {
        "point": "Thermite Reaction: Highly exothermic reduction of metal oxide by aluminium powder (Fe2O3 + 2Al → 2Fe(l) + Al2O3 + Heat) used to join railway tracks (1M)",
        "marks": 1
      }
    ],
    "modelAnswerText": "Roasting: Sulphide ore in excess air: 2ZnS + 3O2 → 2ZnO + 2SO2.\nCalcination: Carbonate ore in limited air: ZnCO3 → ZnO + CO2.\nThermite Reaction: Fe2O3 + 2Al → 2Fe(l) + Al2O3 + Heat. Molten iron produced is used for welding railway tracks."
  },
  {
    "id": "pyq-social-2024-e1-q38",
    "subjectCode": "85E",
    "year": "2024",
    "examType": "Exam-1",
    "qNumber": 38,
    "marks": 5,
    "chapter": "Geography: India - Location & Features (Q.38 Map)",
    "ktbsSource": {
      "book": "KTBS Social Science Part-2 (Geography)",
      "chapterNumber": "Ch 1, 3, 5 & 8",
      "sectionOrPage": "India Maps Series, Pages 88, 102, 118, 140",
      "standard": "10th Standard (NCERT/KTBS 2026-27)"
    },
    "probabilityRating": 5,
    "probabilityScore": 99,
    "appearanceHistory": [
      "2024 Exam-1 (Q.38)",
      "2023 Exam-1 (Q.38)",
      "2022 Exam-1 (Q.38)",
      "Annual KSEAB Feature"
    ],
    "cognitiveLevel": "Skill (15%)",
    "expectedTimeMinutes": 8,
    "questionText": "Draw an outline map of India and mark the following locations: (a) 82°30' East Longitude (Standard Meridian of India) (b) Bhakra Nangal Dam (c) Nhava Sheva (JNPT) (d) Digboi (e) Kaiga Nuclear Power Station.",
    "kannadaQuestionText": "ಭಾರತದ ನಕ್ಷೆಯನ್ನು ಬಿಡಿಸಿ, ಈ ಕೆಳಗಿನ ಸ್ಥಳಗಳನ್ನು ಗುರುತಿಸಿ: (ಅ) ೮೨° ೩೦' ಪೂರ್ವ ರೇಖಾಂಶ (ಆ) ಭಾಕ್ರಾ-ನಂಗಲ್ ಯೋಜನೆ (ಇ) ನವಸೇವಾ ಬಂದರು (ಈ) ದಿಗ್ಬೋಯ್ (ಉ) ಕೈಗಾ ಅಣುಶಕ್ತಿ ಕೇಂದ್ರ.",
    "tags": [
      "India Map",
      "5-Marks",
      "Question 38 Guaranteed",
      "KTBS Geography"
    ],
    "schemeSteps": [
      {
        "point": "Drawing outline map of India with accurate Peninsular contour and coastline",
        "marks": 1
      },
      {
        "point": "Marking 82°30' E Longitude passing through Mirzapur / Kakinada",
        "marks": 1
      },
      {
        "point": "Marking Bhakra Nangal (Sutlej River, Himachal/Punjab)",
        "marks": 1
      },
      {
        "point": "Marking Nhava Sheva (Maharashtra coast) & Digboi (Assam)",
        "marks": 1
      },
      {
        "point": "Marking Kaiga (Uttara Kannada, Karnataka)",
        "marks": 1
      }
    ],
    "modelAnswerText": "India map outline (1M) + 4 specific pins marked with dots and neat callouts (4M) = Total 5 Marks.",
    "choiceAlternative": {
      "questionText": "Compulsory question in Part VI. No alternative given. Practice 4-stroke India outline method.",
      "examinerVerdict": "Preferred (High-Scoring)",
      "verdictReason": "Fixed 5M lock-in. Practice outline contour 10 times to secure 1 full mark for shape."
    }
  },
  {
    "id": "pyq-social-2024-e1-q37",
    "subjectCode": "85E",
    "year": "2024",
    "examType": "Exam-1",
    "qNumber": 37,
    "marks": 4,
    "chapter": "History: The First War of Indian Independence (1857)",
    "ktbsSource": {
      "book": "KTBS Social Science Part-1 (History)",
      "chapterNumber": 6,
      "sectionOrPage": "Causes of the 1857 Revolt, Pages 42-45",
      "standard": "10th Standard (NCERT/KTBS 2026-27)"
    },
    "probabilityRating": 5,
    "probabilityScore": 97,
    "appearanceHistory": [
      "2024 Exam-1 (Q.37)",
      "2023 Exam-1 (Q.37)",
      "2022 Exam-1 (Q.36)"
    ],
    "cognitiveLevel": "Understanding (40%)",
    "expectedTimeMinutes": 10,
    "questionText": "Explain the political, economic, administrative, and military causes for the First War of Indian Independence (1857 Revolt).",
    "kannadaQuestionText": "೧೮೫೭ ರ ಪ್ರಥಮ ಭಾರತೀಯ ಸ್ವಾತಂತ್ರ್ಯ ಸಂಗ್ರಾಮಕ್ಕೆ ರಾಜಕೀಯ, ಆರ್ಥಿಕ, ಆಡಳಿತಾತ್ಮಕ ಮತ್ತು ಸೈನಿಕ ಕಾರಣಗಳನ್ನು ವಿವರಿಸಿ.",
    "tags": [
      "History",
      "4-Marks",
      "1857 Revolt",
      "KTBS History Ch 6"
    ],
    "schemeSteps": [
      {
        "point": "Political Causes: Doctrine of Lapse (Dalhousie annexed Satara, Jhansi, Nagpur); pension stopped for Nana Saheb (1M)",
        "marks": 1
      },
      {
        "point": "Economic Causes: Industrial Revolution in England ruined Indian handicrafts and handloom weavers; Inam Commission confiscated 20,000 estates (1M)",
        "marks": 1
      },
      {
        "point": "Administrative Causes: English replaced Persian as court language; complex laws and discrimination against Indians (1M)",
        "marks": 1
      },
      {
        "point": "Military Causes: Indian sepoys paid lower salary and denied promotions above Subedar; forced overseas service; greased cartridges (immediate cause) (1M)",
        "marks": 1
      }
    ],
    "modelAnswerText": "Write 2 points each under 4 clear headings: (1) Political Causes (2) Economic Causes (3) Administrative Causes (4) Military Causes."
  },
  {
    "id": "pyq-social-2023-e1-q35",
    "subjectCode": "85E",
    "year": "2023",
    "examType": "Exam-1",
    "qNumber": 35,
    "marks": 3,
    "chapter": "Sociology: Social Stratification",
    "ktbsSource": {
      "book": "KTBS Social Science Part-1 (Sociology)",
      "chapterNumber": 1,
      "sectionOrPage": "Eradication of Untouchability, Pages 76-78",
      "standard": "10th Standard (NCERT/KTBS 2026-27)"
    },
    "probabilityRating": 5,
    "probabilityScore": 94,
    "appearanceHistory": [
      "2023 Exam-1 (Q.35)",
      "2021 Model (Q.34)",
      "2019 Board (Q.35)"
    ],
    "cognitiveLevel": "Knowledge (20%)",
    "expectedTimeMinutes": 7,
    "questionText": "What are the constitutional and legislative measures undertaken to eradicate untouchability in India?",
    "kannadaQuestionText": "ಭಾರತದಲ್ಲಿ ಅಸ್ಪೃಶ್ಯತಾ ನಿವಾರಣೆಗೆ ಕೈಗೊಳ್ಳಲಾದ ಸಾಂವಿಧಾನಿಕ ಮತ್ತು ಶಾಸನಾತ್ಮಕ ಕ್ರಮಗಳನ್ನು ತಿಳಿಸಿ.",
    "tags": [
      "Sociology",
      "3-Marks",
      "Untouchability",
      "KTBS Sociology"
    ],
    "schemeSteps": [
      {
        "point": "Article 17 of Indian Constitution strictly abolished the practice of untouchability (1M)",
        "marks": 1
      },
      {
        "point": "Untouchability Offences Act 1955, amended as Protection of Civil Rights Act in 1976 (1M)",
        "marks": 1
      },
      {
        "point": "SC/ST Prevention of Atrocities Act (1989), universal franchise (Article 326), and educational reservations (1M)",
        "marks": 1
      }
    ],
    "modelAnswerText": "1. Article 17: Abolished untouchability.\n2. Protection of Civil Rights Act (1955/1976).\n3. SC/ST Prevention of Atrocities Act 1989.\n4. Reservation in educational institutions and legislature."
  },
  {
    "id": "pyq-social-2024-e1-q31",
    "subjectCode": "85E",
    "year": "2024",
    "examType": "Exam-1",
    "qNumber": 31,
    "marks": 3,
    "chapter": "Economics: Money and Credit / Banking",
    "ktbsSource": {
      "book": "KTBS Social Science Part-2 (Economics)",
      "chapterNumber": 2,
      "sectionOrPage": "Reserve Bank of India & Banking, Pages 154-156",
      "standard": "10th Standard (NCERT/KTBS 2026-27)"
    },
    "probabilityRating": 5,
    "probabilityScore": 93,
    "appearanceHistory": [
      "2024 Exam-1 (Q.31)",
      "2022 Exam-1 (Q.31)",
      "2020 Model"
    ],
    "cognitiveLevel": "Understanding (40%)",
    "expectedTimeMinutes": 6,
    "questionText": "State the primary functions of the Reserve Bank of India (RBI) as the central bank of our country.",
    "kannadaQuestionText": "ನಮ್ಮ ದೇಶದ ಕೇಂದ್ರೀಯ ಬ್ಯಾಂಕ್ ಆಗಿ ಭಾರತೀಯ ರಿಸರ್ವ್ ಬ್ಯಾಂಕ್ (ಆರ್‌ಬಿಐ) ನಿರ್ವಹಿಸುವ ಪ್ರಮುಖ ಕಾರ್ಯಗಳನ್ನು ತಿಳಿಸಿ.",
    "tags": [
      "Economics",
      "3-Marks",
      "Banking",
      "KTBS Economics"
    ],
    "schemeSteps": [
      {
        "point": "Issue of currency notes (Monopoly of note issue, except 1-rupee coins) (1M)",
        "marks": 1
      },
      {
        "point": "Banker to the government (maintains government accounts and advises on financial policy) (1M)",
        "marks": 1
      },
      {
        "point": "Bankers' bank and regulator of credit and monetary policy (Repo rate, CRR) (1M)",
        "marks": 1
      }
    ],
    "modelAnswerText": "1. Monopoly of currency note issue.\n2. Banker to the Central and State Governments.\n3. Bankers' Bank & Lender of Last Resort.\n4. Controller of credit and monetary policy in India."
  },
  {
    "id": "pyq-kannada-2023-e1-q42",
    "subjectCode": "01K",
    "year": "2023",
    "examType": "Exam-1",
    "qNumber": 42,
    "marks": 4,
    "chapter": "ಪದ್ಯ ಭಾಗ: ಕೌರವೇಂದ್ರನ ಕೊಂದೆ ನೀನು (ಕುಮಾರವ್ಯಾಸ)",
    "ktbsSource": {
      "book": "KTBS 10th Standard Siri Kannada",
      "chapterNumber": "Padya 2",
      "sectionOrPage": "Page 18, Kumaravyasa",
      "standard": "10th Standard (NCERT/KTBS 2026-27)"
    },
    "probabilityRating": 5,
    "probabilityScore": 95,
    "appearanceHistory": [
      "2023 Exam-1 (Q.42)",
      "2021 Model (Q.41)",
      "2019 Board (Q.42)"
    ],
    "cognitiveLevel": "Understanding (40%)",
    "expectedTimeMinutes": 12,
    "questionText": "“ಕೌರವೇಂದ್ರನ ಕೊಂದೆ ನೀನು...” — ಈ ಪದ್ಯ ಭಾಗದ ಭಾವಾರ್ಥವನ್ನು ನಿಮ್ಮ ಸ್ವಂತ ಮಾತುಗಳಲ್ಲಿ ಬರೆಯಿರಿ. (೪ ಅಂಕಗಳು)",
    "kannadaQuestionText": "“ಕೌರವೇಂದ್ರನ ಕೊಂದೆ ನೀನು...” ಪದ್ಯ ಭಾಗದ ಭಾವಾರ್ಥವನ್ನು ವಿವರಿಸಿ.",
    "tags": [
      "Bhavartha",
      "4-Marks",
      "Kannada Literature",
      "KTBS Siri Kannada"
    ],
    "schemeSteps": [
      {
        "point": "ಕವಿ ಕುಮಾರವ್ಯಾಸ ಹಾಗೂ ಕರ್ಣಾಟ ಭಾರತ ಕಥಾಮಂಜರಿ ಕೃತಿ ಪರಿಚಯ",
        "marks": 1
      },
      {
        "point": "ಶ್ರೀಕೃಷ್ಣನ ಕಪಟ ತಂತ್ರ ಹಾಗೂ ಕರ್ಣನ ಜನ್ಮ ರಹಸ್ಯ ಪ್ರಸ್ತಾಪದ ವಿವರಣೆ",
        "marks": 1.5
      },
      {
        "point": "ಕರ್ಣನ ದುಃಖ, ಸ್ವಾಮಿಭಕ್ತಿ ಹಾಗೂ ಅರ್ಜುನನ ಮೇಲಿನ ಭ್ರಾತೃಭಾವದ ವಿಶ್ಲೇಷಣೆ",
        "marks": 1.5
      }
    ],
    "modelAnswerText": "ಕುಮಾರವ್ಯಾಸ ಭಾರತದ ಈ ಸಂದರ್ಭದಲ್ಲಿ ಕೃಷ್ಣನು ಕರ್ಣನ ಜನ್ಮ ರಹಸ್ಯವನ್ನು ತಿಳಿಸಿ ಪಾಂಡವರ ಪಕ್ಷಕ್ಕೆ ಸೆಳೆಯಲು ಯತ್ನಿಸುತ್ತಾನೆ. ಆಗ ಕರ್ಣನು 'ನೀನು ನನ್ನ ಜನ್ಮ ರಹಸ್ಯ ಹೇಳಿ ಕೌರವೇಂದ್ರನನ್ನೇ ಕೊಂದಂತಾಯಿತು, ನಾನು ದುರ್ಯೋಧನನ ಋಣ ತೀರಿಸಲು ಪ್ರಾಣ ನೀಡುವೆ' ಎಂದು ಸ್ವಾಮಿಭಕ್ತಿಯಿಂದ ಹೇಳುತ್ತಾನೆ."
  },
  {
    "id": "pyq-kannada-2024-e1-q35",
    "subjectCode": "01K",
    "year": "2024",
    "examType": "Exam-1",
    "qNumber": 35,
    "marks": 3,
    "chapter": "ಗದ್ಯ ಭಾಗ: ಶಬರಿ (ಪು.ತಿ.ನ.)",
    "ktbsSource": {
      "book": "KTBS 10th Standard Siri Kannada",
      "chapterNumber": "Gadya 2",
      "sectionOrPage": "Page 26, Pu.Ti.Na.",
      "standard": "10th Standard (NCERT/KTBS 2026-27)"
    },
    "probabilityRating": 5,
    "probabilityScore": 96,
    "appearanceHistory": [
      "2024 Exam-1 (Q.35)",
      "2022 Exam-1 (Q.34)",
      "2020 Model"
    ],
    "cognitiveLevel": "Understanding (40%)",
    "expectedTimeMinutes": 7,
    "questionText": "“ಅರಸುಗಳೆಂಬುದು ಪೂಜ್ಯರೆ?” — ಈ ವಾಕ್ಯದ ಸಂದರ್ಭ ಸಹಿತ ಸ್ವಾರಸ್ಯವನ್ನು ಬರೆಯಿರಿ. (೩ ಅಂಕಗಳು)",
    "kannadaQuestionText": "“ಅರಸುಗಳೆಂಬುದು ಪೂಜ್ಯರೆ?” — ಸಂದರ್ಭ ಸಹಿತ ಸ್ವಾರಸ್ಯ ಬರೆಯಿರಿ.",
    "tags": [
      "Sandarbha",
      "3-Marks",
      "Shabari",
      "KTBS Siri Kannada"
    ],
    "schemeSteps": [
      {
        "point": "ಆಯ್ಕೆ: ಈ ವಾಕ್ಯವನ್ನು ಪು.ತಿ.ನರಸಿಂಹಾಚಾರ್ ಅವರ 'ಶಬರಿ' ಎಂಬ ಗೀತನಾಟಕ ಪಠ್ಯಭಾಗದಿಂದ ಆರಿಸಲಾಗಿದೆ (1M)",
        "marks": 1
      },
      {
        "point": "ಸಂದರ್ಭ: ಶ್ರೀರಾಮ ಮತ್ತು ಲಕ್ಷ್ಮಣರು ಮತಂಗಾಶ್ರಮಕ್ಕೆ ಬಂದಾಗ ಶಬರಿಯು ಮುಗ್ಧ ಭಕ್ತಿಯಿಂದ ಹೀಗೆ ನುಡಿಯುತ್ತಾಳೆ (1M)",
        "marks": 1
      },
      {
        "point": "ಸ್ವಾರಸ್ಯ: ರಾಜವಂಶಸ್ಥರಾದರೂ ಭಗವಂತನ ಅವತಾರವಾದ ರಾಮನ ಸೌಮ್ಯತೆ ಮತ್ತು ಶಬರಿಯ ನಿಷ್ಕಲ್ಮಷ ಭಕ್ತಿ ಇಲ್ಲಿ ಸ್ವಾರಸ್ಯಪೂರ್ಣವಾಗಿದೆ (1M)",
        "marks": 1
      }
    ],
    "modelAnswerText": "ಆಯ್ಕೆ: 'ಶಬರಿ' ಗೀತನಾಟಕ, ಕವಿ ಪು.ತಿ.ನ.\nಸಂದರ್ಭ: ರಾಮ-ಲಕ್ಷ್ಮಣರು ಮತಂಗಾಶ್ರಮಕ್ಕೆ ಬಂದಾಗ ಶಬರಿ ನುಡಿದ ಮಾತು.\nಸ್ವಾರಸ್ಯ: ಅರಸರ ವೈಭವಕ್ಕಿಂತ ದೈವಿಕ ಭಕ್ತಿಯೇ ಶ್ರೇಷ್ಠವೆಂಬ ಸತ್ಯ ವ್ಯಕ್ತವಾಗಿದೆ."
  },
  {
    "id": "pyq-kannada-2024-e1-q36",
    "subjectCode": "01K",
    "year": "2024",
    "examType": "Exam-1",
    "qNumber": 36,
    "marks": 3,
    "chapter": "ಗದ್ಯ ಭಾಗ: ಭಾಗ್ಯಶಿಲ್ಪಿಗಳು (ಸರ್. ಎಂ. ವಿಶ್ವೇಶ್ವರಯ್ಯ)",
    "ktbsSource": {
      "book": "KTBS 10th Standard Siri Kannada",
      "chapterNumber": "Gadya 4",
      "sectionOrPage": "Page 48, D.V.G.",
      "standard": "10th Standard (NCERT/KTBS 2026-27)"
    },
    "probabilityRating": 5,
    "probabilityScore": 94,
    "appearanceHistory": [
      "2024 Exam-1 (Q.36)",
      "2023 Exam-1 (Q.36)",
      "2021 Model"
    ],
    "cognitiveLevel": "Understanding (40%)",
    "expectedTimeMinutes": 7,
    "questionText": "“ಕಣ್ಣಿಲ್ಲದ ಕಾಲಿಗೆ ಮುಳ್ಳು ನಾಟದೇ ಇರುತ್ತದೆಯೇ?” — ಸಂದರ್ಭ ಸಹಿತ ಸ್ವಾರಸ್ಯವನ್ನು ಬರೆಯಿರಿ.",
    "kannadaQuestionText": "“ಕಣ್ಣಿಲ್ಲದ ಕಾಲಿಗೆ ಮುಳ್ಳು ನಾಟದೇ ಇರುತ್ತದೆಯೇ?” — ಸಂದರ್ಭ ಸಹಿತ ಸ್ವಾರಸ್ಯ ಬರೆಯಿರಿ.",
    "tags": [
      "Sandarbha",
      "3-Marks",
      "Bhagyashilpigalu",
      "KTBS 01K"
    ],
    "schemeSteps": [
      {
        "point": "ಆಯ್ಕೆ: ಡಿ.ವಿ.ಜಿ. ಅವರ 'ವೃತ್ತಿಜೀವನ ಚಿತ್ರಗಳು' ಕೃತಿಯ 'ಭಾಗ್ಯಶಿಲ್ಪಿಗಳು' ಪಾಠದಿಂದ ಆಯ್ದುಕೊಳ್ಳಲಾಗಿದೆ (1M)",
        "marks": 1
      },
      {
        "point": "ಸಂದರ್ಭ: ಸರ್ ಎಂ.ವಿ. ಅವರ ಪ್ರಾಮಾಣಿಕತೆ ಹಾಗೂ ಕಾಲಿನ ಚಪ್ಪಲಿ ಇಲ್ಲದೆ ನಡೆದ ಬಾಲ್ಯದ ಕಷ್ಟದ ಸನ್ನಿವೇಶ (1M)",
        "marks": 1
      },
      {
        "point": "ಸ್ವಾರಸ್ಯ: ಬಡತನದ ನಡುವೆಯೂ ಛಲಬಿಡದೆ ಬೆಳೆದ ವಿಶ್ವೇಶ್ವರಯ್ಯನವರ ಸಾಧನೆ ಮತ್ತು ಮಾತೃಪ್ರೇಮ ಇಲ್ಲಿ ಸ್ವಾರಸ್ಯಕರವಾಗಿದೆ (1M)",
        "marks": 1
      }
    ],
    "modelAnswerText": "ಆಯ್ಕೆ: 'ಭಾಗ್ಯಶಿಲ್ಪಿಗಳು' ಗದ್ಯ, ಲೇಖಕರು ಡಿ.ವಿ.ಜಿ.\nಸಂದರ್ಭ: ವಿಶ್ವೇಶ್ವರಯ್ಯನವರ ಬಾಲ್ಯದ ನಡಿಗೆಯ ಕಷ್ಟವನ್ನು ನೆನೆಯುವ ಸಂದರ್ಭ.\nಸ್ವಾರಸ್ಯ: ಪರಿಶ್ರಮ ಮತ್ತು ಸಂಕಷ್ಟಗಳೇ ಮಹಾನ್ ವ್ಯಕ್ತಿತ್ವವನ್ನು ರೂಪಿಸುತ್ತವೆ ಎಂಬ ಸಂದೇಶ."
  },
  {
    "id": "pyq-kannada-2023-e1-q28",
    "subjectCode": "01K",
    "year": "2023",
    "examType": "Exam-1",
    "qNumber": 28,
    "marks": 3,
    "chapter": "ವ್ಯಾಕರಣ: ಛಂದಸ್ಸು (ಮಾತ್ರಾಗಣ & ಷಟ್ಪದಿ)",
    "ktbsSource": {
      "book": "KTBS 10th Standard Siri Kannada",
      "chapterNumber": "Vyakarana Section",
      "sectionOrPage": "Chandassu, Pages 165-168",
      "standard": "10th Standard (NCERT/KTBS 2026-27)"
    },
    "probabilityRating": 5,
    "probabilityScore": 95,
    "appearanceHistory": [
      "2023 Exam-1 (Q.28)",
      "2022 Exam-1 (Q.28)",
      "2020 Board (Q.28)"
    ],
    "cognitiveLevel": "Skill (15%)",
    "expectedTimeMinutes": 6,
    "questionText": "ಕೊಟ್ಟಿರುವ ಪದ್ಯದ ಸಾಲಿಗೆ ಪ್ರಸ್ತಾರ ಹಾಕಿ, ಗಣ ವಿಭಾಗ ಮಾಡಿ, ಛಂದಸ್ಸಿನ ಹೆಸರನ್ನು ಬರೆಯಿರಿ:\n“ಬೆಳಗಿನ ಜಾವದಲಿ ಕೋಗಿಲೆಯು ಹಾಡುತಿರೆ”",
    "kannadaQuestionText": "ಪ್ರಸ್ತಾರ ಹಾಕಿ, ಗಣ ವಿಭಾಗ ಮಾಡಿ, ಛಂದಸ್ಸನ್ನು ಹೆಸರಿಸಿ.",
    "tags": [
      "Chandassu",
      "3-Marks",
      "Bhamini Shatpadi",
      "KTBS Grammar"
    ],
    "schemeSteps": [
      {
        "point": "ಸರಿಯಾದ ಲಘು (∪) ಮತ್ತು ಗುರು (—) ಗುರುತುಗಳನ್ನು ಹಾಕುವುದು (1M)",
        "marks": 1
      },
      {
        "point": "ಮಾತ್ರಾಗಣ ವಿಭಾಗ: ೩ - ೪ - ೩ - ೪ ಮಾತ್ರೆಗಳ ವಿಭಜನೆ (1M)",
        "marks": 1
      },
      {
        "point": "ಛಂದಸ್ಸಿನ ಹೆಸರು: ಭಾಮಿನಿ ಷಟ್ಪದಿ (1M)",
        "marks": 1
      }
    ],
    "modelAnswerText": "ಪ್ರಸ್ತಾರ:\n∪ ∪ ∪ | — ∪ ∪ — | ∪ ∪ ∪ | — ∪ ∪ —\n೩ + ೪ + ೩ + ೪ = ೧೪ ಮಾತ್ರೆಗಳು.\nಗಣ: ೩ ಮತ್ತು ೪ ಮಾತ್ರೆಗಳ ಗಣಗಳು.\nಛಂದಸ್ಸಿನ ಹೆಸರು: ಭಾಮಿನಿ ಷಟ್ಪದಿ."
  },
  {
    "id": "pyq-english-2024-e1-q35",
    "subjectCode": "31E",
    "year": "2024",
    "examType": "Exam-1",
    "qNumber": 35,
    "marks": 4,
    "chapter": "Poetry: Quality of Mercy (William Shakespeare)",
    "ktbsSource": {
      "book": "KTBS 10th English Reader (Second Language)",
      "chapterNumber": "Poem 3",
      "sectionOrPage": "Page 62, Memorization Stanza",
      "standard": "10th Standard (NCERT/KTBS 2026-27)"
    },
    "probabilityRating": 5,
    "probabilityScore": 98,
    "appearanceHistory": [
      "2024 Exam-1 (Q.35)",
      "2023 Exam-1 (Q.35)",
      "2022 Exam-1 (Q.35)",
      "Annual KSEAB Feature"
    ],
    "cognitiveLevel": "Knowledge (20%)",
    "expectedTimeMinutes": 5,
    "questionText": "Quote from memory: The quality of mercy is not strain'd; .................. To heaven.",
    "kannadaQuestionText": "ಕಂಠಪಾಠ ಪದ್ಯ ಬರೆಯಿರಿ: The quality of mercy...",
    "tags": [
      "Quote From Memory",
      "4-Marks",
      "Exact Verbatim",
      "KTBS 31E"
    ],
    "schemeSteps": [
      {
        "point": "Line 1-2: It droppeth as the gentle rain from heaven / Upon the place beneath: it is twice blest; (2M)",
        "marks": 2
      },
      {
        "point": "Line 3-4: It blesseth him that gives and him that takes: / 'Tis mightiest in the mightiest; it becomes / The throned monarch better than his crown; (2M)",
        "marks": 2
      }
    ],
    "modelAnswerText": "The quality of mercy is not strain'd;\nIt droppeth as the gentle rain from heaven\nUpon the place beneath: it is twice blest;\nIt blesseth him that gives and him that takes:\n'Tis mightiest in the mightiest; it becomes\nThe throned monarch better than his crown;",
    "choiceAlternative": {
      "questionText": "OR: Quote from memory: The Temple and the Body (Basavanna - 'The rich will make temples for Siva...')",
      "examinerVerdict": "Preferred (High-Scoring)",
      "verdictReason": "'Quality of Mercy' has strictly codified poetic rhyme and meter with zero translation variance, ensuring guaranteed 4/4 marks."
    }
  },
  {
    "id": "pyq-english-2024-e1-q37",
    "subjectCode": "31E",
    "year": "2024",
    "examType": "Exam-1",
    "qNumber": 37,
    "marks": 4,
    "chapter": "Writing: Formal Letter Writing",
    "ktbsSource": {
      "book": "KTBS 10th English Reader",
      "chapterNumber": "Writing Skills",
      "sectionOrPage": "Official Letters Section, Page 142",
      "standard": "10th Standard (NCERT/KTBS 2026-27)"
    },
    "probabilityRating": 5,
    "probabilityScore": 97,
    "appearanceHistory": [
      "2024 Exam-1 (Q.37)",
      "2023 Exam-1 (Q.37)",
      "2022 Exam-1 (Q.37)"
    ],
    "cognitiveLevel": "Skill (15%)",
    "expectedTimeMinutes": 10,
    "questionText": "Write a letter to the Municipal Commissioner of your city complaining about the irregular water supply and contaminated drinking water in your locality.",
    "kannadaQuestionText": "ನಿಮ್ಮ ಬಡಾವಣೆಯಲ್ಲಿ ಕುಡಿಯುವ ನೀರಿನ ಸಮಸ್ಯೆ ಕುರಿತು ನಗರಪಾಲಿಕೆ ಆಯುಕ್ತರಿಗೆ ಅಧಿಕೃತ ಪತ್ರ ಬರೆಯಿರಿ.",
    "tags": [
      "Letter Writing",
      "4-Marks",
      "Writing Skills",
      "KTBS 31E"
    ],
    "schemeSteps": [
      {
        "point": "From address and Date (top-left, no commas at line ends) (1M)",
        "marks": 1
      },
      {
        "point": "To address, Salutation (Respected Sir,) and Subject line (1M)",
        "marks": 1
      },
      {
        "point": "Body of letter in 2-3 well-organized paragraphs detailing grievance and request (1.5M)",
        "marks": 1.5
      },
      {
        "point": "Subscription: 'Yours faithfully' (strictly no apostrophe in Yours) and sender name (0.5M)",
        "marks": 0.5
      }
    ],
    "modelAnswerText": "Follow the 7-block structure: From Address, Date, To Address (The Municipal Commissioner), Respected Sir, Subject: Complaint regarding irregular water supply, Body (Problem, Inconvenience, Appeal), Yours faithfully, Signature."
  },
  {
    "id": "pyq-english-2023-e1-q33",
    "subjectCode": "31E",
    "year": "2023",
    "examType": "Exam-1",
    "qNumber": 33,
    "marks": 3,
    "chapter": "Writing: Profile Writing (Bio-data)",
    "ktbsSource": {
      "book": "KTBS 10th English Reader",
      "chapterNumber": "Writing Skills",
      "sectionOrPage": "Information Transfer, Page 118",
      "standard": "10th Standard (NCERT/KTBS 2026-27)"
    },
    "probabilityRating": 5,
    "probabilityScore": 95,
    "appearanceHistory": [
      "2023 Exam-1 (Q.33)",
      "2022 Exam-1 (Q.33)",
      "2021 Model"
    ],
    "cognitiveLevel": "Understanding (40%)",
    "expectedTimeMinutes": 7,
    "questionText": "Given below is a profile of P.T. Usha. Write a paragraph using the clues:\n• Born: 27 June 1964, Payyoli, Kerala\n• Known as: Payyoli Express, Queen of Indian Track and Field\n• Coach: O.M. Nambiar\n• Achievements: Won 4 Gold medals in 1986 Seoul Asian Games\n• Awards: Arjuna Award (1983), Padma Shri (1985)\n• Present role: President of Indian Olympic Association (IOA).",
    "kannadaQuestionText": "ನೀಡಿರುವ ಮಾಹಿತಿ ಆಧರಿಸಿ ಪಿ.ಟಿ. ಉಷಾ ಅವರ ಕಿರು ಪರಿಚಯ ಪ್ಯಾರಾಗ್ರಾಫ್ ಬರೆಯಿರಿ.",
    "tags": [
      "Profile Writing",
      "3-Marks",
      "Writing",
      "KTBS 31E"
    ],
    "schemeSteps": [
      {
        "point": "Suitable title (Profile of P.T. Usha) and birth details in coherent sentences (1M)",
        "marks": 1
      },
      {
        "point": "Expansion of achievements and awards using appropriate conjunctions and tense (1M)",
        "marks": 1
      },
      {
        "point": "Grammatical accuracy, cohesive linkers, and concluding sentence on IOA presidency (1M)",
        "marks": 1
      }
    ],
    "modelAnswerText": "Title: Profile of P.T. Usha\nP.T. Usha was born on 27 June 1964 at Payyoli in Kerala. She is popularly known as the 'Payyoli Express' and the 'Queen of Indian Track and Field'. She was coached by O.M. Nambiar. In the 1986 Seoul Asian Games, she won four gold medals. For her outstanding contributions to athletics, she was honoured with the Arjuna Award in 1983 and the Padma Shri in 1985. Currently, she serves as the President of the Indian Olympic Association."
  },
  {
    "id": "pyq-english-2024-e1-q24",
    "subjectCode": "31E",
    "year": "2024",
    "examType": "Exam-1",
    "qNumber": 24,
    "marks": 2,
    "chapter": "Grammar: Reported Speech & Passive Voice",
    "ktbsSource": {
      "book": "KTBS 10th English Reader",
      "chapterNumber": "Grammar Section",
      "sectionOrPage": "Reported Speech & Voice, Pages 160-164",
      "standard": "10th Standard (NCERT/KTBS 2026-27)"
    },
    "probabilityRating": 5,
    "probabilityScore": 96,
    "appearanceHistory": [
      "2024 Exam-1 (Q.24)",
      "2023 Exam-1 (Q.24)",
      "2022 Exam-1 (Q.23)"
    ],
    "cognitiveLevel": "Application (25%)",
    "expectedTimeMinutes": 4,
    "questionText": "(a) Change into Indirect Speech: The teacher said to Rahul, 'Have you completed your project?'\n(b) Change into Passive Voice: Shakespeare wrote 'The Merchant of Venice'.",
    "kannadaQuestionText": "(a) ಪರೋಕ್ಷ ಕಥನಕ್ಕೆ ಬದಲಾಯಿಸಿ (b) ಕರ್ಮಣಿ ಪ್ರಯೋಗಕ್ಕೆ ಬದಲಾಯಿಸಿ.",
    "tags": [
      "Grammar",
      "2-Marks",
      "Direct-Indirect",
      "Passive Voice"
    ],
    "schemeSteps": [
      {
        "point": "(a) Indirect Speech: The teacher asked Rahul if (or whether) he had completed his project. (1M)",
        "marks": 1
      },
      {
        "point": "(b) Passive Voice: 'The Merchant of Venice' was written by Shakespeare. (1M)",
        "marks": 1
      }
    ],
    "modelAnswerText": "(a) The teacher asked Rahul whether he had completed his project.\n(b) 'The Merchant of Venice' was written by Shakespeare."
  },
  {
    "id": "pyq-hindi-2024-e1-q35",
    "subjectCode": "61H",
    "year": "2024",
    "examType": "Exam-1",
    "qNumber": 35,
    "marks": 4,
    "chapter": "पद्य: दोहे (कबीर दास)",
    "ktbsSource": {
      "book": "KTBS 10th Standard Hindi (Third Language)",
      "chapterNumber": "Padya 1",
      "sectionOrPage": "Page 14, Kabir ke Dohe",
      "standard": "10th Standard (NCERT/KTBS 2026-27)"
    },
    "probabilityRating": 5,
    "probabilityScore": 98,
    "appearanceHistory": [
      "2024 Exam-1 (Q.35)",
      "2023 Exam-1 (Q.35)",
      "2022 Exam-1 (Q.35)"
    ],
    "cognitiveLevel": "Knowledge (20%)",
    "expectedTimeMinutes": 6,
    "questionText": "कबीर दास जी के दोहे कंठस्थ लिखिए:\n'काल करे सो आज कर...'\nअथवा\n'ऐसी बानी बोलिए...'",
    "kannadaQuestionText": "ಕಬೀರದಾಸರ ದೋಹೆಗಳನ್ನು ಕಂಠಪಾಠ ಬರೆಯಿರಿ.",
    "tags": [
      "Quote From Memory",
      "4-Marks",
      "Kabir Dohe",
      "KTBS Hindi"
    ],
    "schemeSteps": [
      {
        "point": "पहला चरण: 'काल करे सो आज कर, आज करे सो अब। पल में प्रलय होएगी, बहुरि करेगा कब॥' (2M)",
        "marks": 2
      },
      {
        "point": "दूसरा चरण: 'ऐसी बानी बोलिए, मन का आपा खोइ। औरन को सीतल करै, आपहु सीतल होइ॥' (2M)",
        "marks": 2
      }
    ],
    "modelAnswerText": "काल करे सो आज कर, आज करे सो अब।\nपल में प्रलय होएगी, बहुरि करेगा कब॥\n\nऐसी बानी बोलिए, मन का आपा खोइ।\nऔरन को सीतल करै, आपहु सीतल होइ॥"
  },
  {
    "id": "pyq-hindi-2024-e1-q36",
    "subjectCode": "61H",
    "year": "2024",
    "examType": "Exam-1",
    "qNumber": 36,
    "marks": 4,
    "chapter": "लेखन: औपचारिक पत्र लेखन (प्रार्थना पत्र)",
    "ktbsSource": {
      "book": "KTBS 10th Standard Hindi",
      "chapterNumber": "Patra Lekhan",
      "sectionOrPage": "Page 134, Prarthana Patra",
      "standard": "10th Standard (NCERT/KTBS 2026-27)"
    },
    "probabilityRating": 5,
    "probabilityScore": 96,
    "appearanceHistory": [
      "2024 Exam-1 (Q.36)",
      "2023 Exam-1 (Q.36)",
      "2022 Model"
    ],
    "cognitiveLevel": "Skill (15%)",
    "expectedTimeMinutes": 8,
    "questionText": "तीन दिन के अवकाश की प्रार्थना करते हुए अपने विद्यालय के प्रधानाचार्य को प्रार्थना पत्र लिखिए।",
    "kannadaQuestionText": "ಮೂರು ದಿನಗಳ ರಜೆ ಕೋರಿ ಶಾಲಾ ಮುಖ್ಯೋಪಾಧ್ಯಾಯರಿಗೆ ಹಿಂದಿಯಲ್ಲಿ ಪತ್ರ ಬರೆಯಿರಿ.",
    "tags": [
      "Letter Writing",
      "4-Marks",
      "Formal Letter",
      "KTBS Hindi"
    ],
    "schemeSteps": [
      {
        "point": "सेवा में, प्रधानाचार्य जी, विद्यालय का नाम एवं स्थान (1M)",
        "marks": 1
      },
      {
        "point": "विषय: तीन दिन के अवकाश हेतु प्रार्थना पत्र एवं महोदय संबोधन (1M)",
        "marks": 1
      },
      {
        "point": "पत्र का मुख्य भाग: बीमारी / आवश्यक कार्य का कारण और 3 दिन के अवकाश की प्रार्थना (1.5M)",
        "marks": 1.5
      },
      {
        "point": "धन्यवाद, आज्ञाकारी छात्र / छात्रा, नाम एवं दिनांक (0.5M)",
        "marks": 0.5
      }
    ],
    "modelAnswerText": "सेवा में,\nप्रधानाचार्य महोदय,\nशासकीय उच्च विद्यालय, बेंगलूरु।\n\nविषय: तीन दिन के अवकाश हेतु प्रार्थना पत्र।\n\nमहोदय,\nसविनय निवेदन है कि मुझे कल रात से तीव्र ज्वर है। अतः डॉक्टर ने तीन दिन विश्राम की सलाह दी है। इसलिए मैं दिनांक 20-03-2027 से 22-03-2027 तक विद्यालय आने में असमर्थ हूँ।\nअतः आपसे प्रार्थना है कि मुझे तीन दिन का अवकाश प्रदान करने की कृपा करें।\n\nसधन्यवाद।\nआपका आज्ञाकारी छात्र,\nथरिका एन, कक्षा १०वीं।\nदिनांक: 19-03-2027"
  },
  {
    "id": "pyq-hindi-2023-e1-q30",
    "subjectCode": "61H",
    "year": "2023",
    "examType": "Exam-1",
    "qNumber": 30,
    "marks": 3,
    "chapter": "व्याकरण: मुहावरे और वाक्य प्रयोग",
    "ktbsSource": {
      "book": "KTBS 10th Standard Hindi",
      "chapterNumber": "Vyakarana",
      "sectionOrPage": "Muhavare Section, Page 112",
      "standard": "10th Standard (NCERT/KTBS 2026-27)"
    },
    "probabilityRating": 5,
    "probabilityScore": 95,
    "appearanceHistory": [
      "2023 Exam-1 (Q.30)",
      "2022 Exam-1 (Q.29)",
      "2020 Board"
    ],
    "cognitiveLevel": "Understanding (40%)",
    "expectedTimeMinutes": 6,
    "questionText": "निम्नलिखित मुहावरों का अर्थ लिखकर वाक्यों में प्रयोग कीजिए:\n(क) नौ दो ग्यारह होना\n(ख) आँखों का तारा होना\n(ग) दाँत खट्टे करना।",
    "kannadaQuestionText": "ಹಿಂದಿ ನುಡಿಗಟ್ಟುಗಳ ಅರ್ಥ ಬರೆದು ವಾಕ್ಯದಲ್ಲಿ ಬಳಸಿ.",
    "tags": [
      "Muhavare",
      "3-Marks",
      "Grammar",
      "KTBS Hindi"
    ],
    "schemeSteps": [
      {
        "point": "(क) नौ दो ग्यारह होना = भाग जाना। वाक्य: पुलिस को देखकर चोर नौ दो ग्यारह हो गए। (1M)",
        "marks": 1
      },
      {
        "point": "(ख) आँखों का तारा होना = बहुत प्यारा होना। वाक्य: रोहन अपनी माँ की आँखों का तारा है। (1M)",
        "marks": 1
      },
      {
        "point": "(ग) दाँत खट्टे करना = हराना या पराजित करना। वाक्य: भारतीय सैनिकों ने शत्रुओं के दाँत खट्टे कर दिए। (1M)",
        "marks": 1
      }
    ],
    "modelAnswerText": "(क) नौ दो ग्यारह होना → भाग जाना (वाक्य: सिपाही को देखते ही जेबकतरा नौ दो ग्यारह हो गया।)\n(ख) आँखों का तारा होना → बहुत प्यारा होना (वाक्य: हर बच्चा अपने माता-पिता की आँखों का तारा होता है।)\n(ग) दाँत खट्टे करना → पराजित करना (वाक्य: हमारी टीम ने फाइनल मैच में विरोधी दल के दाँत खट्टे कर दिए।)"
  },
  {
    "id": "pyq-hindi-2024-e1-q25",
    "subjectCode": "61H",
    "year": "2024",
    "examType": "Exam-1",
    "qNumber": 25,
    "marks": 2,
    "chapter": "व्याकरण: काल परिवर्तन (वर्तमान, भूत, भविष्यत्)",
    "ktbsSource": {
      "book": "KTBS 10th Standard Hindi",
      "chapterNumber": "Vyakarana",
      "sectionOrPage": "Kaal Parivartan, Page 120",
      "standard": "10th Standard (NCERT/KTBS 2026-27)"
    },
    "probabilityRating": 5,
    "probabilityScore": 97,
    "appearanceHistory": [
      "2024 Exam-1 (Q.25)",
      "2023 Exam-1 (Q.25)",
      "2022 Exam-1 (Q.24)"
    ],
    "cognitiveLevel": "Application (25%)",
    "expectedTimeMinutes": 4,
    "questionText": "निर्देशानुसार काल परिवर्तन कीजिए:\n(क) मोहन पुस्तक पढ़ता है। (सामान्य भूतकाल में बदलिए)\n(ख) सीता गाना गाएगी। (सामान्य वर्तमान काल में बदलिए)",
    "kannadaQuestionText": "ಸೂಚನೆಗೆ ತಕ್ಕಂತೆ ಕಾಲ ಪರಿವರ್ತನೆ ಮಾಡಿ.",
    "tags": [
      "Kaal Parivartan",
      "2-Marks",
      "Tense Change",
      "KTBS Hindi"
    ],
    "schemeSteps": [
      {
        "point": "(क) सामान्य भूतकाल: मोहन ने पुस्तक पढ़ी। (सकर्मक क्रिया में 'ने' प्रत्यय अनिवार्य) (1M)",
        "marks": 1
      },
      {
        "point": "(ख) सामान्य वर्तमान काल: सीता गाना गाती है। (1M)",
        "marks": 1
      }
    ],
    "modelAnswerText": "(क) मोहन ने पुस्तक पढ़ी।\n(ख) सीता गाना गाती है।"
  }
];

export const INITIAL_MISTAKES: MistakeItem[] = [
  {
    id: "mistake-1",
    subjectCode: "81E",
    topic: "Trigonometric Identities",
    questionSummary: "Proving (tan θ + sec θ - 1) / (tan θ - sec θ + 1) = (1 + sin θ) / cos θ",
    errorType: "Formula Error",
    markLost: 0.5,
    howToAvoid: "Forgot to substitute 1 = sec²θ - tan²θ in numerator. Always remember identity 1 + tan²θ = sec²θ.",
    loggedDate: "2026-11-08",
    isMastered: false,
    ktbsChapterRef: "NCERT Class 10 Maths Ch 8, Exercise 8.4 Q5(v), Page 194",
  },
  {
    id: "mistake-2",
    subjectCode: "83E",
    topic: "Light - Reflection & Refraction",
    questionSummary: "Concave mirror magnification numerical (m = -v/u)",
    errorType: "Unit Missing",
    markLost: 0.5,
    howToAvoid: "Wrote final focal length as -15 instead of boxing with units: [-15 cm]. KSEAB marks deduct 0.5M for missing SI units.",
    loggedDate: "2026-11-09",
    isMastered: true,
    ktbsChapterRef: "NCERT Class 10 Science Ch 9, Example 9.1, Page 149",
  },
  {
    id: "mistake-3",
    subjectCode: "85E",
    topic: "India Map Q.38",
    questionSummary: "Location of Digboi Oil Refinery",
    errorType: "Diagram Label",
    markLost: 1.0,
    howToAvoid: "Marked Digboi in Arunachal Pradesh border instead of eastern Assam. Memorize key landmark: upper Assam valley.",
    loggedDate: "2026-11-10",
    isMastered: false,
    ktbsChapterRef: "KTBS Social Science Part-2 Geography Ch 8, Page 140",
  },
  {
    id: "mistake-4",
    subjectCode: "01K",
    topic: "ವ್ಯಾಕರಣ - ಸಮಾಸಗಳು (Grammar)",
    questionSummary: "ಹೊಸಗನ್ನಡ - ಸಮಾಸ ಗುರುತಿಸಿ",
    errorType: "Grammar / Script",
    markLost: 0.5,
    howToAvoid: "Confused Karmadharaya with Tatpurusha samasa. 'ಹಿರಿದಾದ + ಮರ = ಹೆಮ್ಮರ' is Karmadharaya (ವಿಶೇಷಣ + ವಿಶೇಷ್ಯ).",
    loggedDate: "2026-11-11",
    isMastered: false,
    ktbsChapterRef: "KTBS Siri Kannada 10th Std Vyakarana Section, Page 172",
  },
  {
    id: "mistake-5",
    subjectCode: "81E",
    topic: "Linear Equation Graph Q.37",
    questionSummary: "Scale representation on graph top-right corner",
    errorType: "Incomplete Statement",
    markLost: 0.5,
    howToAvoid: "Forgot to write 'Scale: X-axis 1 cm = 1 unit; Y-axis 1 cm = 1 unit'. Even with correct lines, scale missing loses 0.5M.",
    loggedDate: "2026-11-12",
    isMastered: false,
    ktbsChapterRef: "NCERT Class 10 Maths Ch 3, Section 3.2, Page 44",
  },
];

export const BLUEPRINT_TOPICS: BlueprintTopic[] = [
  // =========================================================================
  // 1. MATHEMATICS (81E) — 80 MARKS
  // =========================================================================
  {
    id: "bp-1",
    subjectCode: "81E",
    title: "Basic Proportionality Theorem (BPT / Thales Theorem)",
    kannadaTitle: "ಥೇಲ್ಸ್ ಪ್ರಮೇಯ (ಮೂಲ ಸಮಾನುಪಾತತೆಯ ಪ್ರಮೇಯ)",
    marks: 4,
    category: "4M Theorem",
    frequency: "100% Guaranteed Every Year",
    probabilityScore: 99,
    ktbsCitation: "NCERT Class 10 Mathematics, Chapter 6: Triangles, Theorem 6.1, Page 124",
    isCompleted: true,
    notes: "Requires formal Given, To Prove, Construction headings and area ratio reasoning.",
    safeChoiceAdvice: "Always pick BPT over Converse of BPT in internal choice. Evaluators have the most standardized key for BPT.",
  },
  {
    id: "bp-2",
    subjectCode: "81E",
    title: "Pythagoras Theorem or Tangent Theorem (10.2)",
    kannadaTitle: "ಪೈಥಾಗೊರಸ್ ಪ್ರಮೇಯ / ಸ್ಪರ್ಶಕಗಳ ಪ್ರಮೇಯ (Theorem 10.2)",
    marks: 4,
    category: "4M Theorem",
    frequency: "100% Guaranteed Every Year",
    probabilityScore: 98,
    ktbsCitation: "NCERT Class 10 Maths Ch 6 (Theorem 6.8) & Ch 10 Circles (Theorem 10.2), Page 211",
    isCompleted: false,
    notes: "Alternates between Pythagoras Theorem and Circles 4M Tangent Theorem (length of tangents from external point are equal).",
    safeChoiceAdvice: "If Circle Tangent Theorem (10.2) is offered as alternative to Pythagoras, pick Tangent Theorem! It has only 4 steps vs 10 steps in Pythagoras.",
  },
  {
    id: "bp-3",
    subjectCode: "81E",
    title: "Pair of Linear Equations (Graphic Method Q.37)",
    kannadaTitle: "ರೇಖಾತ್ಮಕ ಸಮೀಕರಣಗಳ ನಕ್ಷಾ ವಿಧಾನ (Q.37)",
    marks: 4,
    category: "4M Linear Graph",
    frequency: "100% Guaranteed Every Year",
    probabilityScore: 99,
    ktbsCitation: "NCERT Class 10 Mathematics, Chapter 3: Pair of Linear Equations, Exercise 3.2, Page 44",
    isCompleted: true,
    notes: "Table of 3 coordinates + Axes Scale + Explicit coordinates (x, y) = 4/4 marks.",
    safeChoiceAdvice: "Compulsory question in Section V with zero alternative. Always find integer coordinates first.",
  },
  {
    id: "bp-4",
    subjectCode: "81E",
    title: "Surface Areas & Volumes: Composite Solid (Q.36 / Q.38)",
    kannadaTitle: "ಮೇಲ್ಮೈ ವಿಸ್ತೀರ್ಣಗಳು ಮತ್ತು ಘನಫಲಗಳು (ಸಂಯುಕ್ತ ಘನಗಳು)",
    marks: 5,
    category: "Key Concept",
    frequency: "100% Guaranteed Every Year",
    probabilityScore: 97,
    ktbsCitation: "NCERT Class 10 Mathematics, Chapter 12: Surface Areas and Volumes, Exercise 12.1 & 12.2",
    isCompleted: false,
    notes: "Cylinder + Cone or Hemisphere combination. Box the final answer with correct cubic units (cm³ / m³).",
    safeChoiceAdvice: "Write out each surface component formula separately before plugging in values to protect partial step marks.",
  },
  {
    id: "bp-5",
    subjectCode: "81E",
    title: "Heights & Distances: Applications of Trigonometry",
    kannadaTitle: "ತ್ರಿಕೋನಮಿತಿಯ ಅನ್ವಯಗಳು (ಎತ್ತರಗಳು ಮತ್ತು ದೂರಗಳು)",
    marks: 4,
    category: "Key Concept",
    frequency: "High Probability (85%+)",
    probabilityScore: 94,
    ktbsCitation: "NCERT Class 10 Mathematics, Chapter 9: Some Applications of Trigonometry, Page 203",
    isCompleted: false,
    notes: "Dual angle of elevation / depression diagram + tan 30°, tan 45°, tan 60° substitution.",
    safeChoiceAdvice: "Draw the labeled right-angle triangle diagram first; examiners allot 1 mark strictly for the figure.",
  },
  {
    id: "bp-6",
    subjectCode: "81E",
    title: "Statistics: Ogive Graph (Less-than / More-than type)",
    kannadaTitle: "ಓಜೀವ್ ನಕ್ಷೆ (ಕಡಿಮೆ / ಹೆಚ್ಚು ಇರುವ ವಿಧಾನ)",
    marks: 3,
    category: "4M Linear Graph",
    frequency: "High Probability (85%+)",
    probabilityScore: 92,
    ktbsCitation: "NCERT Class 10 Mathematics, Chapter 13: Statistics, Section 13.5, Page 291",
    isCompleted: false,
    notes: "Cumulative frequency table + S-curve smooth plotting through points.",
    safeChoiceAdvice: "If Ogive is paired with Mode/Median calculation, pick Ogive if you have a ruler and smooth curve control.",
  },
  {
    id: "bp-7",
    subjectCode: "81E",
    title: "Arithmetic Progressions: Sum to n terms (Sn Sums)",
    kannadaTitle: "ಸಮಾಂತರ ಶ್ರೇಢಿಗಳು (Sn ಮತ್ತು an ಸೂತ್ರದ ಲೆಕ್ಕಗಳು)",
    marks: 3,
    category: "3M Numericals",
    frequency: "100% Guaranteed Every Year",
    probabilityScore: 96,
    ktbsCitation: "NCERT Class 10 Mathematics, Chapter 5: Arithmetic Progressions, Section 5.3, Page 107",
    isCompleted: true,
    notes: "Sn = n/2 [2a + (n-1)d] or Sn = n/2 [a + l]. Step-marking keys verify formula citation.",
    safeChoiceAdvice: "Always state given values clearly: a = ..., d = ..., n = ..., Sn = ... before calculation.",
  },
  {
    id: "bp-8",
    subjectCode: "81E",
    title: "Real Numbers: Prove that √3 / √5 is an Irrational Number",
    kannadaTitle: "ಭಾಗಲಬ್ಧವಲ್ಲದ ಸಂಖ್ಯೆ ಎಂದು ಸಾಧಿಸುವುದು (√5 ಅಭಾಗಲಬ್ಧ ಸಂಖ್ಯೆ)",
    marks: 3,
    category: "Key Concept",
    frequency: "100% Guaranteed Every Year",
    probabilityScore: 98,
    ktbsCitation: "NCERT Class 10 Mathematics, Chapter 1: Real Numbers, Theorem 1.3, Page 12",
    isCompleted: true,
    notes: "Proof by contradiction. Must state co-prime assumption and p² divisible by 5 implies p divisible by 5.",
    safeChoiceAdvice: "Memorize the 6-line standard proof template. Zero chance of mark deduction if written verbatim.",
  },

  // =========================================================================
  // 2. SCIENCE (83E) — 80 MARKS (Physics 27M, Chemistry 25M, Biology 28M)
  // =========================================================================
  {
    id: "bp-9",
    subjectCode: "83E",
    title: "Ray Diagrams: Concave Mirror & Convex Lens",
    kannadaTitle: "ದರ್ಪಣ ಮತ್ತು ಮಸೂರಗಳ ಕಿರಣ ಚಿತ್ರಗಳು",
    marks: 4,
    category: "4M/5M Diagram",
    frequency: "100% Guaranteed Every Year",
    probabilityScore: 98,
    ktbsCitation: "NCERT Class 10 Science, Chapter 9: Light, Figures 9.7 & 9.16, Pages 146 & 155",
    isCompleted: true,
    notes: "Arrows on rays are compulsory! Nature, position, and relative size must be written.",
    safeChoiceAdvice: "Always draw rays with sharp 2B pencil and ruler. Never freehand optics lines.",
  },
  {
    id: "bp-10",
    subjectCode: "83E",
    title: "Human Brain & Nervous System Diagram",
    kannadaTitle: "ಮಾನವನ ಮಿದುಳು ರಚನೆ ಮತ್ತು ಕಾರ್ಯಗಳು",
    marks: 4,
    category: "4M/5M Diagram",
    frequency: "100% Guaranteed Every Year",
    probabilityScore: 96,
    ktbsCitation: "NCERT Class 10 Science, Chapter 6: Control and Coordination, Figure 6.3, Page 104",
    isCompleted: false,
    notes: "Labelling: Cerebrum, Cerebellum, Medulla, Pons, Cranium (Skull). Label on the right-hand side with ruler.",
    safeChoiceAdvice: "Human Brain is faster to sketch and has distinct color-coded regions compared to Human Heart.",
  },
  {
    id: "bp-11",
    subjectCode: "83E",
    title: "Human Excretory System & Nephron Diagram",
    kannadaTitle: "ಮಾನವನ ವಿಸರ್ಜನಾಂಗ ವ್ಯೂಹ ಮತ್ತು ನೆಫ್ರಾನ್ ಚಿತ್ರ",
    marks: 4,
    category: "4M/5M Diagram",
    frequency: "100% Guaranteed Every Year",
    probabilityScore: 97,
    ktbsCitation: "NCERT Class 10 Science, Chapter 5: Life Processes, Figure 5.13 & 5.14, Pages 96-97",
    isCompleted: false,
    notes: "Excretory system: Kidney, Ureter, Urinary Bladder, Urethra. Nephron: Bowman's capsule, Glomerulus, Tubule.",
    safeChoiceAdvice: "Neatness and parallel ruler labelling lines guarantee 4/4 marks in KSEAB valuation.",
  },
  {
    id: "bp-12",
    subjectCode: "83E",
    title: "Electric Motor & Electromagnetic Induction Principle",
    kannadaTitle: "ವಿದ್ಯುತ್ ಮೋಟಾರ್ / ಜನರೇಟರ್ ತತ್ವ ಮತ್ತು ರಚನೆ",
    marks: 4,
    category: "4M/5M Diagram",
    frequency: "100% Guaranteed Every Year",
    probabilityScore: 95,
    ktbsCitation: "NCERT Class 10 Science, Chapter 12: Magnetic Effects of Electric Current, Figure 12.15, Page 208",
    isCompleted: false,
    notes: "Fleming's Left-Hand rule application + Split ring commutator and carbon brush functions.",
    safeChoiceAdvice: "Electric Motor is asked 3x more often than AC Generator. Memorize the function of carbon brushes.",
  },
  {
    id: "bp-13",
    subjectCode: "83E",
    title: "Carbon Compounds: Esterification & Saponification",
    kannadaTitle: "ಎಸ್ಟರೀಕರಣ ಮತ್ತು ಸಾಬೂನೀಕರಣ ಕ್ರಿಯೆಗಳು",
    marks: 3,
    category: "Key Concept",
    frequency: "100% Guaranteed Every Year",
    probabilityScore: 94,
    ktbsCitation: "NCERT Class 10 Science, Chapter 4: Carbon and Its Compounds, Section 4.4, Page 72",
    isCompleted: true,
    notes: "CH₃COOH + C₂H₅OH → CH₃COOC₂H₅ + H₂O. Balanced chemical equations are mandatory for full marks.",
    safeChoiceAdvice: "State the sweet smell of ester and catalyst (conc. H₂SO₄) explicitly in the answer.",
  },
  {
    id: "bp-14",
    subjectCode: "83E",
    title: "Ohm's Law & Resistors in Series and Parallel",
    kannadaTitle: "ಓಮ್‌ನ ನಿಯಮ ಮತ್ತು ರೋಧಗಳ ಸಂಯೋಜನೆ",
    marks: 3,
    category: "3M Numericals",
    frequency: "100% Guaranteed Every Year",
    probabilityScore: 96,
    ktbsCitation: "NCERT Class 10 Science, Chapter 11: Electricity, Section 11.6, Page 187",
    isCompleted: true,
    notes: "Equivalent resistance: Rs = R1 + R2 + R3 vs 1/Rp = 1/R1 + 1/R2 + 1/R3. Box final answer with Ω unit.",
    safeChoiceAdvice: "Include the circuit diagram even if not explicitly asked; evaluators award bonus presentation marks.",
  },
  {
    id: "bp-15",
    subjectCode: "83E",
    title: "Mendel's Monohybrid & Dihybrid Cross Ratios",
    kannadaTitle: "ಮೆಂಡಲನ ಏಕತಳೀಕರಣ ಮತ್ತು ದ್ವಿತಳೀಕರಣ ಪ್ರಯೋಗ",
    marks: 3,
    category: "Key Concept",
    frequency: "High Probability (85%+)",
    probabilityScore: 93,
    ktbsCitation: "NCERT Class 10 Science, Chapter 8: Heredity and Evolution, Section 8.2, Page 144",
    isCompleted: false,
    notes: "Monohybrid: Phenotypic 3:1, Genotypic 1:2:1. Dihybrid: 9:3:3:1. Punnett square drawing required.",
    safeChoiceAdvice: "Use standard TT, Tt, tt notation clearly labeled with Tall and Dwarf indicators.",
  },

  // =========================================================================
  // 3. SOCIAL SCIENCE (85E) — 80 MARKS (History, Pol Sci, Geog, Econ, Soc, Biz)
  // =========================================================================
  {
    id: "bp-16",
    subjectCode: "85E",
    title: "Question 38: India Outline Map & 4-Point Location (5M)",
    kannadaTitle: "ಪ್ರಶ್ನೆ ೩೮: ಭಾರತದ ನಕ್ಷೆ ಮತ್ತು ೪ ಸ್ಥಳಗಳು (೫ ಅಂಕಗಳು)",
    marks: 5,
    category: "5M India Map",
    frequency: "100% Guaranteed Every Year",
    probabilityScore: 99,
    ktbsCitation: "KTBS Class 10 Social Science Part-2 (Geography), Chapters 1 to 10",
    isCompleted: true,
    notes: "Outline map of India (1M) + 4 locations (Kaiga, Digboi, New Mangalore, 82.5°E) (4M).",
    safeChoiceAdvice: "Draw clean outline using the 4-stroke method in under 2 minutes, then pinpoint with sharp dots and leader lines.",
  },
  {
    id: "bp-17",
    subjectCode: "85E",
    title: "First War of Indian Independence 1857: Causes & Effects",
    kannadaTitle: "೧೮೫೭ ರ ಪ್ರಥಮ ಭಾರತೀಯ ಸ್ವಾತಂತ್ರ್ಯ ಸಂಗ್ರಾಮದ ಕಾರಣಗಳು ಮತ್ತು ಪರಿಣಾಮಗಳು",
    marks: 4,
    category: "4M/5M Essay",
    frequency: "100% Guaranteed Every Year",
    probabilityScore: 97,
    ktbsCitation: "KTBS Class 10 Social Science Part-1 (History), Chapter 5, Page 38",
    isCompleted: false,
    notes: "8 distinct points with subheadings: Political, Administrative, Economic, Military, and Immediate Causes.",
    safeChoiceAdvice: "Mention Lord Dalhousie's Doctrine of Lapse and the Enfield rifle greased cartridge controversy.",
  },
  {
    id: "bp-18",
    subjectCode: "85E",
    title: "Role of Dr. B.R. Ambedkar in Constitution & Social Reform",
    kannadaTitle: "ಸಂವಿಧಾನ ಮತ್ತು ಸಮಾಜ ಸುಧಾರಣೆಯಲ್ಲಿ ಡಾ. ಬಿ.ಆರ್. ಅಂಬೇಡ್ಕರ್ ಅವರ ಪಾತ್ರ",
    marks: 4,
    category: "4M/5M Essay",
    frequency: "100% Guaranteed Every Year",
    probabilityScore: 96,
    ktbsCitation: "KTBS Class 10 Social Science Part-1 (History), Chapter 8, Page 72",
    isCompleted: true,
    notes: "Chairman of Drafting Committee, Mahad satyagraha, Bahishkrit Hitakarini Sabha, Article 17 eradication of untouchability.",
    safeChoiceAdvice: "Structure answer in chronological order: Social struggles → Round Table Conferences → Constitution drafting.",
  },
  {
    id: "bp-19",
    subjectCode: "85E",
    title: "Soil Erosion: Causes, Effects & Prevention Methods",
    kannadaTitle: "ಮಣ್ಣಿನ ಸವೆತ: ಕಾರಣಗಳು, ಪರಿಣಾಮಗಳು ಮತ್ತು ಸಂರಕ್ಷಣಾ ಕ್ರಮಗಳು",
    marks: 3,
    category: "Key Concept",
    frequency: "100% Guaranteed Every Year",
    probabilityScore: 95,
    ktbsCitation: "KTBS Class 10 Social Science Part-2 (Geography), Chapter 3, Page 68",
    isCompleted: false,
    notes: "Causes: Deforestation, overgrazing. Prevention: Afforestation, contour farming, check dams, shelter belts.",
    safeChoiceAdvice: "Provide 6 bullet points (0.5M each) to secure maximum marks without writing long paragraphs.",
  },
  {
    id: "bp-20",
    subjectCode: "85E",
    title: "Consumer Rights & Consumer Protection Act (COPRA)",
    kannadaTitle: "ಗ್ರಾಹಕರ ಹಕ್ಕುಗಳು ಮತ್ತು ಗ್ರಾಹಕ ಸಂರಕ್ಷಣಾ ಕಾಯ್ದೆ",
    marks: 3,
    category: "Key Concept",
    frequency: "High Probability (85%+)",
    probabilityScore: 94,
    ktbsCitation: "KTBS Class 10 Social Science Part-2 (Business Studies), Chapter 2, Page 162",
    isCompleted: true,
    notes: "Right to safety, right to information, right to choose, right to be heard. Three-tier consumer courts (District, State, National).",
    safeChoiceAdvice: "Mention World Consumer Rights Day (March 15) and National Consumer Day (December 24).",
  },
  {
    id: "bp-21",
    subjectCode: "85E",
    title: "Reserve Bank of India (RBI): Functions & Monetary Role",
    kannadaTitle: "ಭಾರತೀಯ ರಿಸರ್ವ್ ಬ್ಯಾಂಕ್ (ಆರ್‌ಬಿಐ) ಕಾರ್ಯಗಳು",
    marks: 3,
    category: "Key Concept",
    frequency: "High Probability (85%+)",
    probabilityScore: 93,
    ktbsCitation: "KTBS Class 10 Social Science Part-2 (Economics), Chapter 2, Page 146",
    isCompleted: false,
    notes: "Bank of issue (currency notes), Banker to Government, Bankers' Bank, Controller of Credit, Custodian of Foreign Reserves.",
    safeChoiceAdvice: "Write exactly 6 bullet points corresponding to official KSEAB 3M step-marking criteria.",
  },

  // =========================================================================
  // 4. FIRST LANGUAGE KANNADA (01K) — 100 MARKS (Gadya, Padya, Nataka, Vyakarna)
  // =========================================================================
  {
    id: "bp-22",
    subjectCode: "01K",
    title: "ಸಂದರ್ಭ ಸಹಿತ ಸ್ವಾರಸ್ಯ ವಿವರಣೆ (೪ ಪ್ರಶ್ನೆಗಳು × ೩ ಅಂಕಗಳು = ೧೨ ಅಂಕಗಳು)",
    kannadaTitle: "ಸಂದರ್ಭ ವಿವರಣೆ (೪ × ೩ = ೧೨ ಅಂಕಗಳು)",
    marks: 12,
    category: "3M Sandarba",
    frequency: "100% Guaranteed Every Year",
    probabilityScore: 99,
    ktbsCitation: "KTBS 10th Siri Kannada (Gadya Bhaga Ch 1 to 8 & Padya Bhaga Ch 1 to 8)",
    isCompleted: true,
    notes: "ಕವಿ, ಕೃತಿ ಮತ್ತು ಅಂಕಿತನಾಮ ಉಲ್ಲೇಖಿಸುವುದು ಕಡ್ಡಾಯ (ಆಯ್ಕೆ ೧ ಅಂಕ + ಸಂದರ್ಭ ೧ ಅಂಕ + ಸ್ವಾರಸ್ಯ ೧ ಅಂಕ).",
    safeChoiceAdvice: "Always start with 'ಆಯ್ಕೆ:' heading with poet and work name before 'ಸಂದರ್ಭ:' and 'ಸ್ವಾರಸ್ಯ:'.",
  },
  {
    id: "bp-23",
    subjectCode: "01K",
    title: "ಕಂಠಪಾಠ ಪದ್ಯ (ಹಲಗನ್ನಡ / ಹೊಸಗನ್ನಡ ಪದ್ಯ ಭಾಗ - ೪ ಅಂಕಗಳು)",
    kannadaTitle: "ಕಂಠಪಾಠ ಪದ್ಯ (೪ ಅಂಕಗಳು)",
    marks: 4,
    category: "4M/5M Essay",
    frequency: "100% Guaranteed Every Year",
    probabilityScore: 98,
    ktbsCitation: "KTBS 10th Siri Kannada, ಸಂಕಲ್ಪ ಗೀತೆ ಅಥವಾ ಹಲ್ಮಿಡಿ ಶಾಸನ ಪದ್ಯ ಭಾಗ",
    isCompleted: true,
    notes: "ಅಲ್ಪವಿರಾಮ, ಪೂರ್ಣವಿರಾಮ ಮತ್ತು ಕಾಗುಣಿತ ದೋಷಗಳಿಲ್ಲದೆ ಬರೆಯುವುದು ಕಡ್ಡಾಯ.",
    safeChoiceAdvice: "ಪ್ರತಿ ಪಾದವನ್ನು ಸಾಲಿನಂತೆ ಬರೆಯಿರಿ, ಗದ್ಯದಂತೆ ಸತತವಾಗಿ ಬರೆಯಬೇಡಿ.",
  },
  {
    id: "bp-24",
    subjectCode: "01K",
    title: "ಪ್ರಬಂಧ ಲೇಖನ: ಪರಿಸರ / ಜನಸಂಖ್ಯೆ / ವಿಜ್ಞಾನ (೫ ಅಂಕಗಳು)",
    kannadaTitle: "ಪ್ರಬಂಧ ರಚನೆ (೫ ಅಂಕಗಳು)",
    marks: 5,
    category: "Letter & Composition",
    frequency: "100% Guaranteed Every Year",
    probabilityScore: 97,
    ktbsCitation: "KTBS 10th Siri Kannada Vyakarna & Rachane",
    isCompleted: false,
    notes: "ಪೀಠಿಕೆ (೧ ಅಂಕ) + ವಿಷಯ ವಿಸ್ತರಣೆ (೩ ಅಂಕ) + ಉಪಸಂಹಾರ (೧ ಅಂಕ) ರಚನೆ ಪಾಲಿಸಿ.",
    safeChoiceAdvice: "ಪರಿಸರ ಮಾಲಿನ್ಯ ಅಥವಾ ರಾಷ್ಟ್ರೀಯ ಹಬ್ಬಗಳ ವಿಷಯವನ್ನು ಆರಿಸಿಕೊಳ್ಳಿ - ವಿಷಯ ವಿಸ್ತರಣೆ ಸುಲಭ.",
  },
  {
    id: "bp-25",
    subjectCode: "01K",
    title: "ಅಧಿಕೃತ / ವೈಯಕ್ತಿಕ ಪತ್ರ ಲೇಖನ (೫ ಅಂಕಗಳು)",
    kannadaTitle: "ಪತ್ರ ಲೇಖನ (೫ ಅಂಕಗಳು)",
    marks: 5,
    category: "Letter & Composition",
    frequency: "100% Guaranteed Every Year",
    probabilityScore: 98,
    ktbsCitation: "KTBS 10th Siri Kannada Rachane ವಿಭಾಗ",
    isCompleted: true,
    notes: "ಇಂದ / ಗೆ ವಿಳಾಸ, ವಿಷಯ, ಗೌರವಾನ್ವಿತರೇ, ಒಡಲು, ವಂದನೆಗಳೊಂದಿಗೆ, ದಿನಾಂಕ ಮತ್ತು ಸ್ಥಳ.",
    safeChoiceAdvice: "ವೈಯಕ್ತಿಕ ಪತ್ರಕ್ಕಿಂತ ಅಧಿಕೃತ ಮನವಿ ಪತ್ರಕ್ಕೆ (Formal Letter) ಆದ್ಯತೆ ನೀಡಿ, ಅಂಕ ಕಡಿತವಾಗುವುದು ಕಡಿಮೆ.",
  },
  {
    id: "bp-26",
    subjectCode: "01K",
    title: "ಗಾದೆ ಮಾತುಗಳ ವಿಸ್ತರಣೆ (೨ ಪ್ರಶ್ನೆಗಳು × ೨ ಅಂಕಗಳು = ೪ ಅಂಕಗಳು)",
    kannadaTitle: "ಗಾದೆ ಮಾತು ವಿಸ್ತರಣೆ (೪ ಅಂಕಗಳು)",
    marks: 4,
    category: "Key Concept",
    frequency: "100% Guaranteed Every Year",
    probabilityScore: 96,
    ktbsCitation: "KTBS 10th Siri Kannada ವ್ಯಾಕರಣ ವಿಭಾಗ",
    isCompleted: false,
    notes: "'ವೇದ ಸುಳ್ಳಾದರೂ ಗಾದೆ ಸುಳ್ಳಾಗದು' ಎಂಬ ಪೀಠಿಕೆಯೊಂದಿಗೆ ಗಾದೆಯ ಒಳಾರ್ಥವನ್ನು ೬-೮ ಸಾಲುಗಳಲ್ಲಿ ವಿಸ್ತರಿಸಿ.",
    safeChoiceAdvice: "'ಉಪ್ಪಿಗಿಂತ ರುಚಿಯಿಲ್ಲ', 'ಹಾಸಿಗೆ ಇದ್ದಷ್ಟು ಕಾಲು ಚಾಚು', 'ಕೈ ಕೆಸರಾದರೆ ಬಾಯಿ ಮೊಸರು' ಗಾದೆಗಳನ್ನು ಪುನರಾವರ್ತಿಸಿ.",
  },
  {
    id: "bp-27",
    subjectCode: "01K",
    title: "ಕನ್ನಡ ವ್ಯಾಕರಣ: ಸಂಧಿ, ಸಮಾಸ, ತತ್ಸಮ-ತದ್ಭವ, ಅಲಂಕಾರ, ಛಂದಸ್ಸು",
    kannadaTitle: "ವ್ಯಾಕರಣ ಮತ್ತು ಛಂದಸ್ಸು (೮ ಅಂಕಗಳು)",
    marks: 8,
    category: "Grammar & Rules",
    frequency: "100% Guaranteed Every Year",
    probabilityScore: 99,
    ktbsCitation: "KTBS 10th Siri Kannada ಭಾಷಾಭ್ಯಾಸ ವಿಭಾಗ",
    isCompleted: true,
    notes: "ಆದೇಶ ಸಂಧಿ, ಆಗಮ ಸಂಧಿ, ತತ್ಪುರುಷ ಸಮಾಸ, ಕರ್ಮಧಾರಯ ಸಮಾಸ, ಉಪಮಾಲಂಕಾರ, ಮಾತ್ರಾಗಣ.",
    safeChoiceAdvice: "ಉಪಮಾಲಂಕಾರದಲ್ಲಿ ಉಪಮೇಯ, ಉಪಮಾನ, ಉಪಮಾವಾಚಕ, ಸಮಾನಧರ್ಮವನ್ನು ಪ್ರತ್ಯೇಕವಾಗಿ ಬರೆಯಿರಿ.",
  },

  // =========================================================================
  // 5. SECOND LANGUAGE ENGLISH (31E) — 80 MARKS (Prose, Poetry, Grammar, Writing)
  // =========================================================================
  {
    id: "bp-28",
    subjectCode: "31E",
    title: "Quote from Memory: Quality of Mercy / The Temple and the Body",
    kannadaTitle: "ಕಂಠಪಾಠ ಪದ್ಯ (೪ ಅಂಕಗಳು)",
    marks: 4,
    category: "4M/5M Essay",
    frequency: "100% Guaranteed Every Year",
    probabilityScore: 98,
    ktbsCitation: "KTBS 10th English Reader (Second Language), Poem 3 (Page 62) & Poem 5 (Page 98)",
    isCompleted: true,
    notes: "Zero tolerance for spelling, comma, colon, and semicolon errors in poetry lines.",
    safeChoiceAdvice: "Pick Shakespeare's 'Quality of Mercy' — the first 8 lines have strict, predictable punctuation.",
  },
  {
    id: "bp-29",
    subjectCode: "31E",
    title: "Reference to Context (RTC Extracts - 5 × 3M = 15 Marks)",
    kannadaTitle: "ಸಂದರ್ಭ ಪ್ರಶ್ನೆಗಳು (RTC - ೧೫ ಅಂಕಗಳು)",
    marks: 15,
    category: "3M Sandarba",
    frequency: "100% Guaranteed Every Year",
    probabilityScore: 99,
    ktbsCitation: "KTBS 10th English Reader, Prose Lessons 1 to 8 & Poems 1 to 8",
    isCompleted: true,
    notes: "Formula: a) Who said this? b) To whom was it said? c) When / Why was it said? (1M + 1M + 1M).",
    safeChoiceAdvice: "Mention lesson title and author name in opening line for guaranteed full 3/3 marks.",
  },
  {
    id: "bp-30",
    subjectCode: "31E",
    title: "Formal / Informal Letter Writing (5 Marks)",
    kannadaTitle: "ಪತ್ರ ಲೇಖನ (Formal / Informal Letter - ೫ ಅಂಕಗಳು)",
    marks: 5,
    category: "Letter & Composition",
    frequency: "100% Guaranteed Every Year",
    probabilityScore: 98,
    ktbsCitation: "KTBS 10th English Grammar & Composition Section",
    isCompleted: true,
    notes: "From, To, Date, Salutation, Subject, Body of letter (3 paragraphs), Subscription ('Yours faithfully').",
    safeChoiceAdvice: "Choose Formal Letter to Headmaster/Commissioner — the layout is rigid and scores full 5/5 easily.",
  },
  {
    id: "bp-31",
    subjectCode: "31E",
    title: "Profile Writing from Clues / Story from Outline",
    kannadaTitle: "ಪ್ರೊಫೈಲ್ ರೈಟಿಂಗ್ / ಕಥಾ ರಚನೆ (೪ ಅಂಕಗಳು)",
    marks: 4,
    category: "Letter & Composition",
    frequency: "100% Guaranteed Every Year",
    probabilityScore: 97,
    ktbsCitation: "KTBS 10th English Workbook Section, Page 112",
    isCompleted: false,
    notes: "Profile writing: Convert bulleted biographical clues into coherent paragraphs using proper linkers.",
    safeChoiceAdvice: "Always choose Profile Writing over Story Writing! Profile writing has no creative risk.",
  },
  {
    id: "bp-32",
    subjectCode: "31E",
    title: "Grammar & Vocabulary: Question Tags, Passive Voice, Degrees",
    kannadaTitle: "ವ್ಯಾಕರಣ: Question Tags, Passive Voice, Syllables",
    marks: 6,
    category: "Grammar & Rules",
    frequency: "100% Guaranteed Every Year",
    probabilityScore: 98,
    ktbsCitation: "KTBS 10th English Workbook, Chapters 1 to 6",
    isCompleted: true,
    notes: "Question tags (positive statement → negative tag), passive voice transformation, syllabification.",
    safeChoiceAdvice: "For question tags, remember: 'I am' becomes 'aren't I?', and modals retain their root auxiliary.",
  },

  // =========================================================================
  // 6. THIRD LANGUAGE HINDI (61H) — 80 MARKS (Gadya, Padya, Vyakaran, Rachna)
  // =========================================================================
  {
    id: "bp-33",
    subjectCode: "61H",
    title: "कंठस्थ दोहे: कबीर के दोहे या तुलसीदास के दोहे (४ अंक)",
    kannadaTitle: "ಕಂಠಪಾಠ ದೋಹಾ (೪ ಅಂಕಗಳು - ಹಿಂದಿ)",
    marks: 4,
    category: "4M/5M Essay",
    frequency: "100% Guaranteed Every Year",
    probabilityScore: 98,
    ktbsCitation: "KTBS 10th Hindi Vallari, Padya Chapter 1 (Kabir ke Dohe) & Chapter 3 (Tulsidas ke Dohe)",
    isCompleted: true,
    notes: "देवनागरी लिपि में शुद्ध वर्तनी, मात्राओं और विराम चिह्नों के साथ ४ पंक्तियों का दोहा लिखें।",
    safeChoiceAdvice: "कबीर के दोहे ('काल करे सो आज कर...') याद करना सबसे सरल और सुरक्षित विकल्प है।",
  },
  {
    id: "bp-34",
    subjectCode: "61H",
    title: "संदर्भ सहित भावार्थ (पद्य भाग: ३ प्रश्न × ३ अंक = ९ अंक)",
    kannadaTitle: "ಸಂದರ್ಭ ಸಹಿತ ಭಾವಾರ್ಥ (೯ ಅಂಕಗಳು - ಹಿಂದಿ)",
    marks: 9,
    category: "3M Sandarba",
    frequency: "100% Guaranteed Every Year",
    probabilityScore: 97,
    ktbsCitation: "KTBS 10th Hindi Vallari (Padya Bhaga)",
    isCompleted: false,
    notes: "प्रसंग/संदर्भ (१ अंक) + भावार्थ/कठिन शब्दार्थ (२ अंक) ढांचा बनाए रखें।",
    safeChoiceAdvice: "कवि का नाम और पाठ का नाम पहली पंक्ति में स्पष्ट रूप से उल्लेख करें।",
  },
  {
    id: "bp-35",
    subjectCode: "61H",
    title: "पत्र लेखन: छुट्टी पत्र या पुस्तक विक्रेता को पत्र (५ अंक)",
    kannadaTitle: "ಪತ್ರ ಲೇಖನ (೫ ಅಂಕಗಳು - ಹಿಂದಿ)",
    marks: 5,
    category: "Letter & Composition",
    frequency: "100% Guaranteed Every Year",
    probabilityScore: 98,
    ktbsCitation: "KTBS 10th Hindi Vallari Rachna Section",
    isCompleted: true,
    notes: "सेवा में, प्रधानाचार्य महोदय, विषय, महोदय, कारण (२ दिन का अवकाश), भवदीय शिष्य/शिष्या।",
    safeChoiceAdvice: "प्रधानाचार्य को छुट्टी पत्र लिखना सबसे सुरक्षित है; प्रारूप निर्धारित और सरल है।",
  },
  {
    id: "bp-36",
    subjectCode: "61H",
    title: "निबंध लेखन: पर्यावरण प्रदूषण या समय का सदुपयोग (५ अंक)",
    kannadaTitle: "ಪ್ರಬಂಧ ರಚನೆ (೫ ಅಂಕಗಳು - ಹಿಂದಿ)",
    marks: 5,
    category: "Letter & Composition",
    frequency: "100% Guaranteed Every Year",
    probabilityScore: 96,
    ktbsCitation: "KTBS 10th Hindi Vallari Nibandh Rachna",
    isCompleted: false,
    notes: "प्रस्तावना (१ अंक) + मुख्य विषय बिंदु (३ अंक) + उपसंहार (१ अंक)। १५०-२०० शब्द।",
    safeChoiceAdvice: "'पर्यावरण प्रदूषण' या 'राष्ट्रीय त्यौहार' विषय पर निबंध तैयार रखें।",
  },
  {
    id: "bp-37",
    subjectCode: "61H",
    title: "कन्नड़ / अंग्रेजी से हिंदी में अनुवाद (४ अंक)",
    kannadaTitle: "ಭಾಷಾಂತರ / ಅನುವಾದ (೪ ಅಂಕಗಳು - ಹಿಂದಿ)",
    marks: 4,
    category: "Key Concept",
    frequency: "100% Guaranteed Every Year",
    probabilityScore: 95,
    ktbsCitation: "KTBS 10th Hindi Vallari Anuvad Section",
    isCompleted: true,
    notes: "۴ सरल वाक्यों का व्याकरणसम्मत अनुवाद। काल (Tense) और लिंग (Gender) पर विशेष ध्यान दें।",
    safeChoiceAdvice: "क्रिया के सही रूप (करता है, करती है, करते हैं) का सटीक प्रयोग सुनिश्चित करें।",
  },
];
