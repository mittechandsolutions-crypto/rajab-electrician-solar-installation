"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Phone, Download } from "lucide-react";

interface SolarQuote {
  id: string;
  quoteNumber: string;
  name: string;
  phone: string;
  areaLocation: string;
  monthlyBillPKR: number;
  recommendedKw: number;
  estimatedCost: number;
  systemType: string;
  status: string;
}

export default function AdminQuotesPage() {
  const router = useRouter();
  const [quotes, setQuotes] = useState<SolarQuote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const meRes = await fetch("/api/auth/me");
      const meData = await meRes.json();
      if (!meData.user || meData.user.role !== "ADMIN") {
        router.push("/login"); return;
      }
      const res = await fetch("/api/quotes");
      const data = await res.json();
      if (data.quotes) setQuotes(data.quotes);
      setLoading(false);
    }
    load();
  }, [router]);

  const statusColors: Record<string, string> = {
    NEW: "bg-amber-100 text-amber-800",
    CONTACTED: "bg-blue-100 text-blue-800",
    QUOTED: "bg-indigo-100 text-indigo-800",
    WON: "bg-emerald-100 text-emerald-800",
    LOST: "bg-red-100 text-red-800",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Link href="/admin/dashboard" className="text-xs font-bold text-blue-700 mb-1 block">← Admin Dashboard</Link>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Solar Quote Leads</h1>
          <p className="text-sm text-slate-500">Inquiries from solar calculator and quote request form</p>
        </div>
        <a
          href="/api/admin/export?type=quotes"
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition flex items-center gap-2"
        >
          <Download className="w-4 h-4" /> Export CSV
        </a>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-400">Loading solar leads...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {quotes.map(q => (
            <div key={q.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-xs font-bold text-slate-400">{q.quoteNumber}</span>
                  <h3 className="font-black text-slate-900 text-lg">{q.name}</h3>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${statusColors[q.status] || "bg-slate-100 text-slate-600"}`}>
                  {q.status}
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <a href={`tel:${q.phone}`} className="text-blue-700 hover:underline font-semibold">{q.phone}</a>
                </div>
                <p className="text-slate-500">📍 {q.areaLocation}</p>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-slate-400 block">Monthly Bill</span>
                    <span className="font-bold text-slate-800">PKR {q.monthlyBillPKR?.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">System Size</span>
                    <span className="font-bold text-orange-600">{q.recommendedKw} kW</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Est. Cost</span>
                    <span className="font-bold text-slate-800">PKR {(q.estimatedCost / 100000).toFixed(1)} Lakh</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">System Type</span>
                    <span className="font-semibold text-slate-700">{q.systemType}</span>
                  </div>
                </div>
              </div>

              <a
                href={`https://wa.me/${q.phone?.replace(/\D/g, "")}?text=Assalamoalaikum%20${q.name}%2C%20Rajab%20Electricians%20calling%20about%20your%20solar%20quote%20${q.quoteNumber}%20for%20${q.recommendedKw}kW%20system.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-xl text-xs transition"
              >
                Follow Up on WhatsApp
              </a>
            </div>
          ))}
          {quotes.length === 0 && (
            <div className="col-span-3 py-12 text-center text-slate-400">No solar leads yet.</div>
          )}
        </div>
      )}
    </div>
  );
}
