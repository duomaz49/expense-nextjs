"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { trpc } from "@/lib/trpc/client";
import { useBudgetFormModalStore } from "@/store/budget-form-modal-store";
import { toast } from "sonner";

const schema = z.object({
    amount: z.string().min(1, "Amount is required"),
});

type FormValues = z.infer<typeof schema>;

export default function BudgetForm() {
    const { editing, closeModal } = useBudgetFormModalStore();
    const utils = trpc.useUtils();
    const isEdit = editing?.id != null;

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { amount: "" },
    });

    useEffect(() => {
        form.reset({ amount: editing?.amount ?? "" });
    }, [editing, form]);

    const onSuccess = (msg: string) => {
        utils.budget.getOverview.invalidate();
        utils.budget.getAll.invalidate();
        toast.success(msg);
        closeModal();
    };

    const addBudget = trpc.budget.add.useMutation({
        onSuccess: () => onSuccess("Budget added"),
        onError: () => toast.error("Failed to add budget"),
    });

    const editBudget = trpc.budget.edit.useMutation({
        onSuccess: () => onSuccess("Budget updated"),
        onError: () => toast.error("Failed to update budget"),
    });

    const onSubmit = (values: FormValues) => {
        if (!editing) return;
        if (isEdit && editing.id) {
            editBudget.mutate({
                id: editing.id,
                amount: values.amount,
                month: editing.month,
                categoryId: editing.categoryId,
            });
        } else {
            addBudget.mutate({
                amount: values.amount,
                month: editing.month,
                categoryId: editing.categoryId,
            });
        }
    };

    const pending = addBudget.isPending || editBudget.isPending;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <Input autoFocus type="number" min="0" step="0.01" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={pending}>
                    {pending ? <Spinner /> : isEdit ? "Save" : "Create"}
                </Button>
            </form>
        </Form>
    );
}
