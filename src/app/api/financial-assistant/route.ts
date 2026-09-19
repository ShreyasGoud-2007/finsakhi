import { NextResponse } from "next/server";
import type { FinancialContext, Language } from "@/lib/types";

/**
 * Server-side assistant endpoint.
 *
 * Today it answers from a small rule base so the demo works offline.
 * To connect a real model: read process.env.AI_API_KEY here and call the
 * provider. The key never reaches the browser.
 */

interface Body {
  message: string;
  financialContext: FinancialContext;
  language: Language;
}

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

function answer(message: string, ctx: FinancialContext): string {
  const q = message.toLowerCase();
  const { income, expenses, balance, categories, savingsGoals } = ctx;
  const top = Object.entries(categories).sort((a, b) => b[1] - a[1])[0];

  if (/\bsave\b|saving|savings plan|how can i save|plan/.test(q) && /\d/.test(q) === false && savingsGoals.length) {
    const g = savingsGoals[0];
    const remaining = Math.max(0, g.target - g.saved);
    const months = g.monthly > 0 ? Math.ceil(remaining / g.monthly) : null;
    return [
      `## Your plan for ${g.name}`,
      `You have saved **${inr(g.saved)}** of **${inr(g.target)}**. That leaves **${inr(remaining)}** to go.`,
      months
        ? `At **${inr(g.monthly)}** a month you will reach it in about **${months} months**.`
        : `Choose a monthly amount and I can tell you how long it will take.`,
      `## How to make it easier`,
      `- Set the money aside on the day your income arrives, not at month end.`,
      `- Keep this money in a separate account so it is not spent by habit.`,
      top ? `- ${top[0]} is your largest spend at **${inr(top[1])}**. Reducing it by a tenth frees about **${inr(top[1] * 0.1)}** a month.` : "",
    ].filter(Boolean).join("\n");
  }

  if (/reduce|cut|lower|kam|expense|spend/.test(q)) {
    return [
      `## Where your money is going`,
      `You spent **${inr(expenses)}** this month out of **${inr(income)}** earned.`,
      top ? `Your largest category is ${top[0]} at **${inr(top[1])}**.` : "",
      `## Three things that usually work`,
      `- Write down every spend for one week. Most people find ₹500–₹1,000 they did not notice.`,
      `- Buy staples like rice, dal and oil once a month instead of daily - it is cheaper per kilo.`,
      `- Decide your savings amount first, then spend what is left.`,
    ].filter(Boolean).join("\n");
  }

  if (/emergency/.test(q)) {
    return [
      `## Emergency fund`,
      `An emergency fund is money kept aside only for sudden needs - illness, repairs, or a month with no income.`,
      `Your monthly spending is about **${inr(expenses)}**, so a first target of **${inr(expenses * 3)}** would cover three months.`,
      `- Start small. Even ₹500 a month builds the habit.`,
      `- Keep it separate from daily money.`,
      `- Refill it after you use it.`,
    ].join("\n");
  }

  if (/fixed deposit|fd\b/.test(q)) {
    return [
      `## Fixed deposit`,
      `You give the bank an amount for a fixed time and they pay you a higher interest than a savings account.`,
      `For example, **₹10,000** for one year at about 7% returns roughly **₹10,700**.`,
      `- Your money is locked for the chosen period, so do not put your emergency fund in one.`,
      `- A recurring deposit works the same way with a small amount each month.`,
    ].join("\n");
  }

  if (/mutual fund|sip|invest/.test(q)) {
    return [
      `## Mutual funds`,
      `A mutual fund collects small amounts from many people and invests the total. A trained manager handles it.`,
      `The value can go up or down, so it suits money you will not need for several years.`,
      `- Build your emergency fund first.`,
      `- Returns are never guaranteed. Anyone promising fixed high returns is not being honest.`,
      `- Invest only through your bank or a SEBI-registered platform.`,
    ].join("\n");
  }

  if (/insurance|bima/.test(q)) {
    return [
      `## Insurance`,
      `You pay a small amount regularly, and if something serious happens the company pays your family a large amount.`,
      `- PMJJBY costs around ₹436 a year and covers ₹2 lakh on death.`,
      `- PMSBY costs around ₹20 a year and covers accidents.`,
      `- Both can be started through your bank account.`,
      `Insurance is protection, not an investment - do not expect returns from it.`,
    ].join("\n");
  }

  if (/balance|left|how much|summary|overview/.test(q)) {
    return [
      `## This month so far`,
      `- Money received: **${inr(income)}**`,
      `- Money spent: **${inr(expenses)}**`,
      `- Still with you: **${inr(balance)}**`,
      top ? `Your biggest spend is ${top[0]} at **${inr(top[1])}**.` : "",
    ].filter(Boolean).join("\n");
  }

  return [
    `I can help with your income, your spending, saving for a goal, and simple money topics like interest, deposits or insurance.`,
    `Right now you have **${inr(balance)}** left from **${inr(income)}** this month.`,
    `Try asking me:`,
    `- How can I save ₹20,000?`,
    `- Where is my money going?`,
    `- What is an emergency fund?`,
  ].join("\n");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;
    if (!body?.message?.trim()) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    // --- Connect a real model here ---
    // const key = process.env.AI_API_KEY;
    // if (key) { ...call provider with body.financialContext and body.language... }

    await new Promise((r) => setTimeout(r, 550)); // keeps the typing state visible
    return NextResponse.json({ message: answer(body.message, body.financialContext) });
  } catch {
    return NextResponse.json({ error: "Could not reach the assistant." }, { status: 500 });
  }
}
