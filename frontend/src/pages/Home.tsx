import {  Globe, Heart, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="/images/hero.jpg"
            alt="Syrian landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Discover Syria. Plan Your Next Trip.
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Explore nature spots, historical places, beaches, mountains, and cities across Syria
          </p>
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
      </div>
  );
}