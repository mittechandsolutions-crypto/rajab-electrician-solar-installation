"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ArrowUpRight } from "lucide-react";

interface Booking {
  id: string;
  bookingNumber: string;
  status: string;
  isEmergency: boolean;
  serviceCategory: string;
  scheduledDate: string;
  scheduledTimeSlot: string;
  estimatedCost: number | null;
  customer?: { name: string; phone: string };
}

export default function AdminBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const meRes = await fetch("/api/auth/me");
      const meData = await meRes.json();
      if (!meData.user || meData.user.role !== "ADMIN") {
        router.push("/login"); return;
      }
      const res = await fetch(`/api/bookings?status=${filter}`);
      const data = await res.json();
      if (data.bookings) setBookings(data.bookings);
      setLoading(false);
    }
    load();
  }, [filter, router]);

  const filtered = bookings.filter(b =>
    b.bookingNumber.toLowerCase().includes(search.toLowerCase()) ||
    b.customer?.name?.toLowerCase().includes(search.toLowerCase()) ||
    b.customer?.phone?.includes(search)
  );

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Link href="/admin/dashboard" className="text-xs font-bold text-blue-700 mb-1 block">← Admin Dashboard</Link>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">All Service Bookings</h1>
        </div>
        <a
          href="/api/admin/export?type=bookings"
          className="bg-slate-700 hover:bg-slate-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition"
        >
          Export CSV
        </a>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by booking #, customer name, or phone..."
            className="w-full bg-white border border-slate-300 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-hidden focus:border-blue-500"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {statuses.map(s => (
            <button
              key={s}
              onClick={() => { setFilter(s); setLoading(true); }}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                filter === s
                  ? "bg-[#0f2b5c] text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {s.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-400">Loading bookings...</div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Booking #</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4 hidden md:table-cell">Service</th>
                <th className="py-3.5 px-4 hidden sm:table-cell">Date & Time</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 hidden lg:table-cell">Est. Cost</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(b => (
                <tr key={b.id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-slate-800">{b.bookingNumber}</span>
                    {b.isEmergency && <span className="ml-1 text-[9px] font-bold bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full">EMG</span>}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-900 block">{b.customer?.name}</span>
                    <a href={`tel:${b.customer?.phone}`} className="text-blue-600 hover:underline">{b.customer?.phone}</a>
                  </td>
                  <td className="py-3.5 px-4 hidden md:table-cell text-slate-600">
                    {b.serviceCategory?.replace(/_/g, " ")}
                  </td>
                  <td className="py-3.5 px-4 hidden sm:table-cell text-slate-500">
                    {new Date(b.scheduledDate).toLocaleDateString()}
                    <span className="block text-[11px]">{b.scheduledTimeSlot}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${statusColors[b.status] || "bg-slate-100 text-slate-600"}`}>
                      {b.status.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 hidden lg:table-cell font-semibold text-slate-700">
                    PKR {b.estimatedCost?.toLocaleString() ?? "—"}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/customer/requests/${b.id}`}
                      className="font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 justify-end"
                    >
                      View <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-slate-400 text-sm">No bookings match your search.</div>
          )}
        </div>
      )}
    </div>
  );
}
