"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useBudgetFormModalStore } from "@/store/budget-form-modal-store";
import BudgetForm from "./budget-form";

const monthLabel = (iso?: string) =>
    iso
        ? new Date(iso).toLocaleString(undefined, { month: "long", year: "numeric" })
        : "";

export default function BudgetFormModal() {
    const { isOpen, editing, closeModal } = useBudgetFormModalStore();
    const isEdit = editing?.id != null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? "Edit budget" : "Set budget"} — {editing?.categoryName}
                    </DialogTitle>
                    <DialogDescription>
                        {monthLabel(editing?.month)}
                    </DialogDescription>
                </DialogHeader>
                <BudgetForm />
            </DialogContent>
        </Dialog>
    );
}
