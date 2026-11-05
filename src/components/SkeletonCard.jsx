export default function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs animate-pulse">
      <div className="flex items-center gap-3.5">
        <div className="h-12 w-12 rounded-xl bg-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 rounded bg-gray-200" />
          <div className="h-3 w-1/2 rounded bg-gray-200" />
        </div>
      </div>
      <div className="mt-5 flex items-end justify-between">
        <div className="space-y-2">
          <div className="h-3 w-14 rounded bg-gray-200" />
          <div className="h-5 w-24 rounded bg-gray-200" />
        </div>
        <div className="h-5 w-14 rounded-full bg-gray-200" />
      </div>
    </div>
  );
}