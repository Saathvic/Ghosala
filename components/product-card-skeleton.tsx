export default function ProductCardSkeleton() {
  return (
    <div className="border rounded-lg overflow-hidden bg-white h-full flex flex-col animate-pulse">
      <div className="aspect-square bg-gray-200"></div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>

        <div className="flex items-center gap-1 mb-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-200 rounded-full"></div>
            ))}
          </div>
          <div className="h-3 bg-gray-200 rounded w-8"></div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="h-5 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-12"></div>
        </div>

        <div className="h-9 bg-gray-200 rounded w-full mt-auto"></div>
      </div>
    </div>
  )
}
