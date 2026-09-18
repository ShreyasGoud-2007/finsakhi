"use client";

import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { getCategory } from "@/lib/categories";
import { fillTemplate, getCategoryLabel, getDemoDisplayLabel } from "@/lib/i18n";
import { formatDate, rupees } from "@/lib/format";
import { useStore } from "@/lib/store";
import { Trash2 } from "lucide-react";
import type { Transaction } from "@/lib/types";
import { TransactionCard } from "./TransactionRow";

export function TransactionList({
  transactions, onDelete,
}: { transactions: Transaction[]; onDelete?: (id: string) => void }) {
  const { prefs, t } = useStore();
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
          <caption className="sr-only">{t("transactions.tableCaption")}</caption>
          <thead>
            <tr className="text-sm text-ink-500 border-b border-ink-300/30">
              <th scope="col" className="py-3 font-semibold">{t("label.description")}</th>
              <th scope="col" className="py-3 font-semibold">{t("label.category")}</th>
              <th scope="col" className="py-3 font-semibold">{t("label.date")}</th>
              <th scope="col" className="py-3 font-semibold text-right">{t("label.amount")}</th>
              {onDelete && <th scope="col" className="py-3"><span className="sr-only">{t("label.actions")}</span></th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-300/20">
            {transactions.map((transaction) => {
              const meta = getCategory(transaction.category);
              const income = transaction.type === "income";
              return (
                <tr key={transaction.id}>
                  <td className="py-3.5 font-semibold">{getDemoDisplayLabel(transaction.description, prefs.language)}</td>
                  <td className="py-3.5">
                    <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold"
                          style={{ backgroundColor: `${meta.color}1A`, color: meta.color }}>
                      <CategoryIcon name={meta.icon} size={16} />
                      {getCategoryLabel(transaction.category, prefs.language)}
                    </span>
                  </td>
                  <td className="py-3.5 text-ink-700">{formatDate(transaction.date, prefs.language)}</td>
                  <td className={`py-3.5 text-right font-bold tabular-nums
                                  ${income ? "text-income" : "text-expense"}`}>
                    {income ? "+" : "−"} {rupees(transaction.amount)}
                    <span className="sr-only">{income ? ` ${t("common.received")}` : ` ${t("common.spent")}`}</span>
                  </td>
                  {onDelete && (
                    <td className="py-3.5 text-right">
                            <button onClick={() => onDelete(transaction.id)}
                              aria-label={fillTemplate(t("transactions.deleteDescription"), { description: getDemoDisplayLabel(transaction.description, prefs.language) })}
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
