"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Calendar,
  DollarSign,
  Sun,
  Clock,
  ArrowUpRight,
  Download,
  FileSpreadsheet,
} from "lucide-react";

interface AdminStats {
  totalBookings: number;
  pendingBookings: number;
  completedBookings: number;
  totalQuotes: number;
  totalCustomers: number;
  totalRevenuePKR: number;
}

interface RecentBooking {
  id: string;
  bookingNumber: string;
  status: string;
  serviceCategory: string;
  customer?: { name: string; phone: string };
}

interface RecentQuote {
  id: string;
  name: string;
  phone: string;
  areaLocation: string;
  monthlyBillPKR: number;
  recommendedKw: number;
  estimatedCost: number;
  systemType: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([]);
  const [recentQuotes, setRecentQuotes] = useState<RecentQuote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        if (!data.success) {
          router.push("/login");
          return;
        }
        setStats(data.stats);
        setRecentBookings(data.recentBookings || []);
        setRecentQuotes(data.recentQuotes || []);
      } catch (err) {
        console.error("Admin dashboard load failed:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, [router]);

  if (loading) {
    return <div className="p-20 text-center text-slate-500">Loading admin operations desk...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Top Banner */}
      <div className="bg-[#0f2b5c] rounded-3xl p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-white/10 px-3 py-1 rounded-full border border-white/10">
            Admin Central Dispatch
          </span>
          <h1 className="text-3xl font-black">Rajab Operations Management</h1>
          <p className="text-xs text-slate-300">
            Himmatpura Street 12 Headquarters • Live bookings, technicians & revenue analytics
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href="/api/admin/export?type=bookings"
            className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-2 border border-white/20 transition"
          >
            <Download className="w-4 h-4" />
            <span>Export Bookings CSV</span>
          </a>
          <a
            href="/api/admin/export?type=quotes"
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export Solar Leads CSV</span>
          </a>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Pending Jobs</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-3xl font-black text-amber-600 block">
            {stats?.pendingBookings}
          </span>
          <span className="text-[11px] text-slate-500">Requires technician dispatch</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Total Bookings</span>
            <Calendar className="w-4 h-4 text-blue-500" />
          </div>
          <span className="text-3xl font-black text-slate-900 block">
            {stats?.totalBookings}
          </span>
          <span className="text-[11px] text-slate-500">{stats?.completedBookings} Completed</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Solar Inquiries</span>
            <Sun className="w-4 h-4 text-orange-500" />
          </div>
          <span className="text-3xl font-black text-orange-600 block">
            {stats?.totalQuotes}
          </span>
          <span className="text-[11px] text-slate-500">Calculator & Quote leads</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Collected Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <span className="text-3xl font-black text-emerald-600 block">
            PKR {stats?.totalRevenuePKR?.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-500">Verified Paid Invoices</span>
        </div>
      </div>

      {/* Bookings & Quotes Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Service Bookings */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">Recent Service Bookings</h2>
            <Link
              href="/admin/bookings"
              className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
            >
              Manage All <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">Booking #</th>
                  <th className="py-3 px-3">Customer</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-3 font-mono font-bold text-slate-800">
                      {b.bookingNumber}
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-slate-900 block">{b.customer?.name}</span>
                      <span className="text-[11px] text-slate-500">{b.customer?.phone}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-700">{b.serviceCategory}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          b.status === "PENDING"
                            ? "bg-amber-100 text-amber-800"
                            : b.status === "COMPLETED"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link
                        href={`/customer/requests/${b.id}`}
                        className="font-bold text-blue-700 hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Solar Quote Leads */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Recent Solar Leads</h2>

          <div className="space-y-3">
            {recentQuotes.map((q) => (
              <div
                key={q.id}
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 text-xs space-y-1.5"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900">{q.name}</span>
                  <span className="text-[10px] bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full font-bold">
                    {q.recommendedKw} kW ({q.systemType})
                  </span>
                </div>
                <div className="text-slate-600 flex justify-between">
                  <span>{q.areaLocation}</span>
                  <span className="font-bold text-slate-800">
                    Bill: PKR {q.monthlyBillPKR.toLocaleString()}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 flex justify-between pt-1 border-t border-slate-200">
                  <a href={`tel:${q.phone}`} className="text-blue-700 hover:underline font-bold">
                    📞 {q.phone}
                  </a>
                  <span>Est. PKR {(q.estimatedCost / 100000).toFixed(1)} Lakh</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
