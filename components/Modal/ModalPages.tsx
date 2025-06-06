import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PageButtonProps {
  id: number;
  title: string;
  onPress: () => void;
}

interface ModalPagesProps {
  pages: PageButtonProps[];
  itemsPerRow?: number;
}

const ModalPages: React.FC<ModalPagesProps> = ({ pages, itemsPerRow = 4 }) => {
  // 计算需要多少行
  const rowCount = Math.ceil(pages.length / itemsPerRow);

  // 创建行数组
  const rows = Array.from({ length: rowCount }, (_, rowIndex) => {
    // 获取当前行的按钮
    const rowButtons = pages.slice(
      rowIndex * itemsPerRow,
      (rowIndex + 1) * itemsPerRow
    );

    // 如果当前行按钮数量不足，添加空占位符
    const filledRowButtons = [...rowButtons];
    while (filledRowButtons.length < itemsPerRow) {
      filledRowButtons.push({ id: 0, title: "", onPress: () => {} });
    }

    return filledRowButtons;
  });

  return (
    <View style={styles.buttonContainer}>
      {rows.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.buttonRow}>
          {row.map((button, buttonIndex) => (
            <View
              key={`button-${button.id || rowIndex}-${buttonIndex}`}
              style={styles.buttonWrapper}
            >
              {button.title ? (
                <TouchableOpacity
                  onPress={button.onPress}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>{button.title}</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  buttonWrapper: {
    width: "25%",
    padding: 5,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
});

export default ModalPages;
