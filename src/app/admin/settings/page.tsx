"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Save, CheckCircle2, AlertCircle } from "lucide-react";

interface Settings {
  companyName: string;
  phone: string;
  whatsapp: string;
  email: string;
  addressEn: string;
  addressUr: string;
  solarRatePerWattPKR: number;
  netMeteringCostPKR: number;
  averageUnitCostPKR: number;
  emergencySurchargePKR: number;
}

export default function AdminSettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    async function load() {
      const meRes = await fetch("/api/auth/me");
      const meData = await meRes.json();
      if (!meData.user || meData.user.role !== "ADMIN") {
        router.push("/login"); return;
      }
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.settings) setSettings(data.settings);
      setLoading(false);
    }
    load();
  }, [router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(""); setErr("");
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) { setMsg("Settings saved successfully!"); }
      else setErr(data.error || "Failed to save.");
    } catch { setErr("Network error."); }
    finally { setSaving(false); }
  };

  if (loading || !settings) return <div className="py-20 text-center text-slate-400">Loading settings...</div>;

  const field = (label: string, key: keyof Settings, type: string = "text") => (
    <div key={key}>
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">{label}</label>
      <input
        type={type}
        value={settings[key] as string | number}
        onChange={e => setSettings(prev => prev ? ({
          ...prev,
          [key]: type === "number" ? Number(e.target.value) : e.target.value
        }) : prev)}
        className="w-full bg-slate-50 border border-slate-300 rounded-xl py-2.5 px-4 text-sm font-medium focus:bg-white focus:outline-hidden focus:border-amber-500"
      />
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <Link href="/admin/dashboard" className="text-xs font-bold text-blue-700 mb-1 block">← Admin Dashboard</Link>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">System Settings</h1>
        <p className="text-sm text-slate-500">Business information and solar calculator formula weights</p>
      </div>

      {msg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3.5 rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" /> {msg}
        </div>
      )}
      {err && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" /> {err}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Business Info */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
          <h2 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-2">Business Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {field("Company Name", "companyName")}
            {field("Phone", "phone")}
            {field("WhatsApp", "whatsapp")}
            {field("Email", "email", "email")}
            {field("Address (English)", "addressEn")}
            {field("Address (Urdu)", "addressUr")}
          </div>
        </div>

        {/* Solar Formula */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
          <h2 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-2">Solar Calculator Formula</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {field("Rate per Watt (PKR)", "solarRatePerWattPKR", "number")}
            {field("Net Metering Cost (PKR)", "netMeteringCostPKR", "number")}
            {field("Average Unit Cost/kWh (PKR)", "averageUnitCostPKR", "number")}
            {field("Emergency Surcharge (PKR)", "emergencySurchargePKR", "number")}
          </div>
          <p className="text-xs text-slate-400">
            These values are used in real-time by the solar calculator on the public website and customer quote wizard.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-[#0f2b5c] hover:bg-blue-900 text-white font-bold py-3.5 rounded-xl shadow transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving..." : "Save All Settings"}</span>
        </button>
      </form>
    </div>
  );
}
