interface ToggleAnimalsPanelParams {
  showAnimals: boolean;
  setShowAnimals: (val: boolean) => void;
  setAllSelected: (val: boolean) => void;
  setBigSelected: (val: boolean) => void;
  setSmallSelected: (val: boolean) => void;
  setOddSelected: (val: boolean) => void;
  setEvenSelected: (val: boolean) => void;
  clearAllSelections: () => void;
}

export function toggleAnimalsPanel({
  showAnimals,
  setShowAnimals,
  setAllSelected,
  setBigSelected,
  setSmallSelected,
  setOddSelected,
  setEvenSelected,
  clearAllSelections,
}: ToggleAnimalsPanelParams) {
  // 清除其他按钮的选中状态
  setAllSelected(false);
  setBigSelected(false);
  setSmallSelected(false);
  setOddSelected(false);
  setEvenSelected(false);

  // 切换面板显示状态并清空选择
  setShowAnimals(!showAnimals);
  clearAllSelections();
}
