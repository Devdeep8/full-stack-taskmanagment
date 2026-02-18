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

// src/services/get-services.js (or wherever your services are)
export const GetCategory = async (identifier, payload = {}) => {
  try {
    if (!identifier) throw new Error("Category identifier is required");

    const res = await apiService.get(`/categories/${identifier}`, {
      page: payload.page ?? 1,
      limit: payload.limit ?? 10,
      ...payload, // e.g., games=true, provider='xyz', etc.
    });

    return res;
  } catch (error) {
    console.error("GetCategory error:", error);
    throw error;
  }
};

export const GetCategoryGame = async (identifier, payload = {}) => {
  try {
    if (!identifier) throw new Error("Category identifier is required");

    const res = await apiService.get(`/games/${identifier}`, {
      page: payload.page ?? 1,
      limit: payload.limit ?? 10,
      ...payload, // e.g., games=true, provider='xyz', etc.
    });

    return res;
  } catch (error) {
    console.error("GetCategory error:", error);
    throw error;
  }
};
