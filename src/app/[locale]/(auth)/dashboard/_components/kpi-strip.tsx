"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { formatCurrency } from "@/lib/formatters";

interface Totals {
    income: number;
    spent: number;
    net: number;
    count: number;
}

interface Props {
    current: Totals;
    previous: Totals;
    vsLabel: string;
}

const delta = (current: number, previous: number) => {
    if (previous === 0) return null;
    const pct = ((current - previous) / Math.abs(previous)) * 100;
    return Math.round(pct);
};

const Card = ({
    label,
    value,
    deltaPct,
    deltaIsGood,
    vsLabel,
}: {
    label: string;
    value: string;
    deltaPct: number | null;
    deltaIsGood?: (pct: number) => boolean;
    vsLabel: string;
}) => {
    const isGood = deltaPct == null ? null : deltaIsGood?.(deltaPct) ?? deltaPct >= 0;
    return (
        <div className="border p-3 space-y-1">
            <div className="text-xs text-muted-foreground">{label}</div>
            <div className="text-lg font-semibold">{value}</div>
            {deltaPct != null && (
                <div
                    className={`flex items-center gap-1 text-xs ${
                        isGood ? "text-emerald-600" : "text-destructive"
                    }`}
                >
                    {deltaPct >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                    {Math.abs(deltaPct)}
                    {vsLabel}
                </div>
            )}
        </div>
    );
};

export default function KpiStrip({ current, previous, vsLabel }: Props) {
    const locale = useLocale();
    const t = useTranslations("dashboard.kpi");
    return (
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            <Card
                label={t("income")}
                value={formatCurrency(current.income, locale)}
                deltaPct={delta(current.income, previous.income)}
                deltaIsGood={(p) => p >= 0}
                vsLabel={vsLabel}
            />
            <Card
                label={t("spent")}
                value={formatCurrency(current.spent, locale)}
                deltaPct={delta(current.spent, previous.spent)}
                deltaIsGood={(p) => p <= 0}
                vsLabel={vsLabel}
            />
            <Card
                label={t("net")}
                value={formatCurrency(current.net, locale)}
                deltaPct={delta(current.net, previous.net)}
                deltaIsGood={(p) => p >= 0}
                vsLabel={vsLabel}
            />
            <Card
                label={t("transactions")}
                value={String(current.count)}
                deltaPct={delta(current.count, previous.count)}
                deltaIsGood={() => true}
                vsLabel={vsLabel}
            />
        </div>
    );
}
