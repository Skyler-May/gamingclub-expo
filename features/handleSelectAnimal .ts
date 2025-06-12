import { getAnimalAgeMap } from "@/components/Buttons/utils/animalAgeMap";

interface HandleSelectAnimalParams {
  selectedNumbers: number[];
  selectedAnimals: string[];
  animal: string;
  maxSelectCount?: number;
}

export function handleSelectAnimal({
  selectedAnimals,
  selectedNumbers,
  animal,
  maxSelectCount,
}: HandleSelectAnimalParams): {
  newSelectedAnimals: string[];
  newSelectedNumbers: number[];
} {
  const animalAgeMap = getAnimalAgeMap();
  if (!animalAgeMap) {
    throw new Error("animalAgeMap 尚未初始化！");
  }

  const animalNumbers = animalAgeMap[animal as keyof typeof animalAgeMap];

  if (selectedAnimals.includes(animal)) {
    // 取消选中
    const newSelectedAnimals = selectedAnimals.filter((a) => a !== animal);
    const newSelectedNumbers = selectedNumbers.filter(
      (num) => !animalNumbers.includes(num)
    );
    return { newSelectedAnimals, newSelectedNumbers };
  } else {
    // 检查数量
    if (
      maxSelectCount &&
      selectedNumbers.length + animalNumbers.length > maxSelectCount
    ) {
      return {
        newSelectedAnimals: selectedAnimals,
        newSelectedNumbers: selectedNumbers,
      };
    }

    const newSelectedAnimals = [...selectedAnimals, animal];
    const newSelectedNumbers = [
      ...selectedNumbers,
      ...animalNumbers.filter((num) => !selectedNumbers.includes(num)),
    ];
    return { newSelectedAnimals, newSelectedNumbers };
  }
}
