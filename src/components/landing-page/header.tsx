import {Button} from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="mb-12 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Image src="/icon.svg" alt="OpenFinance" width={28} height={28} />
        <h1 className="text-2xl font-bold text-black drop-shadow-lg">OpenFinance</h1>
      </div>

      <div className="flex gap-3">
        <Button asChild size="sm">
          <Link href="/auth/sign-in">
            Sign In
          </Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/auth/sign-up">
            Get Started
          </Link>
        </Button>
      </div>
    </div>
  )
}
