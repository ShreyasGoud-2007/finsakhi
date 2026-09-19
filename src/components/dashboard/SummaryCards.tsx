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
    income:  "bg-income-soft text-income border border-income/15",
    expense: "bg-expense-soft text-expense border border-expense/15",
    brand:   "bg-brand-50 text-brand-700 border border-brand-200",
    gold:    "bg-gold-soft text-gold border border-gold/20",
  } as const;

  return (
    <article className="card p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${tones[tone]}`}>
            {icon}
          </span>
          <span className="font-semibold text-ink-700">{label}</span>
        </div>
      </div>
      <p className="mt-4 font-display text-3xl sm:text-[2rem] font-extrabold tracking-tight tabular-nums text-ink-900">
        {value}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-ink-500">{note}</p>
    </article>
  );
}

export function SummaryCards({ summary }: { summary: FinancialSummary }) {
  const { t } = useStore();
  const rate = Math.round(summary.savingsRate);

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
      <DashboardCard
        label={t("label.income")} value={rupees(summary.income)}
        note={t("summary.incomeNote")} tone="income"
        icon={<ArrowUpCircle size={24} aria-hidden="true" />}
      />
      <DashboardCard
        label={t("label.expenses")} value={rupees(summary.expenses)}
        note={t("summary.expenseNote")} tone="expense"
        icon={<ArrowDownCircle size={24} aria-hidden="true" />}
      />
      <DashboardCard
        label={t("label.balance")} value={rupees(summary.balance)}
        note={t("summary.balanceNote")} tone="brand"
        icon={<Wallet size={24} aria-hidden="true" />}
      />
      <DashboardCard
        label={t("label.savingsRate")} value={`${rate}%`}
        note={
          rate >= 20 ? t("summary.savingsRateGood").replace("{value}", String(rate))
          : rate >= 0 ? t("summary.savingsRateLow")
          : t("summary.savingsRateNegative")
        }
        tone="gold"
        icon={<PiggyBank size={24} aria-hidden="true" />}
      />
    </div>
  );
}
