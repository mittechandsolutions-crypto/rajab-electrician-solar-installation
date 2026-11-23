# ⚡ Rajab Electricians & Solar Installation - Production Web Platform

A complete, production-grade web portal and operations dashboard engineered for **Rajab Electricians & Solar Installation**, based in Himmatpura, Street No. 12, Faisalabad, Pakistan.

---

## 🚀 Key Features

1. **Bilingual English & Urdu Engine with RTL Support:**
   - One-click toggle between English and authentic native Urdu (`dir="rtl"`).
   - Tailored specifically for homeowners, shopkeepers, and industrial sizing mill managers in Faisalabad.

2. **24/7 Emergency Dispatch Workflow:**
   - Sticky emergency hotline (`+92 328 7848708`) and direct WhatsApp integrations.
   - Emergency service toggle with 30-minute rapid response guarantee for short circuits and breaker failures.

3. **Solar Sizing & ROI Calculator:**
   - Custom algorithms calibrated to FESCO electricity tariff slabs and Faisalabad peak sun hours.
   - Computes system size (kW), Tier-1 bifacial panel counts, rooftop space needed, monthly/annual PKR savings, and payback period in years.

4. **Customer Self-Service Portal:**
   - Service booking wizard with schedule selection and location capture.
   - Multi-step live tracking timeline (Pending ➔ Confirmed ➔ Technician Assigned ➔ In Progress ➔ Completed).
   - Invoicing and payment instructions for Cash on Service, JazzCash, Easypaisa, and Bank Transfers.

5. **Admin Operations Desk:**
   - Real-time business intelligence metrics (pending tickets, revenue collected, solar leads).
   - One-click CSV exports for bookings and solar quote requests.
   - Review moderation and customer history viewer.

6. **SEO & Structured Data:**
   - Full LocalBusiness Schema.org JSON-LD with Faisalabad geographic coordinates, operating hours, and 4.8★ Google rating.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS + Radix/Lucide icons
- **Database & ORM:** Prisma ORM (Dual compatible with SQLite for zero-setup local testing and PostgreSQL for production deployment)
- **Authentication:** JWT in secure `httpOnly` cookies + bcrypt password hashing
- **Validation:** Zod schemas on client and server
- **Email:** Nodemailer with automatic development simulation fallback

---

## ⚡ Quick Start (Local Development)

### 1. Prerequisites
- Node.js (v18.x, v20.x, or v22+)
- npm or pnpm

### 2. Environment Setup
The project already comes pre-configured with a `.env` file pointing to SQLite for zero-configuration testing:
```bash
# Verify .env exists or copy example
cp .env.example .env
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Database Setup & Seed
Push the Prisma schema and run the seed script with realistic Faisalabad operational data:
```bash
# Push schema
node node_modules/prisma/build/index.js db push

# Seed database with sample accounts and data
node node_modules/tsx/dist/cli.mjs prisma/seed.ts
```

### 5. Run the Application
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🔑 Demo Login Credentials

| Role | Email | Password | Access Level |
|---|---|---|---|
| **Admin** | `admin@rajabelectricians.pk` | `Admin123!` | Full Admin Operations Desk (`/admin/dashboard`) |
| **Technician** | `tariq@rajabelectricians.pk` | `Tech123!` | Field technician assignments |
| **Customer** | `usman.faisalabad@gmail.com` | `Customer123!` | Customer Portal (`/customer/dashboard`) |

---

## 🐳 Docker & Production Deployment

### Option A: Docker Compose
```bash
docker-compose up --build -d
```
Starts the Next.js production build and PostgreSQL database on port 3000 and 5432.

### Option B: Vercel + Supabase / Neon PostgreSQL
1. Create a PostgreSQL database on Neon or Supabase.
2. In `prisma/schema.prisma`, change `provider = "sqlite"` to `provider = "postgresql"`.
3. Set your production `DATABASE_URL` in your Vercel Environment Variables.
4. Deploy with `git push origin main`.
