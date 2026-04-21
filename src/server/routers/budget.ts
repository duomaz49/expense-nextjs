import { router, protectedProcedure } from "../trpc";
import { db } from "@/db";
import { budget, category, transaction } from "@/db/schema";
import { eq, and, gte, lt, sql } from "drizzle-orm";
import { z } from "zod";

export const budgetRouter = router({
    getAll: protectedProcedure.query(async ({ ctx }) => {
        return db.select().from(budget).where(eq(budget.userId, ctx.user.id));
    }),

    getOverview: protectedProcedure
        .input(z.object({ month: z.string().check(z.iso.datetime()) }))
        .query(async ({ ctx, input }) => {
            const monthStart = new Date(input.month);
            const nextMonth = new Date(Date.UTC(monthStart.getUTCFullYear(), monthStart.getUTCMonth() + 1, 1));
            const startIso = monthStart.toISOString();
            const endIso = nextMonth.toISOString();

            return db
                .select({
                    categoryId: category.id,
                    categoryName: category.name,
                    budgetId: budget.id,
                    budgetAmount: budget.amount,
                    spent: sql<string>`COALESCE((
                        SELECT SUM(${transaction.amount}) FROM ${transaction}
                        WHERE ${transaction.categoryId} = ${category.id}
                          AND ${transaction.date} >= ${startIso}
                          AND ${transaction.date} < ${endIso}
                    ), 0)`.as("spent"),
                })
                .from(category)
                .leftJoin(
                    budget,
                    and(
                        eq(budget.categoryId, category.id),
                        gte(budget.month, startIso),
                        lt(budget.month, endIso),
                    ),
                )
                .where(eq(category.userId, ctx.user.id));
        }),

    add: protectedProcedure
        .input(z.object({
            name: z.string(),
            amount: z.string(),
            month: z.string().check(z.iso.datetime()),
            categoryId: z.string().check(z.uuid())
        }))
        .mutation(async ({ input, ctx }) => {
            await db.insert(budget).values({ ...input, userId: ctx.user.id });
        }),

    edit: protectedProcedure
        .input(z.object({
            id: z.string().check(z.uuid()),
            name: z.string(),
            amount: z.string(),
            month: z.string().check(z.iso.datetime()),
            categoryId: z.string().check(z.uuid())
        }))
        .mutation(async ({ input, ctx }) => {
            const { id, ...data } = input;
            await db.update(budget).set(data).where(and(eq(budget.id, id), eq(budget.userId, ctx.user.id)));
        }),

    delete: protectedProcedure
        .input(z.string().check(z.uuid()))
        .mutation(async ({ input, ctx }) => {
            await db.delete(budget).where(and(eq(budget.id, input), eq(budget.userId, ctx.user.id)));
        })

})