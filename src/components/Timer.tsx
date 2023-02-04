import { useEffect, useState } from "react";
import { Play, Pause, Reset, Save } from "../../icons";
import { motion } from "framer-motion";

export default function Timer() {
  // TODO: Add a timer state to the database
  // TODO: Pass the list of prevois time tracks from the single project page
  const [currentTimerState, setCurrentTimerState] = useState(false);
  const [paused, setPaused] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!paused) {
        setSeconds((seconds) => seconds + 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [paused]);

  useEffect(() => {
    if (seconds > 59) {
      setSeconds(0);
      setMinutes((minutes) => minutes + 1);
    }
  }, [seconds]);

  useEffect(() => {
    if (minutes > 59) {
      setMinutes(0);
      setHours((hours) => hours + 1);
    }
  }, [minutes]);

  // Timer main functions

  const saveTimer = () => {
    const today = () => {
      return new Date().toLocaleDateString("en-us", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    };
  };

  const startTimer = () => {
    setCurrentTimerState(true);
    setPaused(false);
  };

  const pauseTimer = () => {
    setPaused(true);
  };

  const resumeTimer = () => {
    setPaused(false);
  };
  const resetTimer = () => {
    setCurrentTimerState(false);
    setPaused(true);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  return (
    <motion.div
      initial={{ x: 250 }}
      animate={{ x: 0 }}
      transition={{ delay: "0.4s" }}
      className="mx-auto flex h-[400px] max-w-[400px] flex-col justify-between rounded-lg bg-primary"
    >
      <div className="flex w-full items-center justify-center p-5">
        <h1 className="text-5xl font-semibold text-white">
          {hours}h:{minutes}m:{seconds}s
        </h1>
      </div>
      <div className="scroll flex h-2/3 w-full flex-col items-center justify-center overflow-hidden bg-[#bae1db]">
        <ul className="scrollbar-hide flex h-full w-full flex-col-reverse items-center justify-end overflow-scroll  px-5 font-semibold">
          {/* {timeList
            ? timeList.map((val, key) => (
                <li
                  key={key}
                  className="my-1 my-2 flex h-10 w-full items-center justify-between rounded bg-gray-200 px-5"
                >
                  <h4 className="">{val.work_day}</h4>
                  <h4>{`${val.hours}h : ${val.minutes}m : ${val.seconds}s`}</h4>
                </li>
              ))
            : null} */}
        </ul>
      </div>
      <div className="flex w-full items-center justify-evenly space-x-3 p-5">
        {currentTimerState === false ? (
          <button
            onClick={startTimer}
            className="flex items-center justify-evenly rounded bg-white px-3 py-2 text-sm font-semibold text-black"
          >
            <Play className="w-5" />
            Start
          </button>
        ) : (
          <>
            {paused === false ? (
              <button
                onClick={pauseTimer}
                className="flex items-center space-x-2 rounded bg-white px-3 py-2 text-sm font-semibold text-black"
              >
                <Pause className="h-3 w-3" />
                <p>Pause</p>
              </button>
            ) : null}
            {paused ? (
              <>
                <button
                  onClick={resumeTimer}
                  className="flex items-center space-x-2 rounded bg-white px-3 py-2 text-sm font-semibold text-black"
                >
                  <Play className="h-3 w-3" />
                  <p>Resume</p>
                </button>
                <button
                  onClick={resetTimer}
                  className="flex items-center space-x-2 rounded bg-white px-2 py-2 text-sm font-semibold text-black"
                >
                  <Reset className="h-3 w-3" />
                  <p>Reset</p>
                </button>
                <button
                  onClick={saveTimer}
                  className="flex items-center space-x-2 rounded bg-white px-3 py-2 text-sm font-semibold text-black"
                >
                  <Save className="h-4 w-4" />
                  <p>Save</p>
                </button>
              </>
            ) : null}
          </>
        )}
      </div>
    </motion.div>
  );
}
