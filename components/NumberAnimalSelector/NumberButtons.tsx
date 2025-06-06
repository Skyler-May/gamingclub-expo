import useButtonGroupLayout from "@/components/NumberAnimalSelector/hooks/useButtonGroupLayout";
import {
  ButtonDefaultTextStyle,
  selectedButtonStyle,
} from "@/components/NumberAnimalSelector/utils/buttonStyleUtils";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface NumberButtonsProps {
  // 全选状态
  allSelected: boolean;
  // 选中的数字列表
  selectedNumbers: number[];
  // 选择数字的回调函数
  onSelectNumber: (number: number) => void;
  // 全选的回调函数
  onSelectAll: () => void;
  // 清空的回调函数
  onClear: () => void;
  // 按钮下方的描述文本
  buttonDescription?: string;
}

export default function NumberButtons({
  allSelected,
  selectedNumbers,
  onSelectNumber,
  onSelectAll,
  onClear,
  buttonDescription,
}: NumberButtonsProps) {
  // 使用自定义Hook处理网格布局
  const { buttonWidth, handleLayout, containerWidth } = useButtonGroupLayout();

  // 渲染数字按钮
  const renderNumberButtons = () => {
    const buttons = [];
    for (let i = 1; i <= 49; i++) {
      // 数值小于两位的前面加0
      const displayNumber = i < 10 ? `0${i}` : `${i}`;
      const isSelected = selectedNumbers.includes(i);

      buttons.push(
        <TouchableOpacity
          key={i}
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: buttonWidth,
            height: buttonWidth,
            ...selectedButtonStyle(i, isSelected),
            borderRadius: 5,
            borderWidth: 1,
            borderColor: isSelected ? "#fff" : "#ccc",
          }}
          onPress={() => onSelectNumber(i)}
        >
          <Text style={ButtonDefaultTextStyle(i, isSelected)}>
            {displayNumber}
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
      <View style={styles.numberButtonGroup} onLayout={handleLayout}>
        {containerWidth > 0 && renderNumberButtons()}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: "100%",
  },
  numberButtonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    // margin: 10,
    gap: 10,
  },
});

// 动物与数字的映射关系
export const animalNumberMap = {
  // 鼠: [1, 13, 25, 37, 49],
  // 牛: [2, 14, 26, 38],
  // 虎: [3, 15, 27, 39],
  // 兔: [4, 16, 28, 40],
  // 龙: [5, 17, 29, 41],
  // 蛇: [6, 18, 30, 42],
  // 马: [7, 19, 31, 43],
  // 羊: [8, 20, 32, 44],
  // 猴: [9, 21, 33, 45],
  // 鸡: [10, 22, 34, 46],
  // 狗: [11, 23, 35, 47],
  // 猪: [12, 24, 36, 48],
  "🐁": [1, 13, 25, 37, 49],
  "🐃": [2, 14, 26, 38],
  "🐯": [3, 15, 27, 39],
  "🐰": [4, 16, 28, 40],
  "🐉": [5, 17, 29, 41],
  "🐍": [6, 18, 30, 42],
  "🐎": [7, 19, 31, 43],
  "🐑": [8, 20, 32, 44],
  "🐒": [9, 21, 33, 45],
  "🐓": [10, 22, 34, 46],
  "🐕": [11, 23, 35, 47],
  "🐖": [12, 24, 36, 48],
};
