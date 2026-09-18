import type { FinancialContext, Language } from "../types";

/**
 * Talks to our own server route, never to an AI provider directly.
 * The provider key stays in AI_API_KEY on the server.
 */
export async function sendMessage(
  message: string,
  financialContext: FinancialContext,
  language: Language,
): Promise<string> {
  const res = await fetch("/api/financial-assistant", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, financialContext, language }),
  });
  if (!res.ok) throw new Error(`Assistant request failed (${res.status})`);
  const data: { message?: string } = await res.json();
  if (!data.message) throw new Error("Assistant returned an empty reply.");
  return data.message;
}

/** Builds the dashboard insight paragraph. Pure arithmetic - no AI call needed. */
export function buildInsight(ctx: FinancialContext): string {
  const { income, expenses, balance, categories } = ctx;
  if (income === 0 && expenses === 0) {
    return "Add your income and a few expenses, and I'll show you what your month looks like.";
  }
  const entries = Object.entries(categories).sort((a, b) => b[1] - a[1]);
  const [topName, topAmount] = entries[0] ?? ["", 0];
  const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  const lines = [
    `You earned ${inr(income)} this month and spent ${inr(expenses)}, so about ${inr(balance)} is left.`,
  ];
  if (topName) {
    const share = expenses > 0 ? Math.round((topAmount / expenses) * 100) : 0;
    lines.push(
      `${topName} is your biggest spend at ${inr(topAmount)} - roughly ${share} out of every 100 rupees you spend.`,
    );
  }
  if (income > 0) {
    const rate = Math.round((balance / income) * 100);
    lines.push(
      rate >= 20
        ? `You are keeping ${rate}% of your income. That is a strong habit - moving some of it into a goal will keep it safe from daily spending.`
        : rate >= 0
          ? `You are keeping ${rate}% of your income. Try setting aside a fixed amount on the day you are paid, before other spending starts.`
          : `You spent more than you earned this month. Look at your largest category first - small reductions there make the biggest difference.`,
    );
  }
  return lines.join("\n\n");
}
