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

  if (loading) return <LoadingState message="Loading your transactions..." />;

  return (
    <div>
      <PageHeader
        title="My transactions"
        subtitle="Everything that came in and went out."
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

      <section className="card p-4 sm:p-5 mb-6 space-y-4" aria-label="Filters">
        <div>
          <span className="label">Show</span>
          <div className="flex flex-wrap gap-2">
            {([
              { id: "all", label: "Everything" },
              { id: "income", label: "Money received" },
              { id: "expense", label: "Money spent" },
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
            <label htmlFor="cat-filter" className="label">Category</label>
            <select id="cat-filter" value={category}
                    onChange={(e) => setCategory(e.target.value as CategoryId | "all")}
                    className="field">
              <option value="all">All categories</option>
              {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
              <option value="income">Income</option>
            </select>
          </div>
          <div>
            <label htmlFor="month-filter" className="label">Month</label>
            <input id="month-filter" type="month" value={month}
                   onChange={(e) => setMonth(e.target.value)} className="field" />
          </div>
        </div>

        <p className="text-ink-700 tabular-nums">
          Showing {filtered.length} {filtered.length === 1 ? "entry" : "entries"} ·
          in {rupees(summary.income)} · out {rupees(summary.expenses)}
        </p>
      </section>

      <section className="card p-4 sm:p-5">
        {filtered.length === 0 ? (
          <EmptyState
            icon={Receipt}
            title={transactions.length === 0
              ? "You haven't added any transactions yet."
              : "Nothing matches these filters."}
            message={transactions.length === 0
              ? "Start by adding one thing you spent money on today."
              : "Try choosing a different category or month."}
            action={
              transactions.length === 0 ? (
                <button onClick={() => setModal("expense")} className="btn-primary">
                  Add your first expense
                </button>
              ) : (
                <button onClick={() => { setTypeFilter("all"); setCategory("all"); setMonth(""); }}
                        className="btn-secondary">Clear filters</button>
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
