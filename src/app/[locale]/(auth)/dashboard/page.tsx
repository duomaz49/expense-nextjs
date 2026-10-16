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

type Period = "month" | "year" | "all";

export default function DashboardPage() {
    const t = useTranslations("dashboard");
    const tKpi = useTranslations("dashboard.kpi");
    const [period, setPeriod] = useState<Period>("month");
    const { data, isPending, isError, refetch } = trpc.dashboard.getSummary.useQuery({
        period,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    const periodLabel = tKpi(period === "all" ? "allTime" : period === "year" ? "thisYear" : "thisMonth");
    const vsLabel = period === "month" ? tKpi("vsLastMonth") : tKpi("vsLastYear");

    return (
        <div className="md:container md:mx-auto mt-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-lg font-semibold">{t("title")}</h1>
                <div className="flex flex-wrap gap-1 border p-0.5 text-xs" role="group" aria-label={t("period")}>
                    <Button
                        type="button"
                        variant={period === "month" ? "default" : "ghost"}
                        size="sm"
                        className="h-7 cursor-pointer"
                        onClick={() => setPeriod("month")}
                        aria-pressed={period === "month"}
                    >
                        {tKpi("thisMonth")}
                    </Button>
                    <Button
                        type="button"
                        variant={period === "year" ? "default" : "ghost"}
                        size="sm"
                        className="h-7 cursor-pointer"
                        onClick={() => setPeriod("year")}
                        aria-pressed={period === "year"}
                    >
                        {tKpi("thisYear")}
                    </Button>
                    <Button
                        type="button"
                        variant={period === "all" ? "default" : "ghost"}
                        size="sm"
                        className="h-7 cursor-pointer"
                        onClick={() => setPeriod("all")}
                        aria-pressed={period === "all"}
                    >
                        {tKpi("allTime")}
                    </Button>
                </div>
            </div>
            {isError ? (
                <div role="alert" className="space-y-2">
                    <p>{t("loadError")}</p>
                    <Button variant="outline" onClick={() => refetch()}>{t("retry")}</Button>
                </div>
            ) : isPending || !data ? <DashboardSkeleton /> : (
                <>
                    <KpiStrip current={data.current} previous={data.previous} vsLabel={vsLabel} />
                    <div className="grid gap-4 md:grid-cols-12">
                        <div className="min-w-0 md:col-span-8">
                            <MonthlyChart data={data.monthly} period={period} />
                        </div>
                        <div className="min-w-0 md:col-span-4">
                            <CategoryDonut data={data.byCategory} periodLabel={periodLabel} />
                        </div>
                    </div>
                    <BudgetVsActual data={data.byCategory} />
                </>
            )}
        </div>
    );
}
