// 定义路由路径类型
type RoutePaths = "/fuli" | "/chat";

// 定义工具项的接口
export interface DataItem {
  icon: string;
  text: string;
  color: string;
  route?: RoutePaths; // 添加可选的路由属性
}

// 导出工具栏数据
export const TOOLS_DATA: DataItem[] = [
  {
    icon: "gift",
    text: "福利",
    color: "#F54A00",
    route: "/fuli",
  },
  {
    icon: "wechat",
    text: "聊天室",
    color: "#F54A00",
    route: "/chat",
  },
  //   {
  //     icon: "dollar-sign",
  //     text: "买卖TRbi",
  //     color: "#F54A00",
  //     route: "/payments",
  //   },
  //   {
  //     icon: "users",
  //     text: "代理",
  //     color: "#F54A00",
  //     route: "/agent",
  //   },
  //   {
  //     icon: "credit-card",
  //     text: "钱包",
  //     color: "#F54A00",
  //     route: "/payments",
  //   },
];

// 导出频道栏数据
export const CHANNELS_DATA: DataItem[] = [
  //   {
  //     icon: "bell",
  //     text: "公告",
  //     color: "#F54A00",
  //     route: "/announcement",
  //   },
  //   {
  //     icon: "message-circle",
  //     text: "聊天",
  //     color: "#F54A00",
  //     route: "/chat",
  //   },
  //   {
  //     icon: "gift",
  //     text: "福利",
  //     color: "#F54A00",
  //     route: "/fuli",
  //   },
];

// 导出平台信息数据
export const PLATFORM_INFO: DataItem[] = [
  //   {
  //     icon: "globe",
  //     text: "全球",
  //     color: "#F54A00",
  //     route: "/global",
  //   },
  //   {
  //     icon: "users",
  //     text: "100000+",
  //     color: "#F54A00",
  //     route: "/users",
  //   },
  //   {
  //     icon: "dollar-sign",
  //     text: "100000+",
  //     color: "#F54A00",
  //     route: "/transactions",
  //   },
];
