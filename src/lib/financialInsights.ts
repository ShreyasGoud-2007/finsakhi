import {
  getSummary,
  getTopExpenseCategory,
  getAverageExpense,
} from "./calculations";

import type { Transaction } from "./types";

export interface FinancialInsight {
  type: "positive" | "warning" | "info";
  title: string;
  message: string;
}

export function generateFinancialInsights(
  transactions: Transaction[]
): FinancialInsight[] {
  const insights: FinancialInsight[] = [];

  const summary = getSummary(transactions);

  if (summary.income === 0) {
    insights.push({
      type: "info",
      title: "Add your income",
      message:
        "Add your income to receive personalized financial insights.",
    });

    return insights;
  }

  if (summary.balance < 0) {
    insights.push({
      type: "warning",
      title: "Expenses are higher than income",
      message:
        "Your recorded expenses are higher than your income. Review your largest expenses and look for areas where you can reduce spending.",
    });
  } else if (summary.savingsRate >= 20) {
    insights.push({
      type: "positive",
      title: "Good saving habit",
      message:
        `You are currently saving ${summary.savingsRate.toFixed(1)}% of your recorded income.`,
    });
  } else {
    insights.push({
      type: "info",
      title: "Build your savings",
      message:
        "Try setting aside a small fixed amount whenever you receive income.",
    });
  }

  const topCategory = getTopExpenseCategory(transactions);

  if (topCategory) {
    insights.push({
      type: "info",
      title: `Highest spending: ${topCategory.name}`,
      message:
        `${topCategory.name} accounts for ${topCategory.percentage.toFixed(1)}% of your recorded expenses.`,
    });
  }

  const averageExpense = getAverageExpense(transactions);

  if (averageExpense > 0) {
    insights.push({
      type: "info",
      title: "Average expense",
      message:
        `Your average recorded expense is ₹${averageExpense.toFixed(0)}.`,
    });
  }

  return insights;
}