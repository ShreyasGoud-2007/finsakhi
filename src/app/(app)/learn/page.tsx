"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { LessonCard } from "@/components/learn/LessonCard";
import { LESSONS, LESSON_CATEGORIES } from "@/lib/lessons";
import type { LessonCategory } from "@/lib/types";

export default function LearnPage() {
  const [filter, setFilter] = useState<LessonCategory | "all">("all");
  const lessons = filter === "all" ? LESSONS : LESSONS.filter((l) => l.category === filter);

  return (
    <div>
      <PageHeader
        title="Learn about money"
        subtitle="Every topic explained in plain language, with an example from real life."
      />

      <div role="group" aria-label="Filter topics" className="flex flex-wrap gap-2 mb-6">
        {LESSON_CATEGORIES.map((c) => (
          <button key={c.id} onClick={() => setFilter(c.id as LessonCategory | "all")}
                  aria-pressed={filter === c.id}
                  className={filter === c.id ? "chip-on" : "chip-off"}>
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {lessons.map((l) => <LessonCard key={l.id} lesson={l} />)}
      </div>
    </div>
  );
}
