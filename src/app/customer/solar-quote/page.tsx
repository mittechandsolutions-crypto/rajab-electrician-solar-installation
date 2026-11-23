"use client";

import React, { useState } from "react";
import { Sun, CheckCircle2, AlertCircle } from "lucide-react";

type QuoteSystemType = "On-Grid (Net Metering)" | "Hybrid (with Batteries)" | "Off-Grid";

interface QuoteResult {
  quote: {
    quoteNumber: string;
    name: string;
    phone: string;
    monthlyBillPKR: number;
  };
  calculation: {
    recommendedKw: number;
    totalInvestmentPKR: number;
    monthlySavingsPKR: number;
    paybackPeriodYears: number;
  };
}

export default function SolarQuotePage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [areaLocation, setAreaLocation] = useState("Peoples Colony, Faisalabad");
  const [monthlyBillPKR, setMonthlyBillPKR] = useState("50000");
  const [roofAreaSqFt, setRoofAreaSqFt] = useState("1000");
  const [roofType, setRoofType] = useState("Concrete Flat Roof");
  const [systemType, setSystemType] = useState<"On-Grid (Net Metering)" | "Hybrid (with Batteries)" | "Off-Grid">("On-Grid (Net Metering)");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          areaLocation,
          monthlyBillPKR: Number(monthlyBillPKR),
          roofAreaSqFt: Number(roofAreaSqFt),
          roofType,
          systemType,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Failed to submit quote inquiry.");
        setLoading(false);
        return;
      }

      setResult(data);
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase font-extrabold tracking-wider text-orange-700 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
          Custom Solar Engineering
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Request a Custom Solar Engineering Proposal
        </h1>
        <p className="text-slate-600 text-sm">
          Receive a tailored quotation with structural drawings, return-on-investment timeline, and FESCO net-metering processing.
        </p>
      </div>

      {result ? (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6 text-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">
            Quote #{result.quote.quoteNumber} Generated!
          </h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Thank you, <strong>{result.quote.name}</strong>. Based on your monthly bill of PKR {result.quote.monthlyBillPKR.toLocaleString()}, our engineering formula recommends a <strong>{result.calculation.recommendedKw} kW</strong> setup.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 text-left">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 block">Recommended Size</span>
              <span className="text-xl font-bold text-slate-900">{result.calculation.recommendedKw} kW</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 block">Estimated Cost</span>
              <span className="text-xl font-bold text-slate-900">PKR {(result.calculation.totalInvestmentPKR / 100000).toFixed(1)} Lakh</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 block">Monthly Savings</span>
              <span className="text-xl font-bold text-emerald-600">PKR {result.calculation.monthlySavingsPKR.toLocaleString()}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 block">Payback Period</span>
              <span className="text-xl font-bold text-amber-600">{result.calculation.paybackPeriodYears} Years</span>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            Our solar engineer in Himmatpura will call you at <strong>{result.quote.phone}</strong> to confirm your rooftop inspection.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-4 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sheikh Usman"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 px-4 text-sm font-medium focus:bg-white focus:outline-hidden focus:border-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Phone / WhatsApp Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="03287848708"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 px-4 text-sm font-medium focus:bg-white focus:outline-hidden focus:border-amber-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Colony / Town in Faisalabad
              </label>
              <input
                type="text"
                value={areaLocation}
                onChange={(e) => setAreaLocation(e.target.value)}
                placeholder="e.g. Peoples Colony No. 1, Faisalabad"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 px-4 text-sm font-medium focus:bg-white focus:outline-hidden focus:border-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Average Monthly FESCO Bill (PKR)
              </label>
              <input
                type="number"
                min="5000"
                step="1000"
                value={monthlyBillPKR}
                onChange={(e) => setMonthlyBillPKR(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 px-4 text-sm font-bold text-slate-900 focus:bg-white focus:outline-hidden focus:border-amber-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Approx Roof Area (Sq. Ft.)
              </label>
              <input
                type="number"
                value={roofAreaSqFt}
                onChange={(e) => setRoofAreaSqFt(e.target.value)}
                placeholder="1000"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 px-4 text-sm font-medium focus:bg-white focus:outline-hidden focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Rooftop Construction
              </label>
              <select
                value={roofType}
                onChange={(e) => setRoofType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 px-4 text-sm font-medium focus:bg-white focus:outline-hidden focus:border-amber-500"
              >
                <option value="Concrete Flat Roof">Concrete Flat Roof</option>
                <option value="Industrial Tin Shade">Industrial Tin Shade</option>
                <option value="Open Ground">Open Ground / Agricultural</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Desired Solar Setup
              </label>
              <select
                value={systemType}
                onChange={(e) => setSystemType(e.target.value as QuoteSystemType)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 px-4 text-sm font-medium focus:bg-white focus:outline-hidden focus:border-amber-500"
              >
                <option value="On-Grid (Net Metering)">On-Grid (Net Metering)</option>
                <option value="Hybrid (with Batteries)">Hybrid (with Batteries)</option>
                <option value="Off-Grid">Off-Grid</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-base"
          >
            <Sun className="w-5 h-5" />
            <span>{loading ? "Calculating Proposal..." : "Request Proposal & Site Visit"}</span>
          </button>
        </form>
      )}
    </div>
  );
}
