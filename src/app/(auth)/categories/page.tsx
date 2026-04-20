"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc/client";
import CategoriesGrid from "./_components/CategoriesGrid";
import PagePagination from "@/components/shared/PagePagination";

const PAGE_SIZE = 12;

export default function CategoriesPage() {
    const [categories] = trpc.category.getAll.useSuspenseQuery();
    const [page, setPage] = useState(0);

    const start = page * PAGE_SIZE;
    const visible = categories.slice(start, start + PAGE_SIZE);
    const totalPages = Math.ceil(categories.length / PAGE_SIZE);

    return (
        <div className="md:container md:mx-auto mt-5">
            <CategoriesGrid categories={visible} />
            <PagePagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    );
}
