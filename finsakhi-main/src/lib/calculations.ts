import { CATEGORIES } from "./categories";
import type {
  ExpenseCategoryTotal, FinancialSummary, SavingsGoal, Transaction,
} from "./types";

/** All dashboard numbers come from the transaction list - nothing is hardcoded. */
export function getSummary(transactions: Transaction[]): FinancialSummary {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expenses;
  // Zero income must never produce NaN or Infinity.
  const savingsRate = income > 0 ? (balance / income) * 100 : 0;
  return { income, expenses, balance, savingsRate };
}

export function getCategoryTotals(transactions: Transaction[]): ExpenseCategoryTotal[] {
  const expenses = transactions.filter((t) => t.type === "expense");
  const total = expenses.reduce((sum, t) => sum + t.amount, 0);
  return CATEGORIES.map((c) => {
    const amount = expenses
      .filter((t) => t.category === c.id)
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      id: c.id,
      name: c.label,
      amount,
      percentage: total > 0 ? (amount / total) * 100 : 0,
      color: c.color,
    };
  })
    .filter((c) => c.amount > 0)
    .sort((a, b) => b.amount - a.amount);
}

export function goalProgress(goal: SavingsGoal): number {
  if (goal.targetAmount <= 0) return 0;
  return Math.min(100, (goal.savedAmount / goal.targetAmount) * 100);
}

export function monthsRemaining(goal: SavingsGoal): number | null {
  const remaining = goal.targetAmount - goal.savedAmount;
  if (remaining <= 0) return 0;
  if (goal.monthlyContribution <= 0) return null;
  return Math.ceil(remaining / goal.monthlyContribution);
}

export function sortByDateDesc(transactions: Transaction[]): Transaction[] {
  return [...transactions].sort((a, b) => b.date.localeCompare(a.date));
}
