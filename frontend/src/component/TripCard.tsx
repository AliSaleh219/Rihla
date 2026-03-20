import { Star, MapPin } from "lucide-react";
import { Link } from "react-router";

interface TripCardProps {
  id: number;
  title: string;
  governorate: string;
  rating: number;
  image: string;
  description: string;
  price?: string;
}

export default function TripCard({ id, title, governorate, rating, image, description, price }: TripCardProps) {
  return (
    <Link to={`/trips/${id}`}>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
        <div className="relative h-56">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          {price && (
            <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg">
              <span className="text-sm font-semibold text-[#2A6F97]">{price}</span>
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-lg text-gray-900 mb-2">{title}</h3>
          <div className="flex items-center gap-1 text-gray-600 mb-3">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{governorate}</span>
          </div>
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">{description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-[#E8C07D] text-[#E8C07D]" />
              <span className="text-sm font-medium text-gray-700">{rating}</span>
            </div>
            <button className="text-sm font-medium text-[#2A6F97] hover:underline">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
