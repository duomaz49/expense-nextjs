"use client";

import { Cell, Pie, PieChart } from "recharts";
import { useLocale, useTranslations } from "next-intl";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";
import { formatCurrency } from "@/lib/formatters";

interface CategoryRow {
    categoryId: string;
    categoryName: string;
    spent: number;
    budget: number | null;
}

interface Props {
    data: CategoryRow[];
}

const PALETTE = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
];

export default function CategoryDonut({ data }: Props) {
    const locale = useLocale();
    const t = useTranslations("dashboard.categoryDonut");
    const positive = data.filter((r) => r.spent > 0);
    const total = positive.reduce((sum, r) => sum + r.spent, 0);

    const config = Object.fromEntries(
        positive.map((r, i) => [r.categoryId, { label: r.categoryName, color: PALETTE[i % PALETTE.length] }]),
    ) satisfies ChartConfig;

    return (
        <div className="border p-3 space-y-2 h-full">
            <div className="text-xs text-muted-foreground">{t("byCategory")}</div>
            {positive.length === 0 ? (
                <div className="flex h-56 items-center justify-center text-xs text-muted-foreground">
                    {t("noSpending")}
                </div>
            ) : (
                <>
                    <ChartContainer config={config} className="h-40 w-full">
                        <PieChart>
                            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                            <Pie
                                data={positive}
                                dataKey="spent"
                                nameKey="categoryName"
                                innerRadius={40}
                                outerRadius={70}
                                paddingAngle={2}
                            >
                                {positive.map((r, i) => (
                                    <Cell key={r.categoryId} fill={PALETTE[i % PALETTE.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                    <ul className="space-y-1 text-xs">
                        {positive.map((r, i) => (
                            <li key={r.categoryId} className="flex items-center justify-between gap-2">
                                <span className="flex items-center gap-2 truncate">
                                    <span
                                        className="inline-block h-2 w-2"
                                        style={{ background: PALETTE[i % PALETTE.length] }}
                                    />
                                    <span className="truncate">{r.categoryName}</span>
                                </span>
                                <span className="text-muted-foreground">
                                    {Math.round((r.spent / total) * 100)}% · {formatCurrency(r.spent, locale)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}
