import { MapPin, Star, Heart } from "lucide-react";
import { useState } from "react";

interface Trip {
  id: number;
  title: string;
  governorate: {  id: number; nameEn: string; nameAr: string };
  governorateId: number;
  price: string;
  rating: number;
  image: string;
  description: string;
  longDescription: string;
  duration: string;
  gallery: string[];
  reviews: { id: number; name: string; rating: number; comment: string; date: string }[];
  popularity: number;
  averageRating: number;
}

interface TripCardProps {
  trip: Trip;
}

export default function TripCard({ trip }: TripCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={`http://127.0.0.1:8000/images/trips/${trip.image}`}
          alt={trip.title}
          className="w-full h-56 object-cover"
        />
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite
                ? "fill-red-500 text-red-500"
                : "text-gray-600"
            }`}
          />
        </button>
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
          {trip.duration && (
            <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-800">
              {trip.duration} days
            </span>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {trip.title}
          </h3>
          <div className="flex items-center gap-1 ml-2 flex-shrink-0">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-900">
              {trip.averageRating}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
          <MapPin className="w-4 h-4" />
          <span>{trip.governorate.nameEn}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              {trip.price}$
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
