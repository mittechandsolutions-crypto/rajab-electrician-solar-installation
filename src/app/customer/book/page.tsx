"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, Calendar, Clock, MapPin, AlertTriangle, FileText, ArrowRight } from "lucide-react";

export default function BookServicePage() {
  const router = useRouter();
  const [serviceCategory, setServiceCategory] = useState("ELECTRICAL_RESIDENTIAL");
  const [scheduledDate, setScheduledDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [scheduledTimeSlot, setScheduledTimeSlot] = useState("10:00 AM - 12:00 PM");
  const [isEmergency, setIsEmergency] = useState(false);
  const [area, setArea] = useState("Himmatpura");
  const [street, setStreet] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceCategory,
          scheduledDate,
          scheduledTimeSlot,
          isEmergency,
          area,
          street,
          description,
          photos: [],
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        if (res.status === 401) {
          router.push("/login");
          return;
        }
        setError(data.error || "Failed to create booking.");
        setLoading(false);
        return;
      }

      router.push(`/customer/requests/${data.booking.id}`);
    } catch (err) {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Booking Wizard
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Book an Electrician or Solar Technician
        </h1>
        <p className="text-sm text-slate-500">
          Certified technicians dispatched across Faisalabad. Transparent pricing and guaranteed workmanship.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-4 rounded-xl flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
        {/* Emergency Toggle */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold shrink-0">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-sm block">Emergency 24/7 Priority Job</span>
              <span className="text-xs text-slate-600">Immediate dispatch within 30 minutes in Faisalabad</span>
            </div>
          </div>
          <input
            type="checkbox"
            checked={isEmergency}
            onChange={(e) => setIsEmergency(e.target.checked)}
            className="w-5 h-5 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
          />
        </div>

        {/* Service Category */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Service Category
          </label>
          <select
            value={serviceCategory}
            onChange={(e) => setServiceCategory(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 px-4 text-sm font-semibold text-slate-900 focus:bg-white focus:outline-hidden focus:border-amber-500"
          >
            <option value="ELECTRICAL_RESIDENTIAL">Concealed House Wiring & DB Dressing</option>
            <option value="ELECTRICAL_COMMERCIAL">Commercial & Industrial 3-Phase Work</option>
            <option value="ELECTRICAL_EMERGENCY">Short Circuit & Main Breaker Tripping</option>
            <option value="SOLAR_ON_GRID">On-Grid Solar System & Net Metering</option>
            <option value="SOLAR_HYBRID">Hybrid Solar with Lithium Battery</option>
            <option value="SOLAR_MAINTENANCE">Solar Panel Cleaning & Inspection</option>
          </select>
        </div>

        {/* Schedule */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Scheduled Date
            </label>
            <input
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 px-4 text-sm font-medium text-slate-900 focus:bg-white focus:outline-hidden focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Preferred Time Slot
            </label>
            <select
              value={scheduledTimeSlot}
              onChange={(e) => setScheduledTimeSlot(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 px-4 text-sm font-medium text-slate-900 focus:bg-white focus:outline-hidden focus:border-amber-500"
            >
              <option value="09:00 AM - 11:00 AM">Morning (09:00 AM - 11:00 AM)</option>
              <option value="11:00 AM - 01:00 PM">Noon (11:00 AM - 01:00 PM)</option>
              <option value="02:00 PM - 04:00 PM">Afternoon (02:00 PM - 04:00 PM)</option>
              <option value="04:00 PM - 06:00 PM">Evening (04:00 PM - 06:00 PM)</option>
              <option value="07:00 PM - 09:00 PM">Night (07:00 PM - 09:00 PM)</option>
            </select>
          </div>
        </div>

        {/* Location in Faisalabad */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Area / Town in Faisalabad
            </label>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="e.g. Himmatpura, Peoples Colony, Madina Town"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 px-4 text-sm font-medium text-slate-900 focus:bg-white focus:outline-hidden focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Street Address & House / Shop #
            </label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Street 12, House 4B"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 px-4 text-sm font-medium text-slate-900 focus:bg-white focus:outline-hidden focus:border-amber-500"
              required
            />
          </div>
        </div>

        {/* Fault Description */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Fault or Project Description (Min 10 characters)
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please explain the issue (e.g. Main switch burning smell, 3-phase phase missing, DB renovation needed...)"
            className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 px-4 text-sm font-medium text-slate-900 focus:bg-white focus:outline-hidden focus:border-amber-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#0f2b5c] hover:bg-blue-900 text-white font-bold py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-base"
        >
          <span>{loading ? "Submitting Booking..." : "Confirm & Dispatch Request"}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
