interface HandleSelectBigOptions {
  bigSelected: boolean;
  maxSelectCount?: number;
  clearAllSelections: () => void;
  setAllSelected: (v: boolean) => void;
  setSmallSelected: (v: boolean) => void;
  setOddSelected: (v: boolean) => void;
  setEvenSelected: (v: boolean) => void;
  setShowAnimals: (v: boolean) => void;
  setSelectedNumbers: (numbers: number[]) => void;
  setBigSelected: (v: boolean) => void;
  onSelectionChange?: (numbers: number[], animals: string[]) => void;
}

export function handleSelectBig({
  bigSelected,
  maxSelectCount,
  clearAllSelections,
  setAllSelected,
  setSmallSelected,
  setOddSelected,
  setEvenSelected,
  setShowAnimals,
  setSelectedNumbers,
  setBigSelected,
  onSelectionChange,
}: HandleSelectBigOptions) {
  // 清除其他按钮状态
  setAllSelected(false);
  setSmallSelected(false);
  setOddSelected(false);
  setEvenSelected(false);
  setShowAnimals(false);

  if (bigSelected) {
    clearAllSelections();
    return;
  }

  if (maxSelectCount && maxSelectCount < 25) {
    return;
  }

  clearAllSelections();

  const newSelectedNumbers = Array.from({ length: 25 }, (_, i) => i + 25); // [25, 26, ..., 49]
  setSelectedNumbers(newSelectedNumbers);
  setBigSelected(true);
  onSelectionChange?.(newSelectedNumbers, []);
}
