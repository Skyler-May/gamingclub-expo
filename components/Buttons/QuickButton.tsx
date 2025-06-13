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

export function QuickButton() {
  const [selectedValues, setselectedValues] = useState("");
  const [defaultValues, setDefaultValues] = useState<number[]>([
    5, 10, 20, 50, 100,
  ]);
  const [isEditingDefaultValue, setIsEditingDefaultValue] =
    useState<boolean>(false);
  const [editedDefaultValues, setEditedDefaultValues] = useState<string[]>(
    defaultValues.map(String)
  );

  // 处理编辑默认金额按钮点击事件的函数
  const handleEditDefaultValueButtonPress = () => {
    setIsEditingDefaultValue(true);
  };

  // 处理输入框聚焦事件的函数
  const handleInputFocus = (index: number) => {
    const newEditedValues = [...editedDefaultValues];
    newEditedValues[index] = "";
    setEditedDefaultValues(newEditedValues);
  };

  // 处理输入框失焦事件的函数
  const handleInputBlur = (index: number) => {
    const editedValue = editedDefaultValues[index];
    if (editedValue.trim() === "") {
      const newEditedValues = [...editedDefaultValues];
      newEditedValues[index] = defaultValues[index].toString();
      setEditedDefaultValues(newEditedValues);
    }
  };

  // 处理快捷金额按钮按下后添加到输入框
  const handleQuickValueButtonPress = (number: number) => {
    setselectedValues(Math.floor(number).toString());
  };

  // 处理模态框保存按钮逻辑
  const handleModleSaveButtonPress = () => {
    const hasEmptyOrZero = editedDefaultValues.some(
      (value) => value.trim() === "" || parseInt(value) === 0
    );

    if (hasEmptyOrZero) {
      Alert.alert("警告", "金额不能为空且不能为 0");
      return;
    }

    const isUniqueKey = editedDefaultValues.every((value, index) => {
      return editedDefaultValues.indexOf(value) === index;
    });

    if (!isUniqueKey) {
      Alert.alert("警告", "金额重复，请重新输入");
      return;
    }

    setDefaultValues(editedDefaultValues.map(parseFloat));
    setIsEditingDefaultValue(false);
  };

  return (
    <View style={styles.container}>
      {defaultValues.map((number) => (
        <TouchableOpacity
          key={number}
          style={[
            styles.button,
            selectedValues === number.toString() && styles.selectedButton,
          ]}
          onPress={() => handleQuickValueButtonPress(number)}
        >
          <Text style={styles.buttonText}>{number}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        onPress={handleEditDefaultValueButtonPress}
        style={styles.iconButton}
      >
        <AntDesign name="edit" size={20} color="blue" />
        {/* <Text style={{ fontSize: 12, color: "gray" }}>快捷</Text> */}
      </TouchableOpacity>

      {/* Modal content  */}
      <Modal
        visible={isEditingDefaultValue}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setIsEditingDefaultValue(false)}
              style={styles.modalCloseButton}
            >
              <AntDesign name="closecircleo" size={24} color="red" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              编辑快捷金额：
              <Text style={{ color: "red", fontSize: 12 }}>不能设置相同值</Text>
            </Text>
            {defaultValues.map((Value, index) => (
              <View key={Value.toString()}>
                <Text style={styles.modalLabel}>{`金额 ${index + 1}:`}</Text>
                <TextInput
                  value={editedDefaultValues[index]}
                  onChangeText={(text) => {
                    const newEditedValues = [...editedDefaultValues];
                    newEditedValues[index] = text;
                    setEditedDefaultValues(newEditedValues);
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
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "#FFFFE0", // 设置背景颜色为浅黄色
    // padding: 10,
  },
  button: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    marginBottom: 10,
    backgroundColor: "#f2f2f2",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
  },
  selectedButton: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  buttonText: {
    fontSize: 14,
  },
  iconButton: {
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
