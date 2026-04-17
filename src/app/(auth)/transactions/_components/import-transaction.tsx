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
import { trpc } from "@/lib/trpc/client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import Papa from "papaparse";

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

type CsvRow = {
  Kirjauspäivä: string;
  Määrä: string;
  Otsikko: string;
};

export default function ImportTransaction() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { file: undefined },
  });
  const utils = trpc.useUtils();
  const addTransaction = trpc.transaction.add.useMutation();

  const onSubmit = (values: FormValues) => {
    Papa.parse<CsvRow>(values.file, {
      header: true,
      delimiter: ";",
      skipEmptyLines: true,
      complete: async ({ data }) => {
        console.log(data);
        await Promise.all(
          data.map((row) =>
            addTransaction.mutateAsync({
              date: new Date(row.Kirjauspäivä.replace(/\//g, "-")).toISOString(),
              amount: row.Määrä.trim(),
              description: row.Otsikko?.trim() ?? "",
            }),
          ),
        );
        await utils.transaction.getAll.invalidate();
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
        <Button type="submit" disabled={addTransaction.isPending}>
          {addTransaction.isPending ? <Spinner /> : "Import"}
        </Button>
      </form>
    </Form>
  );
}

