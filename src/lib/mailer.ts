import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "mock_user",
    pass: process.env.SMTP_PASS || "mock_pass",
  },
});

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    if (!process.env.SMTP_USER || process.env.SMTP_USER === "mock_user") {
      console.log(`[Email Simulation] To: ${to} | Subject: ${subject}`);
      return { success: true, simulated: true };
    }

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"Rajab Electricians & Solar" <notifications@rajabelectricians.pk>',
      to,
      subject,
      html,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Failed to send email notification:", error);
    return { success: false, error };
  }
}

export function bookingConfirmationTemplate(booking: {
  bookingNumber: string;
  customerName: string;
  serviceCategory: string;
  scheduledDate: string;
  scheduledTimeSlot: string;
  address: string;
}) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #1e3a8a; margin-top: 0;">Rajab Electricians & Solar Installation</h2>
      <p>Dear <strong>${booking.customerName}</strong>,</p>
      <p>Your service booking <strong>#${booking.bookingNumber}</strong> has been received successfully.</p>
      <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>Category:</strong> ${booking.serviceCategory}</p>
        <p style="margin: 5px 0;"><strong>Date:</strong> ${booking.scheduledDate}</p>
        <p style="margin: 5px 0;"><strong>Time Slot:</strong> ${booking.scheduledTimeSlot}</p>
        <p style="margin: 5px 0;"><strong>Address:</strong> ${booking.address}</p>
      </div>
      <p>Our dispatch team in Faisalabad is reviewing your job. An expert technician will contact you shortly.</p>
      <p style="color: #64748b; font-size: 13px;">For immediate emergency assistance, call our 24/7 hotline at <strong>+92 328 7848708</strong>.</p>
    </div>
  `;
}
