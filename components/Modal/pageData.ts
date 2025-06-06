// 定义页面按钮数据接口
export interface PageData {
  id: number;
  title: string;
  onPress?: () => void;
}

// 导出页面按钮数据
export const modalPages: PageData[] = [
  { id: 1, title: "A 页面" },
  { id: 2, title: "B 页面" },
  { id: 3, title: "C 页面" },
  { id: 4, title: "D 页面" },
  { id: 5, title: "E 页面" },
  { id: 6, title: "F 页面" },
];
