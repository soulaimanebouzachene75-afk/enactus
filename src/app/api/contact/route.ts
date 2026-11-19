import { NextResponse } from "next/server";
import { clean, deliver, EMAIL_RE } from "@/lib/submissions";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  // Champ piège anti-spam : rempli uniquement par les robots.
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const data = {
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    organisation: clean(body.organisation, 200),
    subject: clean(body.subject, 120),
    message: clean(body.message, 5000),
    locale: clean(body.locale, 5),
  };
  const errors: Record<string, string> = {};
  if (!data.name) errors.name = "required";
  if (!EMAIL_RE.test(data.email)) errors.email = "email";
  if (data.message.length < 10) errors.message = "required";
  if (body.consent !== true) errors.consent = "required";
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  try {
    const r = await deliver("contact", data);
    return NextResponse.json({ ok: true, channel: r.channel });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }
}
