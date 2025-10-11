import { useEffect, useState } from "react";

/**
 * Delay updating the value by 500ms.
 * With each change the previous timer
 * is unmounted and a new timer is mounted until it finally gets to update the value after 500ms of inactivity.
 * */
export const useDebounce = <T>(value: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

// i was calling timeout instead of returning the timeout function itself
