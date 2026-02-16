import { apiService } from "../apiService";

export const GetTop10Games = async (payload = {}) => {
  try {
    const res = await apiService.get("/games", {
      page: 1,
      limit: 10,
      ...payload, // allow extra filters
    });
    

    return res; // 🔥 return response
  } catch (error) {
    console.error("GetTop10Games error:", error);
    throw error;
  }
};


export const GetCategories = async (payload) => {
     try {
    const res = await apiService.get("/categories", {
      page: 1,
      limit: 10,
      ...payload, // allow extra filters
    });

    return res; // 🔥 return response
  } catch (error) {
    console.error("Categories error:", error);
    throw error;
  }
}
