"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useLocale, useTranslations } from "next-intl";
import { useBudgetFormModalStore } from "@/store/budget-form-modal-store";
import BudgetForm from "./budget-form";
import { formatMonthYear } from "@/lib/formatters";

export default function BudgetFormModal() {
    const t = useTranslations("budgets.form");
    const locale = useLocale();
    const { isOpen, editing, closeModal } = useBudgetFormModalStore();
    const isEdit = editing?.id != null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? t("editTitle") : t("setTitle")} — {editing?.categoryName}
                    </DialogTitle>
                    <DialogDescription>
                        {editing?.month ? formatMonthYear(editing.month, locale) : ""}
                    </DialogDescription>
                </DialogHeader>
                <BudgetForm />
            </DialogContent>
        </Dialog>
    );
}
