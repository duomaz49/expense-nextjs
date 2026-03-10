"use server";

import {db} from "@/db";
import { eq } from "drizzle-orm";
import {budget} from "@/db/schema";
import {Budget, NewBudget, UpdateBudget} from "@/lib/types/types";
import {revalidatePath} from "next/cache";

export const getAllBudgets = async (): Promise<Budget[]> => {
  return await db.select().from(budget);
};

export const addBudget = async (newTransaction: NewBudget): Promise<void> => {
  await db.insert(budget).values(newTransaction);
  revalidatePath("/");
};

export const deleteBudget = async (id: string): Promise<void> => {
  await db.delete(budget).where(eq(budget.id, id));
  revalidatePath("/");
};

export const editBudget = async (id: string, updateBudget: UpdateBudget): Promise<void> => {
  await db.update(budget).set(updateBudget).where(eq(budget.id, id));
  revalidatePath("/");
}
