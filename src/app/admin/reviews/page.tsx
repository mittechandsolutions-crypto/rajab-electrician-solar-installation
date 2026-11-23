"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, X, Star } from "lucide-react";

export default function AdminReviewsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState<Array<{ id: string; authorName: string; rating: number; comment: string; isApproved: boolean; createdAt: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const meRes = await fetch("/api/auth/me");
      const meData = await meRes.json();
      if (!meData.user || meData.user.role !== "ADMIN") {
        router.push("/login"); return;
      }
      // Load both approved and pending reviews
      const approvedRes = await fetch("/api/reviews?all=true");
      const approvedData = await approvedRes.json();
      if (approvedData.reviews) setReviews(approvedData.reviews);
      setLoading(false);
    }
    load();
  }, [router]);

  const handleModerate = async (id: string, approve: boolean) => {
    const res = await fetch(`/api/reviews/${id}/moderate`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isApproved: approve }),
    });
    if (res.ok) {
      if (!approve) setReviews(prev => prev.filter(r => r.id !== id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <Link href="/admin/dashboard" className="text-xs font-bold text-blue-700 mb-1 block">← Admin Dashboard</Link>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Review Moderation</h1>
        <p className="text-sm text-slate-500">Approve or reject customer reviews before they appear publicly</p>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-400">Loading reviews...</div>
      ) : (
        <div className="space-y-4">
          {reviews.map(r => (
            <div key={r.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <span className="font-bold text-slate-900">{r.authorName}</span>
                  <div className="flex items-center gap-1">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs text-slate-500 ml-1">{r.rating}/5</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!r.isApproved && (
                    <button
                      onClick={() => handleModerate(r.id, true)}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                    </button>
                  )}
                  <button
                    onClick={() => handleModerate(r.id, false)}
                    className="bg-red-100 hover:bg-red-200 text-red-700 font-bold px-3 py-1.5 rounded-lg text-xs transition flex items-center gap-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" /> {r.isApproved ? "Remove" : "Reject"}
                  </button>
                </div>
              </div>

              <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                &ldquo;{r.comment}&rdquo;
              </p>

              <div className="text-xs text-slate-400 flex justify-between">
                <span>{new Date(r.createdAt).toLocaleDateString()}</span>
                <span className={r.isApproved ? "text-emerald-600 font-bold" : "text-amber-600 font-bold"}>
                  {r.isApproved ? "✓ Published" : "⏳ Pending Approval"}
                </span>
              </div>
            </div>
          ))}
          {reviews.length === 0 && (
            <div className="py-12 text-center text-slate-400 bg-white rounded-3xl border border-slate-200">
              No reviews to moderate.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
