"use client";

import { trpc } from "@/lib/trpc/client";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function TransactionPage() {
  const [transactions] = trpc.transaction.getAll.useSuspenseQuery();

  return (
    <div className="md:container md:mx-auto mt-5">
      <div className="flex justify-end mb-2">
      <Button
        className="cursor-pointer"
        size="lg"
        onClick={() => alert("Tried to Add lol :D")}
      >
        <Plus /> New Transaction
      </Button>
      </div>
      <DataTable columns={columns} data={transactions} />
    </div>
  );
}
