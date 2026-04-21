"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useCategoryFormModalStore } from "@/store/category-form-modal-store";
import CategoryForm from "./category-form";

export default function CategoryFormModal() {
    const { isOpen, editing, closeModal } = useCategoryFormModalStore();
    const isEdit = editing != null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Edit category" : "New category"}</DialogTitle>
                    <DialogDescription>
                        {isEdit ? "Rename an existing category." : "Create a new category to track spending."}
                    </DialogDescription>
                </DialogHeader>
                <CategoryForm />
            </DialogContent>
        </Dialog>
    );
}
