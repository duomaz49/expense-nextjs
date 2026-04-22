"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { useCategoryFormModalStore } from "@/store/category-form-modal-store";
import CategoryForm from "./category-form";

export default function CategoryFormModal() {
    const t = useTranslations("categories.form");
    const { isOpen, editing, closeModal } = useCategoryFormModalStore();
    const isEdit = editing != null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isEdit ? t("editTitle") : t("newTitle")}</DialogTitle>
                    <DialogDescription>
                        {isEdit ? t("editDescription") : t("newDescription")}
                    </DialogDescription>
                </DialogHeader>
                <CategoryForm />
            </DialogContent>
        </Dialog>
    );
}
