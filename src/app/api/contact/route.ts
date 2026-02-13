import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/utils/rateLimit";

export async function POST(request: NextRequest) {
  // Rate limit: 5 requests per minute per IP
  const identifier = request.headers.get("x-forwarded-for") || "anonymous";
  const { allowed, remaining } = checkRateLimit(identifier, 5);

  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: { "X-RateLimit-Remaining": String(remaining) },
      }
    );
  }

  try {
    const body = await request.json();
    const { name, email, phone, company, service, message } = body;

    // Server-side validation
    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters" },
        { status: 400 }
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email" },
        { status: 400 }
      );
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters" },
        { status: 400 }
      );
    }

    // Development-only logging — will not appear in production builds
    if (process.env.NODE_ENV === "development") {
      console.log("--- New Contact Form Submission ---");
      console.log(`Name: ${name}`);
      console.log(`Email: ${email}`);
      if (phone) console.log(`Phone: ${phone}`);
      if (company) console.log(`Company: ${company}`);
      if (service) console.log(`Service: ${service}`);
      console.log(`Message: ${message}`);
      console.log("----------------------------------");
    }

    // TODO: Production email integration required before launch
    // Recommended: Resend (https://resend.com) — $20/mo for 50k emails
    // Alternative: SendGrid, AWS SES, or Postmark
    // See example implementation below (uncomment and add RESEND_API_KEY to .env)
    //
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // try {
    //   await resend.emails.send({
    //     from: 'OneSquad <noreply@onesquads.com>',
    //     to: 'ayaz.onesquad@outlook.com',
    //     subject: `New inquiry from ${name}${company ? ` (${company})` : ''}`,
    //     text: [
    //       `Name: ${name}`,
    //       `Email: ${email}`,
    //       `Phone: ${phone || 'N/A'}`,
    //       `Company: ${company || 'N/A'}`,
    //       `Service: ${service || 'N/A'}`,
    //       '',
    //       'Message:',
    //       message,
    //     ].join('\n'),
    //   });
    // } catch (emailError) {
    //   console.error('Failed to send email:', emailError);
    //   return NextResponse.json(
    //     { error: "Failed to send message. Please try again." },
    //     { status: 500 }
    //   );
    // }

    return NextResponse.json(
      {
        success: true,
        message:
          "Your message has been received. We'll get back to you within 24 hours.",
      },
      {
        status: 200,
        headers: { "X-RateLimit-Remaining": String(remaining) },
      }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
