"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  Zap,
  Sun,
  ShieldCheck,
  Clock,
  Phone,
  ArrowRight,
  Calculator,
  CheckCircle2,
  Star,
  Sparkles,
  TrendingUp,
  MapPin,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import { calculateSolarRequirements, SolarCalculationResult } from "@/lib/solarCalculations";

export default function HomePage() {
  const { t, language } = useLanguage();
  const [billInput, setBillInput] = useState<string>("45000");
  const [calcResult, setCalcResult] = useState<SolarCalculationResult>(() =>
    calculateSolarRequirements({ monthlyBillPKR: 45000 })
  );

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(billInput);
    if (val && val > 0) {
      setCalcResult(calculateSolarRequirements({ monthlyBillPKR: val }));
    }
  };

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-950 via-[#0f2b5c] to-slate-900 text-white pt-12 pb-24 lg:py-28">
        {/* Ambient subtle glow background */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Emergency Banner Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>{t.hero.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white">
                {t.hero.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                {t.hero.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href="/customer/book"
                  className="inline-flex items-center justify-center gap-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-7 py-4 rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all text-base"
                >
                  <Zap className="w-5 h-5 fill-current" />
                  <span>{t.hero.ctaBook}</span>
                </Link>

                <Link
                  href="/solar-calculator"
                  className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/15 text-white font-semibold px-7 py-4 rounded-xl border border-white/20 backdrop-blur-sm transition-all text-base"
                >
                  <Sun className="w-5 h-5 text-amber-400" />
                  <span>{t.hero.ctaSolar}</span>
                </Link>
              </div>

              {/* Feature Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.hero.feature1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.hero.feature2}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.hero.feature3}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.hero.feature4}</span>
                </div>
              </div>
            </div>

            {/* Right Card: Quick Hotline & Trust Box */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/15 shadow-2xl text-white space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-bold block">
                      Emergency 24/7 Helpline
                    </span>
                    <h3 className="text-2xl font-black text-white">+92 328 7848708</h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-amber-400" />
                  </div>
                </div>

                {/* Rating Card */}
                <div className="bg-slate-900/60 rounded-xl p-4 border border-white/10 flex items-center gap-4">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400" />
                    ))}
                  </div>
                  <div>
                    <span className="font-bold text-white text-base">4.8 / 5.0 Rating</span>
                    <p className="text-xs text-slate-400">12+ Verified Google Reviews in Faisalabad</p>
                  </div>
                </div>

                {/* Response Guarantee */}
                <div className="space-y-3 text-xs sm:text-sm text-slate-200">
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>30-Minute Dispatch:</strong> Himmatpura, Peoples Colony, Madina Town, D-Ground & Ghulam Muhammad Abad.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Shop Address:</strong> Street No. 12, Himmatpura, Faisalabad.</span>
                  </div>
                </div>

                <a
                  href="tel:+923287848708"
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3.5 rounded-xl shadow transition"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Electrician On Duty Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs uppercase font-extrabold tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Faisalabad Engineering Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.services.heading}
          </h2>
          <p className="text-slate-600 text-base">
            {t.services.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Emergency Short Circuit */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-xl bg-amber-50 group-hover:bg-amber-500 flex items-center justify-center transition">
                <Zap className="w-7 h-7 text-amber-600 group-hover:text-slate-950 transition" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                24/7 Emergency Fault & Tripping Repair
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Sudden spark, burning smell, or main breaker tripping repeatedly? Our mobile team reaches your home or shop in 30 minutes with testing gear.
              </p>
              <div className="text-xs text-amber-800 bg-amber-50 px-3 py-1.5 rounded-md font-semibold inline-block">
                Starting from PKR 1,500
              </div>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-6">
              <Link
                href="/customer/book"
                className="flex items-center justify-between text-sm font-semibold text-blue-800 hover:text-blue-950 group-hover:translate-x-1 transition"
              >
                <span>Book Instant Repair</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Concealed Wiring & DB Dressing */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-xl bg-blue-50 group-hover:bg-blue-600 flex items-center justify-center transition">
                <ShieldCheck className="w-7 h-7 text-blue-600 group-hover:text-white transition" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                House Wiring & Main DB Dressing
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Underground conduit laying, 100% pure copper cables, distribution board overhaul, and certified earth-rod boring for surge safety.
              </p>
              <div className="text-xs text-blue-800 bg-blue-50 px-3 py-1.5 rounded-md font-semibold inline-block">
                Single & 3-Phase Approved
              </div>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-6">
              <Link
                href="/services/electrical"
                className="flex items-center justify-between text-sm font-semibold text-blue-800 hover:text-blue-950 group-hover:translate-x-1 transition"
              >
                <span>Explore Electrical Work</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 3: On-Grid FESCO Solar */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200 hover:border-orange-500 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-xl bg-orange-50 group-hover:bg-orange-500 flex items-center justify-center transition">
                <Sun className="w-7 h-7 text-orange-600 group-hover:text-white transition" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Solar On-Grid & FESCO Net Metering
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Cut your electricity bill up to 90% by selling surplus electricity back to the national grid with an official FESCO green bidirectional meter.
              </p>
              <div className="text-xs text-orange-800 bg-orange-50 px-3 py-1.5 rounded-md font-semibold inline-block">
                5kW to 50kW Complete Setup
              </div>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-6">
              <Link
                href="/services/solar"
                className="flex items-center justify-between text-sm font-semibold text-blue-800 hover:text-blue-950 group-hover:translate-x-1 transition"
              >
                <span>View Solar Packages</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE SOLAR CALCULATOR PREVIEW */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              Live Solar Sizer
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {t.calculator.title}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              {t.calculator.subtitle}
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white/5 border border-white/15 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
            {/* Input Form */}
            <form onSubmit={handleCalculate} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end mb-8">
              <div className="sm:col-span-8 space-y-2">
                <label className="text-sm font-medium text-slate-200">
                  {t.calculator.billLabel}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                    PKR
                  </span>
                  <input
                    type="number"
                    min="5000"
                    step="1000"
                    value={billInput}
                    onChange={(e) => setBillInput(e.target.value)}
                    placeholder={t.calculator.billPlaceholder}
                    className="w-full bg-slate-900/80 border border-white/20 rounded-xl py-3.5 pl-16 pr-4 text-white placeholder-slate-500 font-bold focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 px-6 rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  <span>{t.calculator.calculateBtn}</span>
                </button>
              </div>
            </form>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-900/70 p-4 rounded-xl border border-white/10 text-center">
                <span className="text-xs text-slate-400 block mb-1">Recommended Size</span>
                <span className="text-2xl font-black text-amber-400">
                  {calcResult.recommendedKw} kW
                </span>
                <span className="text-[11px] text-slate-500 block mt-1">Tier-1 Bifacial</span>
              </div>

              <div className="bg-slate-900/70 p-4 rounded-xl border border-white/10 text-center">
                <span className="text-xs text-slate-400 block mb-1">Estimated Cost</span>
                <span className="text-xl font-bold text-white">
                  PKR {(calcResult.totalInvestmentPKR / 100000).toFixed(1)} Lakh
                </span>
                <span className="text-[11px] text-slate-500 block mt-1">Complete Turnkey</span>
              </div>

              <div className="bg-slate-900/70 p-4 rounded-xl border border-white/10 text-center">
                <span className="text-xs text-slate-400 block mb-1">Monthly Savings</span>
                <span className="text-xl font-bold text-emerald-400">
                  PKR {calcResult.monthlySavingsPKR.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-500 block mt-1">90% Bill Slash</span>
              </div>

              <div className="bg-slate-900/70 p-4 rounded-xl border border-white/10 text-center">
                <span className="text-xs text-slate-400 block mb-1">Payback Period</span>
                <span className="text-2xl font-black text-amber-400">
                  {calcResult.paybackPeriodYears} Yrs
                </span>
                <span className="text-[11px] text-slate-500 block mt-1">Then Free Power</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
              <div className="text-xs text-slate-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Roof required: <strong>{calcResult.spaceRequiredSqFt} sq. ft.</strong> ({calcResult.panelCount} high-efficiency panels)</span>
              </div>
              <Link
                href="/customer/solar-quote"
                className="inline-flex items-center gap-2 text-sm font-bold text-amber-300 hover:text-amber-200 transition"
              >
                <span>{t.calculator.requestConsultation}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (3 TO 4 STEPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs uppercase font-extrabold tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Seamless Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How Rajab Electricians Works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            From emergency faults to industrial solar installations, our standard operating procedure guarantees speed and safety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 relative shadow-xs">
            <span className="text-4xl font-black text-slate-200 block mb-4">01</span>
            <h3 className="font-bold text-lg text-slate-900 mb-2">Book Online or Call</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Book a slot via our portal or ring our 24/7 hotline (+92 328 7848708) for immediate emergency dispatch.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 relative shadow-xs">
            <span className="text-4xl font-black text-slate-200 block mb-4">02</span>
            <h3 className="font-bold text-lg text-slate-900 mb-2">Diagnostic Visit</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our certified electrician arrives on-site with testing instruments, inspects the fault, and provides an upfront transparent quote.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 relative shadow-xs">
            <span className="text-4xl font-black text-slate-200 block mb-4">03</span>
            <h3 className="font-bold text-lg text-slate-900 mb-2">Precision Work</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We execute repairs using genuine copper wires and Schneider/Terasaki breakers with zero shortcuts.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 relative shadow-xs">
            <span className="text-4xl font-black text-slate-200 block mb-4">04</span>
            <h3 className="font-bold text-lg text-slate-900 mb-2">Test & Warranty</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Post-repair voltage testing, clean up, digital PDF invoice issuance, and Cash on Service or JazzCash payment.
            </p>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS & FAQ */}
      <section className="bg-slate-100 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Reviews Header */}
          <div>
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
              <span className="text-xs uppercase font-extrabold tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                Google 4.8 ★ Rated
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900">
                {t.testimonials.heading}
              </h2>
              <p className="text-slate-600 text-sm">
                {t.testimonials.subheading}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200 space-y-3">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 italic">
                  &quot;Called them at 11 PM for an emergency main breaker burnout in Himmatpura. Their electrician arrived in 25 minutes and fixed everything safely without any delay.&quot;
                </p>
                <div className="pt-2 border-t border-slate-100">
                  <span className="font-bold text-sm text-slate-900 block">Sheikh Tariq Mehmood</span>
                  <span className="text-xs text-slate-500">Himmatpura Resident, Faisalabad</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200 space-y-3">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 italic">
                  &quot;Rajab Electricians installed our 10kW On-Grid solar setup in Peoples Colony. The FESCO net metering was handled completely by them without any hassle. Highly recommended!&quot;
                </p>
                <div className="pt-2 border-t border-slate-100">
                  <span className="font-bold text-sm text-slate-900 block">Dr. Farhan Akram</span>
                  <span className="text-xs text-slate-500">Peoples Colony, Faisalabad</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200 space-y-3">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 italic">
                  &quot;Best industrial electricians in Faisalabad. They balanced the 3-phase load on our weaving looms and our monthly power factor penalty was completely eliminated.&quot;
                </p>
                <div className="pt-2 border-t border-slate-100">
                  <span className="font-bold text-sm text-slate-900 block">Chaudhry Nadeem</span>
                  <span className="text-xs text-slate-500">Textile Sizing Mill Owner</span>
                </div>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-2 mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {t.faq.heading}
              </h2>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  {t.faq.q1}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t.faq.a1}
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  {t.faq.q2}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t.faq.a2}
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  {t.faq.q3}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t.faq.a3}
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  {t.faq.q4}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t.faq.a4}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0f2b5c] to-blue-900 rounded-3xl p-8 sm:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400 bg-white/10 px-3 py-1 rounded-full border border-white/10">
              Immediate Assistance in Faisalabad
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Facing an Electrical Fault or Ready to Switch to Solar?
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Speak with Engr. Muhammad Rajab & our certified engineering crew in Himmatpura today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              href="/customer/book"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-7 py-3.5 rounded-xl shadow-lg transition text-center"
            >
              Book Service Online
            </Link>
            <a
              href="tel:+923287848708"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-3.5 rounded-xl border border-white/20 transition text-center"
            >
              Call: 0328-7848708
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
