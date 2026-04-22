"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useLocale, useTranslations } from "next-intl";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";
import { formatMonthShort } from "@/lib/formatters";

interface MonthlyRow {
    month: string;
    income: number;
    spent: number;
    count: number;
}

interface Props {
    data: MonthlyRow[];
}

export default function MonthlyChart({ data }: Props) {
    const locale = useLocale();
    const t = useTranslations("dashboard.monthlyChart");

    const config = {
        spent: { label: t("spent"), color: "var(--chart-1)" },
        income: { label: t("income"), color: "var(--chart-2)" },
    } satisfies ChartConfig;

    const chartData = data.map((r) => ({
        month: formatMonthShort(r.month, locale),
        spent: r.spent,
        income: r.income,
    }));

    return (
        <div className="border p-3 space-y-2">
            <div className="text-xs text-muted-foreground">{t("last6Months")}</div>
            <ChartContainer config={config} className="h-56 w-full">
                <BarChart data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} width={40} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="income" fill="var(--color-income)" />
                    <Bar dataKey="spent" fill="var(--color-spent)" />
                </BarChart>
            </ChartContainer>
        </div>
    );
}
