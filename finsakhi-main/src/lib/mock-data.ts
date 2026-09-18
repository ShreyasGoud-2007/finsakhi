import type { SavingsGoal, Transaction, User } from "./types";

/**
 * Demo data for the hackathon build.
 * Replace each export with a Supabase query - the shapes match the
 * `profiles`, `transactions` and `savings_goals` tables one-to-one.
 */

export const DEMO_USER: User = {
  id: "demo-user-1",
  name: "Lakshmi",
  email: "lakshmi@example.com",
  language: "en",
  avatarInitials: "L",
  monthlyIncomeEstimate: 15000,
};

const M = new Date().toISOString().slice(0, 7); // current month, keeps demo fresh

export const DEMO_TRANSACTIONS: Transaction[] = [
  { id: "t1", userId: "demo-user-1", type: "income",  amount: 15000, category: "income",     description: "Monthly salary",        date: `${M}-01` },
  { id: "t2", userId: "demo-user-1", type: "expense", amount: 1500,  category: "food",       description: "Groceries",             date: `${M}-03` },
  { id: "t3", userId: "demo-user-1", type: "expense", amount: 2000,  category: "education",  description: "School fees",           date: `${M}-05` },
  { id: "t4", userId: "demo-user-1", type: "expense", amount: 1000,  category: "transport",  description: "Bus travel",            date: `${M}-07` },
  { id: "t5", userId: "demo-user-1", type: "expense", amount: 1500,  category: "food",       description: "Vegetables and milk",   date: `${M}-09` },
  { id: "t6", userId: "demo-user-1", type: "expense", amount: 500,   category: "healthcare", description: "Medicines",             date: `${M}-11` },
  { id: "t7", userId: "demo-user-1", type: "expense", amount: 1000,  category: "household",  description: "Gas cylinder",          date: `${M}-12` },
  { id: "t8", userId: "demo-user-1", type: "expense", amount: 500,   category: "transport",  description: "Auto to market",        date: `${M}-14` },
  { id: "t9", userId: "demo-user-1", type: "expense", amount: 1000,  category: "other",      description: "Village function gift", date: `${M}-15` },
];

export const DEMO_GOALS: SavingsGoal[] = [
  {
    id: "g1", userId: "demo-user-1", name: "Emergency Fund",
    targetAmount: 20000, savedAmount: 5000, monthlyContribution: 2000,
    icon: "ShieldCheck", createdAt: `${M}-01`,
  },
  {
    id: "g2", userId: "demo-user-1", name: "Child Education",
    targetAmount: 50000, savedAmount: 18000, monthlyContribution: 2000,
    icon: "GraduationCap", createdAt: `${M}-01`,
  },
];

export const GOAL_SUGGESTIONS = [
  { name: "Emergency Fund",  icon: "ShieldCheck" },
  { name: "Child Education", icon: "GraduationCap" },
  { name: "Healthcare",      icon: "HeartPulse" },
  { name: "House Repair",    icon: "Home" },
  { name: "Small Business",  icon: "Store" },
  { name: "Vehicle",         icon: "Bike" },
];
