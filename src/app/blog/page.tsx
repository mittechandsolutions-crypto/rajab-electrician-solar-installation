import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const posts = [
  {
    slug: "fesco-net-metering-guide-faisalabad-2026",
    titleEn: "Step-by-Step Guide to FESCO Solar Net Metering in Faisalabad (2026)",
    excerptEn: "Learn the latest NEPRA rules, required documents, Single Line Diagram specs, and green meter processing times for FESCO consumers in Punjab.",
    category: "Solar & Net Metering",
    readTime: "8 min read",
    date: "October 2026",
  },
  {
    slug: "preventing-electrical-fires-in-summer",
    titleEn: "5 Vital Signs Your Home Distribution Board is Overheating",
    excerptEn: "High AC loads during Faisalabad summers put extreme pressure on neutral wires and main breakers. Here is how to stay safe and prevent electrical fires.",
    category: "Electrical Safety",
    readTime: "5 min read",
    date: "September 2026",
  },
  {
    slug: "solar-vs-loadshedding-faisalabad",
    titleEn: "Is On-Grid Solar Worth It During Faisalabad Loadshedding?",
    excerptEn: "On-grid systems shut off during outages for safety. Discover why hybrid is the ultimate solution for zero loadshedding in Faisalabad summer.",
    category: "Solar Energy",
    readTime: "6 min read",
    date: "August 2026",
  },
  {
    slug: "solar-panel-cleaning-tips",
    titleEn: "How Often Should You Clean Solar Panels in Faisalabad?",
    excerptEn: "Industrial dust from Faisalabad's cotton and textile industry can reduce panel output by up to 25%. Our technicians share the right washing frequency and method.",
    category: "Maintenance",
    readTime: "4 min read",
    date: "July 2026",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase font-extrabold tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Expert Knowledge Hub
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Electrical & Solar Safety Tips
        </h1>
        <p className="text-slate-600">
          Guides written by our Faisalabad engineering team on FESCO net metering, load management, and safe solar practices.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {posts.map((post, i) => (
          <article
            key={post.slug}
            className={`bg-white rounded-3xl p-8 border border-slate-200 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col ${i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                {post.category}
              </span>
              <span className="text-xs text-slate-400">{post.readTime}</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-3 leading-tight">
              {post.titleEn}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed flex-1">
              {post.excerptEn}
            </p>
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-400">{post.date} • Engr. Rajab Team</span>
              <Link
                href={`/blog/${post.slug}`}
                className="flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 transition"
              >
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
