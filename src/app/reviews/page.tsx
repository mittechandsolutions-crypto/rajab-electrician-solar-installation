"use client";

import React, { useState } from "react";
import { Star, MessageSquare, Send, CheckCircle2, ShieldCheck } from "lucide-react";

export default function ReviewsPage() {
  const [authorName, setAuthorName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authorName, rating, comment }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        if (res.status === 401) {
          setError("Please login to submit a review for your completed job.");
          setLoading(false);
          return;
        }
        setError(data.error || "Failed to submit review.");
        setLoading(false);
        return;
      }

      setMessage(data.message);
      setComment("");
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-extrabold tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Client Feedback & Ratings
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Verified Reviews from Faisalabad
        </h1>
        <p className="text-slate-600 text-base sm:text-lg">
          Google Rating 4.8 ★ across domestic homes, retail shops, and industrial units in Himmatpura and beyond.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Reviews List */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-lg">Sheikh Tariq Mehmood</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed italic">
              &quot;We called them at 11 PM for an emergency main breaker burnout in Himmatpura. Their electrician arrived in 25 minutes and fixed everything safely without any power interruptions to the rest of the building.&quot;
            </p>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Verified Homeowner • Himmatpura, Faisalabad</span>
              <span className="text-emerald-600 font-semibold">✓ Verified Service</span>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-lg">Dr. Farhan Akram</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed italic">
              &quot;Rajab Electricians installed our 10kW On-Grid solar setup in Peoples Colony. The FESCO net metering was handled completely by them without any hassle. Highly recommended for solar work in Faisalabad!&quot;
            </p>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>10kW Solar System • Peoples Colony</span>
              <span className="text-emerald-600 font-semibold">✓ Verified Solar Job</span>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-lg">Chaudhry Nadeem</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed italic">
              &quot;Best industrial electricians in Faisalabad. They balanced the 3-phase load on our textile sizing looms and power factor penalties were completely removed from our FESCO bill.&quot;
            </p>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Textile Sizing Mill • Millat Road</span>
              <span className="text-emerald-600 font-semibold">✓ Verified Industrial Job</span>
            </div>
          </div>
        </div>

        {/* Right Column: Submit Review Form */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-500" />
              Leave a Review
            </h2>
            <p className="text-xs text-slate-500">
              Share your experience with our electrical repair or solar installation team.
            </p>
          </div>

          {message && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3.5 rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{message}</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Sheikh Usman"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl py-2.5 px-4 text-sm font-medium focus:bg-white focus:outline-hidden focus:border-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Rating
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl py-2.5 px-4 text-sm font-medium focus:bg-white focus:outline-hidden focus:border-amber-500"
              >
                <option value={5}>★★★★★ (5 Stars - Outstanding)</option>
                <option value={4}>★★★★☆ (4 Stars - Very Good)</option>
                <option value={3}>★★★☆☆ (3 Stars - Satisfactory)</option>
                <option value={2}>★★☆☆☆ (2 Stars - Needs Improvement)</option>
                <option value={1}>★☆☆☆☆ (1 Star - Poor)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Your Feedback
              </label>
              <textarea
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us about the technician's punctuality, electrical safety, or solar output..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl py-2.5 px-4 text-sm font-medium focus:bg-white focus:outline-hidden focus:border-amber-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0f2b5c] hover:bg-blue-900 text-white font-bold py-3.5 rounded-xl shadow transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? "Submitting..." : "Submit Review"}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
