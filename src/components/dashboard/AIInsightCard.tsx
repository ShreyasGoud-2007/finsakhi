"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Info, ShieldAlert, Sparkles } from "lucide-react";
import { getLocalizedDemoText } from "@/lib/i18n";
import type { FinancialInsight } from "@/lib/financialInsights";
import { useStore } from "@/lib/store";
import BlurText from "@/components/ui/BlurText";

const toneStyles = {
  positive: {
    badge: "bg-income-soft text-income border border-income/20",
    icon: "bg-income-soft text-income",
    ring: "border-income/20",
  },
  warning: {
    badge: "bg-expense-soft text-expense border border-expense/20",
    icon: "bg-expense-soft text-expense",
    ring: "border-expense/20",
  },
  info: {
    badge: "bg-brand-50 text-brand-700 border border-brand-200",
    icon: "bg-brand-50 text-brand-700",
    ring: "border-brand-200",
  },
} as const;

const toneIcon = {
  positive: CheckCircle2,
  warning: ShieldAlert,
  info: Info,
} as const;

export function AIInsightCard({
  insights,
  text,
  title,
  ctaHref = "/assistant",
  ctaLabel,
}: {
  insights?: FinancialInsight[];
  text?: string;
  title?: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  const { t, prefs } = useStore();
  const resolvedTitle = title ?? t("dashboard.financialSnapshot");
  const resolvedCtaLabel = ctaLabel ?? t("action.askAI");
  const items = insights?.length
    ? insights
    : text
      ? [{ type: "info" as const, title: resolvedTitle, message: text }]
      : [];

  return (
    <section
      className="rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-brand-50 p-5 sm:p-6 shadow-card"
      aria-labelledby="ai-insight-heading"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lift">
            <Sparkles size={22} aria-hidden="true" />
          </span>
          <h2 id="ai-insight-heading" className="font-display text-xl sm:text-2xl font-bold">
            <BlurText key={`insight-heading-${resolvedTitle}`} text={resolvedTitle} as="span" className="font-inherit" delay={70} stepDuration={0.3} />
          </h2>
        </div>
        <Link href={ctaHref} className="hidden sm:inline-flex items-center gap-1.5 font-semibold text-brand-700">
          {resolvedCtaLabel} <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-5 space-y-3">
        {items.map((insight) => {
          const tone = toneStyles[insight.type];
          const Icon = toneIcon[insight.type];

          return (
            <article key={`${insight.title}-${insight.type}`} className={`rounded-2xl border bg-white/80 p-4 ${tone.ring}`}>
              <div className="flex items-start gap-3">
                <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${tone.icon}`}>
                  <Icon size={17} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-lg font-bold text-ink-900">{getLocalizedDemoText(insight.title, prefs.language)}</h3>
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] ${tone.badge}`}>
                      {t(`insight.type${insight.type.charAt(0).toUpperCase()}${insight.type.slice(1)}` as any)}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[1.02rem] leading-relaxed text-ink-700">{getLocalizedDemoText(insight.message, prefs.language)}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <Link href={ctaHref} className="btn-primary mt-5 sm:hidden">
        {resolvedCtaLabel} <ArrowRight size={18} aria-hidden="true" />
      </Link>
    </section>
  );
}
