import { apiService } from "../apiService";

export const Logout = async (payload = {}) => {
  try {
    const res = apiService.post("/auth/logout", payload);   
    return res;
  } catch (err) {
    console.error(err);
  }
};
