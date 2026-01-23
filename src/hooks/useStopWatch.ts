import { useCallback, useEffect, useRef, useState } from "react";

type CounterState = "STOP" | "PAUSE" | "START";

export default function useStopWatch(updateRate = 10) {
  const [counter, setCounter] = useState(0);
  const [records, setRecords] = useState<number[]>([]);
  const counterRef = useRef(0);
  const [counterState, setCounterState] = useState<CounterState>("STOP");
  const startFrom = useRef<number>(new Date().getTime());
  const intervalRef = useRef<number>(undefined);

  const start = useCallback(() => {
    startFrom.current = new Date().getTime() - counterRef.current;
    intervalRef.current = setInterval(() => {
      const now = new Date().getTime();
      const diff = now - startFrom.current;
      setCounter(diff);
      counterRef.current = diff;
    }, updateRate);
    setCounterState("START");
    if (counterRef.current === 0) {
      setRecords([]);
    }
  }, [updateRate]);

  const stop = useCallback(() => {
    clearInterval(intervalRef.current);
    setCounter(0);
    counterRef.current = 0;
    setCounterState("STOP");
  }, []);

  const pause = useCallback(() => {
    clearInterval(intervalRef.current);
    setCounterState("PAUSE");
  }, []);
  const record = useCallback(() => {
    setRecords((old) => [...old, counterRef.current]);
  }, []);
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return {
    counter,
    counterState,
    start,
    stop,
    pause,
    record,
    records,
  };
}
