import { setAnimalAgeMap } from "@/components/Buttons/utils/animalAgeMap"; // ✅ 新增：导入 set 方法
import useLunar from "@/hooks/date/useLunar";

// 生肖顺序
const zodiacList = [
  "鼠",
  "牛",
  "虎",
  "兔",
  "龙",
  "蛇",
  "马",
  "羊",
  "猴",
  "鸡",
  "狗",
  "猪",
];

const useZodiacAge = () => {
  const { zodiac } = useLunar(); // 当前生肖
  const currentIndex = zodiacList.indexOf(zodiac);

  if (currentIndex === -1) {
    console.warn("未识别的生肖：", zodiac);
    return {};
  }

  const increment = 12;

  const generateValidAges = (start: number, length: number) => {
    const result: number[] = [];
    let count = 0;
    let index = 0;

    while (count < length) {
      const age = start + index * increment;
      if (age > 0) {
        result.push(age);
        count++;
      }
      index++;
    }

    return result;
  };

  const result: Record<string, number[]> = {};

  for (let i = 0; i < zodiacList.length; i++) {
    const name = zodiacList[i];
    const offset = currentIndex - i;
    const startAge = 1 + offset;

    const length = name === zodiac ? 5 : 4;

    result[name] = generateValidAges(startAge, length);
  }
  setAnimalAgeMap(result); // ✅ 新增：将动态结果保存为静态缓存
  console.log("当前生肖:", zodiac);
  console.log("生肖年龄列表:", result);

  return result;
};

export default useZodiacAge;
