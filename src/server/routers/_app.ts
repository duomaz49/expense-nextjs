import { router } from "../trpc";
import { budgetRouter } from "./budget";
import { categoryRouter } from "./category";
import { transactionRouter } from "./transaction";

export const appRouter = router({
  category: categoryRouter,
  budget: budgetRouter,
  transaction: transactionRouter
});

export type AppRouter = typeof appRouter;
