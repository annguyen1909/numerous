export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-[#3f3f46]/40 bg-[#1a1a1f]/50 p-6 animate-pulse">
      <div className="h-6 w-1/3 bg-white/10 rounded mb-4" />
      <div className="space-y-2">
        <div className="h-4 bg-white/10 rounded" />
        <div className="h-4 bg-white/10 rounded w-5/6" />
        <div className="h-4 bg-white/10 rounded w-2/3" />
      </div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="rounded-2xl border border-[#3f3f46]/40 bg-[#1a1a1f]/50 p-6 animate-pulse space-y-4">
      <div className="h-6 w-40 bg-white/10 rounded" />
      <div className="h-10 bg-white/10 rounded" />
      <div className="h-10 bg-white/10 rounded" />
      <div className="h-10 bg-white/10 rounded" />
      <div className="h-12 w-32 bg-white/10 rounded" />
    </div>
  );
}
