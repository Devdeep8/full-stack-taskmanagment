import { useEffect, useState } from "react";

function useDebounce(value, delay = 500, minLength = 0) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (!value || value.length < minLength) {
        setDebouncedValue("");
        return;
      }
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, minLength]);

  return debouncedValue;
}

export default useDebounce;
