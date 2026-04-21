import { router, protectedProcedure } from "../trpc";
import { db } from "@/db";
import { budget, category, transaction } from "@/db/schema";
import { and, eq, gte, lt, sql } from "drizzle-orm";

const monthBoundary = (year: number, month: number) =>
    new Date(Date.UTC(year, month, 1));

export const dashboardRouter = router({
    getSummary: protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.user.id;
        const now = new Date();
        const monthStart = monthBoundary(now.getUTCFullYear(), now.getUTCMonth());
        const nextMonth = monthBoundary(now.getUTCFullYear(), now.getUTCMonth() + 1);
        const prevMonth = monthBoundary(now.getUTCFullYear(), now.getUTCMonth() - 1);
        const sixMonthsBack = monthBoundary(now.getUTCFullYear(), now.getUTCMonth() - 5);

        const totalsForRange = (startIso: string, endIso: string) =>
            db
                .select({
                    income: sql<string>`COALESCE(SUM(CASE WHEN ${transaction.amount} > 0 THEN ${transaction.amount} ELSE 0 END), 0)`,
                    spent: sql<string>`COALESCE(SUM(CASE WHEN ${transaction.amount} < 0 THEN ABS(${transaction.amount}) ELSE 0 END), 0)`,
                    count: sql<number>`COUNT(*)::int`,
                })
                .from(transaction)
                .where(
                    and(
                        eq(transaction.userId, userId),
                        gte(transaction.date, startIso),
                        lt(transaction.date, endIso),
                    ),
                );

        const [current] = await totalsForRange(monthStart.toISOString(), nextMonth.toISOString());
        const [previous] = await totalsForRange(prevMonth.toISOString(), monthStart.toISOString());

        const monthlyRows = await db
            .select({
                month: sql<string>`DATE_TRUNC('month', ${transaction.date})`.as("month"),
                income: sql<string>`COALESCE(SUM(CASE WHEN ${transaction.amount} > 0 THEN ${transaction.amount} ELSE 0 END), 0)`,
                spent: sql<string>`COALESCE(SUM(CASE WHEN ${transaction.amount} < 0 THEN ABS(${transaction.amount}) ELSE 0 END), 0)`,
                count: sql<number>`COUNT(*)::int`,
            })
            .from(transaction)
            .where(
                and(
                    eq(transaction.userId, userId),
                    gte(transaction.date, sixMonthsBack.toISOString()),
                    lt(transaction.date, nextMonth.toISOString()),
                ),
            )
            .groupBy(sql`DATE_TRUNC('month', ${transaction.date})`)
            .orderBy(sql`DATE_TRUNC('month', ${transaction.date})`);

        const byCategory = await db
            .select({
                categoryId: category.id,
                categoryName: category.name,
                spent: sql<string>`COALESCE(-SUM(${transaction.amount}), 0)`.as("spent"),
                budgetAmount: budget.amount,
            })
            .from(category)
            .leftJoin(
                transaction,
                and(
                    eq(transaction.categoryId, category.id),
                    gte(transaction.date, monthStart.toISOString()),
                    lt(transaction.date, nextMonth.toISOString()),
                ),
            )
            .leftJoin(
                budget,
                and(
                    eq(budget.categoryId, category.id),
                    gte(budget.month, monthStart.toISOString()),
                    lt(budget.month, nextMonth.toISOString()),
                ),
            )
            .where(eq(category.userId, userId))
            .groupBy(category.id, category.name, budget.amount);

        return {
            current: {
                income: Number(current.income),
                spent: Number(current.spent),
                net: Number(current.income) - Number(current.spent),
                count: current.count,
            },
            previous: {
                income: Number(previous.income),
                spent: Number(previous.spent),
                net: Number(previous.income) - Number(previous.spent),
                count: previous.count,
            },
            monthly: monthlyRows.map((r) => ({
                month: r.month,
                income: Number(r.income),
                spent: Number(r.spent),
                count: r.count,
            })),
            byCategory: byCategory.map((r) => ({
                categoryId: r.categoryId,
                categoryName: r.categoryName,
                spent: Number(r.spent),
                budget: r.budgetAmount != null ? Number(r.budgetAmount) : null,
            })),
        };
    }),
});
