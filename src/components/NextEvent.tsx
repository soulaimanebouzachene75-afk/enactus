"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarPlus } from "lucide-react";

export type UpcomingEvent = {
  title: string;
  href: string;
  date: string; // AAAA-MM-JJ
  time?: string; // HH:MM
  place: string;
  description: string;
};

/** Date de début (heure du Maroc, UTC+1) */
export function eventStart(e: { date: string; time?: string }) {
  return new Date(`${e.date}T${e.time ?? "09:00"}:00+01:00`);
}

function icsDate(d: Date) {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/** Boutons « Ajouter à mon agenda » : Google Agenda + fichier .ics (Apple, Outlook). */
export function AddToCalendar({ event, labels }: { event: UpcomingEvent; labels: { add: string; google: string; ics: string } }) {
  const start = eventStart(event);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  const google = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${icsDate(start)}/${icsDate(end)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.place)}`;

  const downloadIcs = () => {
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Enactus FSJES Souissi//FR", "BEGIN:VEVENT",
      `UID:${event.date}-${event.title.replace(/\W+/g, "")}@enactus-fsjes-souissi`,
      `DTSTAMP:${icsDate(new Date())}`, `DTSTART:${icsDate(start)}`, `DTEND:${icsDate(end)}`,
      `SUMMARY:${event.title}`, `LOCATION:${event.place}`, `DESCRIPTION:${event.description.replace(/\n/g, " ")}`,
      "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "enactus-fsjes-souissi.ics";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="inline-flex items-center gap-2 text-sm font-semibold"><CalendarPlus className="h-4 w-4 text-accent" />{labels.add}</span>
      <a href={google} target="_blank" rel="noopener noreferrer" className="rounded-full border border-current/20 px-4 py-2 text-sm transition hover:border-gold hover:text-gold">{labels.google}</a>
      <button type="button" onClick={downloadIcs} className="rounded-full border border-current/20 px-4 py-2 text-sm transition hover:border-gold hover:text-gold">{labels.ics}</button>
    </div>
  );
}

/**
 * Compte à rebours vers la prochaine activité à venir.
 * N'apparaît que si une activité a une date future dans src/content/activities.ts.
 */
export function NextEvent({
  events,
  labels,
}: {
  events: UpcomingEvent[];
  labels: { title: string; days: string; hours: string; minutes: string; seconds: string; add: string; google: string; ics: string };
}) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (now === null) return null;
  const next = events.map((e) => ({ e, t: eventStart(e).getTime() })).filter((x) => x.t > now).sort((a, b) => a.t - b.t)[0];
  if (!next) return null;

  const diff = next.t - now;
  const parts = [
    [Math.floor(diff / 86400000), labels.days],
    [Math.floor((diff / 3600000) % 24), labels.hours],
    [Math.floor((diff / 60000) % 60), labels.minutes],
    [Math.floor((diff / 1000) % 60), labels.seconds],
  ] as const;

  return (
    <section className="dark-scope relative overflow-hidden border-y border-gold/25 bg-violet-900 py-10 text-white">
      <div className="moucharabieh pointer-events-none absolute inset-0" aria-hidden />
      <div className="container relative grid items-center gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow text-white/70">{labels.title}</p>
          <Link href={next.e.href} className="mt-3 block font-display text-3xl hover:text-gold md:text-4xl">{next.e.title}</Link>
          <p className="mt-2 text-sm text-white/60">{next.e.place}</p>
        </div>
        <div className="flex gap-3 lg:col-span-4" dir="ltr" aria-live="off">
          {parts.map(([v, l]) => (
            <div key={l} className="min-w-[4.2rem] rounded-2xl border border-gold/25 bg-ink/40 px-3 py-3 text-center">
              <span className="block font-display text-3xl tabular-nums text-gold-gradient md:text-4xl">{String(v).padStart(2, "0")}</span>
              <span className="text-[10px] uppercase tracking-widest text-white/50">{l}</span>
            </div>
          ))}
        </div>
        <div className="lg:col-span-3">
          <AddToCalendar event={next.e} labels={{ add: labels.add, google: labels.google, ics: labels.ics }} />
        </div>
      </div>
    </section>
  );
}

/** Affiche « Ajouter à mon agenda » seulement si l'activité n'a pas encore eu lieu. */
export function CalendarIfUpcoming(props: { event: UpcomingEvent; labels: { add: string; google: string; ics: string } }) {
  const [upcoming, setUpcoming] = useState(false);
  useEffect(() => setUpcoming(eventStart(props.event).getTime() > Date.now()), [props.event]);
  if (!upcoming) return null;
  return (
    <div className="mt-8 border-t border-white/15 pt-6">
      <AddToCalendar {...props} />
    </div>
  );
}
