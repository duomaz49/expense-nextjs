"use client";

import { useTranslations } from "next-intl";
import CategoryCard, { CategoryOverview } from "./CategoryCard";

interface CategoryGridProps {
    categories: CategoryOverview[];
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export default function CategoriesGrid({ categories, onEdit, onDelete }: CategoryGridProps) {
    const t = useTranslations("categories.grid");
    if (categories.length === 0) {
        return (
            <div className="rounded-lg border border-dashed p-10 text-center text-muted-foreground">
                {t("empty")}
            </div>
        );
    }

    return (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((c) => (
                <CategoryCard
                    key={c.id}
                    category={c}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
