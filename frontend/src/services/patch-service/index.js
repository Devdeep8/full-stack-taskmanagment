import { apiService } from "../apiService";


export const UpdateUserData = async (identifier,payload = {}) => {
  try {
    console.log(payload);
    const res = apiService.patch(`/users/${identifier}`, payload);
    return res;
  } catch (err) {
    console.error(err);
  }
};
