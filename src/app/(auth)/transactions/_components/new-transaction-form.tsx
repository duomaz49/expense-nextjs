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
import { toast } from "sonner";

const schema = z.object({
  date: z.string().min(1, "Date is required"),
  amount: z.string().min(1, "Amount is required"),
  description: z.string().min(1, "Description is required"),
  categoryId: z.string().optional(),
  type: z.enum(["income", "expense"]),
});

type FormValues = z.infer<typeof schema>;

export default function NewTransactionForm() {
  const { closeModal } = useNewTransactionModalStore();
  const utils = trpc.useUtils();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: "",
      amount: "",
      description: "",
      categoryId: "",
      type: "expense",
    },
  });

  const addTransaction = trpc.transaction.add.useMutation({
    onSuccess: () => {
      utils.transaction.getAll.invalidate();
      toast.success("Transaction added");
      closeModal();
    },
    onError: () => {
      toast.error("Failed to add transaction");
    },
  });

  const onSubmit = (values: FormValues) => {
    const magnitude = Math.abs(parseFloat(values.amount));
    const signed = values.type === "expense" ? -magnitude : magnitude;
    addTransaction.mutate({
      date: new Date(values.date).toISOString(),
      amount: signed.toString(),
      description: values.description,
      categoryId: values.categoryId,
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
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={field.value === "expense" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => field.onChange("expense")}
                  >
                    Expense
                  </Button>
                  <Button
                    type="button"
                    variant={field.value === "income" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => field.onChange("income")}
                  >
                    Income
                  </Button>
                </div>
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
                <Input type="number" min="0" step="0.01" {...field} />
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
                  className="w-full"
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
