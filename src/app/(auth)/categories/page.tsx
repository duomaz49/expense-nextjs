"use client";

import { trpc } from "@/lib/trpc/client";
import CategoriesGrid from "./_components/CategoriesGrid";

export default function CategoriesPage() {
    const [categories] = trpc.category.getAll.useSuspenseQuery();

    return (
        <div className="md:container md:mx-auto mt-5">
            <CategoriesGrid categories={categories} />
        </div>
    );
}
