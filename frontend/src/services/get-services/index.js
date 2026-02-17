import { apiService } from "../apiService";


export const GetTop10Games = async (payload = {}) => {
  try {
    const res = await apiService.get("/games", {
      page: payload.page ?? 1,
      limit: payload.limit ?? 10,
      ...payload,
    });

    return res;
  } catch (error) {
    console.error("GetTop10Games error:", error);
    throw error;
  }
};

export const GetCategories = async (payload = {}) => {
  try {
    const res = await apiService.get("/categories", {
       page: payload.page ?? 1,
      limit: payload.limit ?? 10,
      ...payload, 
    });

    return res; 
  } catch (error) {
    console.error("Categories error:", error);
    throw error;
  }
};
