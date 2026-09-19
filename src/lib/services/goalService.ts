import { DEMO_GOALS } from "../mock-data";
import { isSupabaseConfigured } from "../supabase/client";
import type { SavingsGoal } from "../types";

/** Maps to the `savings_goals` table. */
export type GoalInput = Omit<SavingsGoal, "id" | "userId" | "createdAt">;

export async function getSavingsGoals(_userId: string): Promise<SavingsGoal[]> {
  if (isSupabaseConfigured) {
    // return supabase.from("savings_goals").select("*").eq("user_id", userId)
  }
  return DEMO_GOALS;
}

export async function createSavingsGoal(
  userId: string,
  input: GoalInput,
): Promise<SavingsGoal> {
  const record: SavingsGoal = {
    id: crypto.randomUUID(),
    userId,
    createdAt: new Date().toISOString().slice(0, 10),
    ...input,
  };
  if (isSupabaseConfigured) {
    // return supabase.from("savings_goals").insert(record).select().single()
  }
  return record;
}

export async function updateSavingsGoal(
  id: string,
  patch: Partial<GoalInput>,
): Promise<Partial<SavingsGoal> & { id: string }> {
  return { id, ...patch };
}

export async function deleteSavingsGoal(id: string): Promise<string> {
  return id;
}
