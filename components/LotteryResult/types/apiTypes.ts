// type类型
export type LotteryResult = {
  expect: string;
  openCode: string;
  zodiac: string;
  openTime: string;
  wave: string;
  info: string;
};

// 接口类型
export interface LotteryResultDisplayOptions {
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
