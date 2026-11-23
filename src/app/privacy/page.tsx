import React from "react";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="space-y-3">
        <h1 className="text-4xl font-black text-slate-900">Privacy Policy</h1>
        <p className="text-sm text-slate-500">Effective Date: 1 October 2026 | Rajab Electricians & Solar Installation</p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-8 text-sm text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-lg font-black text-slate-900 mb-3">1. Information We Collect</h2>
          <p>When you register or book a service, we collect your name, email address, Pakistani mobile number, and service location (area and street within Faisalabad). Photo uploads you provide to describe electrical faults are stored securely and used only for job processing.</p>
        </section>

        <section>
          <h2 className="text-lg font-black text-slate-900 mb-3">2. How We Use Your Information</h2>
          <p>Your information is used solely to process service bookings, dispatch technicians, generate invoices, and send status notifications. We do not sell, share, or rent your personal data to any third party.</p>
        </section>

        <section>
          <h2 className="text-lg font-black text-slate-900 mb-3">3. Authentication & Security</h2>
          <p>Passwords are hashed using bcrypt (industry-standard one-way encryption) and are never stored in plain text. Session tokens are stored in secure HTTP-only cookies that cannot be accessed by browser JavaScript.</p>
        </section>

        <section>
          <h2 className="text-lg font-black text-slate-900 mb-3">4. Data Retention</h2>
          <p>Customer booking records and invoices are retained for 5 years for tax and warranty reference. You may request deletion of your account by contacting us at rajabelectricianfsd@gmail.com.</p>
        </section>

        <section>
          <h2 className="text-lg font-black text-slate-900 mb-3">5. Contact Us</h2>
          <p>For privacy concerns, reach us at: Himmatpura, Street No. 12, Faisalabad, 38000, Pakistan. Phone: +92 328 7848708. Email: rajabelectricianfsd@gmail.com.</p>
        </section>
      </div>

      <Link href="/" className="text-sm font-bold text-blue-700 hover:text-blue-900 transition">← Back to Home</Link>
    </div>
  );
}
