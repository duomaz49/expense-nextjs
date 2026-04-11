import { router, protectedProcedure } from "../trpc";
import { db } from "@/db";
import { category } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const categoryRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return db.select().from(category).where(eq(category.userId, ctx.user.id));
  }),

  add: protectedProcedure
    .input(z.object({
      name: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      await db.insert(category).values({ ...input, userId: ctx.user.id });
    }),

  edit: protectedProcedure
    .input(z.object({
      id: z.string().check(z.uuid()),
      name: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const { id, ...data } = input;
      await db.update(category).set(data).where(eq(category.id, id) && eq(category.userId, ctx.user.id));
    }),

  delete: protectedProcedure
    .input(z.string().check(z.uuid()))
    .mutation(async ({ input, ctx }) => {
      await db.delete(category).where(eq(category.id, input) && eq(category.userId, ctx.user.id));
    }),
});
