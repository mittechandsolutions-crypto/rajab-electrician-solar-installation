import React from "react";
import Link from "next/link";
import { Zap, ShieldCheck, Award, Users, CheckCircle, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-extrabold tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          About Rajab Electricians & Solar
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Rooted in Faisalabad. Driven by Engineering Excellence.
        </h1>
        <p className="text-slate-600 text-base sm:text-lg">
          From our base in Himmatpura, Street No. 12, we have grown to become Faisalabad&apos;s most reliable electrical and renewable solar power contractors.
        </p>
      </div>

      {/* Story & Values */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-slate-600 leading-relaxed text-sm sm:text-base">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Why Faisalabad Relies on Rajab
          </h2>
          <p>
            Founded under the technical leadership of <strong>Engr. Muhammad Rajab</strong>, our organization was built to eliminate the hazards of uncertified electrical wiring, substandard cables, and poorly calculated solar arrays that plague Pakistani consumers.
          </p>
          <p>
            Whether resolving an urgent 2:00 AM short circuit in a residence or engineering a 50kW On-Grid solar plant for a textile processing unit on Millat Road, our certified team approaches every task with strict adherence to Pakistan Engineering Council (PEC) safety codes and NEPRA net-metering standards.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
            <div>
              <span className="text-3xl font-black text-[#0f2b5c] block">12+</span>
              <span className="text-xs text-slate-500">Years Field Mastery</span>
            </div>
            <div>
              <span className="text-3xl font-black text-amber-500 block">4.8 ★</span>
              <span className="text-xs text-slate-500">Google Verified Rating</span>
            </div>
            <div>
              <span className="text-3xl font-black text-emerald-600 block">100%</span>
              <span className="text-xs text-slate-500">Copper Wiring Guarantee</span>
            </div>
            <div>
              <span className="text-3xl font-black text-blue-600 block">30 Min</span>
              <span className="text-xs text-slate-500">Emergency Response Time</span>
            </div>
          </div>
        </div>

        {/* Feature Cards Column */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 shrink-0 font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Safety First Guarantee</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We use thermal guns, digital insulation testers, and premium breaker brands (Schneider, ABB, Terasaki) to eliminate fire hazards.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0 font-bold">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1">FESCO Certified Processing</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Complete turnkey paperwork for Net Metering including Single Line Diagrams, NEPRA sub-division submissions, and green meter installation.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shrink-0 font-bold">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1">24/7 Duty Crew in Himmatpura</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Unlike freelancers who disappear after job completion, our permanent workshop in Himmatpura guarantees ongoing maintenance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
