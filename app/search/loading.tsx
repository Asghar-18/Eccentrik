export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="h-10 w-48 animate-pulse rounded bg-neutral-200"></div>
        <div className="mt-6 h-12 max-w-xl animate-pulse rounded bg-neutral-200"></div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="mb-4 h-[400px] rounded-lg bg-neutral-200"></div>
            <div className="mb-2 h-4 w-1/3 rounded bg-neutral-200"></div>
            <div className="mb-2 h-5 w-2/3 rounded bg-neutral-200"></div>
            <div className="h-4 w-1/4 rounded bg-neutral-200"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
