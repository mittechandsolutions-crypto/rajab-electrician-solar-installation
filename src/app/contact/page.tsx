"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Electrical Inquiry");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, subject, message }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "Failed to submit message.");
        setLoading(false);
        return;
      }

      setSuccessMsg(data.message);
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-extrabold tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Get in Touch With Us
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Faisalabad Engineering Headquarters
        </h1>
        <p className="text-slate-600 text-base sm:text-lg">
          Operating 24/7 in Himmatpura. Emergency callout, project consultations, and solar surveys.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0f2b5c] text-white p-8 rounded-3xl shadow-xl space-y-6">
            <h2 className="text-2xl font-black">Rajab Contact Desk</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Call our central dispatch or visit our workshop in Himmatpura for technical consultations.
            </p>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-white">Workshop & Office</span>
                  <span className="text-slate-300">Himmatpura, Street No. 12, Faisalabad, 38000, Pakistan</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-white">24/7 Emergency Line</span>
                  <a href="tel:+923287848708" className="hover:text-amber-300 text-slate-200">
                    +92 328 7848708
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-white">Email Address</span>
                  <a href="mailto:rajabelectricianfsd@gmail.com" className="hover:text-amber-300 text-slate-200">
                    rajabelectricianfsd@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-white">Working Hours</span>
                  <span className="text-emerald-400 font-semibold">Open 24 Hours / 7 Days a Week</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <a
                href="https://wa.me/923287848708"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp (+92 328 7848708)</span>
              </a>
              <a
                href="tel:+923287848708"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow transition"
              >
                <Phone className="w-4 h-4" />
                <span>Call Electrician Now</span>
              </a>
            </div>
          </div>
        </div>

        {/* Form & Map Column */}
        <div className="lg:col-span-7 space-y-8">
          {/* Form */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Send an Inquiry</h2>

            {successMsg && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-4 rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-4 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Haji Usman"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl py-2.5 px-4 text-sm font-medium focus:bg-white focus:outline-hidden focus:border-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="03287848708"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl py-2.5 px-4 text-sm font-medium focus:bg-white focus:outline-hidden focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="usman@gmail.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl py-2.5 px-4 text-sm font-medium focus:bg-white focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Subject / Service Type
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl py-2.5 px-4 text-sm font-medium focus:bg-white focus:outline-hidden focus:border-amber-500"
                  >
                    <option value="Solar System Inquiry">Solar System Installation & Net Metering</option>
                    <option value="Emergency Electrical Repair">Emergency Fault / Tripping Repair</option>
                    <option value="House Wiring">New House Wiring & DB Dressing</option>
                    <option value="Industrial Factory Inquiry">Industrial 3-Phase Load Balancing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Message Details
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your requirement or location in Faisalabad..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl py-2.5 px-4 text-sm font-medium focus:bg-white focus:outline-hidden focus:border-amber-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0f2b5c] hover:bg-blue-900 text-white font-bold py-3.5 rounded-xl shadow transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? "Sending..." : "Send Message"}</span>
              </button>
            </form>
          </div>

          {/* Embedded Map Representation */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500" />
              Service Area Map: Himmatpura & Central Faisalabad
            </h3>
            <div className="w-full h-56 bg-slate-100 rounded-2xl flex flex-col items-center justify-center border border-slate-200 text-slate-500 text-xs text-center p-4">
              <MapPin className="w-8 h-8 text-red-500 mb-2 animate-bounce" />
              <span className="font-bold text-slate-800 text-sm">Himmatpura, Street No. 12, Faisalabad</span>
              <span>Coordinates: 31.4278° N, 73.0897° E</span>
              <span className="text-[11px] text-slate-400 mt-1">
                Covering Peoples Colony, Madina Town, D-Ground, Millat Road, and Ghulam Muhammad Abad
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
