import { apiService } from "../apiService";

export const Logout = async (payload = {}) => {
  try {
    const res = apiService.post("/auth/logout", payload);
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const PaymentSession = async (payload = {}) => {
  try {
    console.log(payload);
    const res = apiService.post("/payment/session", payload);
    return res;
  } catch (err) {
    console.error(err);
  }
};
