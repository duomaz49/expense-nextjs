import { TRPCError } from '@trpc/server';
import { and, eq, inArray } from 'drizzle-orm';
import { db } from '@/db';
import { category } from '@/db/schema';

export async function requireOwnedCategories(userId: string, categoryIds: (string | undefined)[]) {
  const ids = [...new Set(categoryIds.filter((id): id is string => id !== undefined))];
  if (ids.length === 0) return;
  const owned = await db.select({ id: category.id }).from(category)
    .where(and(eq(category.userId, userId), inArray(category.id, ids)));
  if (owned.length !== ids.length) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'Category not found' });
  }
}
