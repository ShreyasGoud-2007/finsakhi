"use client";

import { useEffect, useMemo, useState } from "react";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { Modal } from "@/components/ui/Modal";
import { fillTemplate } from "@/lib/i18n";
import { getDemoDisplayLabel } from "@/lib/i18n";
import { rupees } from "@/lib/format";
import { GOAL_SUGGESTIONS } from "@/lib/mock-data";
import { useStore } from "@/lib/store";

export function SavingsGoalModal({
  open, onClose,
}: { open: boolean; onClose: () => void }) {
  const { createGoal, t, prefs } = useStore();
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("ShieldCheck");
  const [target, setTarget] = useState("");
  const [saved, setSaved] = useState("");
  const [monthly, setMonthly] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setName(""); setIcon("ShieldCheck"); setTarget(""); setSaved(""); setMonthly("");
    setError(null);
  }, [open]);

  // Plain arithmetic, done here - no AI call for a division.
  const preview = useMemo(() => {
    const tgt = Number(target) || 0;
    const sv = Number(saved) || 0;
    const mo = Number(monthly) || 0;
    const progress = tgt > 0 ? Math.min(100, (sv / tgt) * 100) : 0;
    const remaining = Math.max(0, tgt - sv);
    const months = mo > 0 ? Math.ceil(remaining / mo) : null;
    return { progress, remaining, months, valid: tgt > 0 };
  }, [target, saved, monthly]);

  const num = (v: string) => v.replace(/[^\d.]/g, "");

  async function handleSave() {
    if (!name.trim()) { setError(t("goal.nameRequired")); return; }
    if (!preview.valid) { setError(t("goal.targetRequired")); return; }
    await createGoal({
      name: name.trim(), icon,
      targetAmount: Number(target),
      savedAmount: Number(saved) || 0,
      monthlyContribution: Number(monthly) || 0,
    });
    onClose();
  }

  return (
        <Modal open={open} onClose={onClose} title={t("goal.modalTitle")}
          description={t("goal.modalDescription")}>
      <div className="space-y-5">
        <div>
          <span className="label">{t("goal.commonGoals")}</span>
          <div className="flex flex-wrap gap-2">
            {GOAL_SUGGESTIONS.map((s) => (
              <button key={s.name}
                      onClick={() => { setName(s.name); setIcon(s.icon); }}
                      aria-pressed={name === s.name}
                      className={name === s.name ? "chip-on" : "chip-off"}>
                <CategoryIcon name={s.icon} size={16} />
                {getDemoDisplayLabel(s.name, prefs.language)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="goal-name" className="label">{t("goal.name")}</label>
          <input id="goal-name" value={name} onChange={(e) => setName(e.target.value)}
                 placeholder={t("goal.namePlaceholder")} className="field" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="goal-target" className="label">{t("goal.targetAmount")}</label>
            <input id="goal-target" inputMode="numeric" value={target}
                   onChange={(e) => setTarget(num(e.target.value))}
                   placeholder="20000" className="field" />
          </div>
          <div>
            <label htmlFor="goal-saved" className="label">{t("goal.alreadySaved")}</label>
            <input id="goal-saved" inputMode="numeric" value={saved}
                   onChange={(e) => setSaved(num(e.target.value))}
                   placeholder="0" className="field" />
          </div>
        </div>

        <div>
          <label htmlFor="goal-monthly" className="label">{t("goal.monthlyAmountQuestion")}</label>
          <input id="goal-monthly" inputMode="numeric" value={monthly}
                 onChange={(e) => setMonthly(num(e.target.value))}
                 placeholder="2000" className="field" />
        </div>

        {preview.valid && (
          <div className="rounded-xl bg-brand-50 border-2 border-brand-100 px-4 py-3">
            <p className="font-semibold">
              {fillTemplate(t("goal.previewProgress"), { value: Math.round(preview.progress) })}
            </p>
            <p className="text-ink-700 mt-0.5">
              {fillTemplate(t("goal.previewRemaining"), { value: rupees(preview.remaining) })}
              {preview.months !== null && preview.months > 0
                ? ` · ${fillTemplate(t("goal.previewPace"), { count: preview.months })}`
                : ""}
            </p>
          </div>
        )}

        {error && (
          <p role="alert" className="rounded-xl bg-expense-soft px-4 py-3 font-semibold text-expense">
            {error}
          </p>
        )}

        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
          <button onClick={onClose} className="btn-secondary">{t("action.cancel")}</button>
          <button onClick={handleSave} className="btn-primary">{t("goal.createGoal")}</button>
        </div>
      </div>
    </Modal>
  );
}
