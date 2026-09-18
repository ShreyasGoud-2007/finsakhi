export function ProgressBar({
  value, label, tone = "brand",
}: { value: number; label?: string; tone?: "brand" | "gold" | "income" }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  const fill = tone === "gold" ? "bg-gold" : tone === "income" ? "bg-income" : "bg-brand-600";
  return (
    <div>
      <div
        className="h-3.5 w-full rounded-full bg-brand-50 overflow-hidden"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? `${pct}% complete`}
      >
        <div className={`h-full rounded-full ${fill}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
