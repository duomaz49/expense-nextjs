"use server";

import {db} from "@/db";
import { eq } from "drizzle-orm";
import {transaction} from "@/db/schema";
import {NewTransaction, Transaction, UpdateTransaction} from "@/lib/types/types";
import {revalidatePath} from "next/cache";

export const getAllTransactions = async (): Promise<Transaction[]> => {
  return await db.select().from(transaction);
};

export const addTransaction = async (newTransaction: NewTransaction): Promise<void> => {
  await db.insert(transaction).values(newTransaction);
  revalidatePath("/");
};

export const deleteTransaction = async (id: string): Promise<void> => {
  await db.delete(transaction).where(eq(transaction.id, id));
  revalidatePath("/");
};

export const editTransaction = async (id: string, updatedTransaction: UpdateTransaction): Promise<void> => {
  await db.update(transaction).set(updatedTransaction).where(eq(transaction.id, id));
  revalidatePath("/");
}
