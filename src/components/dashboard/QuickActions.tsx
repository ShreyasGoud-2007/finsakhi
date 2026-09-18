"use client";

import Link from "next/link";
import { Bot, MinusCircle, PlusCircle, Target } from "lucide-react";
import { useStore } from "@/lib/store";

export function QuickActions({
  onAddIncome, onAddExpense, onCreateGoal,
}: { onAddIncome: () => void; onAddExpense: () => void; onCreateGoal: () => void }) {
  const { t } = useStore();

  const base =
    "flex flex-col items-center justify-center gap-2 rounded-2xl border-2 p-4 text-center " +
    "font-semibold transition-colors min-h-[104px]";

  return (
    <section aria-label="Quick actions" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <button onClick={onAddIncome}
              className={`${base} border-income/30 bg-income-soft text-income hover:bg-income/15`}>
        <PlusCircle size={26} aria-hidden="true" />
        {t("action.addIncome")}
      </button>
      <button onClick={onAddExpense}
              className={`${base} border-expense/30 bg-expense-soft text-expense hover:bg-expense/15`}>
        <MinusCircle size={26} aria-hidden="true" />
        {t("action.addExpense")}
      </button>
      <button onClick={onCreateGoal}
              className={`${base} border-gold/30 bg-gold-soft text-gold hover:bg-gold/15`}>
        <Target size={26} aria-hidden="true" />
        {t("action.createGoal")}
      </button>
      <Link href="/assistant"
            className={`${base} border-brand-200 bg-brand-50 text-brand-700 hover:bg-brand-100`}>
        <Bot size={26} aria-hidden="true" />
        {t("action.askAI")}
      </Link>
    </section>
  );
}
