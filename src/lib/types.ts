export type Language = "en" | "te" | "hi";

export type CategoryId =
  | "food" | "transport" | "education" | "healthcare"
  | "household" | "shopping" | "other" | "income";

export interface User {
  id: string;
  name: string;
  email: string;
  language: Language;
  avatarInitials: string;
  monthlyIncomeEstimate: number;
}

export interface Transaction {
  id: string;
  userId: string;
  type: "income" | "expense";
  amount: number;
  category: CategoryId;
  description: string;
  date: string; // ISO yyyy-mm-dd
}

export interface SavingsGoal {
  id: string;
  userId: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
  monthlyContribution: number;
  icon: string;
  createdAt: string;
}

export interface FinancialSummary {
  income: number;
  expenses: number;
  balance: number;
  savingsRate: number;
}

export interface ExpenseCategoryTotal {
  id: CategoryId;
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  error?: boolean;
}

export type LessonCategory = "basics" | "saving" | "borrowing" | "investing" | "protection";

export type LocalizedText = string | { en: string; te?: string; hi?: string };
export type LocalizedList = string[] | { en: string[]; te?: string[]; hi?: string[] };

export interface FinancialLesson {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  category: LessonCategory;
  icon: string;
  explanation: LocalizedText;
  example: LocalizedText;
  whyItMatters: LocalizedText;
  remember: LocalizedList;
}

export interface FinancialContext {
  income: number;
  expenses: number;
  balance: number;
  categories: Record<string, number>;
  savingsGoals: { name: string; target: number; saved: number; monthly: number }[];
}
