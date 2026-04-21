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
import { useCategoryFormModalStore } from "@/store/category-form-modal-store";
import { toast } from "sonner";

const schema = z.object({
    name: z.string().min(1, "Name is required"),
});

type FormValues = z.infer<typeof schema>;

export default function CategoryForm() {
    const { editing, closeModal } = useCategoryFormModalStore();
    const utils = trpc.useUtils();
    const isEdit = editing != null;

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
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
        onSuccess: () => onSuccess("Category added"),
        onError: () => toast.error("Failed to add category"),
    });

    const editCategory = trpc.category.edit.useMutation({
        onSuccess: () => onSuccess("Category updated"),
        onError: () => toast.error("Failed to update category"),
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
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input autoFocus {...field} />
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
