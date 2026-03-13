const Recommendation = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Recommendations</h1>
        <p className="text-lg text-center mb-8">Discover personalized travel recommendations.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Beach Paradise</h2>
            <p>Relax on pristine beaches with crystal clear waters.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Mountain Retreat</h2>
            <p>Enjoy breathtaking views and fresh mountain air.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Cultural Journey</h2>
            <p>Immerse yourself in rich history and vibrant traditions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;  