"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Zap, Phone, Menu, X, Sun, ShieldCheck, Globe, User } from "lucide-react";

export default function Navbar() {
  const { t, language, toggleLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Notification Bar */}
      <div className="bg-[#0f2b5c] text-white text-xs sm:text-sm py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500 text-slate-950 animate-pulse">
              24/7 LIVE
            </span>
            <span>{t.common.emergencyBadge}</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:+923287848708"
              className="flex items-center gap-1 hover:text-amber-400 font-medium transition"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+92 328 7848708</span>
            </a>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded-md text-xs font-semibold tracking-wide transition cursor-pointer"
              title="Toggle English / Urdu"
            >
              <Globe className="w-3 h-3 text-amber-400" />
              <span>{language === "en" ? "اردو" : "English"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0f2b5c] via-blue-700 to-amber-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition">
              <Zap className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-[#0f2b5c] block">
                RAJAB
              </span>
              <span className="text-xs font-semibold text-slate-500 tracking-wider uppercase block">
                Electricians & Solar
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700">
            <Link href="/" className="hover:text-blue-700 transition">
              {t.nav.home}
            </Link>
            <Link href="/services" className="hover:text-blue-700 transition">
              {t.nav.services}
            </Link>
            <Link href="/solar-calculator" className="flex items-center gap-1 text-amber-700 hover:text-amber-800 font-semibold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60 transition">
              <Sun className="w-4 h-4 text-amber-500" />
              {t.nav.calculator}
            </Link>
            <Link href="/projects" className="hover:text-blue-700 transition">
              {t.nav.projects}
            </Link>
            <Link href="/reviews" className="hover:text-blue-700 transition">
              {t.nav.reviews}
            </Link>
            <Link href="/about" className="hover:text-blue-700 transition">
              {t.nav.about}
            </Link>
            <Link href="/contact" className="hover:text-blue-700 transition">
              {t.nav.contact}
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-[#0f2b5c] px-3 py-2 rounded-lg hover:bg-slate-100 transition"
            >
              <User className="w-4 h-4 text-slate-500" />
              {t.nav.login}
            </Link>
            <Link
              href="/customer/book"
              className="bg-[#0f2b5c] hover:bg-blue-900 text-white font-medium text-sm px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              {t.common.bookService}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md font-medium text-slate-800 hover:bg-slate-100"
          >
            {t.nav.home}
          </Link>
          <Link
            href="/services"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md font-medium text-slate-800 hover:bg-slate-100"
          >
            {t.nav.services}
          </Link>
          <Link
            href="/solar-calculator"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md font-semibold text-amber-700 bg-amber-50"
          >
            ☀️ {t.nav.calculator}
          </Link>
          <Link
            href="/projects"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md font-medium text-slate-800 hover:bg-slate-100"
          >
            {t.nav.projects}
          </Link>
          <Link
            href="/reviews"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md font-medium text-slate-800 hover:bg-slate-100"
          >
            {t.nav.reviews}
          </Link>
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md font-medium text-slate-800 hover:bg-slate-100"
          >
            {t.nav.about}
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md font-medium text-slate-800 hover:bg-slate-100"
          >
            {t.nav.contact}
          </Link>
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="text-center font-medium text-slate-700 py-2 rounded-lg border border-slate-200 hover:bg-slate-50"
            >
              {t.nav.login}
            </Link>
            <Link
              href="/customer/book"
              onClick={() => setIsOpen(false)}
              className="text-center font-semibold text-white bg-[#0f2b5c] py-2.5 rounded-lg shadow-sm"
            >
              {t.common.bookService}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
