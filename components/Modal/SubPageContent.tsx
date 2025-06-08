import NumberAnimalSelector from "@/components/NumberAnimalSelector/NumberAnimalSelector";
import Balance from "@/components/Wallet/Balance";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SubmitButton from "../Buttons/SubmitButton";

interface SubPageContentProps {
  currentPage: number | null;
}

const SubPageContent: React.FC<SubPageContentProps> = ({ currentPage }) => {
  // 直接使用switch语句，不再检查null值
  switch (currentPage) {
    case 1:
      return (
        <View style={styles.subPage}>
          {/* <Text style={styles.pageTitle}>A 页面内容</Text>
          <Text>这是 A 页面的详细内容</Text> */}
          <NumberAnimalSelector
            buttonDescription="动物值"
            onSelectionChange={(numbers, animals) => {
              console.log("选中的数字:", numbers);
              console.log("选中的动物:", animals);
            }}
          />
          <SubmitButton />
        </View>
      );
    case 2:
      return (
        <View style={styles.subPage}>
          <Text style={styles.pageTitle}>B 页面内容</Text>
          <Text>这是 B 页面的详细内容</Text>
          <Balance />
        </View>
      );
    case 3:
      return (
        <View style={styles.subPage}>
          <Text style={styles.pageTitle}>C 页面内容</Text>
          <Text>这是 C 页面的详细内容</Text>
        </View>
      );
    case 4:
      return (
        <View style={styles.subPage}>
          <Text style={styles.pageTitle}>D 页面内容</Text>
          <Text>这是 D 页面的详细内容</Text>
        </View>
      );
    case 5:
      return (
        <View style={styles.subPage}>
          <Text style={styles.pageTitle}>E 页面内容</Text>
          <Text>这是 E 页面的详细内容</Text>
        </View>
      );
    case 6:
      return (
        <View style={styles.subPage}>
          <Text style={styles.pageTitle}>F 页面内容</Text>
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
  subPage: {
    flex: 1,
  },
  pageTitle: {
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

export default SubPageContent;
