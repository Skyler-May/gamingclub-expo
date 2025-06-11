import { DAY, LUNAR_INFO, MONTH, ZODIACS } from "./lunar-data";
import useCurrentDateTime from "./useCurrentTime";

// 农历日期接口
interface LunarDate {
  lunarYear: number;
  lunarMonth: string;
  lunarDay: string;
  isLeap: boolean;
  zodiac: string;
  toString(): string;
}

// 返回结果接口
interface CountLunarResult {
  gregorian: string;
  lunar: string;
  zodiac: string;
  isLeapMonth: boolean;
}

// ========== 公历计算 ==========
/** 判断是否是闰年 */
export const isLeapYear = (year: number): boolean =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

/** 获取公历月份的天数 */
export const getGregorianMonthDays = (year: number, month: number): number => {
  const days = [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  return days[month - 1];
};

/** 格式化公历日期（如：2025年6月10日） */
export const getGregorianDate = (
  year: number,
  month: number,
  day: number
): string => {
  return `${year}年${month}月${day}日`;
};

// ========== 农历计算 ==========
/** 获取农历闰月（0表示无闰月） */
export const getLeapMonth = (year: number): number =>
  LUNAR_INFO[year - 1900] & 0xf;

/** 获取农历月份的天数 */
export const getLunarMonthDays = (
  year: number,
  month: number,
  isLeap = false
): number => {
  const info = LUNAR_INFO[year - 1900];
  if (isLeap) {
    return info & 0x10000 ? 30 : 29;
  }
  return (info >> (16 - month)) & 0x1 ? 30 : 29;
};

/** 计算农历年份的总天数 */
export const getLunarYearDays = (year: number): number => {
  let days = 0;
  for (let i = 1; i <= 12; i++) {
    days += getLunarMonthDays(year, i);
  }
  const leapMonth = getLeapMonth(year);
  if (leapMonth) {
    days += getLunarMonthDays(year, leapMonth, true);
  }
  return days;
};

// ========== 生肖计算 ==========
/** 获取生肖（基于农历年） */
export const getZodiacSign = (year: number): string => ZODIACS[(year - 4) % 12];

// ========== 核心算法：公历转农历 ==========
export const solarToLunar = (y: number, m: number, d: number): LunarDate => {
  // 1. 计算从1900年1月31日到当前日期的总天数
  let totalDays = 0;
  for (let i = 1900; i < y; i++) {
    totalDays += isLeapYear(i) ? 366 : 365;
  }
  for (let i = 1; i < m; i++) {
    totalDays += getGregorianMonthDays(y, i);
  }
  totalDays += d - 1;
  totalDays -= 30; // 1900年1月31日是农历正月初一，偏移30天

  // 2. 计算农历年份
  let lunarYear = 1900;
  let lunarYearDays = getLunarYearDays(lunarYear);
  while (totalDays >= lunarYearDays) {
    totalDays -= lunarYearDays;
    lunarYear++;
    lunarYearDays = getLunarYearDays(lunarYear);
  }

  // 3. 计算农历月份（处理闰月）
  let lunarMonth = 1;
  let isLeapMonth = false;
  const leapMonth = getLeapMonth(lunarYear);

  while (true) {
    if (leapMonth && lunarMonth === leapMonth && !isLeapMonth) {
      const leapDays = getLunarMonthDays(lunarYear, lunarMonth, true);
      if (totalDays < leapDays) {
        isLeapMonth = true;
        break;
      }
      totalDays -= leapDays;
    }

    const monthDays = getLunarMonthDays(lunarYear, lunarMonth, false);
    if (totalDays < monthDays) break;
    totalDays -= monthDays;
    lunarMonth++;
  }

  // 4. 计算农历日
  const lunarDay = totalDays + 1;

  return {
    lunarYear,
    lunarMonth: MONTH[lunarMonth - 1],
    lunarDay: DAY[lunarDay - 1],
    isLeap: isLeapMonth,
    zodiac: getZodiacSign(lunarYear),
    toString() {
      return `${this.lunarYear}年${this.isLeap ? "闰" : ""}${this.lunarMonth}${
        this.lunarDay
      }`;
    },
  };
};

// ========== 主函数（React Hook） ==========
const useLunar = (): CountLunarResult => {
  const { year, month, day } = useCurrentDateTime();
  const lunar = solarToLunar(year, month, day);

  return {
    gregorian: getGregorianDate(year, month, day),
    lunar: lunar.toString(),
    zodiac: getZodiacSign(lunar.lunarYear),
    isLeapMonth: lunar.isLeap,
  };
};

export default useLunar;
