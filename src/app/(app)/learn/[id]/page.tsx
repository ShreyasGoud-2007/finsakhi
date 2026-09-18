"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Bot, Lightbulb, ListChecks, Quote } from "lucide-react";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { getLesson } from "@/lib/lessons";

export default function LessonPage({ params }: { params: { id: string } }) {
  const lesson = getLesson(params.id);
  if (!lesson) notFound();

  return (
    <article className="max-w-3xl">
      <Link href="/learn" className="inline-flex items-center gap-1.5 font-semibold text-brand-700 mb-6">
        <ArrowLeft size={18} aria-hidden="true" /> All topics
      </Link>

      <header className="flex items-start gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
          <CategoryIcon name={lesson.icon} size={28} />
        </span>
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
            {lesson.title}
          </h1>
          <p className="text-ink-700 mt-1.5 text-lg">{lesson.summary}</p>
        </div>
      </header>

      <div className="mt-8 space-y-6">
        <section>
          <h2 className="section-title">In simple words</h2>
          <p className="mt-2 text-[1.08rem] leading-relaxed text-ink-900 max-w-readable">
            {lesson.explanation}
          </p>
        </section>

        <section className="rounded-2xl border-2 border-gold/30 bg-gold-soft p-5">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold">
            <Quote size={20} className="text-gold" aria-hidden="true" /> An example
          </h2>
          <p className="mt-2 text-[1.05rem] leading-relaxed max-w-readable">{lesson.example}</p>
        </section>

        <section>
          <h2 className="flex items-center gap-2 section-title">
            <Lightbulb size={24} className="text-brand-600" aria-hidden="true" /> Why it matters
          </h2>
          <p className="mt-2 text-[1.08rem] leading-relaxed text-ink-900 max-w-readable">
            {lesson.whyItMatters}
          </p>
        </section>

        <section className="card p-5">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold">
            <ListChecks size={20} className="text-brand-600" aria-hidden="true" /> Remember
          </h2>
          <ul className="mt-3 space-y-2.5">
            {lesson.remember.map((r, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                <span className="text-[1.03rem] leading-relaxed">{r}</span>
              </li>
            ))}
          </ul>
        </section>

        <Link
          href={`/assistant?q=${encodeURIComponent(lesson.title.replace(/^What is /, "Tell me about "))}`}
          className="btn-primary"
        >
          <Bot size={19} aria-hidden="true" /> Ask FinSakhi AI about this topic
        </Link>
      </div>
    </article>
  );
}
