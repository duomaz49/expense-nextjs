"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import { useNewTransactionModalStore } from "@/store/new-transaction-modal-store";
import NewTransactionForm from "./new-transaction-form";
import ImportTransaction from "./import-transaction";

export default function NewTransactionModal() {
  const t = useTranslations("transactions.modal");
  const { isOpen, closeModal } = useNewTransactionModalStore();
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="sm:max-w-[425px]">
        <Tabs defaultValue="create-transaction" className="sm:max-w-[425px]">
          <TabsList variant="line" className="mt-2 mx-auto">
            <TabsTrigger value="create-transaction">{t("createTab")}</TabsTrigger>
            <TabsTrigger value="import-transaction">{t("importTab")}</TabsTrigger>
          </TabsList>
          <TabsContent value="create-transaction">
            <DialogHeader>
              <DialogTitle>{t("newTitle")}</DialogTitle>
              <DialogDescription>{t("newDescription")}</DialogDescription>
            </DialogHeader>
            <NewTransactionForm />
          </TabsContent>
          <TabsContent value="import-transaction">
            <DialogHeader>
              <DialogTitle>{t("importTitle")}</DialogTitle>
              <DialogDescription>{t("importDescription")}</DialogDescription>
            </DialogHeader>
            <ImportTransaction />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
