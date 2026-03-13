const PlaceDetails = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Place Details</h1>
        <p className="text-lg text-center mb-8">Detailed information about the selected place.</p>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Paris</h2>
          <p>Experience the romantic city of lights.</p>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;