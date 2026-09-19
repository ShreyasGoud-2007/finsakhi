"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { LessonCard } from "@/components/learn/LessonCard";
import { LESSONS, LESSON_CATEGORIES } from "@/lib/lessons";
import { useStore } from "@/lib/store";
import type { LessonCategory } from "@/lib/types";

export default function LearnPage() {
  const { t } = useStore();
  const [filter, setFilter] = useState<LessonCategory | "all">("all");
  const lessons = filter === "all" ? LESSONS : LESSONS.filter((l) => l.category === filter);

  return (
    <div>
      <PageHeader
        title={t("learn.pageTitle")}
        subtitle={t("learn.subtitle")}
      />

      <section className="mb-6 rounded-3xl border border-brand-100 bg-white p-4 shadow-card sm:p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-700">{t("learn.filterBasics")}</p>
        <p className="mt-2 text-base text-ink-700 sm:text-lg">
          {t("learn.intro")}
        </p>
      </section>

      <div role="group" aria-label={t("common.filter")} className="mb-6 flex flex-wrap gap-2">
        {LESSON_CATEGORIES.map((c) => (
          <button key={c.id} onClick={() => setFilter(c.id as LessonCategory | "all")}
                  aria-pressed={filter === c.id}
                  className={filter === c.id ? "chip-on" : "chip-off"}>
            {t(`lesson.category.${c.id}` as any)}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {lessons.map((l) => <LessonCard key={l.id} lesson={l} />)}
      </div>
    </div>
  );
}
