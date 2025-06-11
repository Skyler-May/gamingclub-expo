# 🌙 useLunar 使用说明

该模块用于将当前日期转换为农历日期，并提供生肖、是否闰月等信息。基于 React Hook 实现，依赖本地农历数据进行计算，适用于不联网的农历显示功能。

## 📦 模块结构

Hook

useLunar()：返回当前日期对应的农历信息。

Utils

isLeapYear(year)

getGregorianMonthDays(year, month)

getLeapMonth(year)

getLunarMonthDays(year, month, isLeap)

getLunarYearDays(year)

getZodiacSign(year)

solarToLunar(year, month, day)

Constants

LUNAR_INFO：农历年份数据

MONTH：农历月份文字

DAY：农历日文字

ZODIACS：十二生肖

# 🚀 使用方法

1. 引入 Hook

```
import useLunar from '@/hooks/useLunar';

const LunarInfoCard = () => {
  const { gregorian, lunar, zodiac, isLeapMonth } = useLunar();

  return (
    <View>
      <Text>公历日期：{gregorian}</Text>
      <Text>农历日期：{lunar}</Text>
      <Text>生肖：{zodiac}</Text>
      <Text>是否闰月：{isLeapMonth ? '是' : '否'}</Text>
    </View>
  );
};
```

2. 单独使用工具函数

```
import { solarToLunar } from '@/hooks/useLunar';
import {
  solarToLunar,
  isLeapYear,
  getZodiacSign,
  getGregorianDate,
} from '@/hooks/useLunar';

// 示例：2025年6月10日对应的农历
const lunarDate = solarToLunar(2025, 6, 10);

console.log(lunarDate.toString()); // 输出：2025年五月初五（可能带“闰”字）
console.log(lunarDate.zodiac);    // 输出：蛇
console.log(getGregorianDate(2025, 6, 10)); // 输出：2025年6月10日
```

# 🧾 返回值说明（useLunar()）

| 字段        | 类型      | 说明               |
| ----------- | --------- | ------------------ |
| gregorian   | `string`  | 公历日期（年月日） |
| lunar       | `string`  | 农历日期（中文）   |
| zodiac      | `string`  | 对应的生肖         |
| isLeapMonth | `boolean` | 是否为闰月         |

# ✅ 模块类型说明

文件名建议：useCurrentDateTime.ts

类型：React 自定义 Hook

用途：每秒实时更新当前时间，并返回包括年月日、时分秒、星期等信息

# 📦 使用方法（示例）

1. 引入并使用该 Hook
   你可以在任意组件中使用这个 Hook，比如构建一个实时时钟组件：

```
import React from 'react';
import { Text, View } from 'react-native';
import useCurrentDateTime from '@/hooks/useCurrentDateTime'; // 请按实际路径调整

const Clock = () => {
  const { year, month, day, hour, minute, second, weekday } = useCurrentDateTime();

  const formatTime = (n: number) => n.toString().padStart(2, '0');

  return (
    <View>
      <Text>{`${year}年${month}月${day}日 ${weekday}`}</Text>
      <Text>{`${formatTime(hour)}:${formatTime(minute)}:${formatTime(second)}`}</Text>
    </View>
  );
};

export default Clock;
```

# 🧾 返回值字段说明

| 字段名    | 类型     | 说明                     |
| --------- | -------- | ------------------------ |
| `year`    | `number` | 年份（如 2025）          |
| `month`   | `number` | 月份（1-12）             |
| `day`     | `number` | 日期（1-31）             |
| `hour`    | `number` | 小时（0-23）             |
| `minute`  | `number` | 分钟（0-59）             |
| `second`  | `number` | 秒数（0-59）             |
| `weekday` | `string` | 中文星期几（如“星期三”） |
| `date`    | `Date`   | 原生 Date 对象           |

# 📌 注意事项

1. 该 Hook 默认会每秒更新一次时间，你可以根据需要自行调整。
2. 该 Hook 返回的时间是本地时间，不考虑时区差异。

# 🐉 useZodiacAge 使用说明

useZodiacAge 是一个自定义 React Hook，用于根据当前农历生肖推算各个生肖的可能年龄段，常用于展示与生肖相关的统计、筛选或标签。

## 📦 模块结构

Hook

useZodiacAge()：返回当前农历生肖的可能年龄段。

Utils

getZodiacAge(zodiac)

## 🚀 使用方法

1. 引入 Hook

```
const HomeScreen = () => {
  const zodiacAges = useZodiacAge();

  return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          生肖年龄列表：
        </Text>
        {Object.entries(zodiacAges).map(([zodiac, ages]) => (
          <Text key={zodiac}>
            {zodiac}：{ages.join(", ")}
          </Text>
        ))}
      </View>
  );
};

export default HomeScreen;
```

# 🧾 返回值说明

```
{
牛：1, 13, 25, 37, 49
鼠：2, 14, 26, 38
虎：0, 12, 24, 36 → 0 被排除 → 实际是 [12, 24, 36, 48]
...
}

# ⚠️ 注意事项
如果 useLunar 未正确返回生肖（zodiac），Hook 将返回一个空对象并输出警告

返回值中年龄只包括正整数（age > 0）

适用于农历生肖展示、年龄筛选、命理工具等场景
```
