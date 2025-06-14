import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export function QuickButtonUI(props: {
  defaultValues: number[];
  selectedValue: string;
  onQuickValuePress: (val: number) => void;
  onEditPress: () => void;
  isModalVisible: boolean;
  editedValues: string[];
  onInputChange: (index: number, text: string) => void;
  onInputFocus: (index: number) => void;
  onInputBlur: (index: number) => void;
  onModalClose: () => void;
  onModalSave: () => void;
}) {
  const {
    defaultValues,
    selectedValue,
    onQuickValuePress,
    onEditPress,
    isModalVisible,
    editedValues,
    onInputChange,
    onInputFocus,
    onInputBlur,
    onModalClose,
    onModalSave,
  } = props;

  return (
    <View style={styles.container}>
      {defaultValues.map((num, index) => (
        <TouchableOpacity
          key={num}
          style={[
            styles.button,
            selectedValue === num.toString() && styles.selectedButton,
          ]}
          onPress={() => onQuickValuePress(num)}
        >
          <Text style={styles.buttonText}>{num}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={onEditPress} style={styles.iconButton}>
        <AntDesign name="edit" size={20} color="blue" />
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={onModalClose}
              style={styles.modalCloseButton}
            >
              <AntDesign name="closecircleo" size={24} color="red" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              编辑快捷金额：
              <Text style={{ color: "red", fontSize: 12 }}>不能设置相同值</Text>
            </Text>
            {editedValues.map((val, index) => (
              <View key={index}>
                <Text style={styles.modalLabel}>{`金额 ${index + 1}:`}</Text>
                <TextInput
                  value={val}
                  onChangeText={(text) => onInputChange(index, text)}
                  onFocus={() => onInputFocus(index)}
                  onBlur={() => onInputBlur(index)}
                  keyboardType="numeric"
                  style={styles.modalInput}
                />
              </View>
            ))}
            <TouchableOpacity
              onPress={onModalSave}
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
  },
  button: {
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
