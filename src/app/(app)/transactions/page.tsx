"use client";

import { useMemo, useState } from "react";
import { MinusCircle, PlusCircle, Receipt } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { TransactionList } from "@/components/transactions/TransactionList";
import { TransactionModal } from "@/components/transactions/TransactionModal";
import { EmptyState, LoadingState } from "@/components/ui/States";
import { getSummary, sortByDateDesc } from "@/lib/calculations";
import { CATEGORIES } from "@/lib/categories";
import { rupees } from "@/lib/format";
import { useStore } from "@/lib/store";
import type { CategoryId, Transaction } from "@/lib/types";

type TypeFilter = "all" | "income" | "expense";

export default function TransactionsPage() {
  const { transactions, deleteTransaction, loading, t } = useStore();
  const [modal, setModal] = useState<null | Transaction["type"]>(null);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const [month, setMonth] = useState("");

  const filtered = useMemo(() => {
    return sortByDateDesc(transactions).filter((tx) => {
      if (typeFilter !== "all" && tx.type !== typeFilter) return false;
      if (category !== "all" && tx.category !== category) return false;
      if (month && !tx.date.startsWith(month)) return false;
      return true;
    });
  }, [transactions, typeFilter, category, month]);

  const summary = useMemo(() => getSummary(filtered), [filtered]);

  if (loading) return <LoadingState message={t("label.loadingTransactions")} />;

  return (
    <div>
      <PageHeader
        title={t("transactions.pageTitle")}
        subtitle={t("transactions.subtitle")}
        actions={
          <>
            <button onClick={() => setModal("income")} className="btn-secondary">
              <PlusCircle size={19} aria-hidden="true" /> {t("action.addIncome")}
            </button>
            <button onClick={() => setModal("expense")} className="btn-primary">
              <MinusCircle size={19} aria-hidden="true" /> {t("action.addExpense")}
            </button>
          </>
        }
      />

      <section className="card p-4 sm:p-5 mb-6 space-y-4" aria-label={t("transactions.filters")}>
        <div>
          <span className="label">{t("common.show")}</span>
          <div className="flex flex-wrap gap-2">
            {([
              { id: "all", label: t("transactions.filterEverything") },
              { id: "income", label: t("transactions.filterIncome") },
              { id: "expense", label: t("transactions.filterExpense") },
            ] as const).map((f) => (
              <button key={f.id} onClick={() => setTypeFilter(f.id)}
                      aria-pressed={typeFilter === f.id}
                      className={typeFilter === f.id ? "chip-on" : "chip-off"}>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="cat-filter" className="label">{t("label.category")}</label>
            <select id="cat-filter" value={category}
                    onChange={(e) => setCategory(e.target.value as CategoryId | "all")}
                    className="field">
              <option value="all">{t("transactions.allCategories")}</option>
              {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{t(`category.${c.id}` as any)}</option>)}
              <option value="income">{t("category.income")}</option>
            </select>
          </div>
          <div>
            <label htmlFor="month-filter" className="label">{t("label.month")}</label>
            <input id="month-filter" type="month" value={month}
                   onChange={(e) => setMonth(e.target.value)} className="field" />
          </div>
        </div>

        <p className="text-ink-700 tabular-nums">
          {t("transactions.showing")} {filtered.length} {filtered.length === 1 ? t("label.entry") : t("label.entries")} ·
          {` ${t("transactions.in")} `}{rupees(summary.income)} · {` ${t("transactions.out")} `}{rupees(summary.expenses)}
        </p>
      </section>

      <section className="card p-4 sm:p-5">
        {filtered.length === 0 ? (
          <EmptyState
            icon={Receipt}
            title={transactions.length === 0
              ? t("transactions.noTransactions")
              : t("transactions.noneMatches")}
            message={transactions.length === 0
              ? t("transactions.startByAdding")
              : t("transactions.noneMatches")}
            action={
              transactions.length === 0 ? (
                <button onClick={() => setModal("expense")} className="btn-primary">
                  {t("action.addFirstExpense")}
                </button>
              ) : (
                <button onClick={() => { setTypeFilter("all"); setCategory("all"); setMonth(""); }}
                        className="btn-secondary">{t("action.clearFilters")}</button>
              )
            }
          />
        ) : (
          <TransactionList transactions={filtered} onDelete={deleteTransaction} />
        )}
      </section>

      <TransactionModal open={modal !== null} defaultType={modal ?? "expense"}
                        onClose={() => setModal(null)} />
    </div>
  );
}
