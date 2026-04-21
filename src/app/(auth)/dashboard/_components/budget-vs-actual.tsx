"use client";

interface CategoryRow {
    categoryId: string;
    categoryName: string;
    spent: number;
    budget: number | null;
}

interface Props {
    data: CategoryRow[];
}

const fmt = new Intl.NumberFormat(undefined, { style: "currency", currency: "EUR" });

export default function BudgetVsActual({ data }: Props) {
    const withBudget = data
        .filter((r) => r.budget != null && r.budget > 0)
        .map((r) => ({
            ...r,
            budget: r.budget as number,
            pct: (r.spent / (r.budget as number)) * 100,
        }))
        .sort((a, b) => b.pct - a.pct);

    if (withBudget.length === 0) {
        return (
            <div className="border border-dashed p-6 text-center text-xs text-muted-foreground">
                No budgets set this month. Head to Budgets to add one.
            </div>
        );
    }

    return (
        <div className="border text-xs">
            <div className="border-b px-3 py-2 text-muted-foreground">Budget vs actual</div>
            <ul>
                {withBudget.map((r) => {
                    const over = r.spent > r.budget;
                    const width = Math.min(100, r.pct);
                    return (
                        <li
                            key={r.categoryId}
                            className="grid grid-cols-[1fr_auto] gap-3 border-b px-3 py-2 last:border-b-0"
                        >
                            <div className="min-w-0 space-y-1">
                                <div className="flex items-baseline justify-between gap-2">
                                    <span className="truncate font-medium">{r.categoryName}</span>
                                    <span>
                                        <span className="font-medium">{fmt.format(r.spent)}</span>
                                        <span className="text-muted-foreground"> / {fmt.format(r.budget)}</span>
                                    </span>
                                </div>
                                <div className="h-1 w-full overflow-hidden bg-muted">
                                    <div
                                        className={`h-full transition-all ${over ? "bg-destructive" : "bg-primary"}`}
                                        style={{ width: `${width}%` }}
                                    />
                                </div>
                            </div>
                            <span className={`self-center tabular-nums ${over ? "text-destructive" : "text-muted-foreground"}`}>
                                {Math.round(r.pct)}%
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
