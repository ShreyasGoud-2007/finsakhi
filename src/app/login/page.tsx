"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { ErrorState } from "@/components/ui/States";
import { login, loginWithGoogle } from "@/lib/services/authService";
import { useStore } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const { updateUser, t } = useStore();
  const [email, setEmail] = useState("lakshmi@example.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email.trim()) return setError(t("auth.emailRequired"));
    setBusy(true);
    try {
      updateUser(await login(email, password));
      router.push("/dashboard");
    } catch {
      setError(t("auth.loginError"));
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setError(null);
    try {
      updateUser(await loginWithGoogle());
      router.push("/dashboard");
    } catch {
      setError(t("auth.googleUnavailable"));
    }
  }

  return (
    <AuthShell
      title={t("auth.loginTitle")}
      subtitle={t("auth.loginSubtitle")}
      footer={
        <p className="text-ink-700">
          {t("auth.noAccount")} {" "}
          <Link href="/signup" className="font-semibold text-brand-700 underline underline-offset-4">
            {t("auth.createAccount")}
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="email" className="label">{t("label.email")}</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                 autoComplete="email" className="field" />
        </div>
        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="password" className="label">{t("label.password")}</label>
            <Link href="/login" className="text-sm font-semibold text-brand-700 underline underline-offset-4">
              {t("auth.forgotPassword")}
            </Link>
          </div>
          <input id="password" type="password" value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 autoComplete="current-password" className="field" />
        </div>

        {error && <ErrorState message={error} />}

        <button type="submit" disabled={busy} className="btn-primary w-full text-lg">
          {busy ? t("auth.loggingIn") : t("auth.login")}
        </button>

        <div className="flex items-center gap-3 py-1">
          <span className="h-px flex-1 bg-ink-300/40" />
          <span className="text-sm text-ink-500">{t("auth.or")}</span>
          <span className="h-px flex-1 bg-ink-300/40" />
        </div>

        <button type="button" onClick={handleGoogle} className="btn-secondary w-full">
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8Z"/>
            <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1A12 12 0 0 0 12 24Z"/>
            <path fill="#FBBC05" d="M5.4 14.4a7.2 7.2 0 0 1 0-4.6V6.7H1.4a12 12 0 0 0 0 10.7l4-3Z"/>
            <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.4 6.7l4 3.1C6.3 6.9 8.9 4.8 12 4.8Z"/>
          </svg>
          {t("auth.continueGoogle")}
        </button>
      </form>
    </AuthShell>
  );
}
