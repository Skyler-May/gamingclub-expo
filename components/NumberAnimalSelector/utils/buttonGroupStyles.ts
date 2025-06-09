import { TextStyle } from "react-native";

/**
 * 数字按钮的颜色
 */
const COLORS = {
  RED: "red",
  BLUE: "blue",
  GREEN: "green",
  WHITE: "white",
} as const;

/**
 * 根据索引获取按钮的样式
 * @param index 按钮的索引
 * @returns 按钮的样式
 */
const BUTTON_STYLES = {
  [COLORS.RED]: { backgroundColor: "red" },
  [COLORS.BLUE]: { backgroundColor: "blue" },
  [COLORS.GREEN]: { backgroundColor: "green" },
  [COLORS.WHITE]: { backgroundColor: "white" },
};

/**
 * 根据索引获取按钮的颜色
 * @param index 按钮的索引
 * @returns 按钮的颜色
 */
const RED_INDICES = new Set([
  1, 2, 7, 8, 12, 13, 18, 19, 23, 24, 29, 30, 34, 35, 40, 45, 46,
]);
const BLUE_INDICES = new Set([
  3, 4, 9, 10, 14, 15, 20, 25, 26, 31, 36, 37, 41, 42, 47, 48,
]);

/**
 * 按钮的颜色
 */
type ButtonColor = (typeof COLORS)[keyof typeof COLORS];

/**
 * 根据索引获取按钮的颜色
 * @param index 按钮的索引
 * @returns 按钮的颜色
 */
const getButtonColor = (index: number): ButtonColor => {
  if (RED_INDICES.has(index)) return COLORS.RED;
  if (BLUE_INDICES.has(index)) return COLORS.BLUE;
  return COLORS.GREEN;
};

/**
 * 根据索引获取按钮的样式
 * @param index 按钮的索引
 * @returns 按钮的样式
 */
export const selectedButtonStyle = (index: number, isSelected: boolean) => {
  const color = getButtonColor(index);
  return isSelected ? BUTTON_STYLES[color] : BUTTON_STYLES[COLORS.WHITE];
};

/**
 * 根据索引获取按钮的文本样式
 * @param index 按钮的索引
 * @returns 按钮的文本样式
 */
const TEXT_STYLES = {
  [COLORS.RED]: { color: "red" },
  [COLORS.BLUE]: { color: "blue" },
  [COLORS.GREEN]: { color: "green" },
  [COLORS.WHITE]: { color: "white" },
};

/**
 * 根据索引获取按钮的默认文本样式
 * @param index 按钮的索引
 * @returns 按钮的默认文本样式
 */
export const ButtonDefaultTextStyle = (
  index: number,
  isSelected: boolean
): TextStyle => {
  const color = getButtonColor(index);
  return {
    ...TEXT_STYLES[isSelected ? COLORS.WHITE : color],
    fontSize: 20,
  };
};
