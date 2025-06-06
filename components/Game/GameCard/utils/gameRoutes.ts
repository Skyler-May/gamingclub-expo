import { router } from "expo-router";

/**
 * 游戏类型到路由的映射
 */
export const gameTypeToRouteMap = {
  hk: "/hongkong",
  mo: "/mo",
  tw: "/tw",
};

/**
 * 根据游戏类型导航到对应的游戏页面
 * @param gameType 游戏类型 (hk, mo, tw)
 * @returns 是否成功导航
 */
export const navigateToGameRoute = (gameType: string): boolean => {
  const route = gameTypeToRouteMap[gameType as keyof typeof gameTypeToRouteMap];
  if (route) {
    router.push(route as any);
    return true;
  }
  return false;
};
