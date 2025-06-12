// handleSelectSmall.ts

interface HandleSelectSmallParams {
  smallSelected: boolean;
  maxSelectCount?: number;
  clearAllSelections: () => void;
  setAllSelected: (val: boolean) => void;
  setBigSelected: (val: boolean) => void;
  setOddSelected: (val: boolean) => void;
  setEvenSelected: (val: boolean) => void;
  setShowAnimals: (val: boolean) => void;
  setSelectedNumbers: (nums: number[]) => void;
  setSmallSelected: (val: boolean) => void;
  onSelectionChange?: (
    selectedNums: number[],
    selectedAnimals: string[]
  ) => void;
}

export function handleSelectSmall({
  smallSelected,
  maxSelectCount,
  clearAllSelections,
  setAllSelected,
  setBigSelected,
  setOddSelected,
  setEvenSelected,
  setShowAnimals,
  setSelectedNumbers,
  setSmallSelected,
  onSelectionChange,
}: HandleSelectSmallParams): void {
  // 清除其他按钮的选中状态
  setAllSelected(false);
  setBigSelected(false);
  setOddSelected(false);
  setEvenSelected(false);
  setShowAnimals(false);

  if (smallSelected) {
    clearAllSelections();
    return;
  }

  if (maxSelectCount && maxSelectCount < 24) {
    return;
  }

  clearAllSelections();
  const newSelectedNumbers = Array.from({ length: 24 }, (_, i) => i + 1);
  setSelectedNumbers(newSelectedNumbers);
  setSmallSelected(true);
  onSelectionChange?.(newSelectedNumbers, []);
}
