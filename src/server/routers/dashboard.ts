import { router, protectedProcedure } from "../trpc";
import { db } from "@/db";
import { budget, category, transaction } from "@/db/schema";
import { and, eq, gte, lt, sql, type SQL } from "drizzle-orm";
import { z } from "zod";

export const dashboardRouter = router({
    getSummary: protectedProcedure
        .input(z.object({
            period: z.enum(["month", "year", "all"]),
            timeZone: z.string().max(100).refine((value) => {
                try { new Intl.DateTimeFormat("en", { timeZone: value }); return true; }
                catch { return false; }
            }, "Invalid time zone").default("UTC"),
        }))
        .query(async ({ ctx, input }) => {
            const userId = ctx.user.id;
            const unit = input.period === "year" ? "year" : "month";
            const interval = input.period === "year" ? sql`INTERVAL '1 year'` : sql`INTERVAL '1 month'`;
            const localStart = sql`DATE_TRUNC(${unit}, CURRENT_TIMESTAMP AT TIME ZONE ${input.timeZone})`;
            const start = input.period === "all" ? null : sql`(${localStart} AT TIME ZONE ${input.timeZone})`;
            const end = input.period === "all" ? null : sql`((${localStart} + ${interval}) AT TIME ZONE ${input.timeZone})`;
            const previousStart = sql`((${localStart} - ${interval}) AT TIME ZONE ${input.timeZone})`;
            const transactionRange = and(
                eq(transaction.userId, userId),
                start ? gte(transaction.date, start) : undefined,
                end ? lt(transaction.date, end) : undefined,
            );
            const totalsForRange = (where: SQL | undefined) => db
                .select({
                    income: sql<string>`COALESCE(SUM(CASE WHEN ${transaction.amount} > 0 THEN ${transaction.amount} ELSE 0 END), 0)`,
                    spent: sql<string>`COALESCE(SUM(CASE WHEN ${transaction.amount} < 0 THEN ABS(${transaction.amount}) ELSE 0 END), 0)`,
                    count: sql<number>`COUNT(*)::int`,
                })
                .from(transaction)
                .where(where);

            const bucket = input.period === "month"
                ? sql`DATE_TRUNC('day', ${transaction.date} AT TIME ZONE ${input.timeZone})`
                : sql`DATE_TRUNC('month', ${transaction.date} AT TIME ZONE ${input.timeZone})`;

            // Aggregate expenses and budgets separately so multiple months cannot multiply either total.
            const spending = db.select({
                categoryId: transaction.categoryId,
                spent: sql<string>`SUM(ABS(${transaction.amount}))`.as("spent"),
            }).from(transaction)
                .where(and(transactionRange, lt(transaction.amount, "0")))
                .groupBy(transaction.categoryId)
                .as("spending");
            const budgets = db.select({
                categoryId: budget.categoryId,
                amount: sql<string>`SUM(${budget.amount})`.as("budget_amount"),
            }).from(budget)
                .where(and(
                    eq(budget.userId, userId),
                    // Budgets store calendar months at UTC midnight, not local transaction instants.
                    start ? gte(budget.month, sql`(${localStart} AT TIME ZONE 'UTC')`) : undefined,
                    end ? lt(budget.month, sql`((${localStart} + ${interval}) AT TIME ZONE 'UTC')`) : undefined,
                ))
                .groupBy(budget.categoryId)
                .as("budgets");

            const [[current], previousRows, monthlyRows, byCategory] = await Promise.all([
                totalsForRange(transactionRange),
                start ? totalsForRange(and(
                    eq(transaction.userId, userId),
                    gte(transaction.date, previousStart),
                    lt(transaction.date, start),
                )) : Promise.resolve(null),
                db.select({
                    month: sql<string>`TO_CHAR(${bucket}, 'YYYY-MM-DD')`.as("month"),
                    income: sql<string>`COALESCE(SUM(CASE WHEN ${transaction.amount} > 0 THEN ${transaction.amount} ELSE 0 END), 0)`,
                    spent: sql<string>`COALESCE(SUM(CASE WHEN ${transaction.amount} < 0 THEN ABS(${transaction.amount}) ELSE 0 END), 0)`,
                    count: sql<number>`COUNT(*)::int`,
                }).from(transaction)
                    .where(transactionRange)
                    .groupBy(sql`"month"`)
                    .orderBy(sql`"month"`),
                db.select({
                    categoryId: category.id,
                    categoryName: category.name,
                    spent: sql<string>`COALESCE(${spending.spent}, 0)`,
                    budgetAmount: budgets.amount,
                }).from(category)
                    .leftJoin(spending, eq(spending.categoryId, category.id))
                    .leftJoin(budgets, eq(budgets.categoryId, category.id))
                    .where(eq(category.userId, userId)),
            ]);

            const totals = (row: typeof current) => ({
                income: Number(row.income),
                spent: Number(row.spent),
                net: Number(row.income) - Number(row.spent),
                count: row.count,
            });

            return {
                current: totals(current),
                previous: previousRows ? totals(previousRows[0]) : null,
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
