"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Zap,
  Calendar,
  Clock,
  MapPin,
  FileText,
  AlertCircle,
  PlusCircle,
  Sun,
  ShieldCheck,
  CheckCircle2,
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
  timeline: { id: string; status: string; title: string; createdAt: string }[];
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export default function CustomerDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const meRes = await fetch("/api/auth/me");
        const meData = await meRes.json();
        if (!meData.user) {
          router.push("/login");
          return;
        }
        setUser(meData.user);

        const bookRes = await fetch("/api/bookings");
        const bookData = await bookRes.json();
        if (bookData.bookings) {
          setBookings(bookData.bookings);
        }
      } catch (err) {
        console.error("Dashboard load failed:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [router]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-500 font-medium">
        Loading customer dashboard...
      </div>
    );
  }

  const activeBookings = bookings.filter(
    (b) => b.status !== "COMPLETED" && b.status !== "CANCELLED"
  );
  const pastBookings = bookings.filter(
    (b) => b.status === "COMPLETED" || b.status === "CANCELLED"
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0f2b5c] to-blue-900 rounded-3xl p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-white/10 px-3 py-1 rounded-full border border-white/10">
            Customer Portal
          </span>
          <h1 className="text-3xl font-black">Welcome, {user?.name}!</h1>
          <p className="text-sm text-slate-300">
            Registered phone: {user?.phone} • Himmatpura 24/7 service center dispatch
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/customer/book"
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl shadow-md transition flex items-center gap-2 text-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Book Electrician</span>
          </Link>
          <Link
            href="/customer/solar-quote"
            className="bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-2.5 rounded-xl border border-white/20 transition flex items-center gap-2 text-sm"
          >
            <Sun className="w-4 h-4 text-amber-400" />
            <span>Get Solar Quote</span>
          </Link>
        </div>
      </div>

      {/* Stats Quick Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 font-bold">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900">{activeBookings.length}</span>
            <span className="text-xs text-slate-500 block">Active Requests In Progress</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900">{pastBookings.length}</span>
            <span className="text-xs text-slate-500 block">Completed Jobs & Invoices</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900">100%</span>
            <span className="text-xs text-slate-500 block">Verified Workmanship Guarantee</span>
          </div>
        </div>
      </div>

      {/* Active Service Requests */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Active Service Bookings</h2>

        {activeBookings.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-4">
            <Zap className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="font-bold text-slate-800 text-lg">No active service requests</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Need wiring repair, short-circuit diagnostics, or a solar consultation in Faisalabad?
            </p>
            <Link
              href="/customer/book"
              className="inline-flex items-center gap-2 bg-[#0f2b5c] hover:bg-blue-900 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition"
            >
              <span>Book a Service Now</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeBookings.map((b) => (
              <div
                key={b.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4 hover:border-amber-400 transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-400 block">
                      #{b.bookingNumber}
                    </span>
                    <h3 className="font-bold text-lg text-slate-900">{b.serviceCategory}</h3>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      b.status === "PENDING"
                        ? "bg-amber-100 text-amber-800"
                        : b.status === "IN_PROGRESS"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {b.status.replace("_", " ")}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>
                      {new Date(b.scheduledDate).toLocaleDateString()} ({b.scheduledTimeSlot})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="truncate">{b.addressText}</span>
                  </div>
                </div>

                {/* Latest Timeline Step */}
                {b.timeline && b.timeline.length > 0 && (
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                    <span className="font-bold text-slate-700 block mb-1">Latest Update:</span>
                    <p className="text-slate-600">{b.timeline[b.timeline.length - 1].title}</p>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900">
                    Est. PKR {b.estimatedCost?.toLocaleString()}
                  </span>
                  <Link
                    href={`/customer/requests/${b.id}`}
                    className="font-bold text-blue-700 hover:text-blue-900"
                  >
                    View Timeline & Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
