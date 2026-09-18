"use client";

import Link from "next/link";
import { Bot, MinusCircle, PlusCircle, Target } from "lucide-react";
import { useStore } from "@/lib/store";

export function QuickActions({
  onAddIncome, onAddExpense, onCreateGoal,
}: { onAddIncome: () => void; onAddExpense: () => void; onCreateGoal: () => void }) {
  const { t } = useStore();

  const base =
    "flex min-h-[108px] flex-col items-center justify-center gap-2 rounded-2xl border p-4 text-center " +
    "font-semibold transition-colors shadow-card hover:-translate-y-0.5 hover:shadow-lift";

  return (
    <section aria-label={t("dashboard.quickActions")} className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-2xl font-bold text-ink-900">{t("dashboard.quickActions")}</h2>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <button onClick={onAddIncome}
                className={`${base} border-income/20 bg-income-soft text-income`}>
          <PlusCircle size={26} aria-hidden="true" />
          {t("action.addIncome")}
        </button>
        <button onClick={onAddExpense}
                className={`${base} border-expense/20 bg-expense-soft text-expense`}>
          <MinusCircle size={26} aria-hidden="true" />
          {t("action.addExpense")}
        </button>
        <button onClick={onCreateGoal}
                className={`${base} border-gold/20 bg-gold-soft text-gold`}>
          <Target size={26} aria-hidden="true" />
          {t("action.createGoal")}
        </button>
        <Link href="/assistant"
              className={`${base} border-brand-200 bg-brand-50 text-brand-700`}>
          <Bot size={26} aria-hidden="true" />
          {t("action.askAI")}
        </Link>
      </div>
    </section>
  );
}
