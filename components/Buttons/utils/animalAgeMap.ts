// animalAgeMap.ts

let animalAgeMap: Record<string, number[]> | null = null;

/**
 * 设置生肖年龄映射（只设置一次）
 */
export function setAnimalAgeMap(map: Record<string, number[]>) {
  if (animalAgeMap === null) {
    animalAgeMap = map;
  } else {
    console.warn("animalAgeMap 已经初始化，跳过设置");
  }
}

/**
 * 获取静态缓存的生肖年龄映射
 */
export function getAnimalAgeMap(): Record<string, number[]> | null {
  return animalAgeMap;
}

/**
 * 重置缓存（开发测试用，正式环境请谨慎调用）
 */
export function resetAnimalAgeMap() {
  animalAgeMap = null;
}
