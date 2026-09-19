"use client";

import { useState } from "react";
import { Plus, Target } from "lucide-react";
import { AddToGoalModal } from "@/components/goals/AddToGoalModal";
import { SavingsGoalCard } from "@/components/goals/SavingsGoalCard";
import { SavingsGoalModal } from "@/components/goals/SavingsGoalModal";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState, LoadingState } from "@/components/ui/States";
import { rupees } from "@/lib/format";
import { useStore } from "@/lib/store";
import type { SavingsGoal } from "@/lib/types";

export default function GoalsPage() {
  const { goals, deleteGoal, loading } = useStore();
  const [createOpen, setCreateOpen] = useState(false);
  const [adding, setAdding] = useState<SavingsGoal | null>(null);

  const totalSaved = goals.reduce((s, g) => s + g.savedAmount, 0);
  const totalTarget = goals.reduce((s, g) => s + g.targetAmount, 0);

  if (loading) return <LoadingState message="Loading your goals..." />;

  return (
    <div>
      <PageHeader
        title="Your savings goals"
        subtitle="Small steps today can help you reach your future goals."
        actions={
          <button onClick={() => setCreateOpen(true)} className="btn-primary">
            <Plus size={19} aria-hidden="true" /> Create goal
          </button>
        }
      />

      {goals.length > 0 && (
        <div className="rounded-2xl bg-brand-700 text-white p-5 sm:p-6 mb-6">
          <p className="text-brand-100 font-semibold">Saved across all your goals</p>
          <p className="font-display text-4xl font-extrabold tabular-nums mt-1">
            {rupees(totalSaved)}
          </p>
          <p className="text-brand-100 mt-1 tabular-nums">
            of {rupees(totalTarget)} you are working towards
          </p>
        </div>
      )}

      {goals.length === 0 ? (
        <EmptyState
          icon={Target}
          title="Start with a small goal."
          message="An emergency fund is the best first goal. Pick an amount that feels possible, not perfect."
          action={
            <button onClick={() => setCreateOpen(true)} className="btn-primary">
              Create savings goal
            </button>
          }
        />
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {goals.map((g) => (
            <SavingsGoalCard key={g.id} goal={g} onAdd={setAdding} onDelete={deleteGoal} />
          ))}
        </div>
      )}

      <SavingsGoalModal open={createOpen} onClose={() => setCreateOpen(false)} />
      <AddToGoalModal goal={adding} onClose={() => setAdding(null)} />
    </div>
  );
}
