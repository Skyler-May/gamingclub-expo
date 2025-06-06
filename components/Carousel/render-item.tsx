import { ImageStyle, StyleProp } from "react-native";
import { CarouselRenderItem } from "react-native-reanimated-carousel";
import { SlideItem } from "./SlideItem";

interface Options {
  rounded?: boolean;
  style?: StyleProp<ImageStyle>;
}

export const renderItem = ({
  rounded = false,
  style,
}: Options = {}): CarouselRenderItem<any> =>
  function CarouselRenderComponent({ index }: { index: number }) {
    // 移除displayName赋值，因为函数表达式不支持直接设置displayName属性
    return (
      <SlideItem key={index} index={index} rounded={rounded} style={style} />
    );
  };
