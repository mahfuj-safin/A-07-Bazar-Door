import SkeletonCard from "@/components/SkeletonCard";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-10">
      <div className="h-56 w-full animate-pulse rounded-3xl bg-gray-200" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}