import { useEffect, useState } from "react";
import useDebounce from "@/common/hooks/useDebounce";
import { baseApiUrl } from "@/services/apiSlice";

export function useUsernameCheck(username, setError, clearErrors) {
  const [checking, setChecking] = useState(false);

  const debouncedUsername = useDebounce(username, 500, 3);

  useEffect(() => {
    if (!debouncedUsername) return; 

    let isMounted = true; 

    async function checkUsername() {
      try {
        setChecking(true);

        const res = await fetch(
          `${baseApiUrl}/auth/check-username?username=${encodeURIComponent(
            debouncedUsername
          )}`,
          { credentials: "include" }
        );

        const result = await res.json();

        if (!isMounted) return;

        if (!result.available) {
          setError("username", {
            type: "manual",
            message: "Username already taken",
          });
        } else {
          clearErrors("username");
        }
      } catch (e) {
        console.error("Username check failed:", e);
      } finally {
        if (isMounted) setChecking(false);
      }
    }

    checkUsername();

    return () => {
      isMounted = false;
    };
  }, [debouncedUsername, setError, clearErrors]);

  return { checking };
}
