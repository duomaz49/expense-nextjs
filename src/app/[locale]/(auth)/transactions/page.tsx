"use client";

import { useTranslations } from "next-intl";
import { trpc } from "@/lib/trpc/client";
import { useColumns, DataTable } from "./_components/_table";
import ConfirmationModal from "@/components/shared/confirmation-modal";
import NewTransactionModal from "./_components/new-transaction-modal";
import ImportPreviewModal from "./_components/import-preview-modal";

export default function TransactionPage() {
  const t = useTranslations("transactions");
  const columns = useColumns();
  const [transactions] = trpc.transaction.getAll.useSuspenseQuery();

  return (
    <div className="md:container md:mx-auto mt-5 space-y-4">
      <h1 className="text-lg font-semibold">{t("title")}</h1>
      <DataTable columns={columns} data={transactions} />
      <ConfirmationModal />
      <NewTransactionModal />
      <ImportPreviewModal />
    </div>
  );
}
