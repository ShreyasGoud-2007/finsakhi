"use client";

import Link from "next/link";
import {
  Accessibility, ArrowRight, BookOpen, Bot, PiggyBank, Sparkles,
  Target, Wallet,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { HeroPreview } from "@/components/landing/HeroPreview";
import { useStore } from "@/lib/store";

export default function LandingPage() {
  const { t } = useStore();
  const features = [
    { icon: Wallet, title: t("landing.featureMoney"), body: t("landing.featureMoneyBody") },
    { icon: PiggyBank, title: t("landing.featureBudget"), body: t("landing.featureBudgetBody") },
    { icon: Target, title: t("landing.featureSavings"), body: t("landing.featureSavingsBody") },
    { icon: BookOpen, title: t("landing.featureLearn"), body: t("landing.featureLearnBody") },
    { icon: Bot, title: t("landing.featureAssistant"), body: t("landing.featureAssistantBody") },
    { icon: Accessibility, title: t("landing.featureEveryone"), body: t("landing.featureEveryoneBody") },
  ];
  const steps = [1, 2, 3, 4, 5].map((id) => ({ title: t(`landing.step${id}` as any), body: t(`landing.step${id}Body` as any) }));
  return (
    <div className="min-h-screen bg-cream">
      <header className="sticky top-0 z-40 border-b border-ink-300/20 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <Logo size={38} />
          <nav className="flex items-center gap-2" aria-label={t("landing.account")}>
            <Link href="/login" className="btn-ghost">{t("landing.login")}</Link>
            <Link href="/signup" className="btn-primary">{t("landing.getStarted")}</Link>
          </nav>
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-5 pt-12 pb-16 lg:pt-20 grid gap-12 lg:grid-cols-[1.05fr_1fr] items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-brand-50 border border-brand-200
                          px-4 py-2 text-sm font-semibold text-brand-700">
              <Sparkles size={16} aria-hidden="true" />
              {t("landing.heroBadge")}
            </p>

            <h1 className="mt-5 font-display text-[2.7rem] leading-[1.05] sm:text-6xl font-extrabold tracking-tight">
              {t("landing.heroTitle")}
            </h1>

            <p className="mt-5 max-w-readable text-lg text-ink-700 leading-relaxed">
              {t("landing.heroDescription")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/signup" className="btn-primary text-lg px-7">
                {t("landing.getStarted")} <ArrowRight size={20} aria-hidden="true" />
              </Link>
              <Link href="/assistant" className="btn-secondary text-lg px-7">
                <Bot size={20} aria-hidden="true" /> {t("landing.talkToAI")}
              </Link>
            </div>

            <p className="mt-5 text-ink-500">
              {t("landing.freeNote")}
            </p>
          </div>

          <HeroPreview />
        </section>

        {/* Features */}
        <section className="bg-white border-y border-ink-300/20 py-16" aria-labelledby="features-heading">
          <div className="mx-auto max-w-6xl px-5">
            <h2 id="features-heading" className="section-title max-w-readable">
              {t("landing.featuresHeading")}
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <div key={f.title} className="rounded-2xl border border-ink-300/25 p-5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <f.icon size={24} aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-xl font-bold mt-4">{f.title}</h3>
                  <p className="text-ink-700 mt-1.5">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works - genuinely a sequence, so it is numbered */}
        <section className="py-16" aria-labelledby="how-heading">
          <div className="mx-auto max-w-6xl px-5">
            <h2 id="how-heading" className="section-title">{t("landing.howItWorks")}</h2>
            <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {steps.map((s, i) => (
                <li key={s.title} className="relative rounded-2xl bg-white border border-ink-300/25 p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full
                                   bg-brand-600 font-display font-bold text-white">
                    {i + 1}
                  </span>
                  <h3 className="font-display text-lg font-bold mt-3">{s.title}</h3>
                  <p className="text-ink-700 mt-1 text-[0.97rem]">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-5 pb-16">
          <div className="rounded-3xl bg-brand-700 px-6 py-12 sm:px-12 text-center text-white">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold">
              {t("landing.ctaTitle")}
            </h2>
            <p className="mt-3 text-brand-100 text-lg max-w-readable mx-auto">
              {t("landing.ctaBody")}
            </p>
            <Link href="/signup"
                  className="btn mt-7 bg-white text-brand-700 hover:bg-brand-50 text-lg px-8">
              {t("landing.createAccount")} <ArrowRight size={20} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink-300/20 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <Logo size={36} showTagline />
            <nav aria-label={t("common.footer")} className="flex flex-wrap gap-x-7 gap-y-2 font-medium text-ink-700">
              <Link href="/" className="hover:text-brand-700">{t("landing.about")}</Link>
              <Link href="/#features-heading" className="hover:text-brand-700">{t("landing.features")}</Link>
              <Link href="/settings" className="hover:text-brand-700">{t("landing.privacy")}</Link>
              <Link href="/learn" className="hover:text-brand-700">{t("nav.learn")}</Link>
            </nav>
          </div>
          <p className="mt-8 max-w-readable text-sm text-ink-500 leading-relaxed">
            {t("landing.footerDisclaimer")}
          </p>
          <p className="mt-4 text-sm text-ink-500">© {new Date().getFullYear()} FinSakhi</p>
        </div>
      </footer>
    </div>
  );
}
