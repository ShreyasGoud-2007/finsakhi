"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Receipt, Target } from "lucide-react";
import { AIInsightCard } from "@/components/dashboard/AIInsightCard";
import { ExpenseChart } from "@/components/dashboard/ExpenseChart";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { SavingsGoalModal } from "@/components/goals/SavingsGoalModal";
import { TransactionCard } from "@/components/transactions/TransactionRow";
import { TransactionModal } from "@/components/transactions/TransactionModal";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { EmptyState, LoadingState } from "@/components/ui/States";
import {
  getCategoryTotals,
  getSummary,
  goalProgress,
  monthsRemaining,
  sortByDateDesc,
} from "@/lib/calculations";
import { generateFinancialInsights } from "@/lib/financialInsights";
import { greeting, rupees } from "@/lib/format";
import { fillTemplate, getDemoDisplayLabel } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import type { Transaction } from "@/lib/types";

export default function DashboardPage() {
  const { user, transactions, goals, loading, t, prefs } = useStore();

  const [txModal, setTxModal] = useState<null | Transaction["type"]>(null);
  const [goalModal, setGoalModal] = useState(false);

  const summary = useMemo(
    () => getSummary(transactions),
    [transactions]
  );

  const categories = useMemo(
    () => getCategoryTotals(transactions),
    [transactions]
  );

  const recent = useMemo(
    () => sortByDateDesc(transactions).slice(0, 5),
    [transactions]
  );

  const insights = useMemo(
    () => generateFinancialInsights(transactions, goals, prefs.language),
    [transactions, goals, prefs.language]
  );

  const activeGoal = goals[0];
  const activeGoalName = activeGoal ? getDemoDisplayLabel(activeGoal.name, prefs.language) : "";

  if (loading) return <LoadingState />;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-brand-100 bg-gradient-to-br from-white via-brand-50 to-white p-5 shadow-card sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-700">{t("dashboard.monthlyOverview")}</p>
            <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
              {greeting(prefs.language)}, {user.name}{" "}
              <span aria-hidden="true">👋</span>
            </h1>
            <p className="mt-2 max-w-readable text-lg text-ink-700">
              {t("label.subtitle")}
            </p>
          </div>

          <div className="hidden lg:block">
            <LanguageSelector compact />
          </div>
        </div>
      </section>

      <SummaryCards summary={summary} />

      <QuickActions
        onAddIncome={() => setTxModal("income")}
        onAddExpense={() => setTxModal("expense")}
        onCreateGoal={() => setGoalModal(true)}
      />

      <AIInsightCard insights={insights} />

      <ExpenseChart data={categories} />

      <div className="grid gap-6 lg:grid-cols-2">
        <section
          className="card p-5 sm:p-6"
          aria-labelledby="recent-heading"
        >
          <div className="flex items-center justify-between gap-3">
            <h2
              id="recent-heading"
              className="font-display text-2xl font-bold"
            >
              {t("dashboard.recentActivity")}
            </h2>

            <Link
              href="/transactions"
              className="font-semibold text-brand-700 inline-flex items-center gap-1"
            >
              {t("action.viewAll")} {" "}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>

          {recent.length === 0 ? (
            <div className="mt-4">
              <EmptyState
                icon={Receipt}
                title={t("dashboard.emptyRecentTitle")}
                message={t("dashboard.emptyRecentMessage")}
                action={
                  <button
                    onClick={() => setTxModal("expense")}
                    className="btn-primary"
                  >
                    {t("action.addFirstExpense")}
                  </button>
                }
              />
            </div>
          ) : (
            <ul className="mt-2 divide-y divide-ink-300/25">
              {recent.map((tx) => (
                <TransactionCard
                  key={tx.id}
                  transaction={tx}
                />
              ))}
            </ul>
          )}
        </section>

        <section
          className="card p-5 sm:p-6"
          aria-labelledby="goal-heading"
        >
          <div className="flex items-center justify-between gap-3">
            <h2
              id="goal-heading"
              className="font-display text-2xl font-bold"
            >
              {t("dashboard.yourSavingsGoal")}
            </h2>

            <Link
              href="/goals"
              className="font-semibold text-brand-700 inline-flex items-center gap-1"
            >
              {t("action.viewAll")} {" "}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>

          {!activeGoal ? (
            <div className="mt-4">
              <EmptyState
                icon={Target}
                title={t("dashboard.emptyGoalTitle")}
                message={t("dashboard.emptyGoalMessage")}
                action={
                  <button
                    onClick={() => setGoalModal(true)}
                    className="btn-primary"
                  >
                    {t("action.createSavingsGoal")}
                  </button>
                }
              />
            </div>
          ) : (
            <div className="mt-5">
              <p className="font-display text-xl font-bold">
                {activeGoalName}
              </p>

              <p className="text-ink-700 tabular-nums mt-0.5">
                {rupees(activeGoal.savedAmount)} {t("goal.savedOf")} {" "}
                {rupees(activeGoal.targetAmount)}
              </p>

              <div className="mt-4">
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span>{t("goal.progress")}</span>
                  <span className="tabular-nums">
                    {Math.round(goalProgress(activeGoal))}%
                  </span>
                </div>

                <ProgressBar
                  value={goalProgress(activeGoal)}
                  tone="gold"
                  label={fillTemplate(t("goal.progressFor"), { name: activeGoalName })}
                />
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-cream px-3 py-2.5">
                  <dt className="text-ink-500">
                    {t("goal.monthlySaving")}
                  </dt>

                  <dd className="font-bold tabular-nums">
                    {rupees(activeGoal.monthlyContribution)}
                  </dd>
                </div>

                <div className="rounded-xl bg-cream px-3 py-2.5">
                  <dt className="text-ink-500">
                    {t("goal.timeLeft")}
                  </dt>

                  <dd className="font-bold">
                    {monthsRemaining(activeGoal) === null
                      ? t("goal.setMonthlyAmount")
                      : fillTemplate(t("goal.aboutMonths"), { count: monthsRemaining(activeGoal) ?? 0 })}
                  </dd>
                </div>
              </dl>

              <Link
                href="/goals"
                className="btn-secondary w-full mt-4"
              >
                {t("action.viewAllGoals")}
              </Link>
            </div>
          )}
        </section>
      </div>

      <p className="text-sm text-ink-500 max-w-readable">
        {t("common.privacyNote")}
      </p>

      <TransactionModal
        open={txModal !== null}
        defaultType={txModal ?? "expense"}
        onClose={() => setTxModal(null)}
      />

      <SavingsGoalModal
        open={goalModal}
        onClose={() => setGoalModal(false)}
      />
    </div>
  );
}