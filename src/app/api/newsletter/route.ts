import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Log the subscription (replace with your email marketing service)
    console.log(`--- Newsletter Signup: ${email} ---`);

    // TODO: Integrate with your preferred email marketing service:
    // - Mailchimp
    // - ConvertKit
    // - Resend Audiences
    // - SendGrid Contacts
    //
    // Example with Mailchimp:
    // await fetch(`https://us1.api.mailchimp.com/3.0/lists/${LIST_ID}/members`, {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email_address: email, status: 'subscribed' }),
    // });

    return NextResponse.json(
      { success: true, message: "Thanks! We'll be in touch." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
