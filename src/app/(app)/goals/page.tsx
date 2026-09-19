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
  const { goals, deleteGoal, loading, t, prefs } = useStore();
  const [createOpen, setCreateOpen] = useState(false);
  const [adding, setAdding] = useState<SavingsGoal | null>(null);

  const totalSaved = goals.reduce((s, g) => s + g.savedAmount, 0);
  const totalTarget = goals.reduce((s, g) => s + g.targetAmount, 0);

  if (loading) return <LoadingState message={t("label.loadingGoals")} />;

  return (
    <div>
      <PageHeader
        title={t("goals.pageTitle")}
        subtitle={t("goals.subtitle")}
        actions={
          <button onClick={() => setCreateOpen(true)} className="btn-primary">
            <Plus size={19} aria-hidden="true" /> {t("action.createGoal")}
          </button>
        }
      />

      {goals.length > 0 && (
        <div className="rounded-2xl bg-brand-700 text-white p-5 sm:p-6 mb-6">
          <p className="text-brand-100 font-semibold">{t("goals.savedAcross")}</p>
          <p className="font-display text-4xl font-extrabold tabular-nums mt-1">
            {rupees(totalSaved)}
          </p>
          <p className="text-brand-100 mt-1 tabular-nums">
            {t("goals.ofTarget")} {rupees(totalTarget)} {t("goals.youAreWorkingTowards")}
          </p>
        </div>
      )}

      {goals.length === 0 ? (
        <EmptyState
          icon={Target}
          title={t("goals.startWithSmallGoal")}
          message={t("goals.smallGoalPrompt")}
          action={
            <button onClick={() => setCreateOpen(true)} className="btn-primary">
              {t("action.createSavingsGoal")}
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
