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

const getTrips = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/trips`);
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