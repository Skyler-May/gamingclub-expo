import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// ✅ 修改函数名为大写开头以符合 React 组件命名规范
export function AddButton() {
  const [selectedAmounts, setselectedAmounts] = useState("");
  const [defaultAmounts, setDefaultAmounts] = useState<number[]>([
    5, 10, 20, 50, 100,
  ]);
  const [isEditingDefaultAmount, setIsEditingDefaultAmount] =
    useState<boolean>(false);
  const [editedDefaultAmounts, setEditedDefaultAmounts] = useState<string[]>(
    defaultAmounts.map(String)
  );

  // 处理编辑默认金额按钮点击事件的函数
  const handleEditDefaultAmountButtonPress = () => {
    setIsEditingDefaultAmount(true);
  };

  // 处理输入框聚焦事件的函数
  const handleInputFocus = (index: number) => {
    const newEditedAmounts = [...editedDefaultAmounts];
    newEditedAmounts[index] = "";
    setEditedDefaultAmounts(newEditedAmounts);
  };

  // 处理输入框失焦事件的函数
  const handleInputBlur = (index: number) => {
    const editedValue = editedDefaultAmounts[index];
    if (editedValue.trim() === "") {
      const newEditedAmounts = [...editedDefaultAmounts];
      newEditedAmounts[index] = defaultAmounts[index].toString();
      setEditedDefaultAmounts(newEditedAmounts);
    }
  };

  // 处理快捷金额按钮按下后添加到输入框
  const handleQuickAmountButtonPress = (number: number) => {
    setselectedAmounts(Math.floor(number).toString());
  };

  // 处理模态框保存按钮逻辑
  const handleModleSaveButtonPress = () => {
    const hasEmptyOrZero = editedDefaultAmounts.some(
      (value) => value.trim() === "" || parseInt(value) === 0
    );

    if (hasEmptyOrZero) {
      Alert.alert("警告", "金额不能为空且不能为 0");
      return;
    }

    const isUniqueKey = editedDefaultAmounts.every((value, index) => {
      return editedDefaultAmounts.indexOf(value) === index;
    });

    if (!isUniqueKey) {
      Alert.alert("警告", "金额重复，请重新输入");
      return;
    }

    setDefaultAmounts(editedDefaultAmounts.map(parseFloat));
    setIsEditingDefaultAmount(false);
  };

  return (
    <View style={styles.container}>
      {defaultAmounts.map((number) => (
        <TouchableOpacity
          key={number}
          style={[
            styles.button,
            selectedAmounts === number.toString() && styles.selectedButton,
          ]}
          onPress={() => handleQuickAmountButtonPress(number)}
        >
          <Text style={styles.buttonText}>{number}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        onPress={handleEditDefaultAmountButtonPress}
        style={styles.iconButton}
      >
        <AntDesign name="edit" size={20} color="gray" />
        {/* <Text style={{ fontSize: 12, color: "gray" }}>快捷</Text> */}
      </TouchableOpacity>

      {/* Modal content  */}
      <Modal
        visible={isEditingDefaultAmount}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setIsEditingDefaultAmount(false)}
              style={styles.modalCloseButton}
            >
              <AntDesign name="closecircleo" size={24} color="red" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              编辑快捷金额：
              <Text style={{ color: "red", fontSize: 12 }}>不能设置相同值</Text>
            </Text>
            {defaultAmounts.map((amount, index) => (
              <View key={amount.toString()}>
                <Text style={styles.modalLabel}>{`金额 ${index + 1}:`}</Text>
                <TextInput
                  value={editedDefaultAmounts[index]}
                  onChangeText={(text) => {
                    const newEditedAmounts = [...editedDefaultAmounts];
                    newEditedAmounts[index] = text;
                    setEditedDefaultAmounts(newEditedAmounts);
                  }}
                  keyboardType="numeric"
                  style={styles.modalInput}
                  onFocus={() => handleInputFocus(index)}
                  onBlur={() => handleInputBlur(index)}
                />
              </View>
            ))}
            <TouchableOpacity
              onPress={handleModleSaveButtonPress}
              style={styles.modalSaveButton}
            >
              <Text style={styles.modalSaveButtonText}>保存</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    // padding: 10,
    backgroundColor: "#FFFFE0", // 浅黄色 #FFFFE0
  },
  button: {
    // padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  buttonText: {
    fontSize: 14,
  },
  iconButton: {
    //backgroundColor: "#FFD700", // 黄色
    flexDirection: "row",
    alignItems: "center",
  },
  // Modal
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalCloseButton: {
    alignSelf: "flex-end",
  },
  modalSaveButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 5,
    alignItems: "center",
  },
  modalSaveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
});
