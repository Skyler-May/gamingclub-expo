import { createQuickButtonLogic } from "@/features/quickButtonLogic";
import { useQuickButtonState } from "@/hooks/useQuickButtonHook";
import React from "react";
import { QuickButtonUI } from "./ui/QuickButtonUI";

export function QuickButton() {
  const {
    selectedValue,
    defaultValues,
    isEditing,
    editedValues,
    setSelectedValue,
    setDefaultValues,
    setIsEditing,
    setEditedValues,
  } = useQuickButtonState();

  const { validateAndSave } = createQuickButtonLogic({
    defaultValues,
    editedValues,
    setDefaultValues,
    setIsEditing,
  });

  return (
    <QuickButtonUI
      defaultValues={defaultValues}
      selectedValue={selectedValue}
      onQuickValuePress={(val) => setSelectedValue(String(val))}
      onEditPress={() => setIsEditing(true)}
      isModalVisible={isEditing}
      editedValues={editedValues}
      onInputChange={(index, text) => {
        const newValues = [...editedValues];
        newValues[index] = text;
        setEditedValues(newValues);
      }}
      onInputFocus={(index) => {
        const newValues = [...editedValues];
        newValues[index] = "";
        setEditedValues(newValues);
      }}
      onInputBlur={(index) => {
        if (editedValues[index].trim() === "") {
          const newValues = [...editedValues];
          newValues[index] = defaultValues[index].toString();
          setEditedValues(newValues);
        }
      }}
      onModalClose={() => setIsEditing(false)}
      onModalSave={validateAndSave}
    />
  );
}
