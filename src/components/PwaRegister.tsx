"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { basePath } from "@/lib/utils";

type BIPEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };
let deferred: BIPEvent | null = null;

/**
 * Application installable : enregistre le service hors ligne (public/sw.js)
 * et mémorise la proposition d'installation du navigateur.
 */
export function PwaRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register(`${basePath}/sw.js`, { scope: `${basePath}/` }).catch(() => {});
    const onPrompt = (e: Event) => {
      e.preventDefault();
      deferred = e as BIPEvent;
      window.dispatchEvent(new Event("enx-installable"));
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);
  return null;
}

/** Bouton « Installer l'application », visible seulement quand le navigateur le permet. */
export function InstallButton({ label }: { label: string }) {
  const [can, setCan] = useState(false);
  useEffect(() => {
    if (deferred) setCan(true);
    const on = () => setCan(true);
    window.addEventListener("enx-installable", on);
    return () => window.removeEventListener("enx-installable", on);
  }, []);
  if (!can) return null;
  return (
    <button
      type="button"
      onClick={async () => {
        if (!deferred) return;
        await deferred.prompt();
        await deferred.userChoice;
        deferred = null;
        setCan(false);
      }}
      className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-xs font-semibold text-gold transition hover:bg-gold hover:text-ink"
    >
      <Download className="h-4 w-4" />
      {label}
    </button>
  );
}
