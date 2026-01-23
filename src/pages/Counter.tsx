import { useCallback, useReducer, useState } from "react";

export default function Counter() {
  const [counter, dispatch] = useReducer(counterReducer, 0);

  return (
    <div>
      <div className="container mx-auto">
        <div className="flex w-4xl justify-between">
          <button onClick={() => dispatch("increase")}>increase</button>
          <button onClick={() => dispatch("decrease")}>decrease</button>
          <button onClick={() => dispatch("reset")}>reset</button>
          <h1>{counter}</h1>
        </div>
      </div>
    </div>
  );
}

function useCounter2(initialValue = 0) {
  const [counter, dispatch] = useReducer(counterReducer, 0);
  const increase = useCallback(() => dispatch("increase"), []);
  const decrease = useCallback(() => dispatch("decrease"), []);
  const reset = useCallback(() => dispatch("reset"), []);
  return {
    counter,
    decrease,
    increase,
    reset,
  };
}

function useCounter(initialValue = 0) {
  const [counter, setCounter] = useState(initialValue);
  const increase = useCallback(() => setCounter((old) => old + 1), []);
  const decrease = useCallback(() => setCounter((old) => old - 1), []);
  const reset = useCallback(() => setCounter(0), []);

  return {
    counter,
    increase,
    decrease,
    reset,
  };
}

function counterReducer(
  state: number,
  action: "increase" | "decrease" | "reset",
) {
  switch (action) {
    case "decrease":
      return state - 1;
    case "increase":
      return state + 1;
    case "reset":
      return 0;
    default:
      throw new Error("unknown action received on counter reducer");
  }
}
