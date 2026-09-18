import { supabase } from "../supabase/client";
import type { SavingsGoal } from "../types";

export type GoalInput = Omit<SavingsGoal, "id" | "userId" | "createdAt">;

export async function getSavingsGoals(
  userId: string
): Promise<SavingsGoal[]> {
  const { data, error } = await supabase
    .from("savings_goals")
    .select("*")
    .eq("user_id", userId)
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

export async function createSavingsGoal(
  userId: string,
  input: GoalInput
): Promise<SavingsGoal> {
  const { data, error } = await supabase
    .from("savings_goals")
    .insert({
      user_id: userId,
      goal_name: input.name,
      target_amount: input.targetAmount,
      saved_amount: input.savedAmount,
      monthly_contribution: input.monthlyContribution,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return {
    id: data.id,
    userId: data.user_id,
    name: data.goal_name,
    targetAmount: Number(data.target_amount),
    savedAmount: Number(data.saved_amount),
    monthlyContribution: Number(data.monthly_contribution),
    icon: input.icon,
    createdAt: data.created_at,
  };
}

export async function updateSavingsGoal(
  id: string,
  patch: Partial<GoalInput>
): Promise<Partial<SavingsGoal> & { id: string }> {
  const updateData: Record<string, unknown> = {};

  if (patch.name !== undefined) {
    updateData.goal_name = patch.name;
  }

  if (patch.targetAmount !== undefined) {
    updateData.target_amount = patch.targetAmount;
  }

  if (patch.savedAmount !== undefined) {
    updateData.saved_amount = patch.savedAmount;
  }

  if (patch.monthlyContribution !== undefined) {
    updateData.monthly_contribution = patch.monthlyContribution;
  }

  const { data, error } = await supabase
    .from("savings_goals")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return {
    id: data.id,
    name: data.goal_name,
    targetAmount: Number(data.target_amount),
    savedAmount: Number(data.saved_amount),
    monthlyContribution: Number(data.monthly_contribution),
  };
}

export async function deleteSavingsGoal(id: string): Promise<string> {
  const { error } = await supabase
    .from("savings_goals")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }

  return id;
}