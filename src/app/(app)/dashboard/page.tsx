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
import { useStore } from "@/lib/store";
import type { Transaction } from "@/lib/types";

export default function DashboardPage() {
  const { user, transactions, goals, loading, t } = useStore();

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
    () => generateFinancialInsights(transactions, goals),
    [transactions, goals]
  );

  const insight = useMemo(
    () =>
      insights
        .map((item) => `${item.title}: ${item.message}`)
        .join("\n\n"),
    [insights]
  );

  const activeGoal = goals[0];

  if (loading) return <LoadingState />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
            {greeting()}, {user.name}{" "}
            <span aria-hidden="true">👋</span>
          </h1>

          <p className="text-ink-700 mt-1.5 text-lg">
            {t("label.subtitle")}
          </p>
        </div>

        <div className="hidden lg:block">
          <LanguageSelector compact />
        </div>
      </div>

      <SummaryCards summary={summary} />

      <QuickActions
        onAddIncome={() => setTxModal("income")}
        onAddExpense={() => setTxModal("expense")}
        onCreateGoal={() => setGoalModal(true)}
      />

      <AIInsightCard text={insight} />

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
              Recent activity
            </h2>

            <Link
              href="/transactions"
              className="font-semibold text-brand-700 inline-flex items-center gap-1"
            >
              {t("action.viewAll")}{" "}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>

          {recent.length === 0 ? (
            <div className="mt-4">
              <EmptyState
                icon={Receipt}
                title="You haven't added any transactions yet."
                message="Add what you earned or spent and your money picture starts filling in."
                action={
                  <button
                    onClick={() => setTxModal("expense")}
                    className="btn-primary"
                  >
                    Add your first expense
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
              Your savings goal
            </h2>

            <Link
              href="/goals"
              className="font-semibold text-brand-700 inline-flex items-center gap-1"
            >
              {t("action.viewAll")}{" "}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>

          {!activeGoal ? (
            <div className="mt-4">
              <EmptyState
                icon={Target}
                title="Start with a small goal."
                message="Even ₹500 a month becomes something real. Pick one thing to save for."
                action={
                  <button
                    onClick={() => setGoalModal(true)}
                    className="btn-primary"
                  >
                    Create savings goal
                  </button>
                }
              />
            </div>
          ) : (
            <div className="mt-5">
              <p className="font-display text-xl font-bold">
                {activeGoal.name}
              </p>

              <p className="text-ink-700 tabular-nums mt-0.5">
                {rupees(activeGoal.savedAmount)} saved of{" "}
                {rupees(activeGoal.targetAmount)}
              </p>

              <div className="mt-4">
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span>Progress</span>
                  <span className="tabular-nums">
                    {Math.round(goalProgress(activeGoal))}%
                  </span>
                </div>

                <ProgressBar
                  value={goalProgress(activeGoal)}
                  tone="gold"
                  label={`${activeGoal.name} progress`}
                />
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-cream px-3 py-2.5">
                  <dt className="text-ink-500">
                    Saving each month
                  </dt>

                  <dd className="font-bold tabular-nums">
                    {rupees(activeGoal.monthlyContribution)}
                  </dd>
                </div>

                <div className="rounded-xl bg-cream px-3 py-2.5">
                  <dt className="text-ink-500">
                    Time left
                  </dt>

                  <dd className="font-bold">
                    {monthsRemaining(activeGoal) === null
                      ? "Set a monthly amount"
                      : `About ${monthsRemaining(activeGoal)} months`}
                  </dd>
                </div>
              </dl>

              <Link
                href="/goals"
                className="btn-secondary w-full mt-4"
              >
                View all goals
              </Link>
            </div>
          )}
        </section>
      </div>

      <p className="text-sm text-ink-500 max-w-readable">
        Your financial information is used to personalise your
        experience. FinSakhi gives educational guidance, not
        professional financial advice.
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