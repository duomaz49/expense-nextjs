"use client";

import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import type { Transaction } from "@/lib/types/types";
import { Pencil, Trash2 } from "lucide-react";
import ConfirmationModal from "@/components/shared/confirmation-modal";
import { useState } from "react";
import { trpc } from "@/lib/trpc/client";

export const ActionCell = ({ row }: CellContext<Transaction, unknown>) => {
  const [open, setOpen] = useState(false);
  const transaction = row.original;
  const utils = trpc.useUtils();

  const deleteTransaction = trpc.transaction.delete.useMutation({
    onSuccess: () => {
      utils.transaction.getAll.invalidate();
      setOpen(false);
    },
  });

  return (
    <div className="flex gap-2">
      <Button
        className="cursor-pointer"
        variant="outline"
        size="icon"
        onClick={() => alert(`Edit: ${transaction.id}`)}
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
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }: CellContext<Transaction, unknown>) => {
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
    cell: ({ getValue }: CellContext<Transaction, unknown>) => {
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
