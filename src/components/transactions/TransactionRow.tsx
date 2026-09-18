"use client";

import { Trash2 } from "lucide-react";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { getCategory } from "@/lib/categories";
import { formatDate, rupees } from "@/lib/format";
import type { Transaction } from "@/lib/types";

/** Card form - used on mobile and in the dashboard's recent list. */
export function TransactionCard({
  transaction, onDelete,
}: { transaction: Transaction; onDelete?: (id: string) => void }) {
  const meta = getCategory(transaction.category);
  const income = transaction.type === "income";

  return (
    <li className="flex items-center gap-3 py-3">
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${meta.color}1A`, color: meta.color }}
      >
        <CategoryIcon name={meta.icon} size={21} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block font-semibold truncate">{transaction.description}</span>
        <span className="block text-sm text-ink-500">
          {meta.label} · {formatDate(transaction.date)}
        </span>
      </span>

      <span className={`font-bold tabular-nums whitespace-nowrap
                        ${income ? "text-income" : "text-expense"}`}>
        {/* sign, colour and word all carry the meaning, not colour alone */}
        {income ? "+" : "−"} {rupees(transaction.amount)}
        <span className="sr-only">{income ? " received" : " spent"}</span>
      </span>

      {onDelete && (
        <button
          onClick={() => onDelete(transaction.id)}
          aria-label={`Delete ${transaction.description}`}
          className="btn-ghost !px-2 !min-h-0 py-2 text-ink-500 hover:text-expense"
        >
          <Trash2 size={18} />
        </button>
      )}
    </li>
  );
}
