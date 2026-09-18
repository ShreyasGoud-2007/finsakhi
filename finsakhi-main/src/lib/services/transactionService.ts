import { DEMO_TRANSACTIONS } from "../mock-data";
import { isSupabaseConfigured } from "../supabase/client";
import type { Transaction } from "../types";

/** Maps to the `transactions` table. */
export type TransactionInput = Omit<Transaction, "id" | "userId">;

export async function getTransactions(_userId: string): Promise<Transaction[]> {
  if (isSupabaseConfigured) {
    // return supabase.from("transactions").select("*").eq("user_id", userId)
  }
  return DEMO_TRANSACTIONS;
}

export async function addTransaction(
  userId: string,
  input: TransactionInput,
): Promise<Transaction> {
  const record: Transaction = { id: crypto.randomUUID(), userId, ...input };
  if (isSupabaseConfigured) {
    // return supabase.from("transactions").insert(record).select().single()
  }
  return record;
}

export async function updateTransaction(
  id: string,
  patch: Partial<TransactionInput>,
): Promise<Partial<Transaction> & { id: string }> {
  if (isSupabaseConfigured) {
    // return supabase.from("transactions").update(patch).eq("id", id)
  }
  return { id, ...patch };
}

export async function deleteTransaction(id: string): Promise<string> {
  if (isSupabaseConfigured) {
    // await supabase.from("transactions").delete().eq("id", id)
  }
  return id;
}
