'use-client'
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { trpc } from "@/lib/trpc/client";
import { useNewTransactionModalStore } from "@/store/new-transaction-modal-store";
import { useState } from "react";

export default function NewTransactionModal() {
    const { isOpen, closeModal } = useNewTransactionModalStore();
    const utils = trpc.useUtils();
    const { data: categories = [] } = trpc.category.getAll.useQuery();

    const [date, setDate] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [categoryId, setCategoryId] = useState<string>("");

    const addTransaction = trpc.transaction.add.useMutation({
        onSuccess: () => {
            utils.transaction.getAll.invalidate();
            closeModal();
        }
    });


    const handleSubmit = () => {
        addTransaction.mutate({
            date: new Date(date).toISOString(),
            amount,
            description,
            categoryId,
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        New transaction
                    </DialogTitle>
                    <DialogDescription>
                        Add a new transaction to your records.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="date">Date</Label>
                        <Input id="date" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="date">Amount</Label>
                        <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="date">Description</Label>
                        <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label>Category</Label>
                        <Select value={categoryId} onValueChange={setCategoryId}>
                            <SelectTrigger className="w-100"><SelectValue placeholder="Select category"></SelectValue></SelectTrigger>
                            <SelectContent>
                                {categories.map((c) => (
                                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button className="min-w-20" type="submit" onClick={handleSubmit}>
                        {addTransaction.isPending ? <Spinner /> : "Save"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}