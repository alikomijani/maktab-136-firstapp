import { convertMillisecondToStopWatch, formatNumber } from "../utils";
import useStopWatch from "../hooks/useStopWatch";
export default function Timer() {
  const { counter, counterState, start, stop, pause, records, record } =
    useStopWatch(100);
  const { hours, minutes, secondes, deciSecond } =
    convertMillisecondToStopWatch(counter);

  return (
    <div className="mx-auto h-dvh w-sm border">
      <div className="mt-40 flex justify-center font-mono text-4xl">
        <div>{formatNumber(hours)}</div>:<div>{formatNumber(minutes)}</div>:
        <div>{formatNumber(secondes)}</div>:
        <div>{formatNumber(deciSecond)}</div>
      </div>
      <div className="mt-10 flex justify-center gap-2">
        <button
          onClick={() => {
            counterState === "STOP" ? start() : stop();
          }}
          className="cursor-pointer rounded-full border border-gray-600 p-4"
        >
          {counterState === "STOP" ? "start" : "stop"}
        </button>
        <button
          onClick={() => {
            counterState === "PAUSE" ? start() : pause();
          }}
          disabled={counterState === "STOP"}
          className="cursor-pointer rounded-full border border-gray-600 p-4 disabled:cursor-not-allowed disabled:text-gray-300"
        >
          {counterState === "PAUSE" ? "resume" : "pause"}
        </button>
        <button
          onClick={record}
          disabled={counterState === "STOP"}
          className="cursor-pointer rounded-full border border-gray-600 p-4 disabled:cursor-not-allowed disabled:text-gray-300"
        >
          {"Record"}
        </button>
      </div>
      <div className="mt-5 h-2/4 overflow-y-scroll p-2">
        {records.map((item, index) => {
          const { hours, minutes, secondes, deciSecond } =
            convertMillisecondToStopWatch(item);
          return (
            <div className="mt-1 flex justify-start font-mono">
              <div className="mx-1">{index + 1}- </div>
              <div>{formatNumber(hours)}</div>:
              <div>{formatNumber(minutes)}</div>:
              <div>{formatNumber(secondes)}</div>:
              <div>{formatNumber(deciSecond)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
