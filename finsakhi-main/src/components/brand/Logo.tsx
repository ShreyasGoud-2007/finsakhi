import { IndianRupee, Sparkles } from "lucide-react";

/** Icon-only mark: a rupee inside a shield-ish rounded wallet, with an AI spark. */
export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <span
      className="relative inline-flex items-center justify-center rounded-xl bg-brand-600 text-white shrink-0"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <IndianRupee size={size * 0.5} strokeWidth={2.6} />
      <Sparkles
        size={size * 0.34}
        className="absolute -top-1 -right-1 text-gold"
        fill="currentColor"
        strokeWidth={1.5}
      />
    </span>
  );
}

export function Logo({
  size = 40, showTagline = false,
}: { size?: number; showTagline?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark size={size} />
      <span className="leading-tight">
        <span className="block font-display font-extrabold tracking-tight text-ink-900"
              style={{ fontSize: size * 0.55 }}>
          Fin<span className="text-brand-600">Sakhi</span>
        </span>
        {showTagline && (
          <span className="block text-xs text-ink-500">Your money, made simple</span>
        )}
      </span>
    </span>
  );
}
