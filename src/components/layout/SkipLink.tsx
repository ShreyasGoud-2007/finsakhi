"use client";

import { useStore } from "@/lib/store";

export function SkipLink() {
  const { t } = useStore();

  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]
                 focus:rounded-xl focus:bg-brand-700 focus:px-4 focus:py-3 focus:text-white focus:font-semibold"
    >
      {t("action.skipToMain")}
    </a>
  );
}
