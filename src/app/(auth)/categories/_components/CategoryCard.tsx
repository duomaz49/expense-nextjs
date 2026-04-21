"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export interface CategoryOverview {
    id: string;
    name: string;
    budget: string | null;
    spent: string;
    txnCount: number;
}

interface CategoryCardProps {
    category: CategoryOverview;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

const fmt = new Intl.NumberFormat(undefined, { style: "currency", currency: "EUR" });

export default function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps) {
    const spent = Number(category.spent);
    const budget = category.budget != null ? Number(category.budget) : null;
    const pct = budget && budget > 0 ? Math.min(100, (spent / budget) * 100) : 0;
    const over = budget != null && spent > budget;

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2">
                    <span className="truncate">{category.name}</span>
                    <div className="flex gap-0.5">
                        <Button
                            className="cursor-pointer h-7 w-7"
                            variant="ghost"
                            size="icon"
                            onClick={() => onEdit?.(category.id)}
                            aria-label="Edit category"
                        >
                            <Pencil />
                        </Button>
                        <Button
                            className="cursor-pointer h-7 w-7"
                            variant="destructive"
                            size="icon"
                            onClick={() => onDelete?.(category.id)}
                            aria-label="Delete category"
                        >
                            <Trash2 />
                        </Button>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex items-baseline justify-between">
                    <span className="font-medium">{fmt.format(spent)}</span>
                    <span className="text-muted-foreground">
                        {budget != null ? `of ${fmt.format(budget)}` : "no budget"}
                    </span>
                </div>
                {budget != null && (
                    <div className="h-1.5 w-full overflow-hidden bg-muted">
                        <div
                            className={`h-full transition-all ${over ? "bg-destructive" : "bg-primary"}`}
                            style={{ width: `${over ? 100 : pct}%` }}
                        />
                    </div>
                )}
                <div className="text-muted-foreground">
                    {category.txnCount} {category.txnCount === 1 ? "transaction" : "transactions"} this month
                </div>
            </CardContent>
        </Card>
    );
}
