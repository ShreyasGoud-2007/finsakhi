"use client";

import { useRouter } from "next/navigation";
import { Bell, Eye, Languages, LogOut, ShieldCheck, Type } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { logout } from "@/lib/services/authService";
import { useStore } from "@/lib/store";

function Toggle({
  id, label, description, checked, onChange,
}: {
  id: string; label: string; description?: string;
  checked: boolean; onChange: (v: boolean) => void;
}) {
  const { t } = useStore();
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="min-w-0">
        <label htmlFor={id} className="font-semibold cursor-pointer">{label}</label>
        {description && <p className="text-sm text-ink-500 mt-0.5">{description}</p>}
      </div>
      <button
        id={id} role="switch" aria-checked={checked} aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-8 w-14 shrink-0 rounded-full transition-colors
          ${checked ? "bg-brand-600" : "bg-ink-300/60"}`}
      >
        <span className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-all
          ${checked ? "left-7" : "left-1"}`} />
        <span className="sr-only">{checked ? t("settings.on") : t("settings.off")}</span>
      </button>
    </div>
  );
}

function Section({
  icon: Icon, title, children,
}: { icon: typeof Bell; title: string; children: React.ReactNode }) {
  return (
    <section className="card p-5 sm:p-6">
      <h2 className="flex items-center gap-2 font-display text-xl font-bold">
        <Icon size={21} className="text-brand-600" aria-hidden="true" /> {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const { prefs, setPrefs, t } = useStore();

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  return (
    <div>
      <PageHeader title={t("settings.pageTitle")} subtitle={t("settings.subtitle")} />

      <div className="space-y-5">
        <Section icon={Languages} title={t("settings.language")}>
          <p className="text-ink-700 mb-3">{t("settings.languageHelp")}</p>
          <LanguageSelector />
        </Section>

        <Section icon={Bell} title={t("settings.reminders")}>
          <div className="divide-y divide-ink-300/25">
                <Toggle id="n-budget" label={t("settings.budgetAlerts")}
                  description={t("settings.budgetAlertsDesc")}
                    checked={prefs.notifications.budget}
                    onChange={(v) => setPrefs({ notifications: { ...prefs.notifications, budget: v } })} />
                <Toggle id="n-savings" label={t("settings.savingsReminders")}
                  description={t("settings.savingsRemindersDesc")}
                    checked={prefs.notifications.savings}
                    onChange={(v) => setPrefs({ notifications: { ...prefs.notifications, savings: v } })} />
                <Toggle id="n-learning" label={t("settings.learningReminders")}
                  description={t("settings.learningRemindersDesc")}
                    checked={prefs.notifications.learning}
                    onChange={(v) => setPrefs({ notifications: { ...prefs.notifications, learning: v } })} />
          </div>
        </Section>

        <Section icon={Type} title={t("settings.readingAndDisplay")}>
          <div className="divide-y divide-ink-300/25">
                <Toggle id="a-text" label={t("settings.largerText")}
                  description={t("settings.largerTextDesc")}
                    checked={prefs.largeText}
                    onChange={(v) => setPrefs({ largeText: v })} />
                <Toggle id="a-simple" label={t("settings.simpleView")}
                  description={t("settings.simpleViewDesc")}
                    checked={prefs.simpleView}
                    onChange={(v) => setPrefs({ simpleView: v })} />
          </div>
        </Section>

        <Section icon={ShieldCheck} title={t("label.privacy")}>
          <div className="space-y-3 text-ink-700 max-w-readable leading-relaxed">
            <p>
              {t("settings.privacyIntroOne")}
            </p>
            <p>
              {t("settings.privacyIntroTwo")}
            </p>
            <p>
              {t("settings.privacyIntroThree")}
            </p>
          </div>
        </Section>

        <Section icon={Eye} title={t("settings.account")}>
          <button onClick={handleLogout} className="btn-secondary !text-expense !border-expense/30">
            <LogOut size={18} aria-hidden="true" /> {t("action.logout")}
          </button>
        </Section>
      </div>
    </div>
  );
}
