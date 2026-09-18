"use client";

import { CalendarClock, Plus, Trash2 } from "lucide-react";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { goalProgress, monthsRemaining } from "@/lib/calculations";
import { rupees } from "@/lib/format";
import type { SavingsGoal } from "@/lib/types";

export function SavingsGoalCard({
  goal, onAdd, onDelete,
}: { goal: SavingsGoal; onAdd?: (goal: SavingsGoal) => void; onDelete?: (id: string) => void }) {
  const progress = goalProgress(goal);
  const months = monthsRemaining(goal);
  const done = progress >= 100;

  return (
    <article className="card p-5">
      <div className="flex items-start gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-soft text-gold">
          <CategoryIcon name={goal.icon} size={24} />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-xl font-bold truncate">{goal.name}</h3>
          <p className="text-ink-700 tabular-nums">
            {rupees(goal.savedAmount)} saved of {rupees(goal.targetAmount)}
          </p>
        </div>
        {onDelete && (
          <button onClick={() => onDelete(goal.id)} aria-label={`Delete ${goal.name}`}
                  className="btn-ghost !px-2 !min-h-0 py-2 text-ink-500 hover:text-expense">
            <Trash2 size={18} />
          </button>
        )}
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-sm font-semibold mb-2">
          <span>{done ? "Goal reached" : "Progress"}</span>
          <span className="tabular-nums">{Math.round(progress)}%</span>
        </div>
        <ProgressBar value={progress} tone={done ? "income" : "gold"}
                     label={`${goal.name}: ${Math.round(progress)}% saved`} />
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-cream px-3 py-2.5">
          <dt className="text-ink-500">Saving each month</dt>
          <dd className="font-bold tabular-nums">{rupees(goal.monthlyContribution)}</dd>
        </div>
        <div className="rounded-xl bg-cream px-3 py-2.5">
          <dt className="text-ink-500 flex items-center gap-1">
            <CalendarClock size={14} aria-hidden="true" /> Time left
          </dt>
          <dd className="font-bold">
            {done ? "Complete"
              : months === null ? "Set a monthly amount"
              : months === 1 ? "About 1 month" : `About ${months} months`}
          </dd>
        </div>
      </dl>

      {onAdd && !done && (
        <button onClick={() => onAdd(goal)} className="btn-secondary w-full mt-4">
          <Plus size={18} aria-hidden="true" /> Add money to this goal
        </button>
      )}
    </article>
  );
}
