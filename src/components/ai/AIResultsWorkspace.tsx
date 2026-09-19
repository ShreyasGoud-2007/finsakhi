"use client";

import { FormEvent, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  CircleAlert,
  Landmark,
  LineChart,
  Loader2,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Target,
  Tags,
} from "lucide-react";
type Result = Record<string, unknown>;

const inputClass = "field";

function asNumber(value: FormDataEntryValue | null, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function ResultValue({ value }: { value: unknown }) {
  if (value === null || value === undefined || value === "") return <span className="text-ink-500">Not provided</span>;
  if (typeof value === "boolean") return <span>{value ? "Yes" : "No"}</span>;
  if (typeof value === "number") return <span className="tabular-nums">{value.toLocaleString("en-IN")}</span>;
  if (typeof value === "string") return <span>{value}</span>;
  if (Array.isArray(value)) {
    return (
      <div className="mt-2 space-y-2">
        {value.map((item, index) => (
          <div key={index} className="rounded-xl bg-cream px-3 py-3 text-sm">
            {typeof item === "object" && item !== null ? <ResultObject value={item as Result} /> : <ResultValue value={item} />}
          </div>
        ))}
      </div>
    );
  }
  if (typeof value === "object") return <ResultObject value={value as Result} />;
  return <span>{String(value)}</span>;
}

function ResultObject({ value }: { value: Result }) {
  return (
    <dl className="space-y-2">
      {Object.entries(value).map(([key, entry]) => (
        <div key={key} className="grid gap-1 sm:grid-cols-[minmax(130px,.6fr)_1.4fr] sm:gap-3">
          <dt className="text-sm font-semibold capitalize text-ink-500">{key.replaceAll("_", " ")}</dt>
          <dd className="min-w-0 text-sm text-ink-900"><ResultValue value={entry} /></dd>
        </div>
      ))}
    </dl>
  );
}

function ResultPanel({ result }: { result: Result }) {
  return (
    <div className="mt-5 rounded-2xl border border-brand-200 bg-brand-50/60 p-4 sm:p-5">
      <div className="mb-3 flex items-center gap-2 text-brand-800">
        <CheckCircle2 size={18} aria-hidden="true" />
        <h3 className="font-display text-lg font-bold">Latest result</h3>
      </div>
      <ResultObject value={result} />
    </div>
  );
}

function ToolCard({
  icon: Icon,
  title,
  description,
  children,
  onSubmit,
  loading,
  result,
  error,
}: {
  icon: typeof Sparkles;
  title: string;
  description: string;
  children: React.ReactNode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  result?: Result;
  error?: string;
}) {
  return (
    <section className="card p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
          <Icon size={22} aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-display text-xl font-bold">{title}</h2>
          <p className="mt-1 text-sm leading-relaxed text-ink-700">{description}</p>
        </div>
      </div>
      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        {children}
        <button className="btn-primary w-full sm:w-auto" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" size={18} aria-hidden="true" /> : <ArrowRight size={18} aria-hidden="true" />}
          {loading ? "Working..." : "View result"}
        </button>
      </form>
      {error && <p className="mt-4 flex items-start gap-2 rounded-xl bg-expense-soft p-3 text-sm font-semibold text-expense"><CircleAlert size={18} className="shrink-0" />{error}</p>}
      {result && <ResultPanel result={result} />}
    </section>
  );
}

export function AIResultsWorkspace() {
  const [results, setResults] = useState<Record<string, Result>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<string | null>(null);

  async function run(key: string, path: string, payload: Result) {
    setLoading(key);
    setErrors((current) => ({ ...current, [key]: "" }));
    try {
      const response = await fetch(`/api/ai-service/${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail ?? data.error ?? "Could not get a result.");
      setResults((current) => ({ ...current, [key]: data }));
    } catch (error) {
      setErrors((current) => ({ ...current, [key]: error instanceof Error ? error.message : "Could not get a result." }));
    } finally {
      setLoading(null);
    }
  }

  const submit = (key: string, path: string, fields: (data: FormData) => Result) => (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    run(key, path, fields(new FormData(event.currentTarget)));
  };

  return (
    <div className="space-y-6">
      <header className="relative overflow-hidden rounded-3xl bg-brand-800 p-6 text-white shadow-lift sm:p-8">
        <div className="relative z-10 max-w-2xl">
          <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[.12em] text-brand-200"><Sparkles size={16} /> FinSakhi AI studio</p>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-5xl">Your money, explained clearly.</h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-brand-100 sm:text-lg">Run the finance tools in one place and see the complete output from your FastAPI service in a calm, readable format.</p>
        </div>
        <div className="absolute -right-12 -top-16 h-56 w-56 rounded-full border-[28px] border-gold/70" aria-hidden="true" />
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <ToolCard icon={BarChart3} title="Finance summary" description="See income, expenses, balance, savings rate, categories, and goal progress together." loading={loading === "finance"} result={results.finance} error={errors.finance} onSubmit={submit("finance", "calculate-finance", (data) => ({ income: asNumber(data.get("income")), expenses: asNumber(data.get("expenses")), categories: { food: asNumber(data.get("food")), travel: asNumber(data.get("travel")), other: asNumber(data.get("other")) }, goal: { target: asNumber(data.get("target")), current: asNumber(data.get("current")), monthly_contribution: asNumber(data.get("monthly_contribution")) } }))}>
          <div className="grid gap-4 sm:grid-cols-2"><label className="label">Monthly income<input className={inputClass} name="income" type="number" min="0" defaultValue="25000" required /></label><label className="label">Monthly expenses<input className={inputClass} name="expenses" type="number" min="0" defaultValue="15000" required /></label></div>
          <div className="grid gap-4 sm:grid-cols-3"><label className="label">Food<input className={inputClass} name="food" type="number" min="0" defaultValue="6000" /></label><label className="label">Travel<input className={inputClass} name="travel" type="number" min="0" defaultValue="2500" /></label><label className="label">Other<input className={inputClass} name="other" type="number" min="0" defaultValue="6500" /></label></div>
          <div className="grid gap-4 sm:grid-cols-3"><label className="label">Goal target<input className={inputClass} name="target" type="number" min="0" defaultValue="50000" /></label><label className="label">Saved so far<input className={inputClass} name="current" type="number" min="0" defaultValue="10000" /></label><label className="label">Monthly saving<input className={inputClass} name="monthly_contribution" type="number" min="0" defaultValue="5000" /></label></div>
        </ToolCard>

        <ToolCard icon={Tags} title="Transaction category" description="Use the trained model to classify a transaction and inspect its confidence." loading={loading === "category"} result={results.category} error={errors.category} onSubmit={submit("category", "predict-category", (data) => ({ description: String(data.get("description") ?? "") }))}>
          <label className="label">Transaction description<input className={inputClass} name="description" defaultValue="Bought groceries from local market" required /></label>
        </ToolCard>

        <ToolCard icon={MessageCircle} title="Ask FinSakhi AI" description="Send a question with a small financial context and display the language-aware answer." loading={loading === "chat"} result={results.chat} error={errors.chat} onSubmit={submit("chat", "chat", (data) => ({ message: String(data.get("message") ?? ""), language: "en", financial_context: { income: 25000, expenses: 15000, balance: 10000 } }))}>
          <label className="label">Your question<textarea className={`${inputClass} min-h-24`} name="message" defaultValue="How can I save more each month?" required /></label>
        </ToolCard>

        <ToolCard icon={LineChart} title="SIP calculator" description="Explore the illustrative future value, invested amount, and estimated returns." loading={loading === "sip"} result={results.sip} error={errors.sip} onSubmit={submit("sip", "calculate-sip", (data) => ({ monthly_investment: asNumber(data.get("monthly_investment")), annual_return: asNumber(data.get("annual_return")), years: asNumber(data.get("years"), 5) }))}>
          <div className="grid gap-4 sm:grid-cols-3"><label className="label">Monthly SIP<input className={inputClass} name="monthly_investment" type="number" min="1" defaultValue="3000" required /></label><label className="label">Annual return %<input className={inputClass} name="annual_return" type="number" min="0" defaultValue="10" required /></label><label className="label">Years<input className={inputClass} name="years" type="number" min="1" defaultValue="5" required /></label></div>
        </ToolCard>

        <ToolCard icon={Target} title="Goal-based SIP" description="Estimate the monthly SIP needed to reach a target, with the full calculation output." loading={loading === "goalSip"} result={results.goalSip} error={errors.goalSip} onSubmit={submit("goalSip", "calculate-goal-sip", (data) => ({ goal_amount: asNumber(data.get("goal_amount")), current_savings: asNumber(data.get("current_savings")), years: asNumber(data.get("years"), 5), annual_return: asNumber(data.get("annual_return")) }))}>
          <div className="grid gap-4 sm:grid-cols-2"><label className="label">Goal amount<input className={inputClass} name="goal_amount" type="number" min="1" defaultValue="100000" required /></label><label className="label">Current savings<input className={inputClass} name="current_savings" type="number" min="0" defaultValue="20000" required /></label><label className="label">Years<input className={inputClass} name="years" type="number" min="1" defaultValue="3" required /></label><label className="label">Annual return %<input className={inputClass} name="annual_return" type="number" min="0" defaultValue="10" required /></label></div>
        </ToolCard>

        <ToolCard icon={ShieldCheck} title="Risk profile" description="Answer four simple questions to receive the educational risk assessment output." loading={loading === "risk"} result={results.risk} error={errors.risk} onSubmit={submit("risk", "risk-assessment", (data) => ({ investment_horizon: asNumber(data.get("investment_horizon"), 5), loss_reaction: String(data.get("loss_reaction")), liquidity_need: String(data.get("liquidity_need")), growth_preference: String(data.get("growth_preference")), language: "en" }))}>
          <div className="grid gap-4 sm:grid-cols-2"><label className="label">Investment horizon<select className={inputClass} name="investment_horizon" defaultValue="5"><option value="2">Less than 3 years</option><option value="5">3 to 7 years</option><option value="10">More than 7 years</option></select></label><label className="label">If investments fall<select className={inputClass} name="loss_reaction" defaultValue="wait"><option>sell immediately</option><option>wait</option><option>stay invested</option></select></label><label className="label">Need this money<select className={inputClass} name="liquidity_need" defaultValue="may need"><option>need soon</option><option>may need</option><option>do not need soon</option></select></label><label className="label">Preference<select className={inputClass} name="growth_preference" defaultValue="balanced"><option>protect money</option><option>balanced</option><option>higher growth</option></select></label></div>
        </ToolCard>

        <ToolCard icon={Landmark} title="Government schemes" description="Search the verified scheme knowledge base and view every matching scheme field." loading={loading === "schemes"} result={results.schemes} error={errors.schemes} onSubmit={submit("schemes", "recommend-schemes", (data) => ({ query: String(data.get("query") ?? ""), top_k: 5 }))}>
          <label className="label">What are you looking for?<input className={inputClass} name="query" defaultValue="loan for women starting a small food business" required /></label>
        </ToolCard>

        <ToolCard icon={Bot} title="AI scheme explanation" description="Retrieve matching schemes and ask Gemini to explain only the verified information." loading={loading === "schemesAi"} result={results.schemesAi} error={errors.schemesAi} onSubmit={submit("schemesAi", "recommend-schemes-ai", (data) => ({ query: String(data.get("query") ?? ""), language: "en", top_k: 5 }))}>
          <label className="label">Describe your situation<input className={inputClass} name="query" defaultValue="I am a rural woman looking for a small business scheme" required /></label>
        </ToolCard>

        <ToolCard icon={BarChart3} title="SIP categories" description="See educational category suggestions based on a risk level, goal, and time horizon." loading={loading === "sipCategories"} result={results.sipCategories} error={errors.sipCategories} onSubmit={submit("sipCategories", "recommend-sip-categories", (data) => ({ risk_level: String(data.get("risk_level")), goal: String(data.get("goal")), years: asNumber(data.get("years"), 5), top_k: 3 }))}>
          <div className="grid gap-4 sm:grid-cols-3"><label className="label">Risk level<select className={inputClass} name="risk_level" defaultValue="moderate"><option>low</option><option>moderate</option><option>high</option></select></label><label className="label">Goal<input className={inputClass} name="goal" defaultValue="long-term savings" /></label><label className="label">Years<input className={inputClass} name="years" type="number" min="1" defaultValue="5" /></label></div>
        </ToolCard>
      </div>

      <p className="flex items-start gap-2 text-sm leading-relaxed text-ink-500"><ShieldCheck size={18} className="mt-0.5 shrink-0 text-brand-600" />All investment and risk outputs are educational estimates. They are not personalized financial advice or buy/sell recommendations.</p>
    </div>
  );
}