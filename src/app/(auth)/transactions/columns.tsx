"use client";

import { ColumnDef, CellContext } from "@tanstack/react-table";
import type { Transaction } from "@/lib/types/types";

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
cell: ({ row }: CellContext<Transaction, unknown>) => {
      const transaction = row.original;
      return (
        <div className="flex gap-2">
          <button onClick={() => alert(`Edit: ${transaction.id}`)}>Edit</button>
          <button onClick={() => alert(`Delete: ${transaction.id}`)}>
            Delete
          </button>
        </div>
      );
    },
  },
];
