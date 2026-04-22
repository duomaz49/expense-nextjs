"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
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

const makeSchema = (message: string) =>
    z.object({
        amount: z.string().min(1, message),
    });

type FormValues = z.infer<ReturnType<typeof makeSchema>>;

export default function BudgetForm() {
    const t = useTranslations("budgets.form");
    const tToast = useTranslations("budgets.toasts");
    const tValidation = useTranslations("validation");
    const { editing, closeModal } = useBudgetFormModalStore();
    const utils = trpc.useUtils();
    const isEdit = editing?.id != null;

    const form = useForm<FormValues>({
        resolver: zodResolver(makeSchema(tValidation("amountRequired"))),
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
        onSuccess: () => onSuccess(tToast("added")),
        onError: () => toast.error(tToast("addFailed")),
    });

    const editBudget = trpc.budget.edit.useMutation({
        onSuccess: () => onSuccess(tToast("updated")),
        onError: () => toast.error(tToast("updateFailed")),
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
                            <FormLabel>{t("amount")}</FormLabel>
                            <FormControl>
                                <Input autoFocus type="number" min="0" step="0.01" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={pending}>
                    {pending ? <Spinner /> : isEdit ? t("save") : t("create")}
                </Button>
            </form>
        </Form>
    );
}
