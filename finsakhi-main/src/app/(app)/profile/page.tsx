"use client";

import { useState } from "react";
import { Check, Mail, Pencil, Target } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { goalProgress } from "@/lib/calculations";
import { rupees } from "@/lib/format";
import { LANGUAGES } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function ProfilePage() {
  const { user, goals, updateUser, prefs } = useStore();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const langLabel = LANGUAGES.find((l) => l.code === prefs.language)?.native ?? "English";

  function save() {
    updateUser({
      name: name.trim() || user.name,
      email: email.trim() || user.email,
      avatarInitials: (name.trim()[0] ?? user.avatarInitials).toUpperCase(),
    });
    setEditing(false);
  }

  return (
    <div>
      <PageHeader title="Your profile" subtitle="Your details and what you're saving for." />

      <section className="card p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-600
                           font-display text-3xl font-extrabold text-white" aria-hidden="true">
            {user.avatarInitials}
          </span>
          <div className="min-w-0">
            <h2 className="font-display text-2xl font-bold truncate">{user.name}</h2>
            <p className="text-ink-700 flex items-center gap-1.5 truncate">
              <Mail size={16} aria-hidden="true" /> {user.email}
            </p>
            <p className="text-ink-500 mt-0.5">Preferred language: {langLabel}</p>
          </div>
        </div>

        {editing ? (
          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="p-name" className="label">Full name</label>
              <input id="p-name" value={name} onChange={(e) => setName(e.target.value)} className="field" />
            </div>
            <div>
              <label htmlFor="p-email" className="label">Email</label>
              <input id="p-email" type="email" value={email}
                     onChange={(e) => setEmail(e.target.value)} className="field" />
            </div>
            <div>
              <span className="label">Preferred language</span>
              <LanguageSelector />
            </div>
            <div className="flex flex-col-reverse sm:flex-row gap-3">
              <button onClick={() => setEditing(false)} className="btn-secondary">Cancel</button>
              <button onClick={save} className="btn-primary">
                <Check size={18} aria-hidden="true" /> Save changes
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => setEditing(true)} className="btn-secondary mt-6">
            <Pencil size={18} aria-hidden="true" /> Edit profile
          </button>
        )}
      </section>

      <section className="card p-5 sm:p-6 mt-6" aria-labelledby="profile-goals">
        <h2 id="profile-goals" className="flex items-center gap-2 font-display text-2xl font-bold">
          <Target size={22} className="text-brand-600" aria-hidden="true" /> What you&apos;re saving for
        </h2>
        {goals.length === 0 ? (
          <p className="text-ink-700 mt-2">You haven&apos;t set a goal yet.</p>
        ) : (
          <ul className="mt-5 space-y-5">
            {goals.map((g) => (
              <li key={g.id}>
                <div className="flex justify-between font-semibold">
                  <span>{g.name}</span>
                  <span className="tabular-nums">
                    {rupees(g.savedAmount)} / {rupees(g.targetAmount)}
                  </span>
                </div>
                <div className="mt-2">
                  <ProgressBar value={goalProgress(g)} tone="gold" label={`${g.name} progress`} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
