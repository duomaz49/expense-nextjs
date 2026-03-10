"use server";

import {db} from "@/db";
import { eq } from "drizzle-orm";
import {category} from "@/db/schema";
import {Category, NewCategory, UpdateCategory} from "@/lib/types/types";
import {revalidatePath} from "next/cache";

export const getAllCategories = async (): Promise<Category[]> => {
  return await db.select().from(category);
};

export const addCategory = async (newCategory: NewCategory): Promise<void> => {
  await db.insert(category).values(newCategory);
  revalidatePath("/");
};

export const deleteCategory = async (id: string): Promise<void> => {
  await db.delete(category).where(eq(category.id, id));
  revalidatePath("/");
};

export const editCategory = async (id: string, updateCategory: UpdateCategory): Promise<void> => {
  await db.update(category).set(updateCategory).where(eq(category.id, id));
  revalidatePath("/");
}
