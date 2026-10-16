import Link from "next/link";
import "./globals.css";

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
          <h1 className="text-2xl font-bold">404 — Page not found</h1>
          <Link href="/" className="underline">Back to OpenFinance</Link>
        </main>
      </body>
    </html>
  );
}
