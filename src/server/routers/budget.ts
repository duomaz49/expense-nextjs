import { router, protectedProcedure } from "../trpc";
import { db } from "@/db";
import { budget } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const budgetRouter = router({
    getAll: protectedProcedure.query(async ({ ctx }) => {
        return db.select().from(budget).where(eq(budget.userId, ctx.user.id));
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
            await db.update(budget).set(data).where(eq(budget.id, id) && eq(budget.userId, ctx.user.id));
        }),

    delete: protectedProcedure
        .input(z.string().check(z.uuid()))
        .mutation(async ({ input, ctx }) => {
            await db.delete(budget).where(eq(budget.id, input) && eq(budget.userId, ctx.user.id));
        })

})