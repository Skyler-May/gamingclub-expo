import useButtonGroupLayout from "@/components/Buttons/hooks/useButtonGroupLayout";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ButtonsGroupProps {
  allSelected: boolean;
  selectedButtons: number[];
  onSelectNumber: (number: number) => void;
  onSelectAll: () => void;
  onClear: () => void;
  buttonDescription?: string;
}

export default function ButtonsGroup({
  allSelected,
  selectedButtons,
  onSelectNumber,
  onSelectAll,
  onClear,
  buttonDescription,
}: ButtonsGroupProps) {
  const { buttonWidth, handleLayout, containerWidth } = useButtonGroupLayout();

  const renderButtonsGroup = () => {
    const buttons = [];
    for (let i = 1; i <= 12; i++) {
      const isSelected = selectedButtons.includes(i);
      buttons.push(
        <TouchableOpacity
          key={i}
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: buttonWidth,
            height: buttonWidth,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: isSelected ? "#fff" : "#ccc",
          }}
          onPress={() => onSelectNumber(i)}
        >
          {buttonDescription && (
            <Text
              style={{
                fontSize: 12,
                color: isSelected ? "white" : "#666",
                marginTop: 4,
              }}
            >
              {buttonDescription}
            </Text>
          )}
        </TouchableOpacity>
      );
    }
    return buttons;
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
      <View style={styles.buttonGroup} onLayout={handleLayout}>
        {containerWidth > 0 && renderButtonsGroup()}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: "100%",
  },
  buttonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
});
