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
import { useCategoryFormModalStore } from "@/store/category-form-modal-store";
import { toast } from "sonner";

const makeSchema = (message: string) =>
    z.object({
        name: z.string().min(1, message),
    });

type FormValues = z.infer<ReturnType<typeof makeSchema>>;

export default function CategoryForm() {
    const t = useTranslations("categories.form");
    const tToast = useTranslations("categories.toasts");
    const tValidation = useTranslations("validation");
    const { editing, closeModal } = useCategoryFormModalStore();
    const utils = trpc.useUtils();
    const isEdit = editing != null;

    const form = useForm<FormValues>({
        resolver: zodResolver(makeSchema(tValidation("nameRequired"))),
        defaultValues: { name: "" },
    });

    useEffect(() => {
        form.reset({ name: editing?.name ?? "" });
    }, [editing, form]);

    const onSuccess = (msg: string) => {
        utils.category.getOverview.invalidate();
        utils.category.getAll.invalidate();
        toast.success(msg);
        closeModal();
    };

    const addCategory = trpc.category.add.useMutation({
        onSuccess: () => onSuccess(tToast("added")),
        onError: () => toast.error(tToast("addFailed")),
    });

    const editCategory = trpc.category.edit.useMutation({
        onSuccess: () => onSuccess(tToast("updated")),
        onError: () => toast.error(tToast("updateFailed")),
    });

    const onSubmit = (values: FormValues) => {
        if (isEdit) {
            editCategory.mutate({ id: editing.id, name: values.name });
        } else {
            addCategory.mutate({ name: values.name });
        }
    };

    const pending = addCategory.isPending || editCategory.isPending;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("name")}</FormLabel>
                            <FormControl>
                                <Input autoFocus {...field} />
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
