// handleClear.ts

interface HandleClearParams {
  setShowAnimals: (val: boolean) => void;
  clearAllSelections: () => void;
}

export function handleClear({
  setShowAnimals,
  clearAllSelections,
}: HandleClearParams): void {
  setShowAnimals(false);
  clearAllSelections();
}
