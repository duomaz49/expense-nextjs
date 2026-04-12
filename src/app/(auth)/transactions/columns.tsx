"use client";

import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Pencil, Trash2, X } from "lucide-react";
import ConfirmationModal from "@/components/shared/confirmation-modal";
import { useState } from "react";
import { trpc } from "@/lib/trpc/client";
import type { Transaction } from "@/lib/types/types";

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
  const [open, setOpen] = useState<boolean>(false);
  const transaction = row.original;
  const utils = trpc.useUtils();

  const meta = table.options.meta as EditMeta;
  const isEditing = meta?.editingRowId === row.original.id;

  const deleteTransaction = trpc.transaction.delete.useMutation({
    onSuccess: () => {
      utils.transaction.getAll.invalidate();
      setOpen(false);
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
        onClick={() => setOpen(true)}
      >
        <Trash2 />
      </Button>
      <ConfirmationModal
        open={open}
        onOpenChange={setOpen}
        onCancel={() => setOpen(!open)}
        onConfirm={() => deleteTransaction.mutate(transaction.id)}
      />
    </div>
  );
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "description",
    header: "Description",
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
    header: "Date",
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
          {new Intl.DateTimeFormat("fi-FI", {
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
    header: "Amount",
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
    id: "actions",
    header: "Actions",
    size: 50,
    cell: (props) => <ActionCell {...props} />,
  },
];
