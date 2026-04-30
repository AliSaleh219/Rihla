export default function SkeletonTripsCard( ) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse">
      <div className="relative">
        <div className="w-full h-56 bg-gray-300" />

        <div className="absolute top-3 right-3 w-10 h-10 bg-white/90 rounded-full shadow-md" />

        <div className="absolute bottom-3 left-3 w-20 h-7 bg-white/90 rounded-full" />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2 gap-3">
          <div className="h-6 w-2/3 bg-gray-300 rounded-md" />
          <div className="h-5 w-12 bg-gray-200 rounded-md flex-shrink-0 mt-0.5" />
        </div>

        <div className="h-4 w-1/3 bg-gray-200 rounded-md mb-3" />

        <div className="flex items-center justify-between">
          <div className="flex items-end gap-2">
            <div className="h-8 w-24 bg-gray-300 rounded-md" />
            <div className="h-4 w-16 bg-gray-200 rounded-md mb-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
