import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TripFilter from "../component/TripFilter";
import TripCard from "../component/TripCard";
import { Search } from "lucide-react";
import { getTrips } from "../component/api";
import SkeletonTripsCard from "../component/Skeleton/skeletonTripsCard";

export default function TripsMaker() {
  const location = useLocation();
  // const queryGovernorate = new URLSearchParams(location.search).get("Governorate");
  
  const [selectedGovernorate, setSelectedGovernorate] = useState<string>(location.state?.Governorate || "All Locations");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(0);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [maxTravelers, setMaxTravelers] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTrips, setTotalTrips] = useState(0);
  const tripsPerPage = 6;

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      const data = await getTrips(currentPage,selectedGovernorate, selectedTags, priceRange, selectedRating, maxTravelers);
      setTrips(data.member);
      setTotalTrips(data.totalItems);
      console.log("Fetched trips data:", data);
      setLoading(false);
    };
    fetchTrips();
  }, [currentPage,selectedGovernorate, selectedTags, priceRange, selectedRating, maxTravelers]);


  const handleClearAll = () => {
    setSelectedGovernorate("All Locations");
    setSelectedTags([]);
    setPriceRange(0);
    setSelectedRating(null);
    setMaxTravelers(0);
    setSearchQuery("");
  };


  const totalPages = Math.ceil(totalTrips / tripsPerPage);
  const visiblePages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Discover Syria 
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search trips by name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <TripFilter 
              selectedGovernorate={selectedGovernorate}
              setSelectedGovernorate={setSelectedGovernorate}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              maxTravelers={maxTravelers}
              setMaxTravelers={setMaxTravelers}
              onClearAll={handleClearAll}
            />
          </div>

          {/* Trip Cards Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <SkeletonTripsCard key={i}/>
                ))}
              </div>
            ) : trips.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No trips found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters to see more results
                </p>
                <button
                  onClick={handleClearAll}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {trips.map((trip) => (
                    <TripCard key={trip.id} trip={trip} />
                  ))}
                </div>
                {1 && (
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
                    <button
                      onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    >
                      Previous
                    </button>

                    {visiblePages.map((pageNumber) => (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`w-10 h-10 rounded-lg border transition-colors ${
                          currentPage === pageNumber
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    ))}

                    <button
                      onClick={() => {setCurrentPage((page) => Math.min(page + 1, totalPages));
                      localStorage.setItem("tripsCurrentPage", String(Math.min(currentPage + 1, totalPages)));
                      }
                      }
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
