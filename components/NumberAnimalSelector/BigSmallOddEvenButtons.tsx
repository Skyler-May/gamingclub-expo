import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";

interface SelectButtonsProps {
  showAnimals: boolean;
  toggleAnimalsPanel: () => void;
  allSelected: boolean;
  onSelectAll: () => void;
  onClear: () => void;
  onSelectBig: () => void;
  onSelectSmall: () => void;
  onSelectOdd: () => void;
  onSelectEven: () => void;
  bigSelected: boolean;
  smallSelected: boolean;
  oddSelected: boolean;
  evenSelected: boolean;
}

export default function SelectButtons({
  showAnimals,
  toggleAnimalsPanel,
  allSelected,
  onSelectAll,
  onClear,
  onSelectBig,
  onSelectSmall,
  onSelectOdd,
  onSelectEven,
  bigSelected,
  smallSelected,
  oddSelected,
  evenSelected,
}: SelectButtonsProps) {
  const theme = useTheme();

  // 定义按钮数组
  const buttons = [
    { text: "全", onPress: onSelectAll, selected: allSelected },
    { text: "大", onPress: onSelectBig, selected: bigSelected },
    { text: "小", onPress: onSelectSmall, selected: smallSelected },
    { text: "单", onPress: onSelectOdd, selected: oddSelected },
    { text: "双", onPress: onSelectEven, selected: evenSelected },
    { text: "动物", onPress: toggleAnimalsPanel, selected: showAnimals },
    { text: "清空", onPress: onClear, selected: false },
  ];

  // 创建样式
  const styles = StyleSheet.create({
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: 50,
    },
    button: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.elevation.level5,
      borderRadius: 5,
      width: 40,
      height: 30,
    },
    selectedButton: {
      backgroundColor: "orange", // 使用主题的主色
    },
    text: {
      fontSize: 14,
      color: "orange", // 默认文本颜色
    },
    selectedText: {
      color: theme.colors.surface, // 选中时的文本颜色 theme.colors.onPrimary
    },
  });

  return (
    <View style={styles.buttonRow}>
      {buttons.map((button, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.button, button.selected && styles.selectedButton]}
          onPress={button.onPress}
        >
          <Text style={[styles.text, button.selected && styles.selectedText]}>
            {button.text}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
