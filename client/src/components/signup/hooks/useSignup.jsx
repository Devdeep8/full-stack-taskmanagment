import { useState } from "react";
import db from "../../../db/db.json";

const USER_KEY = "user"; 

export function useLogin() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const login = async ({ email, password, remember }) => {
    try {
      setError(null);
      setIsSubmitting(true);

      await new Promise((r) => setTimeout(r, 1200));

      const user = db.users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        throw new Error("Invalid email or password");
      }

      localStorage.setItem(
        USER_KEY,
        JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
        })
      );

      if (remember) {
        localStorage.setItem("remember", "true");
      } else {
        localStorage.removeItem("remember");
      }

      return user;
    } catch (err) {
      setError(err.message || "Login failed");
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { login, isSubmitting, error };
}
