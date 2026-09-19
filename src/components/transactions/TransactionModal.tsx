"use client";

import { useEffect, useState } from "react";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { Modal } from "@/components/ui/Modal";
import { CATEGORIES } from "@/lib/categories";
import { getCategoryLabel } from "@/lib/i18n";
import { today } from "@/lib/format";
import { useStore } from "@/lib/store";
import type { CategoryId, Transaction } from "@/lib/types";

export function TransactionModal({
  open, onClose, defaultType = "expense",
}: { open: boolean; onClose: () => void; defaultType?: Transaction["type"] }) {
  const { addTransaction, t, prefs } = useStore();
  const [type, setType] = useState<Transaction["type"]>(defaultType);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<CategoryId>("food");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(today());
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setType(defaultType);
    setAmount(""); setDescription(""); setDate(today());
    setCategory(defaultType === "income" ? "income" : "food");
    setError(null);
  }, [open, defaultType]);

  const choose = (next: Transaction["type"]) => {
    setType(next);
    setCategory(next === "income" ? "income" : "food");
  };

  async function handleSave() {
    const value = Number(amount);
    if (!amount || Number.isNaN(value) || value <= 0) {
      setError(t("transactions.amountRequired"));
      return;
    }
    setSaving(true);
    try {
      await addTransaction({
        type, amount: value, category,
        description: description.trim() || (type === "income" ? "Income" : "Expense"),
        date,
      });
      onClose();
    } catch {
      setError(t("transactions.saveError"));
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      open={open} onClose={onClose}
      title={type === "income" ? t("action.addIncome") : t("action.addExpense")}
      description={t("transactions.modalDescription")}
    >
      <div className="space-y-5">
        <fieldset>
          <legend className="label">{t("transactions.whatIsThis")}</legend>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => choose("income")} aria-pressed={type === "income"}
              className={`btn ${type === "income"
                ? "bg-income text-white" : "bg-white border-2 border-ink-300/40 text-ink-700"}`}>
              {t("common.incomeReceived")}
            </button>
            <button onClick={() => choose("expense")} aria-pressed={type === "expense"}
              className={`btn ${type === "expense"
                ? "bg-expense text-white" : "bg-white border-2 border-ink-300/40 text-ink-700"}`}>
              {t("common.incomeSpent")}
            </button>
          </div>
        </fieldset>

        <div>
          <label htmlFor="tx-amount" className="label">{t("label.amount")}</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-ink-500"
                  aria-hidden="true">₹</span>
            <input
              id="tx-amount" inputMode="numeric" autoFocus
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
              placeholder="0"
              className="field !pl-10 !text-2xl !font-bold"
            />
          </div>
        </div>

        {type === "expense" && (
          <fieldset>
            <legend className="label">{t("transactions.whatSpentOn")}</legend>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CATEGORIES.map((c) => (
                <button key={c.id} onClick={() => setCategory(c.id)}
                  aria-pressed={category === c.id}
                  className={`flex items-center gap-2 rounded-xl border-2 px-3 py-3 font-semibold text-sm
                    ${category === c.id
                      ? "border-brand-600 bg-brand-50 text-brand-700"
                      : "border-ink-300/40 text-ink-700 hover:border-brand-300"}`}>
                  <CategoryIcon name={c.icon} size={18} />
                  {getCategoryLabel(c.id, prefs.language)}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <div>
          <label htmlFor="tx-desc" className="label">{t("transactions.note")} <span className="font-normal text-ink-500">({t("label.optional")})</span></label>
          <input id="tx-desc" value={description} onChange={(e) => setDescription(e.target.value)}
                 placeholder={t("transactions.notePlaceholder")} className="field" />
        </div>

        <div>
          <label htmlFor="tx-date" className="label">{t("label.date")}</label>
          <input id="tx-date" type="date" value={date}
                 onChange={(e) => setDate(e.target.value)} className="field" />
        </div>

        {error && (
          <p role="alert" className="rounded-xl bg-expense-soft px-4 py-3 font-semibold text-expense">
            {error}
          </p>
        )}

        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end pt-1">
          <button onClick={onClose} className="btn-secondary">{t("action.cancel")}</button>
          <button onClick={handleSave} disabled={saving} className="btn-primary">
            {saving ? t("transactions.saving") : t("transactions.saveTransaction")}
          </button>
        </div>
      </div>
    </Modal>
  );
}
