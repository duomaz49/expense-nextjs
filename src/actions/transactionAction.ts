"use server";

import {db} from "@/db";
import {transaction} from "@/db/schema";

export const getAllTransactions = async () => {
  return await db.select().from(transaction);
}
