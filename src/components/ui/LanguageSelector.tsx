"use client";

import { Languages } from "lucide-react";
import { useStore } from "@/lib/store";
import { LANGUAGES } from "@/lib/i18n";
import type { Language } from "@/lib/types";

export function LanguageSelector({ compact = false }: { compact?: boolean }) {
  const { prefs, setLanguage, t } = useStore();

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2">
        <Languages size={20} className="text-ink-500" aria-hidden="true" />
        <label htmlFor="lang-select" className="sr-only">{t("label.chooseLanguage")}</label>
        <select
          id="lang-select"
          value={prefs.language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="field !min-h-[44px] !py-2 !w-auto font-semibold"
        >
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>{l.native}</option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div role="group" aria-label={t("label.chooseLanguage")} className="flex flex-wrap gap-2">
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          onClick={() => setLanguage(l.code)}
          aria-pressed={prefs.language === l.code}
          className={prefs.language === l.code ? "chip-on" : "chip-off"}
        >
          {l.native}
        </button>
      ))}
    </div>
  );
}
