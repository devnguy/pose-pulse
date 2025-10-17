import { SkeletonBoard } from "@/components/ui/skeleton";

export default function Loading() {
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
