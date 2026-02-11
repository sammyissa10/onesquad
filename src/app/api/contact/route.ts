import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
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

    // Log the submission (replace with your email service or database)
    console.log("--- New Contact Form Submission ---");
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    if (phone) console.log(`Phone: ${phone}`);
    if (company) console.log(`Company: ${company}`);
    if (service) console.log(`Service: ${service}`);
    console.log(`Message: ${message}`);
    console.log("----------------------------------");

    // TODO: Integrate with your preferred email service:
    // - Resend (https://resend.com)
    // - SendGrid (https://sendgrid.com)
    // - AWS SES
    // - Nodemailer with SMTP
    //
    // Example with Resend:
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'OneSquad <noreply@onesquads.com>',
    //   to: 'ayaz.onesquad@outlook.com',
    //   subject: `New inquiry from ${name}${company ? ` (${company})` : ''}`,
    //   text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nCompany: ${company || 'N/A'}\nService: ${service || 'N/A'}\n\nMessage:\n${message}`,
    // });

    return NextResponse.json(
      { success: true, message: "Your message has been received. We'll get back to you within 24 hours." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
