import { ArrowDownCircle, ArrowUpCircle, Sparkles, Wallet } from "lucide-react";

/** Static dashboard mockup for the hero. Pure markup - no chart library on the landing page. */
export function HeroPreview() {
  const slices = [
    { label: "Food", pct: 41, color: "#C6462E" },
    { label: "Education", pct: 27, color: "#2F6DB0" },
    { label: "Transport", pct: 14, color: "#1E8C79" },
    { label: "Household", pct: 12, color: "#C98A1E" },
    { label: "Health", pct: 6, color: "#9B4D8E" },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[400px]" aria-hidden="true">
      <div className="rounded-3xl border border-ink-300/25 bg-white p-5 shadow-lift">
        <p className="font-display text-lg font-bold">Good morning, Lakshmi</p>
        <p className="text-sm text-ink-500">Here&apos;s a simple view of your money.</p>

        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {[
            { icon: ArrowUpCircle, label: "In", value: "₹15,000", cls: "bg-income-soft text-income" },
            { icon: ArrowDownCircle, label: "Out", value: "₹8,500", cls: "bg-expense-soft text-expense" },
            { icon: Wallet, label: "Left", value: "₹6,500", cls: "bg-brand-50 text-brand-700" },
          ].map((c) => (
            <div key={c.label} className={`rounded-xl p-2.5 ${c.cls}`}>
              <c.icon size={18} />
              <p className="mt-1.5 text-[11px] font-semibold opacity-80">{c.label}</p>
              <p className="font-display text-base font-extrabold leading-tight">{c.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-2xl border border-ink-300/20 p-4">
          <p className="text-sm font-semibold text-ink-700">Where your money went</p>
          <div className="mt-3 flex h-3 overflow-hidden rounded-full">
            {slices.map((s) => (
              <span key={s.label} style={{ width: `${s.pct}%`, backgroundColor: s.color }} />
            ))}
          </div>
          <ul className="mt-3 space-y-1.5 text-sm">
            {slices.slice(0, 3).map((s) => (
              <li key={s.label} className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="flex-1 text-ink-700">{s.label}</span>
                <span className="font-semibold tabular-nums">{s.pct}%</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 rounded-2xl border-2 border-brand-200 bg-brand-50 p-4">
          <p className="flex items-center gap-2 text-sm font-bold text-brand-700">
            <Sparkles size={16} /> Your AI insight
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-900">
            Food is your biggest spend at ₹3,000. Setting aside ₹2,000 on salary day
            reaches your ₹20,000 goal in 8 months.
          </p>
        </div>
      </div>

      <div className="decorative absolute -bottom-5 -left-4 hidden sm:block rounded-2xl
                      border border-ink-300/25 bg-white px-4 py-3 shadow-card">
        <p className="text-xs font-semibold text-ink-500">Emergency Fund</p>
        <p className="font-display text-lg font-extrabold">₹5,000 / ₹20,000</p>
        <span className="mt-1.5 block h-2 w-36 rounded-full bg-brand-50">
          <span className="block h-full w-1/4 rounded-full bg-gold" />
        </span>
      </div>
    </div>
  );
}
