"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Zap,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  AlertCircle,
  FileText,
  User,
  ArrowLeft,
} from "lucide-react";

interface BookingDetail {
  id: string;
  bookingNumber: string;
  serviceCategory: string;
  status: string;
  scheduledDate: string;
  scheduledTimeSlot: string;
  isEmergency: boolean;
  addressText: string;
  description: string;
  estimatedCost: number;
  finalAmount?: number;
  adminNotes?: string;
  technician?: { name: string; phone: string };
  timeline: { id: string; status: string; title: string; note?: string; performedBy: string; createdAt: string }[];
  invoices: { id: string; invoiceNumber: string; totalAmount: number; paymentStatus: string }[];
}

export default function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    async function loadBooking() {
      try {
        const res = await fetch(`/api/bookings/${id}`);
        const data = await res.json();
        if (data.booking) {
          setBooking(data.booking);
        } else {
          router.push("/customer/dashboard");
        }
      } catch (err) {
        console.error("Failed to load booking:", err);
      } finally {
        setLoading(false);
      }
    }
    loadBooking();
  }, [id, router]);

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    setCancelling(true);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "CANCEL", reason: "Cancelled by customer" }),
      });
      const data = await res.json();
      if (data.success) {
        setBooking(data.booking);
      }
    } catch (err) {
      alert("Error cancelling booking");
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return <div className="p-20 text-center text-slate-500">Loading booking timeline...</div>;
  }

  if (!booking) return null;

  const steps = [
    { key: "PENDING", label: "Request Placed" },
    { key: "CONFIRMED", label: "Approved" },
    { key: "TECHNICIAN_ASSIGNED", label: "Technician Dispatched" },
    { key: "IN_PROGRESS", label: "In Progress" },
    { key: "COMPLETED", label: "Completed" },
  ];

  const currentStepIdx = steps.findIndex((s) => s.key === booking.status);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Link
            href="/customer/dashboard"
            className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Booking #{booking.bookingNumber}
            </h1>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                booking.status === "PENDING"
                  ? "bg-amber-100 text-amber-800"
                  : booking.status === "COMPLETED"
                  ? "bg-emerald-100 text-emerald-800"
                  : booking.status === "CANCELLED"
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {booking.status.replace("_", " ")}
            </span>
          </div>
        </div>

        {booking.status !== "COMPLETED" && booking.status !== "CANCELLED" && (
          <button
            onClick={handleCancel}
            disabled={cancelling}
            className="text-xs font-bold text-red-600 hover:text-red-700 border border-red-200 hover:bg-red-50 px-3.5 py-2 rounded-xl transition cursor-pointer"
          >
            {cancelling ? "Cancelling..." : "Cancel Booking"}
          </button>
        )}
      </div>

      {/* Progress Stepper */}
      {booking.status !== "CANCELLED" && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
            {steps.map((st, i) => {
              const isPast = currentStepIdx >= i;
              const isCurrent = currentStepIdx === i;
              return (
                <div key={st.key} className="space-y-2 flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition ${
                      isPast
                        ? "bg-emerald-500 text-white shadow-sm"
                        : "bg-slate-100 text-slate-400"
                    } ${isCurrent ? "ring-4 ring-emerald-100" : ""}`}
                  >
                    {isPast ? <CheckCircle className="w-4 h-4" /> : i + 1}
                  </div>
                  <span
                    className={`font-semibold ${
                      isPast ? "text-slate-900" : "text-slate-400"
                    }`}
                  >
                    {st.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Job Overview */}
        <div className="md:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
          <h2 className="text-lg font-bold text-slate-900">Service Specifications</h2>

          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <span className="text-slate-400 font-semibold block mb-0.5">Category</span>
              <p className="font-bold text-slate-800">{booking.serviceCategory}</p>
            </div>

            <div>
              <span className="text-slate-400 font-semibold block mb-0.5">Appointment Schedule</span>
              <p className="font-bold text-slate-800">
                {new Date(booking.scheduledDate).toLocaleDateString()} at {booking.scheduledTimeSlot}
              </p>
            </div>

            <div>
              <span className="text-slate-400 font-semibold block mb-0.5">Location Address</span>
              <p className="font-medium text-slate-800">{booking.addressText}</p>
            </div>

            <div>
              <span className="text-slate-400 font-semibold block mb-0.5">Reported Fault / Requirement</span>
              <p className="font-medium text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                {booking.description}
              </p>
            </div>

            {booking.technician && (
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
                <span className="font-bold block">Assigned Technician:</span>
                <p className="font-medium">{booking.technician.name} ({booking.technician.phone})</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Invoices & Timeline */}
        <div className="md:col-span-5 space-y-6">
          {/* Invoice Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Payment & Invoicing</h2>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Estimated Fee:</span>
                <span className="font-bold text-slate-800">PKR {booking.estimatedCost?.toLocaleString()}</span>
              </div>
              {booking.finalAmount && (
                <div className="flex justify-between text-slate-900 font-bold text-sm pt-2 border-t border-slate-100">
                  <span>Final Job Total:</span>
                  <span className="text-emerald-600">PKR {booking.finalAmount.toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <span className="font-bold block text-slate-800">Accepted Payment Methods:</span>
              <p>• Cash on Service to Technician</p>
              <p>• JazzCash / Easypaisa: <strong>0328-7848708</strong></p>
              <p>• Online Bank Transfer</p>
            </div>
          </div>

          {/* Timeline History */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Activity History</h2>

            <div className="space-y-4">
              {booking.timeline?.map((evt, idx) => (
                <div key={evt.id || idx} className="text-xs space-y-1 border-l-2 border-blue-600 pl-3 py-0.5">
                  <div className="flex justify-between items-center text-slate-400 text-[11px]">
                    <span className="font-semibold text-blue-900">{evt.performedBy}</span>
                    <span>{new Date(evt.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                  <h4 className="font-bold text-slate-800">{evt.title}</h4>
                  {evt.note && <p className="text-slate-500">{evt.note}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
