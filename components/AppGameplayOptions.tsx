import NumberAnimalSelector from "@/components/Buttons/NumberAnimalSelector";
import Balance from "@/components/ui/Balance";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface GameplayContentProps {
  currentGameplay: number | null;
}

const GameplayContent: React.FC<GameplayContentProps> = ({
  currentGameplay,
}) => {
  // 直接使用switch语句，不再检查null值
  switch (currentGameplay) {
    case 1:
      return (
        <View style={styles.Gameplay}>
          {/* <Text style={styles.Title}>A 页面内容</Text>
          <Text>这是 A 页面的详细内容</Text> */}
          <NumberAnimalSelector
            buttonDescription="48.8"
            onSelectionChange={(numbers, animals) => {
              console.log("选中的数字:", numbers);
              console.log("选中的动物:", animals);
            }}
          />
        </View>
      );
    case 2:
      return (
        <View style={styles.Gameplay}>
          <Text style={styles.Title}>B 页面内容</Text>
          <Text>这是 B 页面的详细内容</Text>
          <Balance />
        </View>
      );
    case 3:
      return (
        <View style={styles.Gameplay}>
          <Text style={styles.Title}>C 页面内容</Text>
          <Text>这是 C 页面的详细内容</Text>
        </View>
      );
    case 4:
      return (
        <View style={styles.Gameplay}>
          <Text style={styles.Title}>D 页面内容</Text>
          <Text>这是 D 页面的详细内容</Text>
        </View>
      );
    case 5:
      return (
        <View style={styles.Gameplay}>
          <Text style={styles.Title}>E 页面内容</Text>
          <Text>这是 E 页面的详细内容</Text>
        </View>
      );
    case 6:
      return (
        <View style={styles.Gameplay}>
          <Text style={styles.Title}>F 页面内容</Text>
          <Text>这是 F 页面的详细内容</Text>
        </View>
      );
    default:
      return (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>未知页面</Text>
        </View>
      );
  }
};

const styles = StyleSheet.create({
  Gameplay: {
    flex: 1,
  },
  Title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 16,
    color: "#888",
  },
});

export default GameplayContent;
