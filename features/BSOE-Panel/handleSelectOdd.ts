// logic/handleSelectOdd.ts

interface HandleSelectOddParams {
  oddSelected: boolean;
  maxSelectCount?: number;
  clearAllSelections: () => void;
  setAllSelected: (val: boolean) => void;
  setBigSelected: (val: boolean) => void;
  setSmallSelected: (val: boolean) => void;
  setEvenSelected: (val: boolean) => void;
  setShowAnimals: (val: boolean) => void;
  setSelectedNumbers: (nums: number[]) => void;
  setOddSelected: (val: boolean) => void;
  onSelectionChange?: (
    selectedNums: number[],
    selectedAnimals: string[]
  ) => void;
}

export function handleSelectOdd({
  oddSelected,
  maxSelectCount,
  clearAllSelections,
  setAllSelected,
  setBigSelected,
  setSmallSelected,
  setEvenSelected,
  setShowAnimals,
  setSelectedNumbers,
  setOddSelected,
  onSelectionChange,
}: HandleSelectOddParams): void {
  // 清除其他按钮的选中状态
  setAllSelected(false);
  setBigSelected(false);
  setSmallSelected(false);
  setEvenSelected(false);
  setShowAnimals(false);

  if (oddSelected) {
    clearAllSelections();
    return;
  }

  const oddCount = Math.ceil(49 / 2); // 一共25个奇数
  if (maxSelectCount && maxSelectCount < oddCount) {
    return;
  }

  clearAllSelections();
  const newSelectedNumbers = Array.from(
    { length: 25 },
    (_, i) => i * 2 + 1
  ).filter((n) => n <= 49);
  setSelectedNumbers(newSelectedNumbers);
  setOddSelected(true);
  onSelectionChange?.(newSelectedNumbers, []);
}
