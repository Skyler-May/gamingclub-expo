import useButtonGroupLayout from "@/components/Buttons/hooks/useButtonGroupLayout";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ButtonsGroupProps {
  length: number;
  allSelected: boolean;
  selectedButtons: number[];
  onSelectButton: (number: number) => void;
  onSelectAll: () => void;
  onClear: () => void;
  buttonDescription?: string;
}

export default function ButtonsGroup({
  length,
  allSelected,
  selectedButtons,
  onSelectButton,
  onSelectAll,
  onClear,
  buttonDescription,
}: ButtonsGroupProps) {
  const { buttonWidth, handleLayout, containerWidth } = useButtonGroupLayout();

  const renderButtonsGroup = () => {
    const buttons = [];
    for (let i = 1; i <= length; i++) {
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
          onPress={() => onSelectButton(i)}
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
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
});
