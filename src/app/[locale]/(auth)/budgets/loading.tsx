import { Skeleton } from "@/components/ui/skeleton";

export default function BudgetLoading() {
    return (
        <div className="md:container md:mx-auto mt-5 space-y-4">
            <div className="flex items-center justify-between gap-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-8 w-56" />
            </div>
            <div className="overflow-hidden rounded-md border text-xs">
                <div className="flex items-center justify-between border-b px-3 py-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-32" />
                </div>
                <ul>
                    {[...Array(6).keys()].map((i) => (
                        <li
                            key={i}
                            className="grid grid-cols-[1fr_auto] items-center gap-3 border-b px-3 py-2 last:border-b-0"
                        >
                            <div className="min-w-0 space-y-2">
                                <div className="flex items-baseline justify-between gap-2">
                                    <Skeleton className="h-3 w-28" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                                <Skeleton className="h-1 w-full" />
                            </div>
                            <div className="flex gap-0.5">
                                <Skeleton className="h-7 w-7" />
                                <Skeleton className="h-7 w-7" />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
