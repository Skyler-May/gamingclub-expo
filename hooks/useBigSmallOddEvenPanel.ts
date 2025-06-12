import { useCallback, useState } from "react";

interface UseBigSmallOddEvenPanelOptions {
  maxSelectCount?: number;
  onSelectionChange?: (numbers: number[], animals: string[]) => void;
}

export function useBigSmallOddEvenPanel(
  options?: UseBigSmallOddEvenPanelOptions
) {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [selectedAnimals, setSelectedAnimals] = useState<string[]>([]);
  const [bigSelected, setBigSelected] = useState(false);
  const [smallSelected, setSmallSelected] = useState(false);
  const [oddSelected, setOddSelected] = useState(false);
  const [evenSelected, setEvenSelected] = useState(false);
  const [showAnimals, setShowAnimals] = useState(false);
  const [allSelected, setAllSelected] = useState(false);

  const toggleAnimalsPanel = useCallback(() => {
    setShowAnimals((prev) => !prev);
  }, []);

  // ✅ 暴露所有状态与 setter，处理函数由外部注入或调用
  return {
    selectedNumbers,
    setSelectedNumbers,

    selectedAnimals,
    setSelectedAnimals,

    bigSelected,
    setBigSelected,

    smallSelected,
    setSmallSelected,

    oddSelected,
    setOddSelected,

    evenSelected,
    setEvenSelected,

    showAnimals,
    setShowAnimals,

    allSelected,
    setAllSelected,

    toggleAnimalsPanel,

    maxSelectCount: options?.maxSelectCount,
    onSelectionChange: options?.onSelectionChange,
  };
}
