import { useStore } from "@/lib/store";
import BlurText from "@/components/ui/BlurText";

export function PageHeader({
  title, subtitle, actions,
}: { title: string; subtitle?: string; actions?: React.ReactNode }) {
  const { t } = useStore();
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4 rounded-3xl border border-brand-100 bg-white/80 p-4 shadow-card sm:p-5">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-brand-700">{t("common.brand")}</p>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
          <BlurText
            key={`page-title-${title}`}
            text={title}
            as="span"
            className="font-inherit"
            delay={70}
            stepDuration={0.3}
          />
        </h1>
        {subtitle && (
          <BlurText
            key={`page-subtitle-${subtitle}`}
            text={subtitle}
            className="mt-1.5 max-w-readable text-base text-ink-700 sm:text-lg"
            delay={45}
            stepDuration={0.3}
          />
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </div>
  );
}
