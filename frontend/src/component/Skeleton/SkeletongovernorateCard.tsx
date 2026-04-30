// components/SkeletonGovernorateCard.tsx
export default function SkeletonGovernorateCard() {
    return (
        <div className="rounded-xl shadow-md overflow-hidden bg-gray-200 opacity-60">
            <div className="relative h-48 overflow-hidden">
                <div className="animate-pulse bg-gray-300 w-full h-full" />
            </div>
            <div className="bg-gray-100 px-4 py-3 flex flex-col gap-2">
                <div className="animate-pulse h-6 w-3/4 bg-gray-300 rounded" />
                <div className="animate-pulse h-4 w-1/3 bg-gray-200 rounded" />
            </div>
        </div>
    );
}