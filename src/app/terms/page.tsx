import React from "react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="space-y-3">
        <h1 className="text-4xl font-black text-slate-900">Terms of Service</h1>
        <p className="text-sm text-slate-500">Effective Date: 1 October 2026 | Rajab Electricians & Solar Installation, Faisalabad</p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-8 text-sm text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-lg font-black text-slate-900 mb-3">1. Service Scope</h2>
          <p>Rajab Electricians & Solar Installation provides electrical contracting and solar PV installation services in Faisalabad, Punjab, Pakistan. All services are subject to availability and geographic coverage within our service area.</p>
        </section>

        <section>
          <h2 className="text-lg font-black text-slate-900 mb-3">2. Booking & Cancellation</h2>
          <p>You may cancel a booking before a technician is dispatched at no charge. Once a technician has departed for your location, a minimum call-out fee of PKR 500 applies. Emergency same-day cancellations incur a 25% service fee.</p>
        </section>

        <section>
          <h2 className="text-lg font-black text-slate-900 mb-3">3. Pricing & Payment</h2>
          <p>All prices shown on the website are estimates. Final invoiced amounts may vary based on actual material costs, job complexity, and parts consumed. Payment is due upon satisfactory job completion via Cash, JazzCash, Easypaisa, or Bank Transfer.</p>
        </section>

        <section>
          <h2 className="text-lg font-black text-slate-900 mb-3">4. Warranty</h2>
          <p>Workmanship on electrical installations carries a 12-month guarantee. Solar systems carry manufacturer panel warranties (25 years performance, 12 years product) and inverter warranties per manufacturer terms. We do not warranty against acts of God, flooding, or unauthorized third-party modifications.</p>
        </section>

        <section>
          <h2 className="text-lg font-black text-slate-900 mb-3">5. Customer Obligations</h2>
          <p>Customers must provide safe and accessible working conditions. Do not attempt DIY modifications to electrical systems repaired by our team as this voids warranties. Customers are responsible for the accuracy of information provided during booking.</p>
        </section>

        <section>
          <h2 className="text-lg font-black text-slate-900 mb-3">6. Governing Law</h2>
          <p>These terms are governed by the laws of the Islamic Republic of Pakistan. Any disputes shall be subject to the jurisdiction of courts in Faisalabad, Punjab.</p>
        </section>
      </div>

      <Link href="/" className="text-sm font-bold text-blue-700 hover:text-blue-900 transition">← Back to Home</Link>
    </div>
  );
}
