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

export { Skeleton };
