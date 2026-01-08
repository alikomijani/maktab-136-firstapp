/* 
    rule 1: hooks are function 
    rule 2: hooks start with use verb 
    rule 3: hooks should use react hooks inside
*/

import { useCallback, useEffect, useRef, useState } from "react";

export default function useCountDown(endTime: string | undefined) {
  const [counter, setCounter] = useState(0);
  const timerRef = useRef<number>(undefined);

  const stopCounter = useCallback(() => {
    clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (endTime) {
      const remainingTime = new Date(endTime).getTime() - new Date().getTime();
      if (remainingTime > 1000) {
        timerRef.current = setInterval(() => {
          const remainingTime =
            new Date(endTime).getTime() - new Date().getTime();
          if (remainingTime <= 0) {
            clearInterval(timerRef.current);
            setCounter(0);
          } else {
            setCounter(Math.floor(remainingTime / 1000));
          }
        }, 1000);
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [endTime]);

  return { counter, setCounter, stopCounter };
}
