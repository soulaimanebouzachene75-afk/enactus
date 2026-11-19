import { NextResponse } from "next/server";
import { clean, deliver, EMAIL_RE } from "@/lib/submissions";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const data = {
    firstName: clean(body.firstName, 80),
    lastName: clean(body.lastName, 80),
    email: clean(body.email, 200),
    phone: clean(body.phone, 40),
    level: clean(body.level, 60),
    field: clean(body.field, 120),
    pole: clean(body.pole, 80),
    motivation: clean(body.motivation, 5000),
    skills: clean(body.skills, 3000),
    linkedin: clean(body.linkedin, 300),
    locale: clean(body.locale, 5),
  };
  const errors: Record<string, string> = {};
  for (const k of ["firstName", "lastName", "level", "field", "pole"] as const) if (!data[k]) errors[k] = "required";
  if (!EMAIL_RE.test(data.email)) errors.email = "email";
  if (!/^[+0-9 ().-]{8,}$/.test(data.phone)) errors.phone = "required";
  if (data.motivation.length < 20) errors.motivation = "required";
  if (body.consent !== true) errors.consent = "required";
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  try {
    const r = await deliver("application", data);
    return NextResponse.json({ ok: true, channel: r.channel });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }
}
