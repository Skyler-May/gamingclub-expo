import { useEffect, useRef, useState } from "react";
import useCurrentDateTime from "./Lunar/useSolar";

type CountdownStatus = "counting" | "resting";

interface UseDailyCountdownOptions {
  startTime: { hour: number; minute: number; second: number };
  endTime: { hour: number; minute: number; second: number };
}

interface CountdownResult {
  status: CountdownStatus;
  hours: number;
  minutes: number;
  seconds: number;
}

export function useDailyCountdown({
  startTime,
  endTime,
}: UseDailyCountdownOptions): CountdownResult {
  const { date: now } = useCurrentDateTime();
  const [status, setStatus] = useState<CountdownStatus>("counting");
  const [remaining, setRemaining] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const toTodayDate = (target: typeof startTime): Date => {
      const d = new Date(now);
      d.setHours(target.hour, target.minute, target.second, 0);
      return d;
    };

    const start = toTodayDate(startTime);
    const end = toTodayDate(endTime);

    if (now >= start && now < end) {
      setStatus("resting");
      setRemaining(Math.floor((end.getTime() - now.getTime()) / 1000));
    } else {
      let nextStart = start;
      if (now >= end) {
        nextStart = new Date(start);
        nextStart.setDate(start.getDate() + 1);
      }
      setStatus("counting");
      setRemaining(Math.floor((nextStart.getTime() - now.getTime()) / 1000));
    }
  }, [now, startTime, endTime]); // ✅ 明确依赖

  // 可拓展性考虑：可加入 onFinish 回调、多个时间段支持等

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => Math.max(prev - 1, 0));
    }, 1000) as unknown as number;

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [status]);

  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;

  return {
    status,
    hours,
    minutes,
    seconds,
  };
}
