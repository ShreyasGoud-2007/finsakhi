import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { getLocalizedString, type TranslationKey } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import type { FinancialLesson } from "@/lib/types";

export function LessonCard({ lesson }: { lesson: FinancialLesson }) {
  const { prefs, t } = useStore();
  const title = getLocalizedString(lesson.title, prefs.language);
  const summary = getLocalizedString(lesson.summary, prefs.language);

  return (
    <Link
      href={`/learn/${lesson.id}`}
      className="card group flex h-full flex-col p-5 transition-transform hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
          <CategoryIcon name={lesson.icon} size={24} />
        </span>
        <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-brand-700">
          {t(`lesson.category.${lesson.category}` as TranslationKey)}
        </span>
      </div>
      <h3 className="mt-4 font-display text-xl font-bold text-ink-900">{title}</h3>
      <p className="mt-2 flex-1 text-[1rem] leading-relaxed text-ink-700">{summary}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-brand-700">
        {t("action.learnMore")} <ArrowRight size={17} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
