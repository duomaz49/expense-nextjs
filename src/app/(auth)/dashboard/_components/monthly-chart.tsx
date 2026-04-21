"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";

interface MonthlyRow {
    month: string;
    income: number;
    spent: number;
    count: number;
}

interface Props {
    data: MonthlyRow[];
}

const config = {
    spent: { label: "Spent", color: "var(--chart-1)" },
    income: { label: "Income", color: "var(--chart-2)" },
} satisfies ChartConfig;

const monthLabel = (iso: string) =>
    new Date(iso).toLocaleString(undefined, { month: "short" });

export default function MonthlyChart({ data }: Props) {
    const chartData = data.map((r) => ({
        month: monthLabel(r.month),
        spent: r.spent,
        income: r.income,
    }));

    return (
        <div className="border p-3 space-y-2">
            <div className="text-xs text-muted-foreground">Last 6 months</div>
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
