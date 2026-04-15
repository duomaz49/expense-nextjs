"use client";

import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Pencil, Trash2, X } from "lucide-react";
import { trpc } from "@/lib/trpc/client";
import type { Transaction } from "@/lib/types/types";
import { ArrowUpDown } from "lucide-react";
import { useConfirmationModalStore } from "@/store/confirmation-modal-store";
import { useNewTransactionModalStore } from "@/store/new-transaction-modal-store";

interface EditMeta {
  editingRowId: string | null;
  editDraft: Partial<Transaction>;
  cancelEdit: () => void;
  setDraftField: (field: keyof Transaction, value: unknown) => void;
  startEdit: (row: Transaction) => void;
}

export const ActionCell = ({
  row,
  table,
}: CellContext<Transaction, unknown>) => {
  const { openModal } = useConfirmationModalStore();
  const { openModal } = useNewTransactionModalStore();
  const transaction = row.original;
  const utils = trpc.useUtils();

  const meta = table.options.meta as EditMeta;
  const isEditing = meta?.editingRowId === row.original.id;

  const deleteTransaction = trpc.transaction.delete.useMutation({
    onSuccess: () => {
      utils.transaction.getAll.invalidate();
    },
  });

  const editTransaction = trpc.transaction.edit.useMutation({
    onSuccess: () => {
      utils.transaction.getAll.invalidate();
      meta.cancelEdit();
    },
  });

  const handleSave = () => {
    editTransaction.mutate({
      id: transaction.id,
      date: new Date(meta.editDraft.date ?? transaction.date).toISOString(),
      amount: meta.editDraft.amount ?? transaction.amount,
      description: meta.editDraft.description ?? transaction.description ?? "",
      categoryId: meta.editDraft.categoryId ?? transaction.categoryId ?? "",
    });
  };

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
          openModal({
            title: "Delete transaction?",
            onConfirm: () => deleteTransaction.mutate(transaction.id),
          })
        }
      >
        <Trash2 />
      </Button>
    </div>
  );
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <div>
          <Button
            className="border-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Description
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ getValue, row, table }: CellContext<Transaction, unknown>) => {
      const meta = table.options.meta as EditMeta;
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
    header: ({ column }) => {
      return (
        <div>
          <Button
            className="border-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ getValue, row, table }: CellContext<Transaction, unknown>) => {
      const meta = table.options.meta as EditMeta;
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
      return (
        <span>
          {new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }).format(new Date(getValue() as string))}
        </span>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <div>
          <Button
            className="border-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Amount
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ getValue, row, table }: CellContext<Transaction, unknown>) => {
      const meta = table.options.meta as EditMeta;
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
      return <span>${parseFloat(getValue() as string).toFixed(2)}</span>;
    },
  },
  {
    accessorKey: "categoryName",
    header: ({ column }) => {
      return (
        <div>
          <Button
            className="border-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Category
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ getValue }: CellContext<Transaction, unknown>) => {
      return <span>{(getValue() as string) ?? "—"}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    size: 50,
    cell: (props) => <ActionCell {...props} />,
  },
];
