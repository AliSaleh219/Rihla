import { useState ,useEffect} from "react";
import { getplaces } from "../component/api";

type place = {
    id: number;
    name: string;
    description: string;
    image: string;
    category: string;
    latitude: string;
    longitude: string;
    createdAt: string;
    beach: boolean;
    mountain: boolean;
    waterfall: boolean;
    historical: boolean;
    religious: boolean;
    park: boolean;
    museum: boolean;
    familyFriendly: boolean;
    romantic: boolean;
};

type places = {
    [key: number]: place;
};
const Places = () => {
  const [placesD, setPlacesD] = useState<places>({});
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedPage, setSelectedPage] = useState<string>("1");
  const countries = ["Latakia", "Tartous", "Homs", "Hama", "Damascus", "Daraa", "Quneitra", "As-Suwayda", "Raqqa", "Deir ez-Zor", "Al-Hasakah"];
  const categories = ["Castle", "Beach", "Mountain", "Historical", "Religious", "Park", "Museum"];
  useEffect(() => {
    async function loadPlaces() {
      const placesdata = await getplaces(selectedPage,selectedCountry,selectedCategory).then(data => data.member).catch(error => console.error(error));
      setPlacesD(placesdata);
      console.log(placesdata);
    }
    loadPlaces();
  }, [selectedCategory,selectedPage,selectedCountry]);
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-orange-50 p-6">
      <div className="flex flex-wrap justify-center gap-6 mb-10">
        <div className="relative">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="appearance-none px-5 py-3 pr-10 rounded-xl bg-white/60 backdrop-blur-md shadow-lg border border-gray-200 text-gray-700 font-medium focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300 cursor-pointer"
          >
            <option value="">All Countries</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            ▼
          </span>
        </div>
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none px-5 py-3 pr-10 rounded-xl bg-white/60 backdrop-blur-md shadow-lg border border-gray-200 text-gray-700 font-medium focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300 cursor-pointer"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            ▼
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
        {placesD && Object.values(placesD).map(place => (
          <div
            key={place.id}
            className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group"
          >
            <img
              src={`http://localhost:8000/photo/${place.image}`}
              alt={place.name}
              className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div>
            <h2 className="absolute bottom-4 left-4 text-white text-2xl font-bold drop-shadow-lg">
              {place.name}
            </h2>
            <span className="absolute top-4 left-4 bg-white/80 text-gray-800 text-sm font-medium px-3 py-1 rounded-full shadow">
              {place.category}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-8 gap-3">
        <button
          //onClick={() => setSelectedPage(prev => Math.max(prev - 1, 1))}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
        ‹
        </button>
        {/* {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
          {index + 1}
            </button>
        ))} */}
        <button
          //onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default Places;  