import { getAnimalAgeMap } from "@/utils/animalAgeMap";

interface HandleSelectAnimalParams {
  selectedNumbers: number[];
  selectedAnimals: string[];
  animal: string;
  maxSelectCount?: number;
}

/**
 * 处理生肖选择逻辑（纯函数）
 *
 * ### 重要说明
 * 1. 此函数为纯函数，不会修改任何外部状态
 * 2. **必须使用返回值更新状态**，否则不会产生任何效果
 * 3. 忽略返回值将导致状态不更新（静默错误）
 *
 * ### 正确用法示例
 * ```tsx
 * const { newSelectedAnimals, newSelectedNumbers } = handleSelectAnimal({
 *   selectedAnimals,
 *   selectedNumbers,
 *   animal,
 *   maxSelectCount
 * });
 * setSelectedAnimals(newSelectedAnimals);
 * setSelectedNumbers(newSelectedNumbers);
 * ```
 *
 * ### 错误用法示例（将导致无效果）
 * ```tsx
 * // 错误：忽略返回值
 * handleSelectAnimal({ selectedAnimals, selectedNumbers, animal });
 *
 * // 错误：仅使用部分返回值
 * const { newSelectedAnimals } = handleSelectAnimal(...);
 * // 缺少更新 selectedNumbers
 * ```
 *
 * @param params 参数对象
 * @param params.selectedAnimals 当前选中的生肖数组
 * @param params.selectedNumbers 当前选中的号码数组
 * @param params.animal 要操作的生肖
 * @param params.maxSelectCount 最大可选数量（可选）
 *
 * @returns {Object} 包含新状态的对象
 * @returns {string[]} newSelectedAnimals 更新后的生肖数组
 * @returns {number[]} newSelectedNumbers 更新后的号码数组
 *
 * @throws 如果 animalAgeMap 未初始化将抛出错误
 */
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
    // 取消选中逻辑
    const newSelectedAnimals = selectedAnimals.filter((a) => a !== animal);
    const newSelectedNumbers = selectedNumbers.filter(
      (num) => !animalNumbers.includes(num)
    );
    return { newSelectedAnimals, newSelectedNumbers };
  } else {
    // 检查数量限制
    if (
      maxSelectCount &&
      selectedNumbers.length + animalNumbers.length > maxSelectCount
    ) {
      // 超过限制时返回原状态
      return {
        newSelectedAnimals: selectedAnimals,
        newSelectedNumbers: selectedNumbers,
      };
    }

    // 添加选中逻辑
    const newSelectedAnimals = [...selectedAnimals, animal];
    const newSelectedNumbers = [
      ...selectedNumbers,
      ...animalNumbers.filter((num) => !selectedNumbers.includes(num)),
    ];
    return { newSelectedAnimals, newSelectedNumbers };
  }
}
