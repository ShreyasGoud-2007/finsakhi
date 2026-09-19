import {
  getSummary,
  getTopExpenseCategory,
  getAverageExpense,
  goalProgress,
  monthsRemaining,
  getRemainingAmount,
} from "./calculations";
import { fillTemplate, t } from "./i18n";

import type { Language, Transaction, SavingsGoal } from "./types";

export interface FinancialInsight {
  type: "positive" | "warning" | "info";
  title: string;
  message: string;
}

export function generateFinancialInsights(
  transactions: Transaction[],
  goals: SavingsGoal[] = [],
  lang: Language = "en",
): FinancialInsight[] {
  const insights: FinancialInsight[] = [];

  const summary = getSummary(transactions);

  if (summary.income === 0) {
    insights.push({
      type: "info",
      title: t("insight.addIncome", lang),
      message: t("insight.addIncomeMessage", lang),
    });

    return insights;
  }

  if (summary.balance < 0) {
    insights.push({
      type: "warning",
      title: t("insight.expensesHigher", lang),
      message: t("insight.expensesHigherMessage", lang),
    });
  } else if (summary.savingsRate >= 20) {
    insights.push({
      type: "positive",
      title: t("insight.goodSavingHabit", lang),
      message: fillTemplate(t("insight.goodSavingHabitMessage", lang), {
        value: summary.savingsRate.toFixed(1),
      }),
    });
  } else {
    insights.push({
      type: "info",
      title: t("insight.buildSavings", lang),
      message: t("insight.buildSavingsMessage", lang),
    });
  }

  const topCategory = getTopExpenseCategory(transactions);

  if (topCategory) {
    const categoryLabel = t(`category.${topCategory.id}` as const, lang) || topCategory.name;
    if (topCategory.percentage > 40) {
      insights.push({
        type: "warning",
        title: fillTemplate(t("insight.highSpending", lang), { name: categoryLabel }),
        message: fillTemplate(t("insight.highSpendingMessage", lang), {
          name: categoryLabel,
          value: topCategory.percentage.toFixed(1),
        }),
      });
    } else {
      insights.push({
        type: "info",
        title: fillTemplate(t("insight.topSpending", lang), { name: categoryLabel }),
        message: fillTemplate(t("insight.topSpendingMessage", lang), {
          name: categoryLabel,
          value: topCategory.percentage.toFixed(1),
        }),
      });
    }
  }

  const averageExpense = getAverageExpense(transactions);

  if (averageExpense > 0) {
    insights.push({
      type: "info",
      title: t("insight.averageExpense", lang),
      message: fillTemplate(t("insight.averageExpenseMessage", lang), {
        value: averageExpense.toFixed(0),
      }),
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
        title: fillTemplate(t("insight.goalCompleted", lang), { name: goal.name }),
        message: fillTemplate(t("insight.goalCompletedMessage", lang), {
          value: goal.targetAmount.toFixed(0),
        }),
      });
    } else if (progress >= 75) {
      insights.push({
        type: "positive",
        title: fillTemplate(t("insight.almostThere", lang), { name: goal.name }),
        message: fillTemplate(t("insight.almostThereMessage", lang), {
          value: progress.toFixed(0),
          remaining: remaining.toFixed(0),
        }),
      });
    } else if (months !== null) {
      insights.push({
        type: "info",
        title: fillTemplate(t("insight.goalSavings", lang), { name: goal.name }),
        message: fillTemplate(t("insight.goalSavingsMessage", lang), {
          value: progress.toFixed(0),
          remaining: remaining.toFixed(0),
          months: String(months),
        }),
      });
    }
  }

  return insights;
}