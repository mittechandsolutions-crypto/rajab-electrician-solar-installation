import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

const articles: Record<string, { title: string; content: string; date: string; category: string }> = {
  "fesco-net-metering-guide-faisalabad-2026": {
    title: "Step-by-Step Guide to FESCO Solar Net Metering in Faisalabad (2026)",
    date: "October 2026",
    category: "Solar & Net Metering",
    content: `
FESCO (Faisalabad Electric Supply Company) offers Net Metering under NEPRA regulations for residential, commercial, and industrial electricity consumers with a 3-phase meter in Faisalabad and surrounding districts.

## What is Net Metering?

Net metering allows you to install a solar system and export any surplus electricity you generate back to the national grid. FESCO then credits those exported units against your monthly bill, effectively spinning your meter backwards during peak solar hours.

## Step 1: System Installation

First, have your On-Grid solar system installed by a NEPRA-licensed solar contractor (like Rajab Electricians). Your system must use grid-tied inverters (Huawei, Sungrow, Inverex, Fronus) that automatically shut off during grid outages for safety.

## Step 2: Single Line Diagram (SLD)

Your contractor prepares a technical Single Line Diagram showing the solar panels, inverter, protection devices, and connection to your FESCO metering point. This document must be stamped by a registered electrical engineer.

## Step 3: NEPRA & FESCO Application

Submit your application to the FESCO Divisional Superintendent's office with:
- Completed NEPRA Net Metering Application Form
- Single Line Diagram (SLD) by licensed electrical engineer
- Copy of your existing FESCO consumer bill
- Inverter and panel specifications / warranties
- Photographs of installed system

## Step 4: FESCO Inspection

A FESCO field inspector visits your premises to verify the installation. They check that the inverter is properly anti-islanding protected, grounding is correct, and the system matches the SLD.

## Step 5: Green Meter Installation

Upon approval, FESCO replaces your existing meter with a bidirectional electronic green meter that measures both import (from grid) and export (to grid) separately.

## Cost of Net Metering Processing

FESCO charges approximately PKR 85,000 – 110,000 for the new bidirectional meter and administrative processing fees. Rajab Electricians handles the entire paperwork process on your behalf.

## Contact Us

For turnkey FESCO Net Metering installation in Faisalabad, call **+92 328 7848708** or [book a consultation online](/customer/solar-quote).
    `,
  },
  "preventing-electrical-fires-in-summer": {
    title: "5 Vital Signs Your Home Distribution Board is Overheating",
    date: "September 2026",
    category: "Electrical Safety",
    content: `
During peak summer months in Faisalabad, ambient temperatures often exceed 45°C. Combined with multiple air conditioners, water turbines, and refrigerators running simultaneously, this creates extreme thermal stress on your home's electrical distribution board (DB).

## Warning Sign 1: Burning Plastic Smell

If you notice a burning plastic or rubber smell from your meter board or any switch, **switch off the main breaker immediately** and call an electrician. This indicates insulation degradation, which can ignite within minutes.

## Warning Sign 2: Breaker Tripping Frequently

A breaker that trips repeatedly is telling you the circuit is overloaded. Never solve this by using a bigger breaker — solve it by redistributing loads across phases or upgrading your wiring.

## Warning Sign 3: Warm or Hot Switch Plates

Touch the face of your main switch. If it feels warm to hot, the internal connections are likely loose or undersized, causing resistive heating. This is a fire hazard.

## Warning Sign 4: Dimming Lights When AC Starts

If your lights dim noticeably when the air conditioner compressor kicks in, your neutral wire or earth connection may be poor, or your supply voltage is dropping due to overloaded distribution transformers.

## Warning Sign 5: Visible Discoloration or Burn Marks

Any blackening, scorch marks, or melted plastic inside the DB box requires an immediate complete wiring inspection before the system is used again.

## What To Do

Call Rajab Electricians at **+92 328 7848708** for a full DB health inspection starting from PKR 2,500. We use thermal imaging cameras to detect hot spots invisible to the naked eye.
    `,
  },
  "solar-vs-loadshedding-faisalabad": {
    title: "Is On-Grid Solar Worth It During Faisalabad Loadshedding?",
    date: "August 2026",
    category: "Solar Energy",
    content: `
Faisalabad residents face 6–12 hours of daily loadshedding in summer. A common question we receive is: "If the grid goes down, will my solar still work?"

## On-Grid Solar & Loadshedding

No — on-grid (net metering) solar systems automatically shut off when the grid goes down. This is a **safety requirement** mandated by NEPRA and FESCO. The anti-islanding protection prevents your system from backfeeding electricity into dead lines where FESCO workers may be conducting maintenance.

## The Hybrid Solution

A **Hybrid Solar System** combines on-grid functionality with lithium battery storage. During normal operation, it powers your home from solar and charges the batteries. When the grid fails, it switches to stored battery power in milliseconds — completely transparent to you.

## Cost Comparison (10kW Example)

| System Type | Cost | Loadshedding Protection |
|-------------|------|------------------------|
| On-Grid 10kW | ~PKR 1,100,000 | ❌ No |
| Hybrid 10kW + 10kWh Battery | ~PKR 1,550,000 | ✅ Yes |

The hybrid premium of ~PKR 450,000 buys you approximately 8–12 hours of AC + appliance backup per charge cycle.

## Our Recommendation

For Faisalabad's current loadshedding levels, we recommend Hybrid systems for homes and small businesses. On-grid is suitable only for factories and commercial units that operate primarily during daylight hours.

[Calculate your hybrid system size →](/solar-calculator)
    `,
  },
  "solar-panel-cleaning-tips": {
    title: "How Often Should You Clean Solar Panels in Faisalabad?",
    date: "July 2026",
    category: "Maintenance",
    content: `
Faisalabad's industrial environment produces significant airborne dust from its cotton ginning factories, textile mills, and seasonal agricultural harvests. This dust accumulates on solar panels and can reduce energy output by **20–30%** within just 4–6 weeks if left uncleaned.

## Recommended Cleaning Frequency

- **Residential rooftop systems:** Every 6–8 weeks during dusty seasons (February–May, August–November)
- **Commercial/industrial systems:** Every 3–4 weeks, or when inverter monitoring shows >15% output drop
- **Agricultural off-grid systems:** Monthly minimum

## The Right Cleaning Method

❌ **Never** use tap water with dissolved minerals — it leaves white calcium deposits that reduce transparency.

✅ Use **RO-treated (reverse osmosis) water** with soft microfiber mops on telescopic poles.

✅ Clean during early morning or late evening when panels are cool to prevent thermal shock cracks.

✅ Inspect mounting bolts and cable connectors during each clean to catch corrosion early.

## Rajab Solar Maintenance Service

Our professional panel washing service for a 10kW system (approximately 18 panels) costs **PKR 3,000 – 4,500** including:
- RO water high-pressure wash
- Inverter display health check
- DC string current measurement
- Basic visual inspection of mounting frame

[Book a solar maintenance visit →](/customer/book)
    `,
  },
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const article = articles[params.slug];
  if (!article) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/blog" className="hover:text-blue-700">Blog</Link>
        <span>›</span>
        <span className="text-slate-800 font-medium">{article.category}</span>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
          {article.category}
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
          {article.title}
        </h1>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span>{article.date}</span>
          <span>•</span>
          <span>By Engr. Muhammad Rajab & Team</span>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-a:text-blue-700 prose-a:no-underline hover:prose-a:underline prose-code:text-blue-900 prose-code:bg-blue-50 bg-white rounded-3xl p-8 border border-slate-200 shadow-xs">
        {article.content.split("\n").map((line, i) => {
          if (line.startsWith("## ")) {
            return <h2 key={i} className="text-xl font-black text-slate-900 mt-8 mb-3">{line.replace("## ", "")}</h2>;
          }
          if (line.startsWith("# ")) {
            return <h1 key={i} className="text-2xl font-black text-slate-900 mt-8 mb-3">{line.replace("# ", "")}</h1>;
          }
          if (line.startsWith("| ") || line.startsWith("|---")) {
            return null; // skip raw table rows in simple renderer
          }
          if (line.startsWith("❌") || line.startsWith("✅") || line.startsWith("-")) {
            return <p key={i} className="text-sm text-slate-700 my-1.5">{line}</p>;
          }
          if (line.trim() === "") {
            return <div key={i} className="my-3" />;
          }
          return <p key={i} className="text-sm text-slate-700 leading-relaxed">{line}</p>;
        })}
      </div>

      {/* CTA */}
      <div className="bg-[#0f2b5c] text-white rounded-3xl p-8 text-center space-y-4">
        <h3 className="text-xl font-black">Need Help from Our Faisalabad Team?</h3>
        <p className="text-sm text-slate-300">Call us 24/7 or book a service online.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/customer/book" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition">
            Book Service Online
          </Link>
          <a href="tel:+923287848708" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl text-sm transition">
            Call: +92 328 7848708
          </a>
        </div>
      </div>

      <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-bold text-blue-700 hover:text-blue-900 transition">
        ← Back to All Articles
      </Link>
    </div>
  );
}
