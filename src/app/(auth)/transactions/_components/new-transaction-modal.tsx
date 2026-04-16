'use-client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useNewTransactionModalStore } from "@/store/new-transaction-modal-store";
import NewTransactionForm from "./new-transaction-form";
import FileImportTransaction from "./file-import-transaction";

export default function NewTransactionModal() {
    const { isOpen, closeModal } = useNewTransactionModalStore();
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
            <DialogContent className="sm:max-w-[425px]">
                <Tabs defaultValue="create-transaction" className="sm:max-w-[425px]">
                    <TabsList variant="line" className="mt-2 mx-auto">
                        <TabsTrigger value="create-transaction">Create Transaction</TabsTrigger>
                        <TabsTrigger value="import-transaction">Import Transactions</TabsTrigger>
                    </TabsList>
                    <TabsContent value="create-transaction">
                        <DialogHeader>
                            <DialogTitle>
                                New transaction
                            </DialogTitle>
                            <DialogDescription>
                                Add a new transaction to your records.
                            </DialogDescription>
                        </DialogHeader>
                        <NewTransactionForm />
                    </TabsContent>
                    <TabsContent value="import-transaction">
                        <DialogHeader>
                            <DialogTitle>
                                Import transactions
                            </DialogTitle>
                            <DialogDescription>
                                Bulk import transactions in csv file
                            </DialogDescription>
                        </DialogHeader>
                        <div>LOL!!</div>
                        <FileImportTransaction />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog >
    );
}