import { supabase } from "./supabase/client";
import type { Transaction, SavingsGoal } from "./types";

export async function getUserTransactions(): Promise<Transaction[]> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User is not logged in");
  }

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user.id)
    .order("transaction_date", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    userId: row.user_id,
    type: row.type,
    amount: Number(row.amount),
    category: row.category,
    description: row.description ?? "",
    date: row.transaction_date,
  }));
}

export async function getUserSavingsGoals(): Promise<SavingsGoal[]> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User is not logged in");
  }

  const { data, error } = await supabase
    .from("savings_goals")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    userId: row.user_id,
    name: row.goal_name,
    targetAmount: Number(row.target_amount),
    savedAmount: Number(row.saved_amount),
    monthlyContribution: Number(row.monthly_contribution),
    icon: "PiggyBank",
    createdAt: row.created_at,
  }));
}