import { useState, useMemo, useEffect } from "react";
import TripFilter from "../component/TripFilter";
import TripCard from "../component/TripCard";
import { Search } from "lucide-react";
import { getTrips } from "../component/api";

export default function TripsMaker() {
  const [selectedGovernorate, setSelectedGovernorate] = useState("All Locations");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(0);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [maxTravelers, setMaxTravelers] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      const data = await getTrips(selectedGovernorate, selectedTags, priceRange, selectedRating, maxTravelers);
      setTrips(data.member);
      console.log(data.member);
      setLoading(false);
    };
    fetchTrips();
  }, [selectedGovernorate, selectedTags, priceRange, selectedRating, maxTravelers]);

  const handleClearAll = () => {
    setSelectedGovernorate("All Locations");
    setSelectedTags([]);
    setPriceRange(0);
    setSelectedRating(null);
    setMaxTravelers(0);
  };

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
            {trips.length === 0 ? (
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
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {trips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
