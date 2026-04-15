"use client";

import { trpc } from "@/lib/trpc/client";
import { columns, DataTable } from "./_table";
import ConfirmationModal from "@/components/shared/confirmation-modal";
import NewTransactionModal from "./_components/new-transaction-modal";

export default function TransactionPage() {
  const [transactions] = trpc.transaction.getAll.useSuspenseQuery();

  return (
    <div className="md:container md:mx-auto mt-5">
      <div className="flex justify-end mb-2"></div>
      <DataTable columns={columns} data={transactions} />
      <ConfirmationModal />
      <NewTransactionModal />
    </div>
  );
}
