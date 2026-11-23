import React from "react";
import Link from "next/link";
import { Zap, Home, Phone } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-6">
      <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center">
        <Zap className="w-8 h-8" />
      </div>
      <h1 className="text-5xl sm:text-6xl font-black text-slate-900">404</h1>
      <h2 className="text-2xl font-bold text-slate-800">Circuit Breaker Tripped - Page Not Found</h2>
      <p className="text-sm text-slate-500 max-w-md">
        The link you clicked may have moved or no longer exists. Return home or contact our 24/7 team in Himmatpura.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-[#0f2b5c] hover:bg-blue-900 text-white font-bold px-6 py-3 rounded-xl text-sm transition shadow"
        >
          <Home className="w-4 h-4" />
          <span>Back to Homepage</span>
        </Link>
        <a
          href="tel:+923287848708"
          className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition shadow"
        >
          <Phone className="w-4 h-4" />
          <span>Call 0328-7848708</span>
        </a>
      </div>
    </div>
  );
}
