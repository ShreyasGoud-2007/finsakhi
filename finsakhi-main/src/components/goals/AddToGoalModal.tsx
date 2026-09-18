"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { useStore } from "@/lib/store";
import type { SavingsGoal } from "@/lib/types";

export function AddToGoalModal({
  goal, onClose,
}: { goal: SavingsGoal | null; onClose: () => void }) {
  const { addToGoal } = useStore();
  const [amount, setAmount] = useState("");

  useEffect(() => { setAmount(""); }, [goal]);
  if (!goal) return null;

  return (
    <Modal open onClose={onClose} title={`Add to ${goal.name}`}
           description="Record money you have put aside for this goal.">
      <div className="space-y-5">
        <div>
          <label htmlFor="goal-add" className="label">Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-ink-500"
                  aria-hidden="true">₹</span>
            <input id="goal-add" inputMode="numeric" autoFocus value={amount}
                   onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
                   placeholder="500" className="field !pl-10 !text-2xl !font-bold" />
          </div>
        </div>
        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button
            onClick={async () => {
              const v = Number(amount);
              if (v > 0) await addToGoal(goal.id, v);
              onClose();
            }}
            className="btn-primary"
          >
            Add to goal
          </button>
        </div>
      </div>
    </Modal>
  );
}
