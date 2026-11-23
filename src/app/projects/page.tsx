import React from "react";
import Link from "next/link";
import { Sun, Zap, MapPin, CheckCircle2, ArrowRight } from "lucide-react";

export default function ProjectsPage() {
  const projects = [
    {
      id: "1",
      title: "15kW On-Grid Solar Installation at Textile Plaza",
      category: "Solar Commercial",
      location: "Madina Town, Faisalabad",
      capacity: "15 kW On-Grid",
      description: "Installed 26x Jinko 585W bifacial modules with Huawei 15KTL inverter and 3-phase FESCO net metering, reducing electricity bill by 92%.",
      impact: "Saved PKR 185,000/month",
      specs: ["Huawei 15KTL Inverter", "Custom Elevated Structure", "Bi-directional FESCO Meter"],
    },
    {
      id: "2",
      title: "10kW Hybrid Solar with LiFePO4 Storage",
      category: "Solar Residential",
      location: "Peoples Colony No. 2, Faisalabad",
      capacity: "10 kW Hybrid",
      description: "Zero loadshedding backup system supporting 3 inverter air conditioners, water turbine, and full home lighting.",
      impact: "24/7 Uninterrupted AC Power",
      specs: ["Inverex Nitrox 10kW", "10kWh Lithium Battery", "Surge Protection DB"],
    },
    {
      id: "3",
      title: "Complete 3-Phase Main Distribution Board Overhaul",
      category: "Factory Wiring",
      location: "Small Industrial Estate, Faisalabad",
      capacity: "200A 3-Phase DB",
      description: "Eliminated chronic tripping and wire heating hazards in a loom weaving shed with copper busbars and Schneider breakers.",
      impact: "Power Factor Improved to 0.96",
      specs: ["Schneider EasyPact Breakers", "99.9% Pure Copper Busbar", "Phase Indicator LEDs"],
    },
    {
      id: "4",
      title: "20kW Agricultural Tube Well Solar Retrofit",
      category: "Solar Commercial",
      location: "Jaranwala Road, Faisalabad",
      capacity: "20 kW VFD Solar",
      description: "Replaced high-cost diesel generation with solar VFD pump inverter to power a 15 HP agricultural tube well.",
      impact: "100% Diesel Free Irrigation",
      specs: ["INVT Solar VFD Drive", "Tier-1 Half-Cell Panels", "Automatic Sunrise Starter"],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-extrabold tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Our Track Record
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Featured Engineering Projects
        </h1>
        <p className="text-slate-600 text-base sm:text-lg">
          Showcasing residential solar installations, commercial net-metering projects, and industrial wiring across Faisalabad.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  {p.category}
                </span>
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {p.location}
                </span>
              </div>

              <h2 className="text-2xl font-black text-slate-900">{p.title}</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{p.description}</p>

              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Impact: {p.impact}</span>
              </div>

              <div className="space-y-1.5 pt-2">
                <span className="text-xs font-bold text-slate-700 block">System Highlights:</span>
                <div className="flex flex-wrap gap-2">
                  {p.specs.map((sp, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg"
                    >
                      {sp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 flex justify-between items-center">
              <span className="text-xs font-bold text-[#0f2b5c]">{p.capacity}</span>
              <Link
                href="/customer/solar-quote"
                className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
              >
                <span>Request Similar System</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
