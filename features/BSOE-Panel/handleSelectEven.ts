// logic/handleSelectEven.ts

interface HandleSelectEvenParams {
  evenSelected: boolean;
  maxSelectCount?: number;
  clearAllSelections: () => void;
  setAllSelected: (val: boolean) => void;
  setBigSelected: (val: boolean) => void;
  setSmallSelected: (val: boolean) => void;
  setOddSelected: (val: boolean) => void;
  setShowAnimals: (val: boolean) => void;
  setSelectedNumbers: (nums: number[]) => void;
  setEvenSelected: (val: boolean) => void;
  onSelectionChange?: (
    selectedNums: number[],
    selectedAnimals: string[]
  ) => void;
}

export function handleSelectEven({
  evenSelected,
  maxSelectCount,
  clearAllSelections,
  setAllSelected,
  setBigSelected,
  setSmallSelected,
  setOddSelected,
  setShowAnimals,
  setSelectedNumbers,
  setEvenSelected,
  onSelectionChange,
}: HandleSelectEvenParams): void {
  setAllSelected(false);
  setBigSelected(false);
  setSmallSelected(false);
  setOddSelected(false);
  setShowAnimals(false);

  if (evenSelected) {
    clearAllSelections();
    return;
  }

  const evenCount = Math.floor(49 / 2); // 一共24个偶数
  if (maxSelectCount && maxSelectCount < evenCount) {
    return;
  }

  clearAllSelections();
  const newSelectedNumbers = Array.from(
    { length: 24 },
    (_, i) => (i + 1) * 2
  ).filter((n) => n <= 49);
  setSelectedNumbers(newSelectedNumbers);
  setEvenSelected(true);
  onSelectionChange?.(newSelectedNumbers, []);
}
