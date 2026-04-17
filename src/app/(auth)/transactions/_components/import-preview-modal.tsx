"use client";
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
import { useImportPreviewStore } from "@/store/import-preview-store";
import { trpc } from "@/lib/trpc/client";

export default function ImportPreviewModal() {
  const { isOpen, rows, closeModal } = useImportPreviewStore();
  const utils = trpc.useUtils();
  const addTransaction = trpc.transaction.add.useMutation();

  const onConfirm = async () => {
    await Promise.all(
      rows.map((r) =>
        addTransaction.mutateAsync({
          date: new Date(r.date.replace(/\//g, "-")).toISOString(),
          amount: r.amount.trim(),
          description: r.description?.trim() ?? "",
        }),
      ),
    );
    await utils.transaction.getAll.invalidate();
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
