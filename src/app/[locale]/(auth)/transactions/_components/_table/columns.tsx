"use client";

import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Pencil, Trash2, X } from "lucide-react";
import { trpc } from "@/lib/trpc/client";
import type { Transaction } from "@/lib/types/types";
import { ArrowUpDown } from "lucide-react";
import { useConfirmationModalStore } from "@/store/confirmation-modal-store";
import { toast } from "sonner";
import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { Skeleton } from "@/components/ui/skeleton";
import CategorySelect from "@/components/shared/category-select";

interface EditMeta {
  editingRowId: string | null;
  editDraft: Partial<Transaction>;
  savingRowId: string | null;
  cancelEdit: () => void;
  setDraftField: (field: keyof Transaction, value: unknown) => void;
  startEdit: (row: Transaction) => void;
  setSaving: (id: string | null) => void;
}

const ActionCell = ({
  row,
  table,
}: CellContext<Transaction, unknown>) => {
  const { openConfirmModal } = useConfirmationModalStore();
  const t = useTranslations("transactions");
  const transaction = row.original;
  const utils = trpc.useUtils();

  const meta = table.options.meta as EditMeta;
  const isEditing = meta?.editingRowId === row.original.id;
  const isSaving = meta?.savingRowId === row.original.id;

  const deleteTransaction = trpc.transaction.delete.useMutation({
    onSuccess: () => {
      utils.transaction.getAll.invalidate();
      toast.success(t("toasts.deleted"));
    },
    onError: () => {
      toast.error(t("toasts.deleteFailed"));
    },
  });

  const editTransaction = trpc.transaction.edit.useMutation({
    onSuccess: async () => {
      meta.cancelEdit();
      await utils.transaction.getAll.invalidate();
      meta.setSaving(null);
      toast.success(t("toasts.updated"));
    },
    onError: () => {
      meta.setSaving(null);
      toast.error(t("toasts.updateFailed"));
    },
  });

  const handleSave = () => {
    meta.setSaving(transaction.id);
    editTransaction.mutate({
      id: transaction.id,
      date: new Date(meta.editDraft.date ?? transaction.date).toISOString(),
      amount: meta.editDraft.amount ?? transaction.amount,
      description: meta.editDraft.description ?? transaction.description ?? "",
      categoryId: meta.editDraft.categoryId ?? transaction.categoryId ?? "",
    });
  };

  if (isSaving) {
    return (
      <div className="flex gap-2">
        <Skeleton className="h-9 w-9" />
        <Skeleton className="h-9 w-9" />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="flex gap-2">
        <Button variant="outline" size="icon" onClick={handleSave}>
          <Check />
        </Button>
        <Button variant="outline" size="icon" onClick={meta?.cancelEdit}>
          <X />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Button
        className="cursor-pointer"
        variant="outline"
        size="icon"
        onClick={() => meta?.startEdit(transaction)}
      >
        <Pencil />
      </Button>
      <Button
        className="cursor-pointer"
        variant="destructive"
        size="icon"
        onClick={() =>
          openConfirmModal({
            title: t("table.deleteConfirmTitle"),
            onConfirm: () => deleteTransaction.mutate(transaction.id),
          })
        }
      >
        <Trash2 />
      </Button>
    </div>
  );
};

export function useColumns(): ColumnDef<Transaction>[] {
  const t = useTranslations("transactions.table");
  const locale = useLocale();

  return useMemo<ColumnDef<Transaction>[]>(
    () => [
      {
        accessorKey: "description",
        header: ({ column }) => (
          <div>
            <Button
              className="border-0"
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              {t("description")}
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ),
        cell: ({ getValue, row, table }: CellContext<Transaction, unknown>) => {
          const meta = table.options.meta as EditMeta;
          if (meta?.savingRowId === row.original.id) {
            return <Skeleton className="h-4 w-32" />;
          }
          if (meta?.editingRowId === row.original.id) {
            return (
              <Input
                value={(meta.editDraft.description ?? "") as string}
                onChange={(e) => meta.setDraftField("description", e.target.value)}
                className="h-8 w-full"
              />
            );
          }
          return <span>{getValue() as string}</span>;
        },
      },
      {
        accessorKey: "date",
        filterFn: (row, columnId, filterValue: [string, string]) => {
          const [from, to] = filterValue;
          const date = new Date(row.getValue(columnId) as string);
          if (from && !isNaN(new Date(from).getTime()) && date < new Date(from))
            return false;
          if (
            to &&
            !isNaN(new Date(to).getTime()) &&
            date > new Date(to + "T23:59:59Z")
          )
            return false;
          return true;
        },
        header: ({ column }) => (
          <div>
            <Button
              className="border-0"
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              {t("date")}
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ),
        cell: ({ getValue, row, table }: CellContext<Transaction, unknown>) => {
          const meta = table.options.meta as EditMeta;
          if (meta?.savingRowId === row.original.id) {
            return <Skeleton className="h-4 w-20" />;
          }
          if (meta?.editingRowId === row.original.id) {
            const isoDate = (meta.editDraft.date ?? getValue()) as string;
            const dateValue = isoDate.substring(0, 10);
            return (
              <Input
                type="date"
                value={dateValue}
                onChange={(e) =>
                  meta.setDraftField("date", new Date(e.target.value).toISOString())
                }
                className="h-8 w-full"
              />
            );
          }
          return <span>{formatDate(getValue() as string, locale)}</span>;
        },
      },
      {
        accessorKey: "amount",
        sortingFn: (a, b) =>
          parseFloat(a.getValue("amount")) - parseFloat(b.getValue("amount")),
        header: ({ column }) => (
          <div>
            <Button
              className="border-0"
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              {t("amount")}
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ),
        cell: ({ getValue, row, table }: CellContext<Transaction, unknown>) => {
          const meta = table.options.meta as EditMeta;
          if (meta?.savingRowId === row.original.id) {
            return <Skeleton className="h-4 w-16" />;
          }
          if (meta?.editingRowId === row.original.id) {
            return (
              <Input
                type="number"
                step="0.01"
                value={(meta.editDraft.amount ?? getValue()) as string}
                onChange={(e) => meta.setDraftField("amount", e.target.value)}
                className="h-8 w-full"
              />
            );
          }
          return <span>{formatCurrency(parseFloat(getValue() as string), locale)}</span>;
        },
      },
      {
        accessorKey: "categoryName",
        header: ({ column }) => (
          <div>
            <Button
              className="border-0"
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              {t("category")}
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ),
        cell: ({ getValue, row, table }: CellContext<Transaction, unknown>) => {
          const meta = table.options.meta as EditMeta;
          if (meta?.savingRowId === row.original.id) {
            return <Skeleton className="h-4 w-24" />;
          }
          if (meta?.editingRowId === row.original.id) {
            const value = (meta.editDraft.categoryId ?? row.original.categoryId ?? "") as string;
            return (
              <CategorySelect
                value={value}
                onChange={(id) => meta.setDraftField("categoryId", id)}
                className="h-8 w-full"
              />
            );
          }
          return <span>{(getValue() as string) ?? t("emptyCategory")}</span>;
        },
      },
      {
        id: "actions",
        header: t("actions"),
        size: 50,
        cell: (props) => <ActionCell {...props} />,
      },
    ],
    [t, locale],
  );
}
