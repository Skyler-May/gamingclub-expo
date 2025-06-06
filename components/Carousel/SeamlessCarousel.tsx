import * as React from "react";
import { Dimensions, View } from "react-native";
import {
  useSharedValue,
} from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { renderItem } from "./render-item";

const defaultDataWith6Colors = [
  "#B0604D",
  "#899F9C",
  "#B3C680",
  "#5C6265",
  "#F5D399",
  "#F1F1F1",
];

const PAGE_WIDTH = Dimensions.get("window").width;

function SeamlessCarousel() {
  const progress = useSharedValue<number>(0);
  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH,
    height: PAGE_WIDTH * 0.6,
  } as const;

  const ref = React.useRef<ICarouselInstance>(null);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View style={{ position: 'relative' }}>
      <View>
        <Carousel
          ref={ref}
          {...baseOptions}
          loop
          autoPlay
          onProgressChange={progress}
          style={{ width: PAGE_WIDTH }}
          data={defaultDataWith6Colors}
          renderItem={renderItem({ rounded: true })}
        />
      </View>

      <Pagination.Basic<{ color: string }>
        progress={progress}
        data={defaultDataWith6Colors.map((color) => ({ color }))}
        dotStyle={{
          width: 25,
          height: 4,
          backgroundColor: "#262626",
        }}
        activeDotStyle={{
          overflow: "hidden",
          backgroundColor: "#f1f1f1",
        }}
        containerStyle={{
          position: 'absolute',
          bottom: 20,
          left: 0,
          right: 0,
          gap: 10,
          justifyContent: 'center',
        }}
        horizontal
        onPress={onPressPagination}
      />
    </View>
  );
}

export default SeamlessCarousel;
