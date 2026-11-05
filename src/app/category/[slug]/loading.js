import SkeletonCard from "@/components/SkeletonCard";

export default function CategoryLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      <div className="h-20 w-64 animate-pulse rounded-2xl bg-gray-200" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}