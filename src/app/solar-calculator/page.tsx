"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  Sun,
  Calculator,
  TrendingUp,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { calculateSolarRequirements, SolarCalculationResult } from "@/lib/solarCalculations";

export default function SolarCalculatorPage() {
  const { t } = useLanguage();
  const [bill, setBill] = useState<string>("55000");
  const [ratePerWatt, setRatePerWatt] = useState<number>(120);
  const [result, setResult] = useState<SolarCalculationResult>(() =>
    calculateSolarRequirements({ monthlyBillPKR: 55000, ratePerWatt: 120 })
  );

  const handleCompute = (e: React.FormEvent) => {
    e.preventDefault();
    const billNum = Number(bill);
    if (billNum > 0) {
      setResult(calculateSolarRequirements({ monthlyBillPKR: billNum, ratePerWatt }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-extrabold tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Precision Financial Model
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Faisalabad Solar Sizing & ROI Calculator
        </h1>
        <p className="text-slate-600 text-base sm:text-lg">
          Tailored to FESCO electricity tariff slabs, Faisalabad peak solar irradiance (5.2 peak sun hours), and Tier-1 bifacial panels.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Form Column */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-amber-500" />
            Enter Your Bill Details
          </h2>

          <form onSubmit={handleCompute} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Average Monthly FESCO Bill (PKR)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                  PKR
                </span>
                <input
                  type="number"
                  min="5000"
                  step="1000"
                  value={bill}
                  onChange={(e) => setBill(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 pl-14 pr-4 font-bold text-slate-900 focus:bg-white focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  required
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Tip: Use your peak summer bill or an average of the last 6 months.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Equipment Tier & Rate per Watt (PKR/W)
              </label>
              <select
                value={ratePerWatt}
                onChange={(e) => setRatePerWatt(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 px-4 font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:border-amber-500"
              >
                <option value={115}>Standard Tier-1 String Inverter (PKR 115 / Watt)</option>
                <option value={120}>Premium Bifacial + Elevated Galvanized Structure (PKR 120 / Watt)</option>
                <option value={145}>Hybrid Inverter with Lithium Battery Ready (PKR 145 / Watt)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 px-6 rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Sun className="w-5 h-5" />
              <span>Update System Calculation</span>
            </button>
          </form>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs text-blue-900 space-y-2">
            <span className="font-bold block">Included in Rajab Turnkey Pricing:</span>
            <ul className="space-y-1 text-slate-700">
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Tier-1 A-Grade Bifacial 585W Panels
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> 14-Gauge Heavy Galvanized Mounting Frame
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> AC/DC Distribution Boxes with Lightning Arrester
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Turnkey FESCO Net Metering Licensing (5kW+)
              </li>
            </ul>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-gradient-to-br from-[#0f2b5c] to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400 block">
                  Recommended System Sizing
                </span>
                <h3 className="text-3xl sm:text-4xl font-black text-white">
                  {result.recommendedKw} kW System
                </h3>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/20 text-center">
                <span className="text-xs text-slate-300 block">Estimated Units/Mo</span>
                <span className="text-xl font-bold text-amber-300">~{result.estimatedUnits} kWh</span>
              </div>
            </div>

            {/* Sizing Details */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <span className="text-xs text-slate-300 block mb-1">Tier-1 Panels</span>
                <span className="text-2xl font-black text-white">{result.panelCount} Panels</span>
                <span className="text-[11px] text-slate-400 block mt-1">585W Bifacial</span>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <span className="text-xs text-slate-300 block mb-1">Roof Space</span>
                <span className="text-2xl font-black text-white">{result.spaceRequiredSqFt} sq. ft.</span>
                <span className="text-[11px] text-slate-400 block mt-1">South facing</span>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <span className="text-xs text-slate-300 block mb-1">CO2 Offset</span>
                <span className="text-2xl font-black text-emerald-400">{result.co2OffsetTonsPerYear} Tons</span>
                <span className="text-[11px] text-slate-400 block mt-1">Per year clean energy</span>
              </div>
            </div>

            {/* Financial Breakdown */}
            <div className="bg-slate-900/60 rounded-2xl p-6 border border-white/10 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">
                Investment & Savings Analysis
              </h4>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Hardware & Elevated Mounting Structure:</span>
                  <span className="font-semibold text-white">PKR {result.systemCostPKR.toLocaleString()}</span>
                </div>
                {result.netMeteringCostPKR > 0 && (
                  <div className="flex justify-between items-center text-slate-300">
                    <span>FESCO Net Metering Licensing & Green Meter:</span>
                    <span className="font-semibold text-white">PKR {result.netMeteringCostPKR.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-base pt-2 border-t border-white/10 font-bold text-white">
                  <span>Total Estimated Turnkey Investment:</span>
                  <span className="text-amber-400">PKR {result.totalInvestmentPKR.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-slate-400 block">Annual Bill Savings</span>
                  <span className="text-xl font-black text-emerald-400">
                    PKR {result.annualSavingsPKR.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Estimated Payback</span>
                  <span className="text-xl font-black text-amber-400">
                    {result.paybackPeriodYears} Years
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <Link
                href="/customer/solar-quote"
                className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 px-6 rounded-xl text-center shadow-lg transition"
              >
                Book Free Rooftop Site Inspection
              </Link>
              <a
                href="https://wa.me/923287848708?text=Hello!%20I%20used%20your%20Solar%20Calculator%20for%20a%20bill%20of%20PKR%20"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3.5 px-6 rounded-xl text-center border border-white/20 transition"
              >
                Discuss on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
