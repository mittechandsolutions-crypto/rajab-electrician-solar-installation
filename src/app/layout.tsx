import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActionButtons from "@/components/layout/FloatingActionButtons";

export const metadata: Metadata = {
  title: "Rajab Electricians & Solar Installation | Faisalabad 24/7 Experts",
  description:
    "Faisalabad's top-rated 4.8★ certified electrical and solar contractors. 24/7 emergency repair, house wiring, industrial 3-phase panels, and FESCO on-grid solar net metering in Himmatpura.",
  keywords: [
    "electrician in Faisalabad",
    "solar installation Faisalabad",
    "FESCO net metering Faisalabad",
    "emergency electrician Faisalabad",
    "3-phase industrial wiring Faisalabad",
    "solar panel price Faisalabad",
    "Rajab Electricians Himmatpura",
  ],
  authors: [{ name: "Rajab Electricians & Solar Installation" }],
  openGraph: {
    title: "Rajab Electricians & Solar Installation Faisalabad",
    description: "Certified electricians & turnkey solar system engineering. 24/7 emergency callout.",
    url: "https://rajabelectricians.pk",
    siteName: "Rajab Electricians",
    locale: "en_PK",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // LocalBusiness Structured Data JSON-LD for Local SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: "Rajab Electricians & Solar Installation",
    image: "https://rajabelectricians.pk/logo.png",
    "@id": "https://rajabelectricians.pk",
    url: "https://rajabelectricians.pk",
    telephone: "+92 328 7848708",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Himmatpura, Street No. 12",
      addressLocality: "Faisalabad",
      postalCode: "38000",
      addressRegion: "Punjab",
      addressCountry: "PK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 31.4278,
      longitude: 73.0897,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "12",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingActionButtons />
        </LanguageProvider>
      </body>
    </html>
  );
}
