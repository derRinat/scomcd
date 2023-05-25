import { useState, useRef, useEffect } from "react";

export const useError = () => {
  const [error, setError] = useState<string>();
  const timer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);

    if (error) {
      timer.current = setTimeout(() => {
        setError(undefined);
      }, 5000);
    }
    return () => clearTimeout(timer.current);
  }, [error, setError]);

  return {
    error,
    setError,
  };
};
