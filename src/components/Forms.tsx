"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Send, AlertCircle } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const isStatic = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";
const externalEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

async function submit(apiPath: string, payload: Record<string, unknown>) {
  // Hébergement statique : envoi vers un service externe (ex. Formspree) s'il est configuré.
  if (isStatic) {
    if (!externalEndpoint) {
      await new Promise((r) => setTimeout(r, 700));
      return { ok: true, preview: true };
    }
    const res = await fetch(externalEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    return { ok: res.ok, preview: false };
  }
  const res = await fetch(apiPath, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  const json = await res.json().catch(() => ({}));
  return { ok: res.ok && json.ok, preview: false, errors: json.errors as Record<string, string> | undefined };
}

function Field({
  id,
  label,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function Success({ text, preview }: { text: string; preview?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-start gap-4 rounded-2xl border border-violet/20 bg-violet-50 p-8"
      role="status"
    >
      <CheckCircle2 className="h-10 w-10 text-violet" aria-hidden />
      <p className="text-lg font-medium text-ink">{text}</p>
      {preview && <p className="text-sm text-ink/60">{preview}</p>}
    </motion.div>
  );
}

function SubmitButton({ status, label, sending }: { status: Status; label: string; sending: string }) {
  return (
    <button
      type="submit"
      disabled={status === "sending"}
      className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-white transition hover:bg-violet disabled:opacity-60"
    >
      {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />}
      {status === "sending" ? sending : label}
    </button>
  );
}

function Consent({ id, label, error, checked, onChange }: { id: string; label: string; error?: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm text-ink/70">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-ink/30 accent-[#84168A]"
          aria-invalid={!!error}
        />
        {label}
      </label>
      {error && <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

/* ───────────────────────── Formulaire de contact ───────────────────────── */

export function ContactForm({ d, locale }: { d: Dictionary; locale: Locale }) {
  const f = d.form;
  const [v, setV] = useState({ name: "", email: "", organisation: "", subject: f.subjects[0], message: "", website: "" });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [preview, setPreview] = useState(false);
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setV((s) => ({ ...s, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!v.name.trim()) errs.name = f.required;
    if (!EMAIL_RE.test(v.email.trim())) errs.email = f.invalidEmail;
    if (v.message.trim().length < 10) errs.message = f.required;
    if (!consent) errs.consent = f.required;
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("sending");
    try {
      const r = await submit("/api/contact", { ...v, consent, locale, form: "contact" });
      if (r.ok) {
        setPreview(!!r.preview);
        setStatus("success");
      } else {
        if (r.errors) setErrors(Object.fromEntries(Object.keys(r.errors).map((k) => [k, f.required])));
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <Success key="ok" text={f.success} preview={preview ? f.preview : undefined} />
      ) : (
        <motion.form key="form" onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2" exit={{ opacity: 0 }}>
          <input type="text" name="website" value={v.website} onChange={set("website")} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
          <Field id="c-name" label={`${f.fullName} *`} error={errors.name}>
            <input id="c-name" className="field" value={v.name} onChange={set("name")} autoComplete="name" aria-invalid={!!errors.name} required />
          </Field>
          <Field id="c-email" label={`${f.email} *`} error={errors.email}>
            <input id="c-email" type="email" dir="ltr" className="field rtl:text-right" value={v.email} onChange={set("email")} autoComplete="email" aria-invalid={!!errors.email} required />
          </Field>
          <Field id="c-org" label={f.organisation}>
            <input id="c-org" className="field" value={v.organisation} onChange={set("organisation")} autoComplete="organization" />
          </Field>
          <Field id="c-subject" label={f.subject}>
            <select id="c-subject" className="field" value={v.subject} onChange={set("subject")}>
              {f.subjects.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>
          <Field id="c-msg" label={`${f.message} *`} error={errors.message} className="sm:col-span-2">
            <textarea id="c-msg" rows={6} className="field resize-y" value={v.message} onChange={set("message")} aria-invalid={!!errors.message} required />
          </Field>
          <div className="sm:col-span-2">
            <Consent id="c-consent" label={f.consent} error={errors.consent} checked={consent} onChange={setConsent} />
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
            <SubmitButton status={status} label={f.send} sending={f.sending} />
            {status === "error" && (
              <p role="alert" className="inline-flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" /> {f.error}
              </p>
            )}
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

/* ───────────────────────── Formulaire de candidature ───────────────────────── */

export function JoinForm({ d, locale, poles }: { d: Dictionary; locale: Locale; poles: string[] }) {
  const f = d.form;
  const empty = { firstName: "", lastName: "", email: "", phone: "", level: "", field: "", pole: "", motivation: "", skills: "", linkedin: "", website: "" };
  const [v, setV] = useState(empty);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [preview, setPreview] = useState(false);
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setV((s) => ({ ...s, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    (["firstName", "lastName", "level", "field", "pole"] as const).forEach((k) => {
      if (!v[k].trim()) errs[k] = f.required;
    });
    if (!EMAIL_RE.test(v.email.trim())) errs.email = f.invalidEmail;
    if (!/^[+0-9 ().-]{8,}$/.test(v.phone.trim())) errs.phone = f.required;
    if (v.motivation.trim().length < 20) errs.motivation = f.required;
    if (!consent) errs.consent = f.required;
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`j-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const r = await submit("/api/join", { ...v, consent, locale, form: "application" });
      if (r.ok) {
        setPreview(!!r.preview);
        setStatus("success");
      } else {
        if (r.errors) setErrors(Object.fromEntries(Object.keys(r.errors).map((k) => [k, f.required])));
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const input = (k: keyof typeof v, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <Field id={`j-${k}`} label={label} error={errors[k]}>
      <input id={`j-${k}`} className={cn("field", props.dir === "ltr" && "rtl:text-right")} value={v[k]} onChange={set(k)} aria-invalid={!!errors[k]} {...props} />
    </Field>
  );

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <Success key="ok" text={f.successApplication} preview={preview ? f.preview : undefined} />
      ) : (
        <motion.form key="form" onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2" exit={{ opacity: 0 }}>
          <input type="text" name="website" value={v.website} onChange={set("website")} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
          {input("firstName", `${f.firstName} *`, { autoComplete: "given-name" })}
          {input("lastName", `${f.lastName} *`, { autoComplete: "family-name" })}
          {input("email", `${f.email} *`, { type: "email", autoComplete: "email", dir: "ltr" })}
          {input("phone", `${f.phone} *`, { type: "tel", autoComplete: "tel", dir: "ltr", placeholder: "+212 6 00 00 00 00" })}
          <Field id="j-level" label={`${f.level} *`} error={errors.level}>
            <select id="j-level" className="field" value={v.level} onChange={set("level")} aria-invalid={!!errors.level}>
              <option value="">{f.choose}</option>
              {f.levels.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </Field>
          {input("field", `${f.field} *`)}
          <Field id="j-pole" label={`${f.pole} *`} error={errors.pole} className="sm:col-span-2">
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-labelledby="j-pole">
              {poles.map((p) => (
                <button
                  type="button"
                  key={p}
                  role="radio"
                  aria-checked={v.pole === p}
                  onClick={() => setV((s) => ({ ...s, pole: p }))}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm transition",
                    v.pole === p ? "border-violet bg-violet text-white" : "border-ink/15 bg-white text-ink/75 hover:border-ink/40",
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
            <input id="j-pole" className="sr-only" value={v.pole} readOnly tabIndex={-1} aria-hidden />
          </Field>
          <Field id="j-motivation" label={`${f.motivation} *`} error={errors.motivation} className="sm:col-span-2">
            <textarea id="j-motivation" rows={5} className="field resize-y" value={v.motivation} onChange={set("motivation")} aria-invalid={!!errors.motivation} />
          </Field>
          <Field id="j-skills" label={f.skills} className="sm:col-span-2">
            <textarea id="j-skills" rows={3} className="field resize-y" value={v.skills} onChange={set("skills")} />
          </Field>
          <div className="sm:col-span-2">{input("linkedin", f.linkedin, { type: "url", dir: "ltr", placeholder: "https://" })}</div>
          <div className="sm:col-span-2">
            <Consent id="j-consent" label={f.consent} error={errors.consent} checked={consent} onChange={setConsent} />
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
            <SubmitButton status={status} label={f.sendApplication} sending={f.sending} />
            {status === "error" && (
              <p role="alert" className="inline-flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" /> {f.error}
              </p>
            )}
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
