import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const transactions = [
  {
    id: crypto.randomUUID(),
    description: "Test",
    date: "10.4.2026",
    amount: 100,
  },
];

export default function TransactionPage() {
  return (
    <div className="md:container md:mx-auto mt-5">
      <Table className="table-fixed">
        <TableCaption>A list of your recent Transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/4">Description</TableHead>
            <TableHead className="w-1/4">Date</TableHead>
            <TableHead className="w-1/4">Amount</TableHead>
            <TableHead className="w-1/8">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((t) => (
            <TableRow key={t.description}>
              <TableCell>{t.description}</TableCell>
              <TableCell className="font-medium">{t.date}</TableCell>
              <TableCell>{t.amount}</TableCell>
              <TableCell>Add, Edit, Delete</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
