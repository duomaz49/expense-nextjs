import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { budget, category, transaction } from '@/db/schema';

export type Budget = InferSelectModel<typeof budget>;
export type Category = InferSelectModel<typeof category>;
export type Transaction = InferSelectModel<typeof transaction>;


export type NewBudget = InferInsertModel<typeof budget>;
export type NewCategory = InferInsertModel<typeof category>;
export type NewTransaction = InferInsertModel<typeof transaction>;


export type UpdateBudget = Partial<NewBudget>;
export type UpdateCategory = Partial<NewCategory>;
export type UpdateTransaction = Partial<NewTransaction>;
