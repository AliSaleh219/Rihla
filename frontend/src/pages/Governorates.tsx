import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import GovernorateCard from "../component/GovernorateCard";
import { MapPin } from "lucide-react";
import { getGovernorates } from "../component/api";
import SkeletonGovernorateCard from "../component/Skeleton/SkeletongovernorateCard";
import { trips } from "../data/mockData";
export default function Governorates() {
  const navigate = useNavigate();
  const [governorates, setGovernorates] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchGovernorates = async () => {
      setLoading(true);
      const data = await getGovernorates();
      setGovernorates(data.member);
      setLoading(false);
    };
    fetchGovernorates();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-8 h-8 text-[#2A6F97]" />
            <h1 className="text-4xl font-bold text-gray-900">Syrian Governorates</h1>
          </div>
          <p className="text-lg text-gray-600">
            Explore the diverse regions of Syria, each with its unique history, culture, and attractions
          </p>
        </div>

        {/* Governorates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            <>
               {[...Array(14)].map((_, i) => (
                    <SkeletonGovernorateCard key={i}/>
                ))}
            </>
          ) : (
            governorates.map((gov: { id: string; nameEn: string,tripsCount: number; coverImage: string }) => (
              <GovernorateCard
                key={gov.id}
                name={gov.nameEn}
                tripsCount={gov.tripsCount}
                image={`http://127.0.0.1:8000/images/provinces/${gov.coverImage}`}
                onClick={() => navigate(`/trips`, { state: { Governorate: gov.nameEn } })}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
