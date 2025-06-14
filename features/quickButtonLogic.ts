import { Alert } from "react-native";

export function createQuickButtonLogic({
  defaultValues,
  editedValues,
  setDefaultValues,
  setIsEditing,
}: {
  defaultValues: number[];
  editedValues: string[];
  setDefaultValues: (values: number[]) => void;
  setIsEditing: (visible: boolean) => void;
}) {
  function validateAndSave() {
    const hasEmptyOrZero = editedValues.some(
      (value) => value.trim() === "" || parseInt(value) === 0
    );

    if (hasEmptyOrZero) {
      Alert.alert("警告", "金额不能为空且不能为 0");
      return;
    }

    const isUnique = editedValues.every(
      (value, index) => editedValues.indexOf(value) === index
    );

    if (!isUnique) {
      Alert.alert("警告", "金额重复，请重新输入");
      return;
    }

    setDefaultValues(editedValues.map(Number));
    setIsEditing(false);
  }

  return {
    validateAndSave,
  };
}
