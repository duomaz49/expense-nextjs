"use client";

import { trpc } from "@/lib/trpc/client";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function TransactionPage() {
  const [transactions] = trpc.transaction.getAll.useSuspenseQuery();

  return (
    <div className="md:container md:mx-auto mt-5">
      <DataTable columns={columns} data={transactions} />
    </div>
  );
}
