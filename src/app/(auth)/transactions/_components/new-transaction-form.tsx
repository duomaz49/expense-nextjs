"use client";
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
import { useNewTransactionModalStore } from "@/store/new-transaction-modal-store";
import CategorySelect from "@/components/shared/category-select";

const schema = z.object({
  date: z.string().min(1, "Date is required"),
  amount: z.string().min(1, "Amount is required"),
  description: z.string().min(1, "Description is required"),
  categoryId: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function NewTransactionForm() {
  const { closeModal } = useNewTransactionModalStore();
  const utils = trpc.useUtils();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { date: "", amount: "", description: "", categoryId: "" },
  });

  const addTransaction = trpc.transaction.add.useMutation({
    onSuccess: () => {
      utils.transaction.getAll.invalidate();
      closeModal();
    },
  });

  const onSubmit = (values: FormValues) => {
    addTransaction.mutate({
      ...values,
      date: new Date(values.date).toISOString(),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <CategorySelect
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  className="w-100"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="min-w-20"
          type="submit"
          disabled={addTransaction.isPending}
        >
          {addTransaction.isPending ? <Spinner /> : "Save"}
        </Button>
      </form>
    </Form>
  );
}
