import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import { animalNumberMap } from "./NumberButtons";
import useButtonGroupLayout from "./hooks/useButtonGroupLayout";

interface AnimalButtonsPanelProps {
  // 选中的动物列表
  selectedAnimals: string[];
  // 选择动物的回调函数
  onSelectAnimal: (animal: string) => void;
}

export default function AnimalButtonsPanel({
  selectedAnimals,
  onSelectAnimal,
}: AnimalButtonsPanelProps) {
  const theme = useTheme();
  // 使用自定义Hook处理网格布局
  const { buttonWidth, handleLayout, containerWidth } = useButtonGroupLayout({
    buttonsPerRow: 6, // 每行显示6个动物按钮
    gapSize: 10,
  });

  // 动物列表
  const animals = Object.keys(animalNumberMap);

  return (
    <View style={styles.animalsPanel} onLayout={handleLayout}>
      {containerWidth > 0 &&
        animals.map((animal) => (
          <TouchableOpacity
            key={animal}
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: selectedAnimals.includes(animal)
                ? "orange"
                : theme.colors.elevation.level5,
              borderRadius: 50,
              width: buttonWidth,
              height: buttonWidth,
            }}
            onPress={() => onSelectAnimal(animal)}
          >
            <Text
              style={{
                fontSize: 25,
                color: selectedAnimals.includes(animal)
                  ? theme.colors.surface
                  : theme.colors.primary,
              }}
            >
              {animal}
            </Text>
          </TouchableOpacity>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  animalsPanel: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    borderRadius: 5,
    // margin: 10,
    marginBottom: 10,
    gap: 10,
  },
});
