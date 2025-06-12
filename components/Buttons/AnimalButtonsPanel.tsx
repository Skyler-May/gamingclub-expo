import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";

// import { animalAgeMap } from "./constants/animalAgeMap";
import useZodiacAge from "@/hooks/date/useZodiacAge"; // ✅ 新增
import useButtonGroupLayout from "./hooks/useButtonGroupLayout";
import { getAnimalAgeMap } from "./utils/animalAgeMap";

interface AnimalButtonsGroupProps {
  selectedAnimals: string[];
  onSelectAnimal: (animal: string) => void;
}

export default function AnimalButtonsGroup({
  selectedAnimals,
  onSelectAnimal,
}: AnimalButtonsGroupProps) {
  const theme = useTheme();
  const { buttonWidth, handleLayout, containerWidth } = useButtonGroupLayout({
    buttonsPerRow: 6,
    gapSize: 10,
  });

  useZodiacAge(); // ✅ 新增：使用自定义 hook
  const animalAgeMap = getAnimalAgeMap();
  if (!animalAgeMap) {
    throw new Error("animalAgeMap 尚未初始化！");
  }
  // 动物列表
  const animals = Object.keys(animalAgeMap);

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
                fontSize: 16,
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
    marginBottom: 10,
    gap: 10,
  },
});
