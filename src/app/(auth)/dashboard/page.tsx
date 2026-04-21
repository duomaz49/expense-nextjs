"use client";

import { trpc } from "@/lib/trpc/client";
import KpiStrip from "./_components/kpi-strip";
import MonthlyChart from "./_components/monthly-chart";
import CategoryDonut from "./_components/category-donut";
import BudgetVsActual from "./_components/budget-vs-actual";
import DashboardSkeleton from "./_components/dashboard-skeleton";

export default function DashboardPage() {
    const { data, isPending } = trpc.dashboard.getSummary.useQuery();

    if (isPending || !data) return <DashboardSkeleton />;

    return (
        <div className="md:container md:mx-auto mt-5 space-y-4">
            <h1 className="text-lg font-semibold">Dashboard</h1>
            <KpiStrip current={data.current} previous={data.previous} />
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
