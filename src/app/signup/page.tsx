"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { ErrorState } from "@/components/ui/States";
import { LANGUAGES } from "@/lib/i18n";
import { signUp } from "@/lib/services/authService";
import { useStore } from "@/lib/store";
import type { Language } from "@/lib/types";

export default function SignupPage() {
  const router = useRouter();
  const { updateUser, setLanguage } = useStore();
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirm: "",
  });
  const [language, setLang] = useState<Language>("en");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.name.trim()) return setError("Enter your name so we know what to call you.");
    if (!form.email.trim()) return setError("Enter your email address.");
    if (form.password.length < 6) return setError("Choose a password with at least 6 characters.");
    if (form.password !== form.confirm) return setError("The two passwords do not match.");

    setBusy(true);
    try {
      const user = await signUp({ ...form, language });
      updateUser(user);
      setLanguage(language);
      router.push("/dashboard");
    } catch {
      setError("Could not create the account. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="It takes less than a minute."
      footer={
        <p className="text-ink-700">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-brand-700 underline underline-offset-4">
            Log in
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="name" className="label">Full name</label>
          <input id="name" value={form.name} onChange={set("name")}
                 autoComplete="name" className="field" placeholder="Lakshmi" />
        </div>
        <div>
          <label htmlFor="email" className="label">Email</label>
          <input id="email" type="email" value={form.email} onChange={set("email")}
                 autoComplete="email" className="field" placeholder="you@example.com" />
        </div>
        <div>
          <label htmlFor="password" className="label">Password</label>
          <input id="password" type="password" value={form.password} onChange={set("password")}
                 autoComplete="new-password" className="field" placeholder="At least 6 characters" />
        </div>
        <div>
          <label htmlFor="confirm" className="label">Confirm password</label>
          <input id="confirm" type="password" value={form.confirm} onChange={set("confirm")}
                 autoComplete="new-password" className="field" />
        </div>

        <fieldset>
          <legend className="label">Which language do you prefer?</legend>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map((l) => (
              <button key={l.code} type="button" onClick={() => setLang(l.code)}
                      aria-pressed={language === l.code}
                      className={language === l.code ? "chip-on" : "chip-off"}>
                {l.native}
              </button>
            ))}
          </div>
        </fieldset>

        {error && <ErrorState message={error} />}

        <button type="submit" disabled={busy} className="btn-primary w-full text-lg">
          {busy ? "Creating account..." : "Create account"}
        </button>
      </form>
    </AuthShell>
  );
}
