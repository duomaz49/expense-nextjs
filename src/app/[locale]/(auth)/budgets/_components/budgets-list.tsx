"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocale, useTranslations } from "next-intl";
import { formatCurrency } from "@/lib/formatters";

export interface BudgetOverviewRow {
    categoryId: string;
    categoryName: string;
    budgetId: string | null;
    budgetAmount: string | null;
    spent: string;
}

interface BudgetsListProps {
    rows: BudgetOverviewRow[];
    month: string;
    isLoading?: boolean;
    onSet: (row: BudgetOverviewRow) => void;
    onDelete: (row: BudgetOverviewRow) => void;
}

export default function BudgetsList({ rows, isLoading, onSet, onDelete }: BudgetsListProps) {
    const t = useTranslations("budgets.list");
    const locale = useLocale();
    const fmt = (v: number) => formatCurrency(v, locale);

    if (isLoading) {
        return (
            <div className="overflow-hidden rounded-md border text-xs">
                <div className="flex items-center justify-between border-b px-3 py-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-32" />
                </div>
                <ul>
                    {[...Array(6).keys()].map((i) => (
                        <li
                            key={i}
                            className="grid grid-cols-[1fr_auto] items-center gap-3 border-b px-3 py-2 last:border-b-0"
                        >
                            <div className="min-w-0 space-y-2">
                                <div className="flex items-baseline justify-between gap-2">
                                    <Skeleton className="h-3 w-28" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                                <Skeleton className="h-1 w-full" />
                            </div>
                            <div className="flex gap-0.5">
                                <Skeleton className="h-7 w-7" />
                                <Skeleton className="h-7 w-7" />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    if (rows.length === 0) {
        return (
            <div className="border border-dashed p-10 text-center text-xs text-muted-foreground">
                {t("empty")}
            </div>
        );
    }

    const total = rows.reduce(
        (acc, r) => {
            acc.budget += r.budgetAmount ? Number(r.budgetAmount) : 0;
            acc.spent += Number(r.spent);
            return acc;
        },
        { budget: 0, spent: 0 },
    );

    return (
        <div className="overflow-hidden rounded-md border text-xs">
            <div className="flex items-center justify-between border-b px-3 py-2">
                <span className="text-muted-foreground">{t("totalBudgeted")}</span>
                <span>
                    <span className="font-medium">{fmt(total.spent)}</span>
                    <span className="text-muted-foreground"> {t("of")} {fmt(total.budget)}</span>
                </span>
            </div>
            <ul>
                {rows.map((row) => {
                    const spent = Number(row.spent);
                    const budget = row.budgetAmount != null ? Number(row.budgetAmount) : null;
                    const pct = budget && budget > 0 ? Math.min(100, (spent / budget) * 100) : 0;
                    const over = budget != null && spent > budget;

                    return (
                        <li
                            key={row.categoryId}
                            className="grid grid-cols-[1fr_auto] items-center gap-3 border-b px-3 py-2 last:border-b-0"
                        >
                            <div className="min-w-0 space-y-1">
                                <div className="flex items-baseline justify-between gap-2">
                                    <span className="truncate font-medium">{row.categoryName}</span>
                                    <span>
                                        <span className="font-medium">{fmt(spent)}</span>
                                        {budget != null && (
                                            <span className="text-muted-foreground"> / {fmt(budget)}</span>
                                        )}
                                    </span>
                                </div>
                                {budget != null ? (
                                    <div className="h-1 w-full overflow-hidden bg-muted">
                                        <div
                                            className={`h-full transition-all ${over ? "bg-destructive" : "bg-primary"}`}
                                            style={{ width: `${over ? 100 : pct}%` }}
                                        />
                                    </div>
                                ) : (
                                    <span className="text-muted-foreground">{t("noBudgetSet")}</span>
                                )}
                            </div>
                            <div className="flex gap-0.5">
                                {row.budgetId ? (
                                    <>
                                        <Button
                                            className="cursor-pointer h-7 w-7"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onSet(row)}
                                            aria-label={t("editAria")}
                                        >
                                            <Pencil />
                                        </Button>
                                        <Button
                                            className="cursor-pointer h-7 w-7"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onDelete(row)}
                                            aria-label={t("removeAria")}
                                        >
                                            <Trash2 />
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        className="cursor-pointer h-7"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onSet(row)}
                                    >
                                        <Plus /> {t("setBudget")}
                                    </Button>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
