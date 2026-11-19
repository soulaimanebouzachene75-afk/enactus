"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ActivityCard } from "./ActivityCard";
import { categoryLabels, type Activity, type ActivityCategory } from "@/content/activities";
import { tr, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

/** Grille filtrable des activités (par catégorie). */
export function ActivitiesExplorer({ activities, locale, allLabel }: { activities: Activity[]; locale: Locale; allLabel: string }) {
  const [filter, setFilter] = useState<ActivityCategory | "all">("all");
  const cats = useMemo(() => Array.from(new Set(activities.map((a) => a.category))), [activities]);
  const list = filter === "all" ? activities : activities.filter((a) => a.category === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtres">
        {(["all", ...cats] as const).map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={filter === c}
            onClick={() => setFilter(c)}
            className={cn(
              "rounded-full border px-5 py-2 text-sm font-medium transition",
              filter === c ? "border-ink bg-ink text-white" : "border-ink/15 text-ink/70 hover:border-ink/40",
            )}
          >
            {c === "all" ? allLabel : tr(categoryLabels[c], locale)}
            <span className="ms-2 tabular-nums opacity-50">
              {c === "all" ? activities.length : activities.filter((a) => a.category === c).length}
            </span>
          </button>
        ))}
      </div>
      <motion.ul layout className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((a) => (
            <motion.li
              key={a.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45 }}
            >
              <ActivityCard activity={a} locale={locale} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
