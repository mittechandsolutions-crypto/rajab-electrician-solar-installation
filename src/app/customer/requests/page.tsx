"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Calendar, MapPin, Clock, ArrowLeft, X, AlertCircle
} from "lucide-react";

interface Booking {
  id: string;
  bookingNumber: string;
  serviceCategory: string;
  status: string;
  scheduledDate: string;
  scheduledTimeSlot: string;
  addressText: string;
  estimatedCost: number;
  isEmergency: boolean;
}

export default function CustomerRequestsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<string>("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const meRes = await fetch("/api/auth/me");
        const meData = await meRes.json();
        if (!meData.user) { router.push("/login"); return; }

        const res = await fetch(`/api/bookings?status=${filter}`);
        const data = await res.json();
        if (data.bookings) setBookings(data.bookings);
      } catch { /* ignore */ } finally { setLoading(false); }
    }
    load();
  }, [filter, router]);

  const statuses = ["ALL", "PENDING", "CONFIRMED", "TECHNICIAN_ASSIGNED", "IN_PROGRESS", "COMPLETED", "CANCELLED"];

  const statusColors: Record<string, string> = {
    PENDING: "bg-amber-100 text-amber-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    TECHNICIAN_ASSIGNED: "bg-indigo-100 text-indigo-800",
    IN_PROGRESS: "bg-cyan-100 text-cyan-800",
    COMPLETED: "bg-emerald-100 text-emerald-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Link href="/customer/dashboard" className="text-xs font-bold text-blue-700 flex items-center gap-1 mb-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Dashboard
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">My Service Requests</h1>
        </div>
        <Link href="/customer/book" className="bg-[#0f2b5c] hover:bg-blue-900 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition shadow-sm">
          + Book New Service
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {statuses.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              filter === s
                ? "bg-[#0f2b5c] text-white shadow"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {s.replace("_", " ")}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-400">Loading requests...</div>
      ) : bookings.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <AlertCircle className="w-10 h-10 text-slate-300 mx-auto" />
          <p className="text-slate-600 font-semibold">No bookings found for this status.</p>
          <Link href="/customer/book" className="inline-block bg-[#0f2b5c] text-white font-bold px-5 py-2.5 rounded-xl text-sm">
            Book a Service
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map(b => (
            <div key={b.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-slate-400">#{b.bookingNumber}</span>
                    {b.isEmergency && <span className="text-[10px] font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">EMERGENCY</span>}
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${statusColors[b.status] || "bg-slate-100 text-slate-600"}`}>
                      {b.status.replace(/_/g, " ")}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900">{b.serviceCategory.replace(/_/g, " ")}</h3>
                </div>
                <Link href={`/customer/requests/${b.id}`} className="text-xs font-bold text-blue-700 hover:text-blue-900 border border-blue-200 hover:bg-blue-50 px-3.5 py-1.5 rounded-xl transition whitespace-nowrap">
                  View Details →
                </Link>
              </div>

              <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {new Date(b.scheduledDate).toLocaleDateString()} at {b.scheduledTimeSlot}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {b.addressText}
                </span>
                <span className="font-semibold text-slate-700">
                  Est. PKR {b.estimatedCost?.toLocaleString() ?? "—"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
