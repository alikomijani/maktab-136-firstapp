import { useCallback, useEffect, useRef } from "react";

export default function useDebounce(delay: number) {
  const timeoutRef = useRef<number>(undefined);

  const debounce = useCallback(
    (callback: (...args: any) => void) => {
      return (...args: any) => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(callback, delay, ...args);
      };
    },
    [delay],
  );

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return debounce;
}
