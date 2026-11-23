import React from "react";
import Link from "next/link";
import { Sun, CheckCircle2, ArrowRight, Zap } from "lucide-react";

const packages = [
  {
    type: "On-Grid",
    subtitle: "Net Metering with FESCO",
    badge: "Most Popular",
    badgeColor: "bg-amber-500 text-slate-950",
    icon: "☀️",
    desc: "Sell surplus electricity back to the national grid via an official FESCO bidirectional green meter. Enjoy 90%+ reduction in electricity bills with zero battery cost.",
    sizes: "5kW, 7kW, 10kW, 15kW, 20kW, 30kW, 50kW",
    payback: "2.5 – 3.5 years",
    highlights: ["FESCO green meter licensing included", "Huawei / Sungrow / Inverex inverters", "Tier-1 Jinko/Longi 585W bifacial panels", "14-gauge galvanized mounting structure", "AC+DC surge protection DBs"],
    cta: "/solar-calculator",
    ctaLabel: "Calculate My System Size",
  },
  {
    type: "Hybrid",
    subtitle: "Lithium Battery Backup",
    badge: "Zero Loadshedding",
    badgeColor: "bg-emerald-600 text-white",
    icon: "🔋",
    desc: "Run air conditioners, pumps, and appliances 24/7 even during grid outages. LiFePO4 lithium batteries last 6,000+ charge cycles (15+ years).",
    sizes: "5kW, 8kW, 10kW, 15kW",
    payback: "4 – 5 years",
    highlights: ["LiFePO4 6000-cycle battery packs", "Fronus / Inverex hybrid inverters", "Smart BMS with mobile monitoring app", "Automatic grid-battery-solar switching", "Backup capacity for 2–3 ACs overnight"],
    cta: "/customer/solar-quote",
    ctaLabel: "Request Hybrid Quote",
  },
  {
    type: "Off-Grid",
    subtitle: "Fully Independent Power",
    badge: "Agricultural & Rural",
    badgeColor: "bg-blue-700 text-white",
    icon: "🌾",
    desc: "Ideal for tube wells, agricultural pumps, and remote sites with no WAPDA grid connection. Completely self-sufficient solar power.",
    sizes: "3kW, 5kW, 10kW, 20kW",
    payback: "3 – 4 years",
    highlights: ["No monthly electricity bill", "Solar VFD pump drives available", "Deep cycle GEL or lithium storage", "Automatic sunrise startup controller", "Perfect for Faisalabad farmland"],
    cta: "/customer/solar-quote",
    ctaLabel: "Get Off-Grid Quote",
  },
];

export default function SolarServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-2 text-xs uppercase font-extrabold tracking-wider text-orange-700 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
          <Sun className="w-4 h-4" /> Solar Energy Systems
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Complete Solar Installation Services
        </h1>
        <p className="text-slate-600 text-base sm:text-lg">
          Turnkey solar engineering for residential homes, commercial plazas, and industrial factories across Faisalabad with FESCO Net Metering processing included.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link href="/solar-calculator" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm shadow transition">
            Calculate My Solar Savings
          </Link>
          <a href="tel:+923287848708" className="bg-[#0f2b5c] hover:bg-blue-900 text-white font-bold px-6 py-3 rounded-xl text-sm shadow transition">
            Free Rooftop Survey: 0328-7848708
          </a>
        </div>
      </div>

      {/* Packages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {packages.map((pkg, i) => (
          <div key={i} className={`bg-white rounded-3xl p-8 border-2 shadow-md flex flex-col ${i === 0 ? "border-amber-400 shadow-amber-100" : "border-slate-200"}`}>
            <div className="flex justify-between items-start mb-4">
              <span className="text-4xl">{pkg.icon}</span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${pkg.badgeColor}`}>
                {pkg.badge}
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">{pkg.type}</h2>
            <p className="text-sm font-semibold text-slate-500 mb-3">{pkg.subtitle}</p>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">{pkg.desc}</p>

            <div className="space-y-2 mb-6 flex-1">
              {pkg.highlights.map((h, j) => (
                <div key={j} className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex justify-between text-xs text-slate-500">
                <span>Available sizes: <strong className="text-slate-700">{pkg.sizes}</strong></span>
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Typical payback: <strong className="text-emerald-700">{pkg.payback}</strong></span>
              </div>
              <Link href={pkg.cta} className="w-full block text-center bg-[#0f2b5c] hover:bg-blue-900 text-white font-bold py-3 rounded-xl text-sm transition mt-2">
                {pkg.ctaLabel}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Why Rajab for Solar */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-amber-200 rounded-3xl p-8 sm:p-12">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Why Choose Rajab for Your Solar Project?
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-sm">
          {[
            { stat: "100%", label: "Tier-1 A-Grade Panels Only" },
            { stat: "FESCO", label: "Net Metering Turnkey Processing" },
            { stat: "5 Yrs", label: "Workmanship Warranty" },
            { stat: "4.8 ★", label: "Google Verified Rating" },
          ].map((item, i) => (
            <div key={i} className="space-y-1">
              <span className="text-2xl sm:text-3xl font-black text-amber-600 block">{item.stat}</span>
              <span className="text-xs text-slate-600">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
