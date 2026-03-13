const API_BASE_URL = "http://127.0.0.1:8000/api";

const getplaces =  async (page:string, country:string, category:string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/places?page=${page}&category=${category}&country=${country}`);
    if (!response.ok) {
      throw new Error("Failed to fetch places");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error;
  }
};

export { getplaces };