import { AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Badge } from "react-native-paper";
import { QuickButton } from "./QuickButton";

export default function SubmitButton() {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={{ width: "60%" }}>
          <QuickButton />
        </View>
        <View style={{ width: "38%" }}>{/* <QuickButton /> */}</View>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity>
          <AntDesign name="delete" size={24} color="tomato" />
          <Text style={{ fontSize: 12, color: "gray" }}>清空</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="shake" size={24} color="gray" />
          <Text style={{ fontSize: 12, color: "gray" }}>随机</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="shoppingcart" size={24} color="blue" />
          <Badge
            visible={true}
            size={16}
            style={{ position: "absolute", top: -5, right: -5 }}
          >
            {"12"}
          </Badge>
          <Text style={{ fontSize: 12, color: "gray" }}>数量</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="输入金额"
          placeholderTextColor="gray"
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>添加</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "#663399", // 紫色背景颜色 #663399
    height: 100,
    width: "100%",
    justifyContent: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
    // padding: 10,
    gap: 10,
  },
  topContainer: {
    gap: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    borderBlockColor: "black",
    //   backgroundColor: "red", // 红色背景颜色
  },
  bottomContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    //   backgroundColor: "yellow", // 黄色背景颜色
  },
  submitButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: 6,
    borderColor: "#ddd",
    fontSize: 5,
    backgroundColor: "#007AFF",
  },
  submitButtonText: {
    textAlign: "center",
    color: "white",
    width: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
    width: 100,
    fontSize: 14,
    color: "gray",
  },
});
