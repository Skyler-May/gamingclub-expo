// 定义页面按钮数据接口
export interface PageData {
  id: number;
  title: string;
  onPress?: () => void;
}
