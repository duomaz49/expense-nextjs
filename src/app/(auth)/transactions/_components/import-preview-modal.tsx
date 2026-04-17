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
import { useImportPreviewStore } from "@/store/import-preview-store";
import { trpc } from "@/lib/trpc/client";
import CategorySelect from "@/components/shared/category-select";

export default function ImportPreviewModal() {
  const { isOpen, rows, closeModal } = useImportPreviewStore();
  const utils = trpc.useUtils();
  const addTransaction = trpc.transaction.add.useMutation();
  const [categoryId, setCategoryId] = useState<string>("");

  const onConfirm = async () => {
    await Promise.all(
      rows.map((r) =>
        addTransaction.mutateAsync({
          date: new Date(r.date.replace(/\//g, "-")).toISOString(),
          amount: r.amount.trim().replace(",", "."),
          description: r.description?.trim() ?? "",
          categoryId: categoryId || undefined,
        }),
      ),
    );
    await utils.transaction.getAll.invalidate();
    setCategoryId("");
    closeModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>Preview import</DialogTitle>
          <DialogDescription>
            {rows.length} rows ready to import.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <Label>Category (applied to all)</Label>
          <CategorySelect value={categoryId} onChange={setCategoryId} />
        </div>
        <div className="max-h-80 overflow-auto text-sm">
          <div className="grid grid-cols-3 gap-2 border-b py-1 font-medium text-muted-foreground sticky top-0 bg-background">
            <span>Date</span>
            <span>Amount</span>
            <span>Description</span>
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
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={addTransaction.isPending}>
            {addTransaction.isPending ? <Spinner /> : "Import"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
