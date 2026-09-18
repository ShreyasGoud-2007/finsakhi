import {
  getSummary,
  getTopExpenseCategory,
  getAverageExpense,
  goalProgress,
  monthsRemaining,
  getRemainingAmount,
} from "./calculations";

import type { Transaction, SavingsGoal } from "./types";

export interface FinancialInsight {
  type: "positive" | "warning" | "info";
  title: string;
  message: string;
}

export function generateFinancialInsights(
  transactions: Transaction[],
  goals: SavingsGoal[] = []
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
    if (topCategory.percentage > 40) {
      insights.push({
        type: "warning",
        title: `High spending: ${topCategory.name}`,
        message:
          `${topCategory.name} accounts for ${topCategory.percentage.toFixed(1)}% of your recorded expenses. Consider reviewing this category and looking for ways to reduce unnecessary spending.`,
      });
    } else {
      insights.push({
        type: "info",
        title: `Highest spending: ${topCategory.name}`,
        message:
          `${topCategory.name} accounts for ${topCategory.percentage.toFixed(1)}% of your recorded expenses.`,
      });
    }
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

  if (goals.length > 0) {
    const goal = goals[0];
    const progress = goalProgress(goal);
    const remaining = getRemainingAmount(goal);
    const months = monthsRemaining(goal);

    if (remaining === 0) {
      insights.push({
        type: "positive",
        title: `Goal completed: ${goal.name}`,
        message:
          `You have reached your savings goal of ₹${goal.targetAmount.toFixed(0)}.`,
      });
    } else if (progress >= 75) {
      insights.push({
        type: "positive",
        title: `Almost there: ${goal.name}`,
        message:
          `You have completed ${progress.toFixed(0)}% of your goal. ` +
          `Only ₹${remaining.toFixed(0)} is remaining.`,
      });
    } else if (months !== null) {
      insights.push({
        type: "info",
        title: `Savings goal: ${goal.name}`,
        message:
          `You have completed ${progress.toFixed(0)}% of your goal. ` +
          `₹${remaining.toFixed(0)} is remaining, which is about ${months} month${months === 1 ? "" : "s"} at your current monthly contribution.`,
      });
    }
  }

  return insights;
}