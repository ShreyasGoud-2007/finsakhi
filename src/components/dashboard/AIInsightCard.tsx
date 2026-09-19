"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

/**
 * Reusable across dashboard and lesson pages.
 * `text` will come from the AI backend later; today it is computed locally.
 */
export function AIInsightCard({
  text, title = "Your AI financial insight", ctaHref = "/assistant", ctaLabel = "Ask FinSakhi AI",
}: { text: string; title?: string; ctaHref?: string; ctaLabel?: string }) {
  return (
    <section
      className="rounded-2xl border-2 border-brand-200 bg-brand-50/70 p-5 sm:p-6"
      aria-labelledby="ai-insight-heading"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white">
          <Sparkles size={22} aria-hidden="true" />
        </span>
        <h2 id="ai-insight-heading" className="font-display text-xl sm:text-2xl font-bold">
          {title}
        </h2>
      </div>

      <div className="mt-4 space-y-3 max-w-readable text-ink-900 text-[1.05rem] leading-relaxed">
        {text.split("\n\n").map((para, i) => <p key={i}>{para}</p>)}
      </div>

      <Link href={ctaHref} className="btn-primary mt-5">
        {ctaLabel} <ArrowRight size={18} aria-hidden="true" />
      </Link>
    </section>
  );
}
