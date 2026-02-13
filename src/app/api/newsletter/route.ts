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
    const { email } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Development-only logging — will not appear in production builds
    if (process.env.NODE_ENV === "development") {
      console.log(`--- Newsletter Signup: ${email} ---`);
    }

    // TODO: Production email marketing integration required before launch
    // Recommended: Resend Audiences, Mailchimp, or ConvertKit
    // See example implementation below (uncomment and add API keys to .env)
    //
    // Example with Resend Audiences:
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // try {
    //   await resend.contacts.create({
    //     email,
    //     audienceId: process.env.RESEND_AUDIENCE_ID!,
    //   });
    // } catch (subscribeError) {
    //   console.error('Failed to subscribe:', subscribeError);
    //   return NextResponse.json(
    //     { error: "Failed to subscribe. Please try again." },
    //     { status: 500 }
    //   );
    // }
    //
    // Example with Mailchimp:
    // try {
    //   await fetch(`https://us1.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`, {
    //     method: 'POST',
    //     headers: {
    //       Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email_address: email, status: 'subscribed' }),
    //   });
    // } catch (subscribeError) {
    //   console.error('Failed to subscribe:', subscribeError);
    //   return NextResponse.json(
    //     { error: "Failed to subscribe. Please try again." },
    //     { status: 500 }
    //   );
    // }

    return NextResponse.json(
      { success: true, message: "Thanks! We'll be in touch." },
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
