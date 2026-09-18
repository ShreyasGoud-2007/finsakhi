"use client";

import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { getCategory } from "@/lib/categories";
import { formatDate, rupees } from "@/lib/format";
import { Trash2 } from "lucide-react";
import type { Transaction } from "@/lib/types";
import { TransactionCard } from "./TransactionRow";

export function TransactionList({
  transactions, onDelete,
}: { transactions: Transaction[]; onDelete?: (id: string) => void }) {
  return (
    <>
      {/* Mobile and tablet: cards */}
      <ul className="md:hidden divide-y divide-ink-300/25">
        {transactions.map((t) => (
          <TransactionCard key={t.id} transaction={t} onDelete={onDelete} />
        ))}
      </ul>

      {/* Desktop: table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <caption className="sr-only">Your transactions</caption>
          <thead>
            <tr className="text-sm text-ink-500 border-b border-ink-300/30">
              <th scope="col" className="py-3 font-semibold">Description</th>
              <th scope="col" className="py-3 font-semibold">Category</th>
              <th scope="col" className="py-3 font-semibold">Date</th>
              <th scope="col" className="py-3 font-semibold text-right">Amount</th>
              {onDelete && <th scope="col" className="py-3"><span className="sr-only">Actions</span></th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-300/20">
            {transactions.map((t) => {
              const meta = getCategory(t.category);
              const income = t.type === "income";
              return (
                <tr key={t.id}>
                  <td className="py-3.5 font-semibold">{t.description}</td>
                  <td className="py-3.5">
                    <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold"
                          style={{ backgroundColor: `${meta.color}1A`, color: meta.color }}>
                      <CategoryIcon name={meta.icon} size={16} />
                      {meta.label}
                    </span>
                  </td>
                  <td className="py-3.5 text-ink-700">{formatDate(t.date)}</td>
                  <td className={`py-3.5 text-right font-bold tabular-nums
                                  ${income ? "text-income" : "text-expense"}`}>
                    {income ? "+" : "−"} {rupees(t.amount)}
                    <span className="sr-only">{income ? " received" : " spent"}</span>
                  </td>
                  {onDelete && (
                    <td className="py-3.5 text-right">
                      <button onClick={() => onDelete(t.id)}
                              aria-label={`Delete ${t.description}`}
                              className="btn-ghost !px-2 !min-h-0 py-2 text-ink-500 hover:text-expense">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
