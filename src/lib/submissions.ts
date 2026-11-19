/**
 * Traitement des formulaires (contact + candidature), côté serveur.
 * Ordre de priorité :
 *   1. RESEND_API_KEY + FORMS_TO_EMAIL  → e-mail via l'API Resend
 *   2. FORMS_WEBHOOK_URL                → POST JSON (Google Sheets, Make, Zapier…)
 *   3. sinon                            → enregistrement dans data/submissions.jsonl (développement local)
 */
import { promises as fs } from "fs";
import path from "path";

export type FormKind = "contact" | "application";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function clean(value: unknown, max = 5000): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function deliver(kind: FormKind, data: Record<string, string>) {
  const record = { kind, receivedAt: new Date().toISOString(), ...data };
  const subject =
    kind === "contact"
      ? `[Site Enactus] Contact — ${data.subject || "Message"} — ${data.name}`
      : `[Site Enactus] Candidature — ${data.firstName} ${data.lastName} — ${data.pole || ""}`;

  if (process.env.RESEND_API_KEY && process.env.FORMS_TO_EMAIL) {
    const rows = Object.entries(data)
      .map(([k, v]) => `<tr><td style="padding:6px 12px;color:#666;vertical-align:top">${escapeHtml(k)}</td><td style="padding:6px 12px;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`)
      .join("");
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.FORMS_FROM_EMAIL || "Enactus FSJES Souissi <onboarding@resend.dev>",
        to: process.env.FORMS_TO_EMAIL.split(",").map((s) => s.trim()),
        reply_to: data.email,
        subject,
        html: `<h2 style="font-family:sans-serif">${escapeHtml(subject)}</h2><table style="font-family:sans-serif;font-size:14px">${rows}</table>`,
      }),
    });
    if (!res.ok) throw new Error(`Resend error ${res.status}`);
    return { channel: "email" as const };
  }

  if (process.env.FORMS_WEBHOOK_URL) {
    const res = await fetch(process.env.FORMS_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });
    if (!res.ok) throw new Error(`Webhook error ${res.status}`);
    return { channel: "webhook" as const };
  }

  try {
    const dir = path.join(process.cwd(), "data");
    await fs.mkdir(dir, { recursive: true });
    await fs.appendFile(path.join(dir, "submissions.jsonl"), JSON.stringify(record) + "\n", "utf8");
    return { channel: "file" as const };
  } catch {
    // Hébergement en lecture seule sans canal configuré : on journalise.
    console.warn("[forms] Aucun canal configuré — soumission journalisée :", record);
    return { channel: "log" as const };
  }
}
