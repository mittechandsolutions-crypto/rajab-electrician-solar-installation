"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <Link href="/login" className="text-xs font-bold text-blue-700 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to login
        </Link>
        {sent ? (
          <div className="text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h1 className="text-xl font-black text-slate-900">Request Received</h1>
            <p className="text-sm text-slate-600">
              Please contact the Rajab Electricians team for password recovery at +92 328 7848708.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h1 className="text-2xl font-black text-slate-900">Forgot Password</h1>
              <p className="text-sm text-slate-500 mt-1">Enter your account email to prepare a recovery request.</p>
            </div>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@example.com"
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 pl-10 pr-4 text-sm"
              />
            </div>
            <button type="submit" className="w-full bg-[#0f2b5c] text-white font-bold py-3 rounded-xl">
              Request Recovery
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
