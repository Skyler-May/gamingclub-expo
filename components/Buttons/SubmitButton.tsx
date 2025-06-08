import { AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Badge } from "react-native-paper";

export default function SubmitButton() {
  return (
    <View style={styles.container}>
      <View style={styles.addDataButtonContainer}>
        <TouchableOpacity>
          <AntDesign name="delete" size={24} color="tomato" />
          {/* <Text style={{ fontSize: 12, color: "gray" }}>清空</Text> */}
        </TouchableOpacity>

        <TouchableOpacity>
          <AntDesign name="shake" size={24} color="tomato" />
          {/* <Text style={{ fontSize: 12, color: "gray" }}>随机</Text> */}
        </TouchableOpacity>

        <TouchableOpacity>
          <AntDesign name="shoppingcart" size={24} color="tomato" />
          <Badge
            visible={true}
            size={16}
            style={{ position: "absolute", top: -5, right: -5 }}
          >
            {"12"}
          </Badge>
          {/* <Text style={{ fontSize: 12, color: "gray" }}>数量</Text> */}
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="输入金额"
          placeholderTextColor="gray"
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addDataButton}>
          <Text style={styles.addDataButtonText}>添加</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: "red",
    justifyContent: "center",
    width: "100%",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },

  addDataButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 5,
    borderBlockColor: "black",
  },

  addDataButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: 6,
    borderColor: "#ddd",
    fontSize: 5,
    backgroundColor: "#007AFF",
  },
  addDataButtonText: {
    textAlign: "center",
    color: "white",
    width: 60,
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
