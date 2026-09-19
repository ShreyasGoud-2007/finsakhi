"use client";

import { ArrowDownCircle, ArrowUpCircle, PiggyBank, Wallet } from "lucide-react";
import { rupees } from "@/lib/format";
import { useStore } from "@/lib/store";
import type { FinancialSummary } from "@/lib/types";

function DashboardCard({
  label, value, note, icon, tone,
}: {
  label: string; value: string; note: string;
  icon: React.ReactNode; tone: "income" | "expense" | "brand" | "gold";
}) {
  const tones = {
    income:  "bg-income-soft text-income",
    expense: "bg-expense-soft text-expense",
    brand:   "bg-brand-50 text-brand-700",
    gold:    "bg-gold-soft text-gold",
  } as const;

  return (
    <div className="card p-5">
      <div className="flex items-center gap-3">
        <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${tones[tone]}`}>
          {icon}
        </span>
        <span className="font-semibold text-ink-700">{label}</span>
      </div>
      <p className="mt-4 font-display text-3xl sm:text-[2rem] font-extrabold tracking-tight tabular-nums">
        {value}
      </p>
      <p className="text-sm text-ink-500 mt-1">{note}</p>
    </div>
  );
}

export function SummaryCards({ summary }: { summary: FinancialSummary }) {
  const { t } = useStore();
  const rate = Math.round(summary.savingsRate);

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
      <DashboardCard
        label={t("label.income")} value={rupees(summary.income)}
        note="Money that came in this month" tone="income"
        icon={<ArrowUpCircle size={24} aria-hidden="true" />}
      />
      <DashboardCard
        label={t("label.expenses")} value={rupees(summary.expenses)}
        note="Money you spent this month" tone="expense"
        icon={<ArrowDownCircle size={24} aria-hidden="true" />}
      />
      <DashboardCard
        label={t("label.balance")} value={rupees(summary.balance)}
        note="What is still with you" tone="brand"
        icon={<Wallet size={24} aria-hidden="true" />}
      />
      <DashboardCard
        label={t("label.savingsRate")} value={`${rate}%`}
        note={
          rate >= 20 ? "Out of every ₹100 earned, you kept ₹" + rate
          : rate >= 0 ? "Try to reach 20 out of every ₹100"
          : "You spent more than you earned"
        }
        tone="gold"
        icon={<PiggyBank size={24} aria-hidden="true" />}
      />
    </div>
  );
}
