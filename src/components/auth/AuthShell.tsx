import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useStore } from "@/lib/store";

export function AuthShell({
  title, subtitle, children, footer,
}: {
  title: string; subtitle: string;
  children: React.ReactNode; footer: React.ReactNode;
}) {
  const { t } = useStore();
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <header className="px-5 py-5">
        <Link href="/" aria-label={t("common.home")}><Logo size={38} /></Link>
      </header>

      <main id="main" className="flex-1 px-5 pb-12 flex items-start sm:items-center justify-center">
        <div className="w-full max-w-md">
          <div className="card p-6 sm:p-8">
            <h1 className="font-display text-3xl font-extrabold tracking-tight">{title}</h1>
            <p className="text-ink-700 mt-1.5">{subtitle}</p>
            <div className="mt-6">{children}</div>
          </div>
          <div className="mt-5 text-center">{footer}</div>
          <p className="mt-6 flex items-start gap-2 text-sm text-ink-500 leading-relaxed">
            <ShieldCheck size={18} className="shrink-0 mt-0.5" aria-hidden="true" />
            {t("common.personalisedPrivacyNote")}
          </p>
        </div>
      </main>
    </div>
  );
}
