"use client";

import React, { useState } from "react";
import { X, CheckCircle2, AlertTriangle, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { sounds } from "../lib/sound";

interface UnitRule {
  quantity: string;
  symbol: string;
  siUnit: string;
  unitSymbol: string;
  formula: string;
  trapWarning: string;
  isUnitless?: boolean;
}

const SI_UNIT_RULES: UnitRule[] = [
  {
    quantity: "Focal Length (Concave Mirror / Lens)",
    symbol: "f",
    siUnit: "Meter / Centimeter",
    unitSymbol: "cm or m",
    formula: "1/f = 1/v - 1/u (Lens) | 1/f = 1/v + 1/u (Mirror)",
    trapWarning: "CRITICAL: Focal length of Concave mirror or Concave lens is ALWAYS NEGATIVE (e.g. f = -15 cm). Forgetting '-' loses 0.5M!",
  },
  {
    quantity: "Focal Length (Convex Mirror / Lens)",
    symbol: "f",
    siUnit: "Meter / Centimeter",
    unitSymbol: "cm or m",
    formula: "f = R / 2",
    trapWarning: "Focal length of Convex mirror or Convex lens is ALWAYS POSITIVE (e.g. f = +20 cm).",
  },
  {
    quantity: "Electric Resistance",
    symbol: "R",
    siUnit: "Ohm",
    unitSymbol: "Ω",
    formula: "R = V / I  or  R = ρ(L / A)",
    trapWarning: "Writing '24' without Ω loses 0.5M. Always box final answer: [R = 24 Ω].",
  },
  {
    quantity: "Electric Current",
    symbol: "I",
    siUnit: "Ampere",
    unitSymbol: "A",
    formula: "I = Q / t  or  I = V / R",
    trapWarning: "Current unit is capital 'A' (Ampere). Never write 'amp' or leave blank.",
  },
  {
    quantity: "Potential Difference / Voltage",
    symbol: "V",
    siUnit: "Volt",
    unitSymbol: "V",
    formula: "V = W / Q  or  V = I × R",
    trapWarning: "Box answer with unit: [V = 6 V].",
  },
  {
    quantity: "Electric Power",
    symbol: "P",
    siUnit: "Watt",
    unitSymbol: "W",
    formula: "P = V × I = I²R = V² / R",
    trapWarning: "1 kW = 1000 W. If question asks in kW, divide by 1000!",
  },
  {
    quantity: "Linear Magnification",
    symbol: "m",
    siUnit: "UNITLESS (Ratio)",
    unitSymbol: "No Unit!",
    formula: "m = h' / h = -v / u (Mirror) | m = +v / u (Lens)",
    trapWarning: "Magnification is a pure ratio! DO NOT write 'cm' after m. If real/inverted, m is negative. If virtual/erect, m is positive.",
    isUnitless: true,
  },
  {
    quantity: "Refractive Index",
    symbol: "n",
    siUnit: "UNITLESS (Ratio)",
    unitSymbol: "No Unit!",
    formula: "n21 = v1 / v2  or  n = c / v",
    trapWarning: "Pure ratio of speeds of light. Never attach any unit to refractive index!",
    isUnitless: true,
  },
  {
    quantity: "Electric Energy (Commercial)",
    symbol: "E",
    siUnit: "Kilowatt-hour (kWh)",
    unitSymbol: "kWh or Unit",
    formula: "E = P(in kW) × t(in hours)",
    trapWarning: "1 kWh = 3.6 × 10⁶ J (Frequent 1-mark question in KSEAB Physics).",
  },
];

interface SiUnitTrainerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SiUnitTrainerModal: React.FC<SiUnitTrainerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedRule, setSelectedRule] = useState<UnitRule>(SI_UNIT_RULES[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/95 backdrop-blur z-20">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Boxed SI Unit & Sign Convention Insulation Vault
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Prevents -0.5M Penalties
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Official KSEAB Circular: Missing SI units or inverted signs deduct 0.5M per numerical
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4">
          {/* Active Rule Spotlight */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-indigo-500/20 text-cyan-300 border border-indigo-500/30">
                {selectedRule.quantity}
              </span>
              <span
                className={`text-xs font-mono font-bold px-3 py-1 rounded-xl border ${
                  selectedRule.isUnitless
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                    : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                }`}
              >
                Unit: {selectedRule.unitSymbol}
              </span>
            </div>

            <div className="text-xs text-slate-300 font-mono bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <strong>Official Formula:</strong> {selectedRule.formula}
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 leading-relaxed">
              <strong className="text-amber-400 block font-bold mb-0.5 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> Examiner Trap Alert:
              </strong>
              {selectedRule.trapWarning}
            </div>
          </div>

          {/* Grid of all quantities */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
              Select Quantity to Inspect:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {SI_UNIT_RULES.map((rule, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedRule(rule);
                    sounds.playClick();
                  }}
                  className={`p-3 rounded-xl text-left text-xs transition-all border ${
                    selectedRule.quantity === rule.quantity
                      ? "bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30 font-semibold"
                      : "bg-slate-950/80 text-slate-300 hover:bg-slate-800/80 border-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="truncate font-medium">{rule.symbol}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 bg-black/40 rounded text-cyan-300">
                      [{rule.unitSymbol}]
                    </span>
                  </div>
                  <div className="text-[11px] truncate opacity-90">
                    {rule.quantity.split("(")[0]}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
