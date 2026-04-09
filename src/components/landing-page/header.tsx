import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <div className="mb-12 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-black drop-shadow-lg">OpenFinance</h1>

      <div className="flex gap-3">
        <Button asChild>
          <Link href="/auth/sign-in">
            Sign In
          </Link>
        </Button>
        <Button asChild>
          <Link href="/auth/sign-up">
            Get Started
          </Link>
        </Button>
      </div>
    </div>
  )
}
