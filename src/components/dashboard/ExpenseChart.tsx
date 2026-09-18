"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { getCategory } from "@/lib/categories";
import { getCategoryLabel, getDemoDisplayLabel } from "@/lib/i18n";
import { rupees } from "@/lib/format";
import { useStore } from "@/lib/store";
import type { ExpenseCategoryTotal } from "@/lib/types";

export function ExpenseChart({ data }: { data: ExpenseCategoryTotal[] }) {
  const { t, prefs } = useStore();
  const total = data.reduce((s, c) => s + c.amount, 0);

  if (total === 0) {
    return (
      <section className="card p-6">
        <h2 className="section-title mb-2">{t("label.spending")}</h2>
        <p className="text-ink-700">{t("dashboard.spendingEmpty")}</p>
      </section>
    );
  }

  return (
    <section className="card p-5 sm:p-6" aria-labelledby="spending-heading">
      <h2 id="spending-heading" className="section-title">{t("label.spending")}</h2>
      <p className="text-ink-700 mt-1">{t("dashboard.spendingDescription")}</p>

      <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,260px)_1fr] items-center">
        {!prefs.simpleView && (
          <div className="decorative relative mx-auto h-[240px] w-full max-w-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data} dataKey="amount" nameKey="name"
                  innerRadius="62%" outerRadius="92%" paddingAngle={2}
                  strokeWidth={0} isAnimationActive={false}
                >
                  {data.map((c) => <Cell key={c.id} fill={c.color} />)}
                </Pie>
                <Tooltip
                  formatter={(value: number, name: string) => [rupees(value), getDemoDisplayLabel(name, prefs.language)]}
                  contentStyle={{
                    borderRadius: 12, border: "1px solid #E3E8E6",
                    fontSize: 14, fontWeight: 600,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-sm text-ink-500">{t("common.spentLabel")}</span>
              <span className="font-display text-2xl font-extrabold tabular-nums">
                {rupees(total)}
              </span>
            </div>
          </div>
        )}

        {/* The list is the accessible source of truth - the chart only repeats it. */}
        <ul className="space-y-2.5">
          {data.map((c) => {
            const meta = getCategory(c.id);
            return (
              <li key={c.id} className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${c.color}1A`, color: c.color }}
                >
                  <CategoryIcon name={meta.icon} size={20} />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-semibold truncate">{getCategoryLabel(c.id, prefs.language)}</span>
                  <span className="block h-2 rounded-full bg-cream-200 mt-1.5 overflow-hidden">
                    <span className="block h-full rounded-full"
                          style={{ width: `${c.percentage}%`, backgroundColor: c.color }} />
                  </span>
                </span>
                <span className="text-right shrink-0">
                  <span className="block font-bold tabular-nums">{rupees(c.amount)}</span>
                  <span className="block text-sm text-ink-500 tabular-nums">
                    {Math.round(c.percentage)}%
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
