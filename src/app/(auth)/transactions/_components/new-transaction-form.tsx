"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { trpc } from "@/lib/trpc/client";
import { useNewTransactionModalStore } from "@/store/new-transaction-modal-store";

const schema = z.object({
    date: z.string().min(1, "Date is required"),
    amount: z.string().min(1, "Amount is required"),
    description: z.string().min(1, "Description is required"),
    categoryId: z.string().optional(),
})

type FormValues = z.infer<typeof schema>;

export default function NewTransactionForm() {
    const { closeModal } = useNewTransactionModalStore();
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
            categoryId: categoryId || undefined,
        });
    };
    return (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
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
            <Button className="min-w-20" type="submit" disabled={addTransaction.isPending}>
                {addTransaction.isPending ? <Spinner /> : "Save"}
            </Button>
        </form>
    )
}