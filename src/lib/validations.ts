import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .regex(/^(\+92|0)?3[0-9]{9}$/, "Please provide a valid Pakistani mobile number (e.g., 03287848708)"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const serviceBookingSchema = z.object({
  serviceId: z.string().optional(),
  serviceCategory: z.enum([
    "ELECTRICAL_RESIDENTIAL",
    "ELECTRICAL_COMMERCIAL",
    "ELECTRICAL_EMERGENCY",
    "SOLAR_ON_GRID",
    "SOLAR_HYBRID",
    "SOLAR_OFF_GRID",
    "SOLAR_MAINTENANCE",
  ]),
  scheduledDate: z.string().min(1, "Scheduled date is required"),
  scheduledTimeSlot: z.string().min(1, "Time slot is required"),
  isEmergency: z.boolean().default(false),
  area: z.string().min(2, "Area/Town is required (e.g. Himmatpura, Madina Town)"),
  street: z.string().min(2, "Street address is required"),
  description: z.string().min(10, "Please describe the fault or requirement in detail"),
  photos: z.array(z.string()).default([]),
});

export const solarQuoteSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Phone number is required"),
  email: z.string().email().optional().or(z.literal("")),
  areaLocation: z.string().min(2, "Area/Colony in Faisalabad is required"),
  monthlyBillPKR: z.number().positive("Monthly bill must be greater than 0"),
  roofAreaSqFt: z.number().positive().optional(),
  roofType: z.string().min(2, "Roof type is required"),
  systemType: z.enum(["On-Grid (Net Metering)", "Hybrid (with Batteries)", "Off-Grid"]),
});

export const reviewSchema = z.object({
  bookingId: z.string().optional(),
  authorName: z.string().min(2, "Name is required"),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(5, "Review comment must be at least 5 characters"),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email().optional().or(z.literal("")),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const siteSettingsSchema = z.object({
  companyName: z.string().min(3),
  phone: z.string().min(8),
  whatsapp: z.string().min(8),
  email: z.string().email(),
  addressEn: z.string().min(5),
  addressUr: z.string().min(5),
  solarRatePerWattPKR: z.number().positive(),
  netMeteringCostPKR: z.number().nonnegative(),
  averageUnitCostPKR: z.number().positive(),
  emergencySurchargePKR: z.number().nonnegative(),
});
