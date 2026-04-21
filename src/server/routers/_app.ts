import { router } from "../trpc";
import { budgetRouter } from "./budget";
import { categoryRouter } from "./category";
import { transactionRouter } from "./transaction";
import { dashboardRouter } from "./dashboard";

export const appRouter = router({
  category: categoryRouter,
  budget: budgetRouter,
  transaction: transactionRouter,
  dashboard: dashboardRouter,
});

export type AppRouter = typeof appRouter;
