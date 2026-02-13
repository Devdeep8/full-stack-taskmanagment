import { useState } from "react";
import db from "../../../db/db.json";
import { useAuth } from "../../header/hooks/useAuth";
const USER_KEY = "user";

export function useLogin() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { login: setAuthUser } = useAuth();

  const login = async ({ email, password, remember }) => {
    try {
      setError(null);
      setIsSubmitting(true);

      await new Promise((r) => setTimeout(r, 1200));

      const user = db.users.find(
        (u) => u.email === email && u.password === password,
      );

      if (!user) {
        throw new Error("Invalid email or password");
      }

      const safeUser = {
        id: user.id,
        name: user.name,
        username : user.username,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
      };

      localStorage.setItem(USER_KEY, JSON.stringify(safeUser));

      if (remember) localStorage.setItem("remember", "true");
      else localStorage.removeItem("remember");

      setAuthUser(safeUser);

      return safeUser;
    } catch (err) {
      setError(err.message || "Login failed");
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { login, isSubmitting, error };
}
