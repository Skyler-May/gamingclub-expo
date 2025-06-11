import { useEffect, useState } from "react";

/**
 * 获取当前日期时间的 Hook
 * @returns {
 *   year: number;       // 当前年份 (e.g. 2023)
 *   month: number;      // 当前月份 (1-12)
 *   day: number;        // 当前日期 (1-31)
 *   hour: number;       // 当前小时 (0-23)
 *   minute: number;     // 当前分钟 (0-59)
 *   second: number;     // 当前秒数 (0-59)
 *   weekday: string;    // 当前星期 (e.g. "星期一")
 *   date: Date;         // 原始 Date 对象
 * }
 */
const useCurrentDateTime = (): any => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const weekdays = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];

  return {
    // 按需导出字段，避免未使用警告
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    weekday: weekdays[date.getDay()],
    date, // 原始 Date 对象备用
  };
};

export default useCurrentDateTime;
