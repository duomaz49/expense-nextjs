"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { useImportPreviewStore } from "@/store/import-preview-store";
import { trpc } from "@/lib/trpc/client";
import CategorySelect from "@/components/shared/category-select";
import { toast } from "sonner";

export default function ImportPreviewModal() {
  const t = useTranslations("transactions.import");
  const tToast = useTranslations("transactions.toasts");
  const tCommon = useTranslations("common");
  const { isOpen, rows, closeModal } = useImportPreviewStore();
  const utils = trpc.useUtils();
  const addMany = trpc.transaction.addMany.useMutation();
  const [categoryId, setCategoryId] = useState<string>("");

  const onConfirm = async () => {
    const payload = rows.map((r) => ({
      date: new Date(r.date.replace(/\//g, "-")).toISOString(),
      amount: r.amount.trim().replace(",", "."),
      description: r.description?.trim() ?? "",
      categoryId: categoryId || undefined,
    }));
    try {
      await addMany.mutateAsync({ rows: payload });
      await utils.transaction.getAll.invalidate();
      toast.success(tToast("imported", { count: payload.length }));
      setCategoryId("");
      closeModal();
    } catch {
      toast.error(tToast("importFailed"));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>{t("previewTitle")}</DialogTitle>
          <DialogDescription>
            {t("previewRows", { count: rows.length })}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <Label>{t("categoryAppliedToAll")}</Label>
          <CategorySelect value={categoryId} onChange={setCategoryId} />
        </div>
        <div className="max-h-80 overflow-auto text-sm">
          <div className="grid grid-cols-3 gap-2 border-b py-1 font-medium text-muted-foreground sticky top-0 bg-background">
            <span>{t("date")}</span>
            <span>{t("amount")}</span>
            <span>{t("description")}</span>
          </div>
          {rows.map((r, i) => (
            <div key={i} className="grid grid-cols-3 gap-2 border-b py-1">
              <span>{r.date}</span>
              <span>{r.amount}</span>
              <span className="truncate">{r.description}</span>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={closeModal}>
            {tCommon("cancel")}
          </Button>
          <Button onClick={onConfirm} disabled={addMany.isPending}>
            {addMany.isPending ? <Spinner /> : tCommon("import")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
