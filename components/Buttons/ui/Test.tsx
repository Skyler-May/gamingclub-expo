import useButtonGroupLayout from "@/components/Buttons/hooks/useButtonGroupLayout";

import {
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";

interface ButtonsGroupProps {
  length: number;
  displayInfo: (index: number) => string;
  allSelected: boolean;
  selectedButtons: number[];
  onSelectButton: (number: number) => void;
  onSelectAll?: () => void;
  onClear?: () => void;
  buttonDescription?: string;
  selectedButtonStyle?: (index: number, isSelected: boolean) => object;
  ButtonDefaultTextStyle?: (index: number, isSelected: boolean) => TextStyle;
}

export default function ButtonsGroup({
  length,
  displayInfo,
  allSelected,
  selectedButtons,
  onSelectButton,
  onSelectAll,
  onClear,
  buttonDescription,
  selectedButtonStyle,
  ButtonDefaultTextStyle,
}: ButtonsGroupProps) {
  const { buttonWidth, handleLayout, containerWidth } = useButtonGroupLayout();

  const renderButtonsGroup = () => {
    const buttons = [];
    for (let i = 1; i <= length; i++) {
      const isSelected = selectedButtons.includes(i);
      const label =
        typeof displayInfo === "function" ? displayInfo(i) : displayInfo;

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
            ...(selectedButtonStyle?.(i, isSelected) ?? {}),
          }}
          onPress={() => onSelectButton(i)}
        >
          <Text style={ButtonDefaultTextStyle?.(i, isSelected) ?? {}}>
            {label}
          </Text>

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
