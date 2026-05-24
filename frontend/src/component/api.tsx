const API_BASE_URL = "http://127.0.0.1:8000/api";

const getGovernorates =  async () => {
  const response = await fetch(`${API_BASE_URL}/governorates`);
  if (!response.ok) {
    throw new Error("Failed to fetch governorates");
  }
  return response.json();
}
const getTrips = async (currentPage: number, title: string, selectedGovernorate: string, selectedTags: string[], priceRange: number, selectedRating: number | null, maxTravelers: number) => {
    let url = `${API_BASE_URL}/trips?`;
    url += `page=${currentPage}&`;
    if (title) {
      url += `title=${title}&`;
    }

    if (selectedGovernorate !== 'All Locations') {
      url += `governorate.nameEn=${selectedGovernorate}&`;
    }
    if (selectedTags.length > 0) {
      selectedTags.forEach(tag => {
        url += `tag[]=${tag.toLowerCase()}&`;
      });
    }
    if (priceRange > 0) {
      url += `price[lte]=${priceRange}&`;
    }
    if (selectedRating) {
      url += `averageRating[gte]=${selectedRating}&`;
    }
    if (maxTravelers > 0) {
      url += `maxtravelers[gte]=${maxTravelers}&`;
    }
    console.log("Fetching trips with URL:", url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch trips");
    }
    return  response.json();
}
const addUser= async (userData: { fullname: string; phone: string; email: string; username: string; password: string }) => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error("Failed to add user");
    }
    return  response.json();
};
const loginUser = async (credentials: { email: string; password: string }) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      throw new Error("Failed to login");
    }
    return  response.json();
};
const getTripDetails = async (tripId: number) => {
    const response = await fetch(`${API_BASE_URL}/trips/${tripId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch trip details");
    }
    return  response.json();
};
const getdays = async (tripId: number) => {
    const response = await fetch(`${API_BASE_URL}/itinerary_days?trip=${tripId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch days");
    }
    return  response.json();
}
export { getGovernorates, getTrips, addUser, loginUser, getTripDetails, getdays };