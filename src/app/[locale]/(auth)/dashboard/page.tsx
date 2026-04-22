"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@/components/ui/button";
import KpiStrip from "./_components/kpi-strip";
import MonthlyChart from "./_components/monthly-chart";
import CategoryDonut from "./_components/category-donut";
import BudgetVsActual from "./_components/budget-vs-actual";
import DashboardSkeleton from "./_components/dashboard-skeleton";

type Period = "month" | "year";

export default function DashboardPage() {
    const t = useTranslations("dashboard");
    const tKpi = useTranslations("dashboard.kpi");
    const [period, setPeriod] = useState<Period>("month");
    const { data, isPending } = trpc.dashboard.getSummary.useQuery();

    if (isPending || !data) return <DashboardSkeleton />;

    const current = period === "month" ? data.current : data.currentYear;
    const previous = period === "month" ? data.previous : data.previousYear;
    const vsLabel = period === "month" ? tKpi("vsLastMonth") : tKpi("vsLastYear");

    return (
        <div className="md:container md:mx-auto mt-5 space-y-4">
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-lg font-semibold">{t("title")}</h1>
                <div className="flex gap-1 border p-0.5 text-xs">
                    <Button
                        type="button"
                        variant={period === "month" ? "default" : "ghost"}
                        size="sm"
                        className="h-7 cursor-pointer"
                        onClick={() => setPeriod("month")}
                    >
                        {tKpi("thisMonth")}
                    </Button>
                    <Button
                        type="button"
                        variant={period === "year" ? "default" : "ghost"}
                        size="sm"
                        className="h-7 cursor-pointer"
                        onClick={() => setPeriod("year")}
                    >
                        {tKpi("thisYear")}
                    </Button>
                </div>
            </div>
            <KpiStrip current={current} previous={previous} vsLabel={vsLabel} />
            <div className="grid gap-4 md:grid-cols-12">
                <div className="md:col-span-8">
                    <MonthlyChart data={data.monthly} />
                </div>
                <div className="md:col-span-4">
                    <CategoryDonut data={data.byCategory} />
                </div>
            </div>
            <BudgetVsActual data={data.byCategory} />
        </div>
    );
}
