import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryLoading() {
  return (
    <div className="container md:mx-auto mt-5 mx-auto">
      {[...Array(3).keys()].map((i) => (
        <div key={i} className="flex gap-4 mt-2">
          <Skeleton className="h-50 w-1/4" />
          <Skeleton className="h-50 w-1/4" />
          <Skeleton className="h-50 w-1/4" />
          <Skeleton className="h-50 w-1/4" />
        </div>
      ))}
    </div>);
}
