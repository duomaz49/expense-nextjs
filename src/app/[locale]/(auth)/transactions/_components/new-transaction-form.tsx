"use client";
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
import { useNewTransactionModalStore } from "@/store/new-transaction-modal-store";
import CategorySelect from "@/components/shared/category-select";
import { toast } from "sonner";

const makeSchema = (t: (key: string) => string) =>
  z.object({
    date: z.string().min(1, t("dateRequired")),
    amount: z.string().min(1, t("amountRequired")),
    description: z.string().min(1, t("descriptionRequired")),
    categoryId: z.string().optional(),
    type: z.enum(["income", "expense"]),
  });

type FormValues = z.infer<ReturnType<typeof makeSchema>>;

export default function NewTransactionForm() {
  const t = useTranslations("transactions.form");
  const tToast = useTranslations("transactions.toasts");
  const tValidation = useTranslations("validation");
  const { closeModal } = useNewTransactionModalStore();
  const utils = trpc.useUtils();

  const form = useForm<FormValues>({
    resolver: zodResolver(makeSchema(tValidation)),
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
      toast.success(tToast("added"));
      closeModal();
    },
    onError: () => {
      toast.error(tToast("addFailed"));
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
              <FormLabel>{t("date")}</FormLabel>
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
              <FormLabel>{t("type")}</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={field.value === "expense" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => field.onChange("expense")}
                  >
                    {t("expense")}
                  </Button>
                  <Button
                    type="button"
                    variant={field.value === "income" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => field.onChange("income")}
                  >
                    {t("income")}
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
              <FormLabel>{t("amount")}</FormLabel>
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
              <FormLabel>{t("description")}</FormLabel>
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
              <FormLabel>{t("category")}</FormLabel>
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
          {addTransaction.isPending ? <Spinner /> : t("save")}
        </Button>
      </form>
    </Form>
  );
}
