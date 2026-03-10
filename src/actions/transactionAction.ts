"use server";

import {db} from "@/db";
import {transaction} from "@/db/schema";

export const getAllTransactions = async () => {
  return await db.select().from(transaction);
}

// export const addTransaction = async (amount: number, description: string) => {
//   await db.insert(transaction).values({
//     amount,
//     description,
//     date: new Date(),
//   });
// }
