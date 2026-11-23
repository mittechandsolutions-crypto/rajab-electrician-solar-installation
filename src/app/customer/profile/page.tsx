"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function CustomerProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; name: string; email: string; phone: string } | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (!data.user) { router.push("/login"); return; }
      setUser(data.user);
      setName(data.user.name);
      setLoading(false);
    }
    load();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/me", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  const handleSave = async () => {
    setSaving(true);
    setMsg("");
    try {
      const res = await fetch("/api/auth/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Unable to save");
      setUser(data.user);
      setName(data.user.name);
      setMsg("Profile updated successfully.");
    } catch (error) {
      setMsg(error instanceof Error ? error.message : "Unable to save profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="py-20 text-center text-slate-400">Loading profile...</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <Link href="/customer/dashboard" className="text-xs font-bold text-blue-700 flex items-center gap-1 mb-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Dashboard
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Account Profile</h1>
      </div>

      {msg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3.5 rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{msg}</span>
        </div>
      )}

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-5">
        <h2 className="text-lg font-bold text-slate-900">Personal Information</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:bg-white focus:outline-hidden focus:border-amber-500"
              />
            </div>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-[#0f2b5c] hover:bg-blue-900 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-sm transition"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full bg-slate-100 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm font-medium text-slate-500 cursor-not-allowed"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Email cannot be changed. Contact support if needed.</p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Phone / WhatsApp</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                value={user?.phone || ""}
                disabled
                className="w-full bg-slate-100 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm font-medium text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-3xl p-6 border border-red-100 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900">Account Actions</h2>
        <button
          onClick={handleLogout}
          className="w-full border border-red-200 text-red-700 hover:bg-red-50 font-bold py-3 rounded-xl text-sm transition cursor-pointer"
        >
          Sign Out of Account
        </button>
      </div>
    </div>
  );
}
