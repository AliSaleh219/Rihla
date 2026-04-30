const API_BASE_URL = "http://127.0.0.1:8000/api";

const getGovernorates =  async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/governorates`);
    if (!response.ok) {
      throw new Error("Failed to fetch governorates");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching governorates:", error);
    throw error;
  }
};

const getTrips = async (currentPage: number, selectedGovernorate: string, selectedTags: string[], priceRange: number, selectedRating: number | null, maxTravelers: number) => {
  try {
    let url = `${API_BASE_URL}/trips?`;
    url += `page=${currentPage}&`;
    if (selectedGovernorate !== 'All Locations') {
      url += `governorate.nameEn=${selectedGovernorate}&`;
    }
    if (selectedTags.length > 0) {
      selectedTags.forEach(tag => {
        url += `tag[]=${tag}&`;
      });
    }
    if (priceRange > 0) {
      url += `price[lte]=${priceRange}&`;
    }
    if (selectedRating) {
      url += `averageRating[gte]=${selectedRating}&`;
    }
    if (maxTravelers > 0) {
      url += `maxtravelers[lte]=${maxTravelers}&`;
    }
    console.log("Fetching trips with URL:", url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch trips");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching trips:", error);
    throw error;
  }
}
export { getGovernorates, getTrips };