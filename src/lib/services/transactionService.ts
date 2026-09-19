import { supabase } from "../supabase/client";
import type { Transaction } from "../types";

export type TransactionInput = Omit<Transaction, "id" | "userId">;

export async function getTransactions(
  userId: string
): Promise<Transaction[]> {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
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

export async function addTransaction(
  userId: string,
  input: TransactionInput
): Promise<Transaction> {
  const { data, error } = await supabase
    .from("transactions")
    .insert({
      user_id: userId,
      type: input.type,
      amount: input.amount,
      category: input.category,
      description: input.description,
      transaction_date: input.date,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return {
    id: data.id,
    userId: data.user_id,
    type: data.type,
    amount: Number(data.amount),
    category: data.category,
    description: data.description ?? "",
    date: data.transaction_date,
  };
}

export async function updateTransaction(
  id: string,
  patch: Partial<TransactionInput>
): Promise<Partial<Transaction> & { id: string }> {
  const updateData: Record<string, unknown> = {};

  if (patch.type !== undefined) updateData.type = patch.type;
  if (patch.amount !== undefined) updateData.amount = patch.amount;
  if (patch.category !== undefined) updateData.category = patch.category;
  if (patch.description !== undefined) {
    updateData.description = patch.description;
  }
  if (patch.date !== undefined) {
    updateData.transaction_date = patch.date;
  }

  const { data, error } = await supabase
    .from("transactions")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return {
    id: data.id,
    userId: data.user_id,
    type: data.type,
    amount: Number(data.amount),
    category: data.category,
    description: data.description ?? "",
    date: data.transaction_date,
  };
}

export async function deleteTransaction(id: string): Promise<string> {
  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }

  return id;
}