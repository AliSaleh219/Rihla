import { Star, ChevronDown } from "lucide-react";
import { useState } from "react";

interface FilterProps {
  selectedGovernorate: string;
  setSelectedGovernorate: (value: string) => void;
  selectedTags: string[];
  setSelectedTags: (value: string[]) => void;
  priceRange: number;
  setPriceRange: (value: number) => void;
  selectedRating: number | null;
  setSelectedRating: (value: number | null) => void;
  maxTravelers: number;
  setMaxTravelers: (value: number) => void;
  onClearAll: () => void;
}

const governorates = [
  "All Locations",
  "Damascus",
  "Aleppo",
  "Homs",
  "Hama",
  "Latakia",
  "Tartus",
  "Deir ez-Zor",
  "Raqqa",
  "Hasakah",
  "Qamishli",
  "Idlib",
  "Daraa",
  "As-Suwayda",
  "Rif Dimashq"
];

const tags = [
  "Adventure",
  "Beach",
  "Cultural",
  "Desert",
  "Family-Friendly",
  "Luxury",
  "Historical",
  "Nature",
  "Romantic",
  "Budget-Friendly",
];

export default function TripFilter({
  selectedGovernorate,
  setSelectedGovernorate,
  selectedTags,
  setSelectedTags,
  priceRange,
  setPriceRange,
  selectedRating,
  setSelectedRating,
  maxTravelers,
  setMaxTravelers,
  onClearAll,
}: FilterProps) {
  const [isGovernorateOpen, setIsGovernorateOpen] = useState(false);
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [isMaxTravelersOpen, setIsMaxTravelersOpen] = useState(false);

  const toggleTag = (tag: string) => {
    console.log("Toggling tag:", selectedTags, tag);
    if (selectedTags.find((t) => t === tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const hasActiveFilters =
    selectedGovernorate !== "All Locations" ||
    selectedTags.length > 0 ||
    priceRange !== 0 ||
    selectedRating !== null||
    maxTravelers !== 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-fit sticky top-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Governorate Filter */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <button
          onClick={() => setIsGovernorateOpen(!isGovernorateOpen)}
          className="flex items-center justify-between w-full mb-3"
        >
          <h3 className="font-medium text-gray-900">Governorate</h3>
          <ChevronDown
            className={`w-5 h-5 text-gray-500 transition-transform ${
              isGovernorateOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isGovernorateOpen && (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {governorates.map((gov) => (
              <label
                key={gov}
                className="flex items-center cursor-pointer group"
              >
                <input
                  type="radio"
                  name="governorate"
                  value={gov}
                  checked={selectedGovernorate === gov}
                  onChange={(e) => setSelectedGovernorate(e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                  {gov}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Tags Filter */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <button
          onClick={() => setIsTagsOpen(!isTagsOpen)}
          className="flex items-center justify-between w-full mb-3"
        >
          <h3 className="font-medium text-gray-900">Tags</h3>
          <ChevronDown
            className={`w-5 h-5 text-gray-500 transition-transform ${
              isTagsOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isTagsOpen && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => {
              const isSelected = selectedTags.find((t) => t === tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    isSelected
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <button
          onClick={() => setIsPriceOpen(!isPriceOpen)}
          className="flex items-center justify-between w-full mb-3"
        >
          <h3 className="font-medium text-gray-900">Price</h3>
          <ChevronDown
            className={`w-5 h-5 text-gray-500 transition-transform ${
              isPriceOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isPriceOpen && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>${priceRange}</span>
            </div>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={priceRange}
                onChange={(e) =>
                  setPriceRange(Number(e.target.value))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <button
          onClick={() => setIsRatingOpen(!isRatingOpen)}
          className="flex items-center justify-between w-full mb-3"
        >
          <h3 className="font-medium text-gray-900">Rating</h3>
          <ChevronDown
            className={`w-5 h-5 text-gray-500 transition-transform ${
              isRatingOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isRatingOpen && (
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setSelectedRating(star)}
                aria-label={`Set rating to ${star}`}
              >
                <Star
                  className={`w-6 h-6 transition-colors ${
                    (selectedRating ?? 1) >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                  fill={(selectedRating ?? 1) >= star ? "#facc15" : "none"}
                  strokeWidth={1.5}
                />
              </button>
            ))}
            {selectedRating && (
              <span className="ml-2 text-sm text-gray-700">{selectedRating} & up</span>
            )}
          </div>
        )}
      </div>
      {/*maxtravelers filter*/}

      <div className="mb-6 pb-6 border-b border-gray-200">
        <button
          onClick={() => setIsMaxTravelersOpen(!isMaxTravelersOpen)}
          className="flex items-center justify-between w-full mb-3"
        >
          <h3 className="font-medium text-gray-900">Max Travelers</h3>
          <ChevronDown
            className={`w-5 h-5 text-gray-500 transition-transform ${
              isMaxTravelersOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isMaxTravelersOpen && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{maxTravelers}</span>
            </div>
            <div className="space-y-2">
              <input
                type="range"
                min="1"
                max="100"
                step="1"
                value={maxTravelers}
                onChange={(e) =>
                  setMaxTravelers(Number(e.target.value))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
