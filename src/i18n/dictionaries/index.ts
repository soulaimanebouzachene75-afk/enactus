import type { Locale } from "../config";
import fr, { type Dictionary } from "./fr";
import en from "./en";
import ar from "./ar";

const dictionaries: Record<Locale, Dictionary> = { fr, en, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
export type { Dictionary };
