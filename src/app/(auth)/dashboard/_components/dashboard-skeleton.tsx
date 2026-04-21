import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
    return (
        <div className="md:container md:mx-auto mt-5 space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                {[...Array(4).keys()].map((i) => (
                    <div key={i} className="border p-3 space-y-2">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                ))}
            </div>
            <div className="grid gap-4 md:grid-cols-12">
                <Skeleton className="md:col-span-8 h-64" />
                <Skeleton className="md:col-span-4 h-64" />
            </div>
            <Skeleton className="h-32 w-full" />
        </div>
    );
}
