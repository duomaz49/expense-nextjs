"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
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
import { Input } from "@/components/ui/input";

const firstOfCurrentMonth = () => {
    const now = new Date();
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
};

const shiftMonth = (d: Date, delta: number) =>
    new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + delta, 1));

export default function BudgetPage() {
    const t = useTranslations("budgets");
    const [monthDate, setMonthDate] = useState<Date>(firstOfCurrentMonth);
    const monthIso = useMemo(() => monthDate.toISOString(), [monthDate]);

    const { data: rows = [], isPending } = trpc.budget.getOverview.useQuery({ month: monthIso });
    const { open } = useBudgetFormModalStore();
    const { openConfirmModal, closeModal: closeConfirm } = useConfirmationModalStore();
    const utils = trpc.useUtils();

    const deleteBudget = trpc.budget.delete.useMutation({
        onSuccess: () => {
            utils.budget.getOverview.invalidate();
            utils.budget.getAll.invalidate();
            toast.success(t("toasts.removed"));
            closeConfirm();
        },
        onError: () => toast.error(t("toasts.removeFailed")),
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
            title: t("deleteConfirm.title", { category: row.categoryName }),
            description: t("deleteConfirm.description"),
            onConfirm: () => deleteBudget.mutate(row.budgetId!),
        });
    };

    const shift = (e: React.MouseEvent, delta: number) => {
        e.preventDefault();
        setMonthDate((d) => shiftMonth(d, delta));
    };

    return (
        <div className="md:container md:mx-auto mt-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-lg font-semibold">{t("title")}</h1>
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
                            <Input
                                type="month"
                                aria-label={t("month")}
                                className="w-44"
                                min="0001-01"
                                max="9999-12"
                                value={monthIso.slice(0, 7)}
                                onChange={(event) => {
                                    const value = event.currentTarget.value;
                                    if (value && event.currentTarget.validity.valid) {
                                        setMonthDate(new Date(`${value}-01T00:00:00.000Z`));
                                    }
                                }}
                            />
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
                isLoading={isPending}
                onSet={handleSet}
                onDelete={handleDelete}
            />
            <BudgetFormModal />
            <ConfirmationModal />
        </div>
    );
}
