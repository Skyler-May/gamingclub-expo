export type LotteryResult = {
  expect: string;
  openCode: string;
  zodiac: string;
  openTime: string;
  wave: string;
  info: string;
};

export interface GetLotteryResultsProps {
  apiUrl: string; // 新增apiUrl属性，由父组件传入
  showExpect?: boolean;
  showOpenCode?: boolean;
  showZodiac?: boolean;
  showOpenTime?: boolean;
  showWave?: boolean;
  showInfo?: boolean;
  shouldCalculateExpect?: boolean;
  calculateExpect?: (expect: string) => number;
}

// 保留这些常量供父组件或其他地方使用
export const MO_API_URL = "https://macaumarksix.com/api/live" as const;
export const NEWMO_API_URL = "https://macaumarksix.com/api/live2" as const;
export const MOTHREE_API_URL = "https://macaumarksix.com/api/live3" as const;
