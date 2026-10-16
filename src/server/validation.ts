import { z } from 'zod';

export const amountSchema = z.string().regex(/^-?\d+(?:\.\d+)?$/, 'Enter a decimal amount')
  .refine(value => Number.isFinite(Number(value)), 'Amount must be finite');
