import { useState } from "react";

export function useQuickButtonState(defaultInitial = [5, 10, 20, 50, 100]) {
  const [selectedValue, setSelectedValue] = useState("");
  const [defaultValues, setDefaultValues] = useState<number[]>(defaultInitial);
  const [isEditing, setIsEditing] = useState(false);
  const [editedValues, setEditedValues] = useState<string[]>(
    defaultInitial.map(String)
  );

  return {
    selectedValue,
    defaultValues,
    isEditing,
    editedValues,
    setSelectedValue,
    setDefaultValues,
    setIsEditing,
    setEditedValues,
  };
}
