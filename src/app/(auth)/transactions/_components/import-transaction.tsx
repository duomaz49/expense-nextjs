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
import { StagedRow, useImportPreviewStore } from "@/store/import-preview-store";
import { useNewTransactionModalStore } from "@/store/new-transaction-modal-store";

const MAX_SIZE = 1000000;

const schema = z.object({
  file: z.instanceof(File).refine(
    (file) => {
      if (file.size < MAX_SIZE) {
        return true;
      }
      return false;
    },
    {
      message: "Maximum file size is 1mb.",
    },
  ),
});

type FormValues = z.infer<typeof schema>;

//Supports only NORDEA eng and fin csv atmO
const HEADER_MAP: Record<string, "date" | "amount" | "description"> = {
  kirjauspäivä: "date",
  "booking date": "date",
  määrä: "amount",
  amount: "amount",
  otsikko: "description",
  title: "description",
};

export default function ImportTransaction() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
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
              <FormLabel>CSV File</FormLabel>
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
        <Button type="submit">Preview</Button>
      </form>
    </Form>
  );
}
