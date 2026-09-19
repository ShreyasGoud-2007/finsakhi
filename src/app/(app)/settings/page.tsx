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
        <span className="sr-only">{checked ? "On" : "Off"}</span>
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
  const { prefs, setPrefs } = useStore();

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  return (
    <div>
      <PageHeader title="Settings" subtitle="Make FinSakhi work the way you need it to." />

      <div className="space-y-5">
        <Section icon={Languages} title="Language">
          <p className="text-ink-700 mb-3">Choose the language for buttons and menus.</p>
          <LanguageSelector />
        </Section>

        <Section icon={Bell} title="Reminders">
          <div className="divide-y divide-ink-300/25">
            <Toggle id="n-budget" label="Budget alerts"
                    description="Tell me when I am spending faster than usual."
                    checked={prefs.notifications.budget}
                    onChange={(v) => setPrefs({ notifications: { ...prefs.notifications, budget: v } })} />
            <Toggle id="n-savings" label="Savings reminders"
                    description="Remind me to put money aside each month."
                    checked={prefs.notifications.savings}
                    onChange={(v) => setPrefs({ notifications: { ...prefs.notifications, savings: v } })} />
            <Toggle id="n-learning" label="Learning reminders"
                    description="Send me one money topic each week."
                    checked={prefs.notifications.learning}
                    onChange={(v) => setPrefs({ notifications: { ...prefs.notifications, learning: v } })} />
          </div>
        </Section>

        <Section icon={Type} title="Reading and display">
          <div className="divide-y divide-ink-300/25">
            <Toggle id="a-text" label="Larger text"
                    description="Increase the text size everywhere in the app."
                    checked={prefs.largeText}
                    onChange={(v) => setPrefs({ largeText: v })} />
            <Toggle id="a-simple" label="Simple view"
                    description="Hide charts and extra decoration. Show only the numbers and lists."
                    checked={prefs.simpleView}
                    onChange={(v) => setPrefs({ simpleView: v })} />
          </div>
        </Section>

        <Section icon={ShieldCheck} title="Privacy">
          <div className="space-y-3 text-ink-700 max-w-readable leading-relaxed">
            <p>
              Your financial information is used to personalise your experience — your
              dashboard, your goals and the answers from FinSakhi AI.
            </p>
            <p>
              FinSakhi is not a bank and does not hold or move your money. We never ask for
              your bank PIN, UPI PIN or OTP. No one from FinSakhi will ever ask for them either.
            </p>
            <p>
              In this demo build, your entries are stored in this browser only.
            </p>
          </div>
        </Section>

        <Section icon={Eye} title="Account">
          <button onClick={handleLogout} className="btn-secondary !text-expense !border-expense/30">
            <LogOut size={18} aria-hidden="true" /> Log out
          </button>
        </Section>
      </div>
    </div>
  );
}
