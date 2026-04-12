import { router, protectedProcedure } from "../trpc";
import { db } from "@/db";
import { category, transaction } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

export const transactionRouter = router({
    getAll: protectedProcedure.query(async ({ ctx }) => {
        return db
            .select({
                id: transaction.id,
                date: transaction.date,
                amount: transaction.amount,
                description: transaction.description,
                categoryId: transaction.categoryId,
                categoryName: category.name,
                userId: transaction.userId,
                createdAt: transaction.createdAt,
                updatedAt: transaction.updatedAt,
            })
            .from(transaction)
            .leftJoin(category, eq(transaction.categoryId, category.id))
            .where(eq(transaction.userId, ctx.user.id));
    }),

    add: protectedProcedure
        .input(z.object({
            date: z.string().check(z.iso.datetime()),
            amount: z.string(),
            description: z.string(),
            categoryId: z.string().check(z.uuid())
        }))
        .mutation(async ({ input, ctx }) => {
            await db.insert(transaction).values({ ...input, userId: ctx.user.id })
        }),

    edit: protectedProcedure
        .input(z.object({
            id: z.string().check(z.uuid()),
            date: z.string().check(z.iso.datetime()),
            amount: z.string(),
            description: z.string(),
            categoryId: z.string().check(z.uuid())
        }))
        .mutation(async ({ input, ctx }) => {
            const { id, ...data } = input;
            await db.update(transaction).set(data).where(and(eq(transaction.id, id), eq(transaction.userId, ctx.user.id)));
        }),

    delete: protectedProcedure
        .input(z.string().check(z.uuid()))
        .mutation(async ({ input, ctx }) => {
            await db.delete(transaction).where(and(eq(transaction.id, input), eq(transaction.userId, ctx.user.id)));
        })
});