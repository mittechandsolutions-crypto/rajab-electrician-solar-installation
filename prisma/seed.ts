import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Rajab Electricians & Solar Installation database...");

  // 1. Clean existing records
  await prisma.auditLog.deleteMany();
  await prisma.review.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.bookingTimeline.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.address.deleteMany();
  await prisma.solarQuoteRequest.deleteMany();
  await prisma.service.deleteMany();
  await prisma.projectGallery.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.siteSetting.deleteMany();
  await prisma.user.deleteMany();

  // 2. Passwords
  const adminPass = await bcrypt.hash("Admin123!", 10);
  const techPass = await bcrypt.hash("Tech123!", 10);
  const customerPass = await bcrypt.hash("Customer123!", 10);

  // 3. Create Admin User
  const admin = await prisma.user.create({
    data: {
      name: "Engr. Muhammad Rajab",
      email: "admin@rajabelectricians.pk",
      phone: "+923287848708",
      passwordHash: adminPass,
      role: "ADMIN",
      isEmailVerified: true,
    },
  });

  // 4. Create Technician Users
  const tech1 = await prisma.user.create({
    data: {
      name: "Ustad Tariq Mehmood",
      email: "tariq@rajabelectricians.pk",
      phone: "+923001234567",
      passwordHash: techPass,
      role: "TECHNICIAN",
      isEmailVerified: true,
    },
  });

  const tech2 = await prisma.user.create({
    data: {
      name: "Ali Raza (Solar Specialist)",
      email: "ali@rajabelectricians.pk",
      phone: "+923019876543",
      passwordHash: techPass,
      role: "TECHNICIAN",
      isEmailVerified: true,
    },
  });

  // 5. Create Customer
  const customer = await prisma.user.create({
    data: {
      name: "Haji Usman Ghani",
      email: "usman.faisalabad@gmail.com",
      phone: "+923215551234",
      passwordHash: customerPass,
      role: "CUSTOMER",
      isEmailVerified: true,
      addresses: {
        create: [
          {
            title: "Residence",
            area: "Peoples Colony No. 1",
            street: "Street 8, Near Al-Fateh Mall",
            city: "Faisalabad",
            postalCode: "38000",
            isDefault: true,
          },
          {
            title: "Textile Sizing Unit",
            area: "Small Industrial Estate",
            street: "Plot 42, Millat Road",
            city: "Faisalabad",
            postalCode: "38000",
            isDefault: false,
          },
        ],
      },
    },
    include: { addresses: true },
  });

  // 6. Global Site Settings
  await prisma.siteSetting.create({
    data: {
      id: "global",
      companyName: "Rajab Electricians & Solar Installation",
      phone: "+92 328 7848708",
      whatsapp: "+923287848708",
      email: "rajabelectricianfsd@gmail.com",
      addressEn: "Himmatpura, Street No. 12, Faisalabad, 38000, Pakistan",
      addressUr: "ہمت پورہ، گلی نمبر 12، فیصل آباد، 38000، پاکستان",
      solarRatePerWattPKR: 120.0,
      netMeteringCostPKR: 85000.0,
      averageUnitCostPKR: 62.0,
      emergencySurchargePKR: 1000.0,
    },
  });

  // 7. Core Services
  const services = [
    {
      slug: "emergency-short-circuit-repair",
      titleEn: "24/7 Emergency Short Circuit & Tripping Repair",
      titleUr: "24 گھنٹے ایمرجنسی شارٹ سرکٹ اور ٹرپنگ کی مرمت",
      category: "ELECTRICAL",
      descriptionEn: "Instant diagnostic response for burning smell, tripping main breakers, neutral loss, and spark detection.",
      descriptionUr: "جلنے کی بو، بریکر ٹرپنگ اور نیوٹرل خرابی پر فوری 30 منٹ میں کاریگر کی روانگی۔",
      basePrice: 1500,
      estimatedTime: "1 Hour",
      iconName: "Zap",
    },
    {
      slug: "residential-concealed-wiring",
      titleEn: "Concealed Home Wiring & DB Dressing",
      titleUr: "گھروں کی کنسیلڈ وائرنگ اور مین ڈسٹری بیوشن باکس (DB)",
      category: "ELECTRICAL",
      descriptionEn: "Complete single-phase & 3-phase domestic copper wiring, circuit isolators, earth-grounding rod installation.",
      descriptionUr: "پیور کاپر وائرنگ، ارتھ بورنگ، لوڈ تقسیم اور معیاری سرکٹ بریکرز کی فٹنگ۔",
      basePrice: 5000,
      estimatedTime: "1-3 Days",
      iconName: "Home",
    },
    {
      slug: "industrial-3phase-load-balancing",
      titleEn: "Industrial 3-Phase Panels & Loom Wiring",
      titleUr: "صنعتی تھری فیز پینلز اور فیکٹری وائرنگ",
      category: "ELECTRICAL",
      descriptionEn: "LT panels, power factor improvement, automatic phase changeover, and motor starter wiring for textile units.",
      descriptionUr: "پاور فیکٹر امپروومنٹ پینل، فیکٹری موٹرز اور آٹومیٹک چینج اوور کا محفوظ سیٹ اپ۔",
      basePrice: 12000,
      estimatedTime: "2-5 Days",
      iconName: "Factory",
    },
    {
      slug: "solar-on-grid-net-metering",
      titleEn: "On-Grid Solar System with FESCO Net Metering",
      titleUr: "آن گرڈ سولر سسٹم مع فیسکو (FESCO) گرین نیٹ میٹرنگ",
      category: "SOLAR",
      descriptionEn: "Turnkey 5kW to 50kW installation: Tier-1 bifacial solar panels, string inverters, and official FESCO green meter licensing.",
      descriptionUr: "5 کلو واٹ سے 50 کلو واٹ تک آن گرڈ تنصیب مع فیسکو سے گرین میٹر کی مکمل منظوری۔",
      basePrice: 450000,
      estimatedTime: "3-7 Days",
      iconName: "Sun",
    },
    {
      slug: "solar-hybrid-lithium-backup",
      titleEn: "Hybrid Solar Systems with Lithium Battery Storage",
      titleUr: "ہائبرڈ سولر سسٹم مع جدید لیتھیم بیٹری بیک اپ",
      category: "SOLAR",
      descriptionEn: "Seamless power during outages with high-cycle LiFePO4 batteries and smart smart-inverter management.",
      descriptionUr: "لوڈشیڈنگ میں بلاتعطل بجلی کے لیے لیتھیم بیٹریوں اور جدید انورٹر کے ساتھ ہائبرڈ سیٹ اپ۔",
      basePrice: 650000,
      estimatedTime: "2-4 Days",
      iconName: "BatteryCharging",
    },
    {
      slug: "solar-panel-cleaning-maintenance",
      titleEn: "Solar Panel De-Dusting & Preventive Maintenance",
      titleUr: "سولر پلیٹوں کی صفائی، واشنگ اور انورٹر ٹیسٹنگ",
      category: "SOLAR",
      descriptionEn: "Restores up to 25% lost energy output due to Faisalabad dust with chemical-free de-ionized water washing & thermal scans.",
      descriptionUr: "دھول مٹی ہٹا کر سسٹم کی پیداوار میں 25 فیصد تک اضافہ اور مکمل سرکٹ جانچ۔",
      basePrice: 3000,
      estimatedTime: "2 Hours",
      iconName: "Sparkles",
    },
  ];

  for (const s of services) {
    await prisma.service.create({ data: s });
  }

  // 8. Sample Projects
  await prisma.projectGallery.createMany({
    data: [
      {
        titleEn: "15kW On-Grid Solar Installation at Textile Plaza",
        titleUr: "ٹیکسٹائل پلازہ مدینہ ٹاؤن میں 15 کلو واٹ آن گرڈ سولر سسٹم",
        category: "Solar Commercial",
        description: "Installed 26x Jinko 585W bifacial modules with Huawei 15KTL inverter and 3-phase FESCO net metering, reducing electricity bill by 92%.",
        beforeImage: "/images/projects/solar-1-before.jpg",
        afterImage: "/images/projects/solar-1-after.jpg",
        location: "Madina Town, Faisalabad",
        capacity: "15 kW On-Grid",
        isFeatured: true,
      },
      {
        titleEn: "10kW Hybrid System with LiFePO4 Battery in Peoples Colony",
        titleUr: "پیپلز کالونی میں 10 کلو واٹ ہائبرڈ سسٹم مع لیتھیم بیٹری",
        category: "Solar Residential",
        description: "Zero loadshedding backup system supporting 3 inverter air conditioners, water turbine, and full home lighting.",
        beforeImage: "/images/projects/solar-2-before.jpg",
        afterImage: "/images/projects/solar-2-after.jpg",
        location: "Peoples Colony No. 2, Faisalabad",
        capacity: "10 kW Hybrid",
        isFeatured: true,
      },
      {
        titleEn: "Complete 3-Phase Main Distribution Board Overhaul",
        titleUr: "تھری فیز مین ڈسٹری بیوشن باکس (DB) کی مکمل نئی وائرنگ",
        category: "Factory Wiring",
        description: "Eliminated chronic tripping and wire heating hazards in a loom weaving shed with copper busbars and Schneider breakers.",
        beforeImage: "/images/projects/db-before.jpg",
        afterImage: "/images/projects/db-after.jpg",
        location: "Small Industrial Estate, Faisalabad",
        capacity: "200A 3-Phase DB",
        isFeatured: true,
      },
    ],
  });

  // 9. Sample Verified Reviews
  await prisma.review.createMany({
    data: [
      {
        userId: customer.id,
        authorName: "Sheikh Tariq Mehmood",
        rating: 5,
        comment: "Excellent service! We called them at 11 PM for an emergency main breaker burnout in Himmatpura. Their electrician arrived in 25 minutes and fixed everything safely.",
        isApproved: true,
        reply: "Thank you Sheikh Sahib! We are honored to be at your service 24/7.",
      },
      {
        userId: customer.id,
        authorName: "Dr. Farhan Akram",
        rating: 5,
        comment: "Rajab Electricians installed our 10kW On-Grid solar setup in Peoples Colony. The FESCO net metering was handled completely by them without any hassle. Highly recommended!",
        isApproved: true,
        reply: "Thank you Dr. Farhan for trusting Rajab Electricians & Solar.",
      },
      {
        userId: customer.id,
        authorName: "Chaudhry Nadeem (Sizing Mill)",
        rating: 5,
        comment: "Best industrial electricians in Faisalabad. They balanced the 3-phase load on our machines and power factor improved significantly.",
        isApproved: true,
      },
    ],
  });

  // 10. Sample Booking & Timeline
  const defaultAddr = customer.addresses[0];
  const booking = await prisma.booking.create({
    data: {
      bookingNumber: "RE-2026-1001",
      customerId: customer.id,
      technicianId: tech1.id,
      serviceCategory: "ELECTRICAL_RESIDENTIAL",
      status: "IN_PROGRESS",
      scheduledDate: new Date(),
      scheduledTimeSlot: "11:00 AM - 01:00 PM",
      isEmergency: false,
      addressId: defaultAddr.id,
      addressText: `${defaultAddr.street}, ${defaultAddr.area}, ${defaultAddr.city}`,
      description: "Need DB dressing and surge protector installation to prevent voltage spikes from damaging home appliances.",
      estimatedCost: 3500,
      timeline: {
        create: [
          {
            status: "PENDING",
            title: "Booking Received",
            note: "Customer booked online via Faisalabad portal",
            performedBy: "Customer",
          },
          {
            status: "CONFIRMED",
            title: "Booking Confirmed",
            note: "Slot approved by dispatch supervisor",
            performedBy: admin.name,
          },
          {
            status: "TECHNICIAN_ASSIGNED",
            title: "Technician Dispatched",
            note: `Assigned to ${tech1.name} (+923001234567)`,
            performedBy: admin.name,
          },
          {
            status: "IN_PROGRESS",
            title: "Work in Progress",
            note: "Technician arrived on-site and commenced testing",
            performedBy: tech1.name,
          },
        ],
      },
    },
  });

  // 11. Sample Invoice
  await prisma.invoice.create({
    data: {
      invoiceNumber: "INV-2026-0042",
      bookingId: booking.id,
      customerId: customer.id,
      subtotal: 3500,
      taxAmount: 0,
      discount: 200,
      totalAmount: 3300,
      paymentStatus: "UNPAID",
      paymentMethod: "CASH_ON_SERVICE",
      notes: "Cash on Service upon completion. Customer can also pay via JazzCash to 03287848708.",
    },
  });

  // 12. Sample Blog Posts
  await prisma.blogPost.createMany({
    data: [
      {
        slug: "fesco-net-metering-guide-faisalabad-2026",
        titleEn: "Step-by-Step Guide to FESCO Solar Net Metering in Faisalabad",
        titleUr: "فیصل آباد میں فیسکو سولر نیٹ میٹرنگ حاصل کرنے کا مکمل طریقہ کار",
        excerptEn: "Learn the latest 2026 rules, documents required, single-line diagram specs, and green meter processing times for FESCO consumers.",
        excerptUr: "فیسکو کے صارفین کے لیے 2026 کے نئے قوانین، درکار دستاویزات اور گرین میٹر کی منظوری کا طریقہ۔",
        contentEn: "FESCO (Faisalabad Electric Supply Company) offers Net Metering under NEPRA regulations for residential, commercial, and industrial electricity consumers with a 3-phase meter...",
        contentUr: "فیسکو اپنے تمام تھری فیز صارفین کو نیپرا کے مروجہ قوانین کے تحت گرین نیٹ میٹرنگ کی سہولت فراہم کرتا ہے...",
        coverImage: "/images/blog/net-metering.jpg",
      },
      {
        slug: "preventing-electrical-fires-in-summer",
        titleEn: "5 Vital Signs Your Home Distribution Board is Overheating",
        titleUr: "گرمیوں میں بجلی کے شارٹ سرکٹ اور آگ سے بچاؤ کے 5 اہم حفاظتی اصول",
        excerptEn: "High AC loads during Faisalabad summers put extreme pressure on neutral wires and main breakers. Here is how to stay safe.",
        excerptUr: "شدید گرمی اور ائیرکنڈیشنرز کے مسلسل استعمال سے مین تاروں کو جلنے سے کیسے بچائیں۔",
        contentEn: "During peak summer months in Faisalabad, ambient temperatures often exceed 45°C. Combined with multiple air conditioners running simultaneously...",
        contentUr: "فیصل آباد کی شدید گرمی میں ائیرکنڈیشنرز کے بھاری لوڈ کی وجہ سے نیوٹرل وائر کا جلنا عام ہو جاتا ہے...",
        coverImage: "/images/blog/electrical-safety.jpg",
      },
    ],
  });

  console.log("Database seeded successfully!");
  console.log("Admin login: admin@rajabelectricians.pk / Admin123!");
  console.log("Customer login: usman.faisalabad@gmail.com / Customer123!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
