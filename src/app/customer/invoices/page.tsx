"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Star, CheckCircle2, AlertCircle, Clock } from "lucide-react";

interface Booking {
  id: string;
  bookingNumber: string;
  serviceCategory: string;
  status: string;
  scheduledDate: string;
  finalAmount?: number;
  estimatedCost?: number;
  invoices: { id: string; invoiceNumber: string; totalAmount: number; paymentStatus: string }[];
}

export default function CustomerInvoicesPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const meRes = await fetch("/api/auth/me");
      const meData = await meRes.json();
      if (!meData.user) { router.push("/login"); return; }

      const res = await fetch("/api/bookings");
      const data = await res.json();
      if (data.bookings) {
        setBookings(data.bookings.filter((b: Booking) => b.invoices?.length > 0 || b.status === "COMPLETED"));
      }
      setLoading(false);
    }
    load();
  }, [router]);

  const statusColors: Record<string, string> = {
    UNPAID: "bg-amber-100 text-amber-800",
    PAID: "bg-emerald-100 text-emerald-800",
    PARTIALLY_PAID: "bg-blue-100 text-blue-800",
  };

  if (loading) return <div className="py-20 text-center text-slate-400">Loading invoices...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <Link href="/customer/dashboard" className="text-xs font-bold text-blue-700 flex items-center gap-1 mb-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Dashboard
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Invoices & Payments</h1>
        <p className="text-sm text-slate-500 mt-1">Payment methods: Cash on Service, JazzCash 0328-7848708, Easypaisa 0328-7848708, Bank Transfer</p>
      </div>

      {/* Payment Instructions Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-xs text-blue-900 space-y-2">
        <p className="font-bold text-sm">Payment Options Available:</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          {[
            { label: "Cash on Service", icon: "💵" },
            { label: "JazzCash 0328-7848708", icon: "📱" },
            { label: "Easypaisa 0328-7848708", icon: "💳" },
            { label: "Bank Transfer (MCB/HBL)", icon: "🏦" },
          ].map((p, i) => (
            <div key={i} className="bg-white rounded-xl p-3 border border-blue-200">
              <span className="text-lg block mb-1">{p.icon}</span>
              <span className="font-semibold">{p.label}</span>
            </div>
          ))}
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <Clock className="w-10 h-10 text-slate-300 mx-auto" />
          <p className="text-slate-600 font-semibold">No completed bookings with invoices yet.</p>
          <Link href="/customer/book" className="inline-block bg-[#0f2b5c] text-white font-bold px-5 py-2.5 rounded-xl text-sm">
            Book Your First Service
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map(b => (
            <div key={b.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex justify-between items-start flex-wrap gap-3">
                <div>
                  <span className="font-mono text-xs font-bold text-slate-400 block">#{b.bookingNumber}</span>
                  <h3 className="font-bold text-slate-900">{b.serviceCategory.replace(/_/g, " ")}</h3>
                  <span className="text-xs text-slate-500">{new Date(b.scheduledDate).toLocaleDateString()}</span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-slate-900 block">
                    PKR {(b.finalAmount || b.estimatedCost || 0).toLocaleString()}
                  </span>
                </div>
              </div>

              {b.invoices?.length > 0 ? b.invoices.map(inv => (
                <div key={inv.id} className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex justify-between items-center">
                  <div className="text-xs space-y-0.5">
                    <span className="font-bold text-slate-900 block">Invoice {inv.invoiceNumber}</span>
                    <span className="text-slate-500">Total: PKR {inv.totalAmount.toLocaleString()}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${statusColors[inv.paymentStatus] || "bg-slate-100 text-slate-600"}`}>
                    {inv.paymentStatus.replace("_", " ")}
                  </span>
                </div>
              )) : (
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-800">
                  Invoice will be generated once work is completed by the technician.
                </div>
              )}

              <div className="text-xs text-slate-500 border-t border-slate-100 pt-3">
                For payment confirmation, WhatsApp your receipt to <strong className="text-slate-800">0328-7848708</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
