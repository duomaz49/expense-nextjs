"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import CategoriesGrid from "./_components/CategoriesGrid";
import CategoryFormModal from "./_components/category-form-modal";
import PagePagination from "@/components/shared/PagePagination";
import ConfirmationModal from "@/components/shared/confirmation-modal";
import { useCategoryFormModalStore } from "@/store/category-form-modal-store";
import { useConfirmationModalStore } from "@/store/confirmation-modal-store";

const PAGE_SIZE = 12;

export default function CategoriesPage() {
    const [categories] = trpc.category.getOverview.useSuspenseQuery();
    const [page, setPage] = useState(0);
    const { openAdd, openEdit } = useCategoryFormModalStore();
    const { openConfirmModal, closeModal: closeConfirm } = useConfirmationModalStore();
    const utils = trpc.useUtils();

    const deleteCategory = trpc.category.delete.useMutation({
        onSuccess: () => {
            utils.category.getOverview.invalidate();
            utils.category.getAll.invalidate();
            toast.success("Category deleted");
            closeConfirm();
        },
        onError: () => toast.error("Failed to delete category"),
    });

    const start = page * PAGE_SIZE;
    const visible = categories.slice(start, start + PAGE_SIZE);
    const totalPages = Math.ceil(categories.length / PAGE_SIZE);

    const handleEdit = (id: string) => {
        const target = categories.find((c) => c.id === id);
        if (target) openEdit({ id: target.id, name: target.name });
    };

    const handleDelete = (id: string) => {
        const target = categories.find((c) => c.id === id);
        openConfirmModal({
            title: `Delete "${target?.name ?? "category"}"?`,
            description: "Transactions in this category will keep their data but lose the link.",
            onConfirm: () => deleteCategory.mutate(id),
        });
    };

    return (
        <div className="md:container md:mx-auto mt-5 space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold">Categories</h1>
                <Button className="cursor-pointer" size="sm" onClick={openAdd}>
                    <Plus /> New Category
                </Button>
            </div>
            <CategoriesGrid
                categories={visible}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <PagePagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
            <CategoryFormModal />
            <ConfirmationModal />
        </div>
    );
}
