"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Zap, MapPin, Phone, Mail, Clock, ShieldCheck, Sun } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0b1d3a] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Credentials */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-md">
                <Zap className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <span className="font-extrabold text-xl text-white block">
                  RAJAB
                </span>
                <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase block">
                  Electricians & Solar
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Faisalabad&apos;s premier certified electrical contractors and solar energy engineers. Serving domestic homes, shopping plazas, and textile manufacturing units with excellence.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-950/40 p-2.5 rounded-lg border border-amber-800/40">
              <ShieldCheck className="w-4 h-4 shrink-0 text-amber-400" />
              <span>4.8 ★ Google Rating (12+ Verified Customer Reviews)</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wide">
              Services We Provide
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/services/electrical" className="hover:text-amber-400 transition flex items-center gap-2">
                  <span className="text-amber-500">›</span> 24/7 Short Circuit Emergency
                </Link>
              </li>
              <li>
                <Link href="/services/electrical" className="hover:text-amber-400 transition flex items-center gap-2">
                  <span className="text-amber-500">›</span> Concealed House Wiring
                </Link>
              </li>
              <li>
                <Link href="/services/electrical" className="hover:text-amber-400 transition flex items-center gap-2">
                  <span className="text-amber-500">›</span> 3-Phase Industrial DB Dressing
                </Link>
              </li>
              <li>
                <Link href="/services/solar" className="hover:text-amber-400 transition flex items-center gap-2">
                  <span className="text-amber-500">›</span> On-Grid FESCO Net Metering
                </Link>
              </li>
              <li>
                <Link href="/services/solar" className="hover:text-amber-400 transition flex items-center gap-2">
                  <span className="text-amber-500">›</span> Hybrid Solar with Lithium Battery
                </Link>
              </li>
              <li>
                <Link href="/services/solar" className="hover:text-amber-400 transition flex items-center gap-2">
                  <span className="text-amber-500">›</span> Solar Panel Washing & Maintenance
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/solar-calculator" className="hover:text-amber-400 transition flex items-center gap-1.5 text-amber-300 font-medium">
                  <Sun className="w-3.5 h-3.5 text-amber-400" /> Solar Sizing Calculator
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-amber-400 transition">
                  Before & After Projects
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-amber-400 transition">
                  Customer Testimonials
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-amber-400 transition">
                  Electrical Safety & FESCO Guides
                </Link>
              </li>
              <li>
                <Link href="/customer/book" className="hover:text-amber-400 transition">
                  Book Service Online
                </Link>
              </li>
              <li>
                <Link href="/admin/dashboard" className="text-xs text-slate-500 hover:text-slate-400 transition">
                  Staff & Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wide">
              Faisalabad Headquarters
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Himmatpura, Street No. 12, Faisalabad, 38000, Pakistan</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+923287848708" className="hover:text-white transition">
                  +92 328 7848708 (24/7 Hotline)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:rajabelectricianfsd@gmail.com" className="hover:text-white transition">
                  rajabelectricianfsd@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-emerald-400 font-medium">Open 24 Hours / 7 Days a Week</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Rajab Electricians & Solar Installation. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-400 transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-400 transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
