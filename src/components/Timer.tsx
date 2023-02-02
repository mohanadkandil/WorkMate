import { useEffect, useState } from "react";
import { Play, Pause } from "../../icons";

export default function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setSeconds((seconds) => seconds + 1),
      1000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto flex max-w-[400px] flex-col justify-between rounded-lg bg-primary">
      <p className="py-5 text-center text-4xl font-semibold text-white">
        0h:0m:0s
      </p>
      <div className="h-[200px] bg-[#1bc2a1]"></div>
      <div className="mx-auto p-5">
        <button
          onClick={() => setIsRunning((prev) => !prev)}
          className="mx-auto flex items-center justify-center rounded-md bg-white py-2 px-4 text-sm font-semibold"
        >
          {isRunning ? (
            <>
              <Pause className="mr-2 h-3 w-3" />
            </>
          ) : (
            <>
              <Play className="mr-2 h-3 w-3" />
            </>
          )}
          {isRunning ? "Pause" : "Start"}
        </button>
      </div>
    </div>
  );
}
