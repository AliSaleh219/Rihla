import {
  ArrowRight,
  Globe,
  Heart,
  MapPin,
  Shield,
  Star,
  TrendingUp,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import TripCard from "../component/TripCard";
import { useEffect, useState } from "react";
import { getGovernorates, getTrips } from "../component/api";
import GovernorateCard from "../component/GovernorateCard";
import SkeletonTripsCard from "../component/Skeleton/skeletonTripsCard";
import SkeletonGovernorateCard from "../component/Skeleton/SkeletongovernorateCard";

interface Trip {
  id: number;
  title: string;
  governorate: { id: number; nameEn: string; nameAr: string };
  governorateId: number;
  price: string;
  rating: number;
  image: string;
  description: string;
  longDescription: string;
  duration: string;
  gallery: string[];
  reviews: {
    id: number;
    name: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  popularity: number;
  averageRating: number;
}

interface Governorate {
  id: string;
  tripsCount: number;
  nameEn: string;
  coverImage: string;
}

export default function Home() {
  const navigate = useNavigate();
  const [governorates, setGovernorates] = useState<Governorate[]>([]);
  const [trips, setTrip] = useState<Trip[]>([]);
  const [tripsLoading, setTripsLoading] = useState(true);
  const [governoratesLoading, setGovernoratesLoading] = useState(true);

  useEffect(() => {
    const fetchGovernorates = async () => {
      setGovernoratesLoading(true);
      const data = await getGovernorates();
      setGovernorates(data.member);
      setGovernoratesLoading(false);
    };

    fetchGovernorates();
  }, []);

  useEffect(() => {
    const fetchTrips = async () => {
      setTripsLoading(true);
      const data = await getTrips(1,"All Locations", [], 0, null, 0);
      setTrip(data.member);
      setTripsLoading(false);
    };

    fetchTrips();
  }, []);

  const featuredTrips = [...trips]
    .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="/images/hero.jpg"
            alt="Syrian landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/35"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm mb-6">
            Curated destinations across Syria
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Discover Syria. Plan Your Next Trip.
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Explore nature spots, historical places, beaches, mountains, and cities across Syria
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/trips"
              className="inline-flex items-center gap-2 rounded-full bg-[#E8C07D] px-8 py-3 font-semibold text-gray-900 shadow-lg transition-transform hover:scale-[1.02]"
            >
              Explore Trips
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/governorates"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Browse Governorates
              <MapPin className="w-4 h-4" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-2xl font-bold text-white">Top-rated trips</p>
              <p className="text-sm text-white/80">Start with experiences travelers already love.</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-2xl font-bold text-white">Smart filters</p>
              <p className="text-sm text-white/80">Search by region, budget, rating, and group size.</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-2xl font-bold text-white">Trusted details</p>
              <p className="text-sm text-white/80">See destinations, prices, and useful trip info fast.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">About Syria Travel Guide</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Your trusted companion for discovering the rich heritage, stunning landscapes, and hidden gems of Syria
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="text-center p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-[#E8C07D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-[#E8C07D]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Explore Diverse Destinations</h3>
            <p className="text-gray-600">
              From ancient historical sites and vibrant cities to pristine beaches, majestic mountains, and tranquil villages - discover every corner of Syria
            </p>
          </div>

          {/* Feature 2 */}
          <div className="text-center p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-[#2A6F97]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-[#2A6F97]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Personalized Experience</h3>
            <p className="text-gray-600">
              Save your favorite places, rate destinations, and receive AI-powered recommendations tailored to your travel preferences and interests
            </p>
          </div>

          {/* Feature 3 */}
          <div className="text-center p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-[#6B8E23]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-[#6B8E23]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Trusted Information</h3>
            <p className="text-gray-600">
              Access comprehensive trip details, authentic reviews, professional guides, and reliable information to plan your perfect Syrian adventure
            </p>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-[#E8C07D]/10 via-[#2A6F97]/10 to-[#6B8E23]/10 rounded-2xl p-8 text-center">
          <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto">
            Whether you're seeking to explore ancient ruins steeped in history, hike through breathtaking mountain ranges, 
            relax on Mediterranean beaches, or immerse yourself in authentic village culture, Syria Travel Guide helps you 
            discover and plan unforgettable journeys across this historically rich and naturally diverse land.
          </p>
        </div>
      </section>
      
      {/* Featured Trips */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Trips</h2>
              <p className="text-gray-600">Handpicked experiences for you</p>
            </div>
            <Link
              to="/trips"
              className="text-[#2A6F97] hover:underline font-medium flex items-center gap-1"
            >
              View all
              <Star className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tripsLoading
              ? [...Array(3)].map((_, index) => <SkeletonTripsCard key={index}  />)
              : featuredTrips.map((trip) => <TripCard key={trip.id} trip={trip} />)}
          </div>
        </div>
      </section>

      {/* Explore by Governorate */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Explore by Governorate</h2>
            <p className="text-gray-600">Discover regions across Syria</p>
          </div>
          <Link
            to="/governorates"
            className="text-[#2A6F97] hover:underline font-medium flex items-center gap-1"
          >
            View all
            <MapPin className="w-4 h-4" />
          </Link>
        </div>
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-[#2A6F97]/8 to-[#6B8E23]/8 px-6 py-4">
          <p className="text-gray-700 font-medium">
            Choose a region to jump straight into trips from that governorate.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {governoratesLoading
            ? [...Array(6)].map((_, index) => <SkeletonGovernorateCard key={index} />)
            : governorates.slice(0, 6).map((gov) => (
                <GovernorateCard
                  key={gov.id}
                  name={gov.nameEn}
                  tripsCount={gov.tripsCount}
                  image={`http://127.0.0.1:8000/images/provinces/${gov.coverImage}`}
                  onClick={() =>
                    navigate(`/trips?governorate=${encodeURIComponent(gov.nameEn)}`, {
                      state: { selectedGovernorate: gov.nameEn },
                    })
                  }
                />
              ))}
        </div>
      </section>

      {/* Recommended for You */}
      <section className="bg-gradient-to-br from-[#2A6F97]/10 to-[#6B8E23]/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <TrendingUp className="w-12 h-12 text-[#2A6F97] mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Personalized Recommendations</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Let our AI-powered system suggest the perfect destinations based on your preferences and favorites
          </p>
          <Link
            to="/recommendations"
            className="inline-flex items-center gap-2 bg-[#2A6F97] text-white px-8 py-3 rounded-full hover:bg-[#2A6F97]/90 transition-colors shadow-lg"
          >
            <Star className="w-5 h-5" />
            View Recommendations
          </Link>
        </div>
      </section>
    </div>
  );
}
