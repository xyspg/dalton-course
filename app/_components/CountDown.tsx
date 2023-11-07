"use client";
//@ts-nocheck
import { useState, useEffect } from "react";

export default function CountDown() {
  const [timeLeft, setTimeLeft] = useState({});
  const [currentEvent, setCurrentEvent] = useState("");

  // Define your end times here, 喵~~
  const endTimes = {
    第1轮选课结束: new Date("2023-08-26T18:00:00"),
    第2轮选课结束: new Date("2023-08-27T18:00:00"),
    第3轮选课结束: new Date("2023-08-28T08:00:00"),
    选课结束: new Date("2023-08-28T08:00:00"),
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      let closestEvent = "";
      let closestTime = Infinity;

      for (const [key, endTime] of Object.entries(endTimes)) {
        const distance = endTime - now;

        if (distance > 0 && distance < closestTime) {
          closestTime = distance;
          closestEvent = key;
        }
      }

      if (closestEvent) {
        const distance = closestTime;
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
        setCurrentEvent(closestEvent);
      } else {
        setTimeLeft({});
        setCurrentEvent("All events have ended, 喵~~");
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed top-0 h-14 w-full bg-indigo-300 text-white font-medium text-lg">
      <h2>{currentEvent}</h2>
      {currentEvent && typeof timeLeft.days !== "undefined" ? (
        <p>{`${timeLeft.days} 天 ${timeLeft.hours} 小时 ${timeLeft.minutes} 分 ${timeLeft.seconds} 秒`}</p>
      ) : (
        <p>All events have ended, 喵~~</p>
      )}
    </div>
  );
}
