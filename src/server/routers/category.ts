import { router, protectedProcedure } from "../trpc";
import { db } from "@/db";
import { budget, category, transaction } from "@/db/schema";
import { eq, and, gte, lt, sql } from "drizzle-orm";
import { z } from "zod";

export const categoryRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return db.select().from(category).where(eq(category.userId, ctx.user.id));
  }),

  getOverview: protectedProcedure.query(async ({ ctx }) => {
    const now = new Date();
    const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();
    const nextMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1)).toISOString();

    return db
      .select({
        id: category.id,
        name: category.name,
        budget: budget.amount,
        spent: sql<string>`COALESCE((
          SELECT SUM(${transaction.amount}) FROM ${transaction}
          WHERE ${transaction.categoryId} = ${category.id}
            AND ${transaction.date} >= ${monthStart}
            AND ${transaction.date} < ${nextMonth}
        ), 0)`.as("spent"),
        txnCount: sql<number>`(
          SELECT COUNT(*)::int FROM ${transaction}
          WHERE ${transaction.categoryId} = ${category.id}
            AND ${transaction.date} >= ${monthStart}
            AND ${transaction.date} < ${nextMonth}
        )`.as("txn_count"),
      })
      .from(category)
      .leftJoin(
        budget,
        and(
          eq(budget.categoryId, category.id),
          gte(budget.month, monthStart),
          lt(budget.month, nextMonth),
        ),
      )
      .where(eq(category.userId, ctx.user.id));
  }),

  add: protectedProcedure
    .input(z.object({
      name: z.string().min(1),
    }))
    .mutation(async ({ input, ctx }) => {
      const [row] = await db
        .insert(category)
        .values({ ...input, userId: ctx.user.id })
        .returning();
      return row;
    }),

  edit: protectedProcedure
    .input(z.object({
      id: z.string().check(z.uuid()),
      name: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const { id, ...data } = input;
      await db.update(category).set(data).where(and(eq(category.id, id), eq(category.userId, ctx.user.id)));
    }),

  delete: protectedProcedure
    .input(z.string().check(z.uuid()))
    .mutation(async ({ input, ctx }) => {
      await db.delete(category).where(and(eq(category.id, input), eq(category.userId, ctx.user.id)));
    }),
});
