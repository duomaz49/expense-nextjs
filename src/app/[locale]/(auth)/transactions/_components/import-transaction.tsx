"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Papa from "papaparse";
import { useTranslations } from "next-intl";
import { StagedRow, useImportPreviewStore } from "@/store/import-preview-store";
import { useNewTransactionModalStore } from "@/store/new-transaction-modal-store";

const MAX_SIZE = 1000000;

const makeSchema = (message: string) =>
  z.object({
    file: z.instanceof(File).refine((file) => file.size < MAX_SIZE, { message }),
  });

type FormValues = z.infer<ReturnType<typeof makeSchema>>;

const HEADER_MAP: Record<string, "date" | "amount" | "description"> = {
  kirjauspäivä: "date",
  "booking date": "date",
  määrä: "amount",
  amount: "amount",
  otsikko: "description",
  title: "description",
};

export default function ImportTransaction() {
  const t = useTranslations("transactions.import");
  const form = useForm<FormValues>({
    resolver: zodResolver(makeSchema(t("fileTooLarge"))),
    defaultValues: { file: undefined },
  });
  const openImportPreview = useImportPreviewStore((s) => s.openImportPreview);
  const closeNewTransaction = useNewTransactionModalStore((s) => s.closeModal);

  const onSubmit = (values: FormValues) => {
    Papa.parse<Record<string, string>>(values.file, {
      header: true,
      delimiter: ";",
      skipEmptyLines: true,
      complete: ({ data }) => {
        const rows: StagedRow[] = data.map((row) => {
          const out: Partial<StagedRow> = { categoryId: null };
          for (const [header, value] of Object.entries(row)) {
            const field = HEADER_MAP[header.trim().toLowerCase()];
            if (field) out[field] = value;
          }
          return out as StagedRow;
        });
        openImportPreview(rows);
        closeNewTransaction();
        form.reset();
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("csvFile")}</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".csv"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{t("preview")}</Button>
      </form>
    </Form>
  );
}
