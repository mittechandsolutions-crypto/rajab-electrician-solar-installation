"use client";

import React from "react";
import { Phone, MessageCircle } from "lucide-react";

export default function FloatingActionButtons() {
  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/923287848708?text=Hello%20Rajab%20Electricians!%20I%20need%20assistance%20with%20electrical%20or%20solar%20service%20in%20Faisalabad."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group relative"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
        <span className="absolute right-16 bg-slate-900 text-white text-xs font-semibold px-2.5 py-1 rounded shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          WhatsApp 24/7
        </span>
      </a>

      {/* Direct Call Button */}
      <a
        href="tel:+923287848708"
        aria-label="Direct Phone Call"
        className="w-14 h-14 bg-[#0f2b5c] hover:bg-blue-900 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group relative border-2 border-amber-400"
      >
        <Phone className="w-6 h-6 animate-pulse text-amber-300" />
        <span className="absolute right-16 bg-slate-900 text-white text-xs font-semibold px-2.5 py-1 rounded shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Emergency Call: 0328-7848708
        </span>
      </a>
    </div>
  );
}
