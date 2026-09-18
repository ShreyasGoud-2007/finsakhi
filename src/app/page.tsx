import Link from "next/link";
import {
  Accessibility, ArrowRight, BookOpen, Bot, PiggyBank, Sparkles,
  Target, Wallet,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { HeroPreview } from "@/components/landing/HeroPreview";

const FEATURES = [
  { icon: Wallet, title: "Understand your money",
    body: "Track what comes in and what goes out, in one simple place." },
  { icon: PiggyBank, title: "Build a budget",
    body: "See where your money goes and make a spending plan you can keep." },
  { icon: Target, title: "Grow your savings",
    body: "Set a goal, put a little aside each month, and watch it fill up." },
  { icon: BookOpen, title: "Learn about money",
    body: "Interest, deposits, loans and insurance — explained in plain words." },
  { icon: Bot, title: "Ask the AI assistant",
    body: "Ask anything about your money in everyday language and get a clear answer." },
  { icon: Accessibility, title: "Made for everyone",
    body: "Large text, clear icons, regional languages and voice input." },
];

const STEPS = [
  { title: "Track your money", body: "Add what you earn and what you spend. It takes seconds." },
  { title: "Understand your spending", body: "See which part of your income goes where." },
  { title: "Set a goal", body: "Emergency fund, school fees, a sewing machine — pick one." },
  { title: "Get AI guidance", body: "Ask questions and get a plan based on your own numbers." },
  { title: "Build the habit", body: "Small amounts, saved regularly, become real security." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cream">
      <header className="sticky top-0 z-40 border-b border-ink-300/20 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <Logo size={38} />
          <nav className="flex items-center gap-2" aria-label="Account">
            <Link href="/login" className="btn-ghost">Log in</Link>
            <Link href="/signup" className="btn-primary">Get started</Link>
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
              Built for women and families managing money on their own
            </p>

            <h1 className="mt-5 font-display text-[2.7rem] leading-[1.05] sm:text-6xl font-extrabold tracking-tight">
              Your money.<br />Your future.<br />Your confidence.
            </h1>

            <p className="mt-5 max-w-readable text-lg text-ink-700 leading-relaxed">
              FinSakhi is simple AI-powered financial guidance. It helps you understand
              your money, build better habits, and plan for what comes next — in language
              that makes sense.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/signup" className="btn-primary text-lg px-7">
                Get started <ArrowRight size={20} aria-hidden="true" />
              </Link>
              <Link href="/assistant" className="btn-secondary text-lg px-7">
                <Bot size={20} aria-hidden="true" /> Talk to AI
              </Link>
            </div>

            <p className="mt-5 text-ink-500">
              Free to use · English, తెలుగు, हिन्दी · Works on any phone
            </p>
          </div>

          <HeroPreview />
        </section>

        {/* Features */}
        <section className="bg-white border-y border-ink-300/20 py-16" aria-labelledby="features-heading">
          <div className="mx-auto max-w-6xl px-5">
            <h2 id="features-heading" className="section-title max-w-readable">
              Everything you need to take charge of your money
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
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
            <h2 id="how-heading" className="section-title">How FinSakhi works</h2>
            <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {STEPS.map((s, i) => (
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
              Start your financial journey
            </h2>
            <p className="mt-3 text-brand-100 text-lg max-w-readable mx-auto">
              Your first expense takes ten seconds to add. Your first goal takes a minute to set.
            </p>
            <Link href="/signup"
                  className="btn mt-7 bg-white text-brand-700 hover:bg-brand-50 text-lg px-8">
              Create your free account <ArrowRight size={20} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink-300/20 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <Logo size={36} showTagline />
            <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-2 font-medium text-ink-700">
              <Link href="/" className="hover:text-brand-700">About</Link>
              <Link href="/#features-heading" className="hover:text-brand-700">Features</Link>
              <Link href="/settings" className="hover:text-brand-700">Privacy</Link>
              <Link href="/learn" className="hover:text-brand-700">Learn</Link>
            </nav>
          </div>
          <p className="mt-8 max-w-readable text-sm text-ink-500 leading-relaxed">
            FinSakhi provides educational and budgeting guidance. It does not provide
            guaranteed financial returns and does not replace professional financial advice.
            We are not a bank and we do not hold your money.
          </p>
          <p className="mt-4 text-sm text-ink-500">© {new Date().getFullYear()} FinSakhi</p>
        </div>
      </footer>
    </div>
  );
}
