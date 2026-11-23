"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Zap, Sun, ShieldCheck, Factory, Home, Sparkles, Check, ArrowRight } from "lucide-react";

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<"ALL" | "ELECTRICAL" | "SOLAR">("ALL");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-extrabold tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Professional Services Catalog
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Electrical & Solar Engineering in Faisalabad
        </h1>
        <p className="text-slate-600 text-base sm:text-lg">
          Certified mastery for domestic residences, retail plazas, and textile manufacturing mills across Faisalabad.
        </p>

        {/* Tab Filters */}
        <div className="flex justify-center gap-2 pt-4">
          <button
            onClick={() => setActiveTab("ALL")}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition cursor-pointer ${
              activeTab === "ALL"
                ? "bg-[#0f2b5c] text-white shadow-md"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            All Services
          </button>
          <button
            onClick={() => setActiveTab("ELECTRICAL")}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === "ELECTRICAL"
                ? "bg-[#0f2b5c] text-white shadow-md"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Zap className="w-4 h-4 text-amber-500" />
            Electrical Work
          </button>
          <button
            onClick={() => setActiveTab("SOLAR")}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === "SOLAR"
                ? "bg-[#0f2b5c] text-white shadow-md"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Sun className="w-4 h-4 text-orange-500" />
            Solar Installations
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(activeTab === "ALL" || activeTab === "ELECTRICAL") && (
          <>
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 font-bold">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  24/7 Emergency Short Circuit Diagnostics
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Fast diagnosis of sudden spark points, breaker tripping, neutral disconnects, and burning smells. 30-minute rapid dispatch in Faisalabad.
                </p>
                <ul className="text-xs text-slate-500 space-y-1.5 pt-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" /> Insulation resistance testing
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" /> Circuit breaker burnout repair
                  </li>
                </ul>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6 flex justify-between items-center">
                <span className="font-bold text-slate-900 text-sm">From PKR 1,500</span>
                <Link
                  href="/customer/book"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-4 py-2 rounded-lg transition"
                >
                  Book Now
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
                  <Home className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Concealed Domestic House Wiring
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Precision channel cutting, PVC pipe layout, 99.9% pure copper wiring (Pakistan Cables/GM Cables standard), and socket installations.
                </p>
                <ul className="text-xs text-slate-500 space-y-1.5 pt-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" /> 5-Marla to 2-Kanal Villas
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" /> Earth bore & surge grounding
                  </li>
                </ul>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6 flex justify-between items-center">
                <span className="font-bold text-slate-900 text-sm">Custom Quote</span>
                <Link
                  href="/customer/book"
                  className="bg-[#0f2b5c] hover:bg-blue-900 text-white text-xs font-bold px-4 py-2 rounded-lg transition"
                >
                  Book Inspection
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 font-bold">
                  <Factory className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Industrial 3-Phase Panels & Sizing Mill Setups
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Power factor correction capacitors, motor starters, auto-changeover switches, and load balancing across phases for factories.
                </p>
                <ul className="text-xs text-slate-500 space-y-1.5 pt-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" /> Eliminates low power factor fines
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" /> Schneider & Terasaki gear
                  </li>
                </ul>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6 flex justify-between items-center">
                <span className="font-bold text-slate-900 text-sm">Industrial Grade</span>
                <Link
                  href="/customer/book"
                  className="bg-[#0f2b5c] hover:bg-blue-900 text-white text-xs font-bold px-4 py-2 rounded-lg transition"
                >
                  Request Engineer
                </Link>
              </div>
            </div>
          </>
        )}

        {(activeTab === "ALL" || activeTab === "SOLAR") && (
          <>
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 font-bold">
                  <Sun className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  On-Grid Solar with FESCO Net Metering
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Complete turnkey solar from 5kW to 50kW. Export extra power to the national grid and enjoy near-zero electricity bills.
                </p>
                <ul className="text-xs text-slate-500 space-y-1.5 pt-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" /> FESCO green meter licensing included
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" /> Tier-1 585W bifacial solar panels
                  </li>
                </ul>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6 flex justify-between items-center">
                <span className="font-bold text-slate-900 text-sm">Payback in 2.5 Yrs</span>
                <Link
                  href="/solar-calculator"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-4 py-2 rounded-lg transition"
                >
                  Size System
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Hybrid Solar Systems with Lithium Batteries
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Uninterrupted 24/7 power for air conditioners, deep freezers, and water pumps even during grid power outages.
                </p>
                <ul className="text-xs text-slate-500 space-y-1.5 pt-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" /> 6000-cycle LiFePO4 battery pack
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" /> Smart BMS monitoring app
                  </li>
                </ul>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6 flex justify-between items-center">
                <span className="font-bold text-slate-900 text-sm">Zero Loadshedding</span>
                <Link
                  href="/customer/solar-quote"
                  className="bg-[#0f2b5c] hover:bg-blue-900 text-white text-xs font-bold px-4 py-2 rounded-lg transition"
                >
                  Get Quote
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 font-bold">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Solar Panel Washing & System Audit
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Faisalabad industrial dust can drop panel output by 25%. We provide RO-treated water washing and thermal imaging.
                </p>
                <ul className="text-xs text-slate-500 space-y-1.5 pt-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" /> High-pressure non-abrasive wash
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" /> Inverter health checkup
                  </li>
                </ul>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6 flex justify-between items-center">
                <span className="font-bold text-slate-900 text-sm">From PKR 3,000</span>
                <Link
                  href="/customer/book"
                  className="bg-[#0f2b5c] hover:bg-blue-900 text-white text-xs font-bold px-4 py-2 rounded-lg transition"
                >
                  Book Wash
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
