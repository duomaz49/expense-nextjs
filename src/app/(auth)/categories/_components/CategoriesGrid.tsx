"use client";

import { Category } from "@/lib/types/types";
import CategoryCard from "./CategoryCard";

interface CategoryGridProps {
    categories: Category[];
}

export default function CategoriesGrid({ categories }: CategoryGridProps) {
    return (
        <div className="grid max-wsm grid-cols-4">
            {categories.map(c => (
                <div key={c.id} className="mb-2 mx-2">
                    <CategoryCard category={c} />
                </div>
            ))}
        </div>
    );
}
