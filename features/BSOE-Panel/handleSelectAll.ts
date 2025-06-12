interface HandleSelectAllParams {
  allSelected: boolean;
  maxSelectCount?: number;
  setAllSelected: (val: boolean) => void;
  setBigSelected: (val: boolean) => void;
  setSmallSelected: (val: boolean) => void;
  setOddSelected: (val: boolean) => void;
  setEvenSelected: (val: boolean) => void;
  setShowAnimals: (val: boolean) => void;
  setSelectedNumbers: (nums: number[]) => void;
  setSelectedAnimals: (animals: string[]) => void;
  onSelectionChange?: (numbers: number[], animals: string[]) => void;
}

export function handleSelectAll({
  allSelected,
  maxSelectCount,
  setAllSelected,
  setBigSelected,
  setSmallSelected,
  setOddSelected,
  setEvenSelected,
  setShowAnimals,
  setSelectedNumbers,
  setSelectedAnimals,
  onSelectionChange,
}: HandleSelectAllParams): void {
  // 清除其他按钮状态
  setBigSelected(false);
  setSmallSelected(false);
  setOddSelected(false);
  setEvenSelected(false);
  setShowAnimals(false);

  let newSelectedNumbers: number[] = [];

  if (allSelected) {
    // 取消全选
    newSelectedNumbers = [];
    setAllSelected(false);
  } else {
    // 全选前做限制检查
    if (maxSelectCount && maxSelectCount < 49) {
      return;
    }
    newSelectedNumbers = Array.from({ length: 49 }, (_, i) => i + 1);
    setAllSelected(true);
  }

  setSelectedNumbers(newSelectedNumbers);
  setSelectedAnimals([]);
  onSelectionChange?.(newSelectedNumbers, []);
}
