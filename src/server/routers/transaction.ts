import { router, protectedProcedure } from "../trpc";
import { db } from "@/db";
import { transaction } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const transactionRouter = router({
    getAll: protectedProcedure.query(async ({ ctx }) => {
        return db.select().from(transaction).where(eq(transaction.userId, ctx.user.id))
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
            await db.update(transaction).set(data).where(eq(transaction.id, id) && eq(transaction.userId, ctx.user.id));
        }),

    delete: protectedProcedure
        .input(z.string().check(z.uuid()))
        .mutation(async ({ input, ctx }) => {
            await db.delete(transaction).where(eq(transaction.id, input) && eq(transaction.userId, ctx.user.id));
        })
});