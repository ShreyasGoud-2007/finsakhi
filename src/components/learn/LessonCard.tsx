import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import type { FinancialLesson } from "@/lib/types";

export function LessonCard({ lesson }: { lesson: FinancialLesson }) {
  return (
    <Link
      href={`/learn/${lesson.id}`}
      className="card p-5 flex flex-col hover:border-brand-300 transition-colors"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
        <CategoryIcon name={lesson.icon} size={24} />
      </span>
      <h3 className="font-display text-xl font-bold mt-4">{lesson.title}</h3>
      <p className="text-ink-700 mt-1.5 flex-1">{lesson.summary}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-brand-700">
        Learn more <ArrowRight size={17} aria-hidden="true" />
      </span>
    </Link>
  );
}
