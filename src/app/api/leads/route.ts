import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max: number): string {
  return String(value ?? "")
    .trim()
    .slice(0, max);
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const payload = body as {
    name?: unknown;
    email?: unknown;
    message?: unknown;
    source?: unknown;
  };

  const name = clean(payload.name, 120);
  const email = clean(payload.email, 254).toLowerCase();
  const message = clean(payload.message, 5000);
  const source = clean(payload.source, 60) || "about-page";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const client = getSupabase();
  if (!client) {
    return NextResponse.json(
      {
        error:
          "Contact form is not connected yet. Add Supabase keys to .env.local.",
      },
      { status: 503 }
    );
  }

  const { error } = await client.from("leads").insert({
    name,
    email,
    message,
    source,
  });

  if (error) {
    console.error("Lead insert error:", error.message);
    return NextResponse.json(
      {
        error:
          "Could not save your message. Make sure the leads table exists in Supabase.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
