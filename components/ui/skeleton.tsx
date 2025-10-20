import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="aspect-3/2 rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="aspect-8/1" />
        <Skeleton className="aspect-8/1" />
      </div>
    </div>
  );
}

export function SkeletonBoard() {
  return (
    <div className="flex flex-col aspect-3/2 w-full ">
      <Skeleton className="w-full h-full" />
      <div className="h-[62px] p-2 space-y-1">
        <Skeleton className="aspect-8/1" />
        <Skeleton className="aspect-8/1" />
      </div>
    </div>
  );
}

export function BoardGroupSkeleton() {
  return (
    <div className="w-full space-y-6">
      <div />
      <div className="flex justify-center w-full">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 w-full">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <SkeletonBoard key={i} />
            ))}
        </div>
      </div>
    </div>
  );
}

export { Skeleton };
