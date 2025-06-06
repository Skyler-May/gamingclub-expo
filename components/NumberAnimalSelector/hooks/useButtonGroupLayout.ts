import { useState } from "react";
import { LayoutChangeEvent } from "react-native";

interface ButtonsLayoutOptions {
  /**
   * 每行显示的按钮数量
   * @default 4
   */
  buttonsPerRow?: number;
  /**
   * 按钮之间的间距
   * @default 10
   */
  gapSize?: number;
  /**
   * 初始容器宽度
   * @default 0
   */
  initialContainerWidth?: number;
}

/**
 * 网格按钮布局Hook
 * 用于计算网格布局中按钮的尺寸和位置
 */
export default function useButtonGroupLayout({
  buttonsPerRow = 4,
  gapSize = 10,
  initialContainerWidth = 0,
}: ButtonsLayoutOptions = {}) {
  // 使用state存储容器宽度
  const [containerWidth, setContainerWidth] = useState(initialContainerWidth);

  // 计算按钮之间的间距总和 (间距数量 = 按钮数量 - 1)
  const totalGapWidth = gapSize * (buttonsPerRow - 1);

  // 计算每个按钮的宽度 (容器宽度 - 总间距) / 按钮数量
  const buttonWidth =
    containerWidth > 0 ? (containerWidth - totalGapWidth) / buttonsPerRow : 0;

  // 添加日志，输出计算信息
  console.log("[useButtonGroupLayout] 配置信息:", {
    buttonsPerRow,
    gapSize,
    initialContainerWidth,
  });
  console.log("[useButtonGroupLayout] 容器宽度:", containerWidth);
  console.log("[useButtonGroupLayout] 按钮宽度:", buttonWidth);

  // 处理布局变化，获取容器实际宽度
  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    console.log("[useButtonGroupLayout] 布局事件触发，获取到容器宽度:", width);
    setContainerWidth(width);
  };

  return {
    containerWidth,
    buttonWidth,
    gapSize,
    buttonsPerRow,
    handleLayout,
    // 额外提供一个方法用于手动设置容器宽度（在某些场景可能需要）
    setContainerWidth,
  };
}
