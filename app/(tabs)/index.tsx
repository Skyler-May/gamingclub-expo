import { QuickButton } from "@/components/Buttons/QuickButton";
import Test from "@/components/Buttons/test/Test";
import {
  ButtonDefaultTextStyle,
  selectedButtonStyle,
} from "@/components/Buttons/utils/buttonGroupStyles";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const [selectedButtons, setSelectedNumbers] = useState<number[]>([]);
  const handleSelectNumber = (number: number) => {
    if (selectedButtons.includes(number)) {
      setSelectedNumbers(selectedButtons.filter((n) => n !== number));
    } else {
      setSelectedNumbers([...selectedButtons, number]);
    }
  };
  const label = (i: number) => "鼠牛虎兔笼蛇马羊猴鸡狗猪"[i - 1]; // 假设按钮数量为 5，显示 A~E
  const label1 = (i: number) => i.toString().padStart(2, "0"); // 假设按钮数量为 5，显示 01~05,保持两位数
  const label3 = (i: number) => i.toString(); // 假设按钮数量为 5，显示 1~5

  return (
    <View style={styles.container}>
      <QuickButton />
      <Test
        allSelected={false}
        selectedButtons={selectedButtons}
        onSelectButton={handleSelectNumber}
        length={12}
        displayInfo={label}
        selectedButtonStyle={selectedButtonStyle}
        ButtonDefaultTextStyle={ButtonDefaultTextStyle}
        buttonDescription="48.8"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});
