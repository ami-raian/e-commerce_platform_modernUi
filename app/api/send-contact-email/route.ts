import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { ContactFormEmail } from "@/emails/contact-form";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const contactData: ContactFormData = await req.json();

    // Validate required fields
    if (
      !contactData.name ||
      !contactData.email ||
      !contactData.subject ||
      !contactData.message
    ) {
      return NextResponse.json(
        { error: "Missing required contact information" },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (
      !process.env.RESEND_API_KEY ||
      process.env.RESEND_API_KEY === "your_resend_api_key_here"
    ) {
      console.error("Resend API key is not configured");
      return NextResponse.json(
        { error: "Email service not configured. Please contact support." },
        { status: 500 }
      );
    }

    const submittedAt = new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Send email to admin (marqenbd@gmail.com)
    const adminEmailResult = await resend.emails.send({
      from: "Marqen Contact Form <onboarding@resend.dev>",
      to: ["marqenbd@gmail.com"],
      replyTo: contactData.email,
      subject: `Contact Form: ${contactData.subject}`,
      react: ContactFormEmail({
        ...contactData,
        submittedAt,
      }),
    });

    console.log("Contact form email sent:", adminEmailResult);

    return NextResponse.json(
      {
        success: true,
        message: "Contact form email sent successfully",
        emailId: adminEmailResult.data?.id,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error sending contact form email:", error);
    return NextResponse.json(
      {
        error: "Failed to send contact form email",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
