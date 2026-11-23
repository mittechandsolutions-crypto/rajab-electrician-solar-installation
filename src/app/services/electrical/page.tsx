import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Zap, Sun } from "lucide-react";

const services = [
  {
    icon: "⚡",
    titleEn: "24/7 Emergency Fault Repair",
    desc: "Short circuits, breaker burnout, neutral loss — rapid 30-min dispatch across Faisalabad.",
    priceFrom: "PKR 1,500",
    bullets: ["Insulation resistance test", "Circuit breaker replacement", "Neutral tracing & repair"],
  },
  {
    icon: "🏠",
    titleEn: "Concealed House Wiring & DB",
    desc: "New builds, renovations, and complete DB overhauls with 100% pure copper cables.",
    priceFrom: "Custom Quote",
    bullets: ["PVC conduit channel cutting", "Earth boring & surge protection", "Load segregation per room"],
  },
  {
    icon: "🏭",
    titleEn: "Industrial 3-Phase Panels",
    desc: "Power factor correction, motor starters, auto changeover for factories and sizing mills.",
    priceFrom: "PKR 12,000+",
    bullets: ["PF improvement capacitors", "Schneider & Terasaki breakers", "Phase indicator & protection"],
  },
  {
    icon: "🔧",
    titleEn: "AC & Appliance Repair",
    desc: "Split AC gas refilling, fault diagnosis for motor pumps, inverters, and stabilizers.",
    priceFrom: "PKR 800",
    bullets: ["Split/window AC gas charging", "Motor rewinding & repair", "UPS & stabilizer servicing"],
  },
];

export default function ElectricalServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-2 text-xs uppercase font-extrabold tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          <Zap className="w-4 h-4" /> Electrical Engineering
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Expert Electrical Work in Faisalabad
        </h1>
        <p className="text-slate-600 text-base sm:text-lg">
          Certified electricians serving homes, shops, plazas, and textile factories across Faisalabad with 100% copper wiring and genuine breaker brands.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link href="/customer/book" className="bg-[#0f2b5c] hover:bg-blue-900 text-white font-bold px-6 py-3 rounded-xl text-sm shadow transition">
            Book Electrician Now
          </Link>
          <a href="tel:+923287848708" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm shadow transition">
            Emergency Call: 0328-7848708
          </a>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((s, i) => (
          <div key={i} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs hover:shadow-xl hover:border-amber-300 transition-all duration-300 flex flex-col">
            <div className="text-4xl mb-4">{s.icon}</div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">{s.titleEn}</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">{s.desc}</p>
            <ul className="space-y-1.5 mb-6 flex-1">
              {s.bullets.map((b, j) => (
                <li key={j} className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700">{s.priceFrom}</span>
              <Link href="/customer/book" className="flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 transition">
                Book Now <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Safety Promise Banner */}
      <div className="bg-[#0f2b5c] text-white rounded-3xl p-8 sm:p-12 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold">Rajab Electricians Safety Promise</h2>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto">
          Every job uses genuine Pakistan Cables copper wiring, Schneider/ABB breakers, and post-completion thermal scan. We never cut corners on safety — period.
        </p>
        <Link href="/customer/book" className="inline-block bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 py-3.5 rounded-xl shadow-lg transition text-sm">
          Book Certified Electrician
        </Link>
      </div>
    </div>
  );
}
