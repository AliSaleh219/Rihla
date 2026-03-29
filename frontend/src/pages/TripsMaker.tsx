import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import TripCard from "../component/TripCard";
import { trips} from "../data/mockData";
import { Plus, X, Upload, MapPin, Clock, DollarSign, Search, Sparkles } from "lucide-react";
import { getGovernorates } from "../component/api";

export default function Trips() {
  const [searchParams] = useSearchParams();
  const [selectedGovernorate, setSelectedGovernorate] = useState<string>("all");
  const [selectedRating, setSelectedRating] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popularity");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [governorates, setGovernorates] = useState([]);
  useEffect(() => {
    const fetchGovernorates = async () => {
      const data = await getGovernorates();
      setGovernorates(data.member);
      console.log(data.member);
    };
    fetchGovernorates();
  }, []);
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    governorate: "",
    description: "",
    longDescription: "",
    duration: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    const govParam = searchParams.get("governorate");
    if (govParam) {
      setSelectedGovernorate(govParam);
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New trip:", formData);
    alert("Trip created successfully! (This is a demo - data is not persisted)");
    setShowCreateModal(false);
    setFormData({
      title: "",
      governorate: "",
      description: "",
      longDescription: "",
      duration: "",
      price: "",
      image: "",
    });
  };

  let filteredTrips = [...trips];

  // Filter by search
  if (searchQuery) {
    filteredTrips = filteredTrips.filter((trip) =>
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Filter by governorate
  if (selectedGovernorate !== "all") {
    filteredTrips = filteredTrips.filter(
      (trip) => trip.governorate === selectedGovernorate
    );
  }

  // Filter by rating
  if (selectedRating !== "all") {
    const minRating = parseFloat(selectedRating);
    filteredTrips = filteredTrips.filter((trip) => trip.rating >= minRating);
  }

  // Sort trips
  if (sortBy === "popularity") {
    filteredTrips.sort((a, b) => b.popularity - a.popularity);
  } else if (sortBy === "rating") {
    filteredTrips.sort((a, b) => b.rating - a.rating);
  }

  const clearFilters = () => {
    setSelectedGovernorate("all");
    setSelectedRating("all");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative h-80 bg-gradient-to-br from-[#2A6F97] via-[#2A6F97] to-[#6B8E23] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1685092620447-ffccff1c1d56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBhZHZlbnR1cmUlMjBtb3VudGFpbiUyMGhlcm98ZW58MXx8fHwxNzczOTI3MjQxfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Travel Hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">
                Explore Syria's Treasures
              </h1>
              <p className="text-xl text-white/90 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Discover {trips.length} unique experiences across the country
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="hidden md:flex items-center gap-2 bg-white text-[#2A6F97] px-8 py-4 rounded-2xl hover:shadow-2xl transition-all font-semibold hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Create New Trip
            </button>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search trips, destinations, activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-5 rounded-2xl border-0 shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/30 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Create Button */}
      <div className="md:hidden sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3">
        <button
          onClick={() => setShowCreateModal(true)}
          className="w-full flex items-center justify-center gap-2 bg-[#2A6F97] text-white px-6 py-3 rounded-xl shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Create New Trip
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Horizontal Filters Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {selectedGovernorate !== "all" ? selectedGovernorate : "All Destinations"}
              </h2>
              <p className="text-gray-600 mt-1 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {filteredTrips.length} {filteredTrips.length === 1 ? "trip" : "trips"} found
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* Governorate Dropdown */}
            <div className="relative">
              <select
                value={selectedGovernorate}
                onChange={(e) => setSelectedGovernorate(e.target.value)}
                className="appearance-none px-6 py-3 pr-12 bg-white border-2 border-gray-200 rounded-full hover:border-[#2A6F97] focus:outline-none focus:ring-4 focus:ring-[#2A6F97]/20 focus:border-[#2A6F97] transition-all cursor-pointer font-medium text-gray-700"
              >
                <option value="all">📍 All Locations</option>
                {governorates.map((gov: { id: string; name: string }) => (
                  <option key={gov.id} value={gov.name}>
                    {gov.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Rating Dropdown */}
            <div className="relative">
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="appearance-none px-6 py-3 pr-12 bg-white border-2 border-gray-200 rounded-full hover:border-[#E8C07D] focus:outline-none focus:ring-4 focus:ring-[#E8C07D]/20 focus:border-[#E8C07D] transition-all cursor-pointer font-medium text-gray-700"
              >
                <option value="all">⭐ All Ratings</option>
                <option value="4.5">⭐ 4.5+ Stars</option>
                <option value="4.0">⭐ 4.0+ Stars</option>
                <option value="3.5">⭐ 3.5+ Stars</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none px-6 py-3 pr-12 bg-white border-2 border-gray-200 rounded-full hover:border-[#6B8E23] focus:outline-none focus:ring-4 focus:ring-[#6B8E23]/20 focus:border-[#6B8E23] transition-all cursor-pointer font-medium text-gray-700"
              >
                <option value="popularity">🔥 Most Popular</option>
                <option value="rating">🏆 Highest Rated</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Active Filters Display */}
            {(selectedGovernorate !== "all" || selectedRating !== "all" || searchQuery) && (
              <>
                <div className="h-8 w-px bg-gray-300"></div>
                <button
                  onClick={clearFilters}
                  className="px-5 py-2 text-sm font-medium text-[#2A6F97] hover:bg-[#2A6F97]/10 rounded-full transition-all flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear all
                </button>
              </>
            )}
          </div>

          {/* Active Filter Tags */}
          {(selectedGovernorate !== "all" || selectedRating !== "all" || searchQuery) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedGovernorate !== "all" && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#2A6F97]/10 text-[#2A6F97] rounded-full text-sm font-medium">
                  <MapPin className="w-3 h-3" />
                  {selectedGovernorate}
                  <button onClick={() => setSelectedGovernorate("all")} className="hover:bg-[#2A6F97]/20 rounded-full p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedRating !== "all" && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#E8C07D]/20 text-gray-700 rounded-full text-sm font-medium">
                  Rating: {selectedRating}+ stars
                  <button onClick={() => setSelectedRating("all")} className="hover:bg-[#E8C07D]/30 rounded-full p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery("")} className="hover:bg-gray-200 rounded-full p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Trips Grid */}
        <div>
          {filteredTrips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrips.map((trip) => (
                <TripCard key={trip.id} {...trip} price={trip.price} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-100">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No trips found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
              <button
                onClick={clearFilters}
                className="px-8 py-3 bg-[#2A6F97] text-white rounded-xl hover:bg-[#2A6F97]/90 transition-colors font-medium shadow-lg"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Create Trip Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-[#2A6F97] to-[#6B8E23] px-8 py-6 flex items-center justify-between rounded-t-3xl">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Plus className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">Create Your Trip</h2>
                  <p className="text-white/80 text-sm mt-1">Share your amazing Syrian adventure</p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-12 h-12 flex items-center justify-center hover:bg-white/20 rounded-2xl transition-colors"
              >
                <X className="w-7 h-7 text-white" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Trip Title */}
              <div>
                <label className="block font-bold text-gray-900 mb-3 text-lg">
                  Trip Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Ancient Palmyra Archaeological Adventure"
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#2A6F97]/20 focus:border-[#2A6F97] transition-all text-lg"
                />
              </div>

              {/* Governorate */}
              <div>
                <label className="block font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#2A6F97]" />
                  Location *
                </label>
                <select
                  name="governorate"
                  value={formData.governorate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#2A6F97]/20 focus:border-[#2A6F97] transition-all text-lg"
                >
                  <option value="">Select governorate</option>
                  {governorates.map((gov: { id: string; name: string }) => (
                    <option key={gov.id} value={gov.name}>
                      {gov.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration and Price */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#E8C07D]" />
                    Duration *
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Full day"
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#2A6F97]/20 focus:border-[#2A6F97] transition-all"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-[#6B8E23]" />
                    Price *
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., $65"
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#2A6F97]/20 focus:border-[#2A6F97] transition-all"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block font-bold text-gray-900 mb-3 text-lg">
                  Short Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={2}
                  placeholder="Brief overview for the trip card (max 100 characters)"
                  maxLength={100}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#2A6F97]/20 focus:border-[#2A6F97] transition-all resize-none"
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-500">Perfect for card previews</p>
                  <p className="text-sm font-medium text-gray-700">{formData.description.length}/100</p>
                </div>
              </div>

              {/* Long Description */}
              <div>
                <label className="block font-bold text-gray-900 mb-3 text-lg">
                  Full Description *
                </label>
                <textarea
                  name="longDescription"
                  value={formData.longDescription}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  placeholder="Share the full story of this trip. What makes it special? What will visitors experience? Include highlights, activities, and what to expect..."
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#2A6F97]/20 focus:border-[#2A6F97] transition-all resize-none"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                  <Upload className="w-5 h-5 text-[#2A6F97]" />
                  Cover Image URL *
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                  placeholder="https://example.com/your-trip-image.jpg"
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#2A6F97]/20 focus:border-[#2A6F97] transition-all"
                />
                <p className="text-sm text-gray-500 mt-2">Use a high-quality landscape image (recommended: 1200x800px)</p>
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 pt-6 border-t-2 border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-all font-bold text-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-[#2A6F97] to-[#6B8E23] text-white rounded-2xl hover:shadow-2xl transition-all font-bold text-lg hover:scale-105"
                >
                  Create Trip
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
