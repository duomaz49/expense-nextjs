import { getAllTransactions } from "@/actions/transactionAction";

export default async function Page() {
  const transactions = await getAllTransactions();

  return (
    <div>
      <h1>Transactions</h1>
      <pre>{JSON.stringify(transactions, null, 2)}</pre>
    </div>
  );
}