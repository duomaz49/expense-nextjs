"use client";

import { useMemo, useState } from "react";
import { trpc } from "@/lib/trpc/client";
import { toast } from "sonner";
import BudgetsList, { BudgetOverviewRow } from "./_components/budgets-list";
import BudgetFormModal from "./_components/budget-form-modal";
import ConfirmationModal from "@/components/shared/confirmation-modal";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useBudgetFormModalStore } from "@/store/budget-form-modal-store";
import { useConfirmationModalStore } from "@/store/confirmation-modal-store";

const firstOfCurrentMonth = () => {
    const now = new Date();
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
};

const shiftMonth = (d: Date, delta: number) =>
    new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + delta, 1));

const monthLabel = (d: Date) =>
    d.toLocaleString(undefined, { month: "long", year: "numeric" });

export default function BudgetPage() {
    const [monthDate, setMonthDate] = useState<Date>(firstOfCurrentMonth);
    const monthIso = useMemo(() => monthDate.toISOString(), [monthDate]);

    const { data: rows = [] } = trpc.budget.getOverview.useQuery({ month: monthIso });
    const { open } = useBudgetFormModalStore();
    const { openConfirmModal, closeModal: closeConfirm } = useConfirmationModalStore();
    const utils = trpc.useUtils();

    const deleteBudget = trpc.budget.delete.useMutation({
        onSuccess: () => {
            utils.budget.getOverview.invalidate();
            utils.budget.getAll.invalidate();
            toast.success("Budget removed");
            closeConfirm();
        },
        onError: () => toast.error("Failed to remove budget"),
    });

    const handleSet = (row: BudgetOverviewRow) => {
        open({
            id: row.budgetId ?? undefined,
            categoryId: row.categoryId,
            categoryName: row.categoryName,
            month: monthIso,
            amount: row.budgetAmount ?? undefined,
        });
    };

    const handleDelete = (row: BudgetOverviewRow) => {
        if (!row.budgetId) return;
        openConfirmModal({
            title: `Remove budget for "${row.categoryName}"?`,
            description: "This only removes the budget for this month. Transactions are untouched.",
            onConfirm: () => deleteBudget.mutate(row.budgetId!),
        });
    };

    const shift = (e: React.MouseEvent, delta: number) => {
        e.preventDefault();
        setMonthDate((d) => shiftMonth(d, delta));
    };

    return (
        <div className="md:container md:mx-auto mt-5 space-y-4">
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-lg font-semibold">Budget</h1>
                <Pagination className="w-auto mx-0">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                text=""
                                onClick={(e) => shift(e, -1)}
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <span className="px-3 text-sm font-medium min-w-40 text-center">
                                {monthLabel(monthDate)}
                            </span>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                text=""
                                onClick={(e) => shift(e, 1)}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
            <BudgetsList
                rows={rows}
                month={monthIso}
                onSet={handleSet}
                onDelete={handleDelete}
            />
            <BudgetFormModal />
            <ConfirmationModal />
        </div>
    );
}
