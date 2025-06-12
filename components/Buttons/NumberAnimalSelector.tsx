import { useState } from "react";
import { StyleSheet, View } from "react-native";
import AnimalButtonsGroup from "./AnimalButtonsPanel";
import BigSmallOddEvenButtonsGroup from "./BigSmallOddEvenPanel";
import ButtonsGroup from "./ButtonsGroup";
import { animalAgeMap } from "./constants/animalAgeMap";
import {
  ButtonDefaultTextStyle,
  selectedButtonStyle,
} from "./utils/buttonGroupStyles";

interface NumberAnimalSelectorProps {
  // 组件必要属性
  initialSelectedNumbers?: number[]; // 初始选中的数字列表
  initialSelectedAnimals?: string[]; // 初始选中的动物列表
  maxSelectCount?: number; // 最大可选数量
  onSelectionChange?: (numbers: number[], animals: string[]) => void; // 选择变化时的回调函数
  buttonDescription?: string;
}

export default function NumberAnimalSelector({
  initialSelectedNumbers = [],
  initialSelectedAnimals = [],
  maxSelectCount,
  onSelectionChange,
  buttonDescription,
}: NumberAnimalSelectorProps) {
  // 动物面板显示状态
  const [showAnimals, setShowAnimals] = useState(false);
  // 选中的数字列表
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>(
    initialSelectedNumbers
  );
  // 选中的动物列表
  const [selectedAnimals, setSelectedAnimals] = useState<string[]>(
    initialSelectedAnimals
  );
  // 全选状态
  const [allSelected, setAllSelected] = useState(false);
  // 大小单双按钮状态
  const [bigSelected, setBigSelected] = useState(false);
  const [smallSelected, setSmallSelected] = useState(false);
  const [oddSelected, setOddSelected] = useState(false);
  const [evenSelected, setEvenSelected] = useState(false);

  // 数字按钮显示的文本
  const label = (i: number) => i.toString().padStart(2, "0"); // 保持两位数
  // 切换动物面板显示状态
  const toggleAnimalsPanel = () => {
    // 清除其他按钮的选中状态
    setAllSelected(false);
    setBigSelected(false);
    setSmallSelected(false);
    setOddSelected(false);
    setEvenSelected(false);

    if (showAnimals) {
      // 如果已显示动物面板，则关闭
      setShowAnimals(false);
      clearAllSelections();
    } else {
      // 如果未显示动物面板，则打开
      setShowAnimals(true);
      clearAllSelections();
    }
  };

  // 选择数字
  const handleSelectNumber = (number: number) => {
    let newSelectedNumbers: number[];

    if (selectedNumbers.includes(number)) {
      // 如果已选中，则取消选中
      newSelectedNumbers = selectedNumbers.filter((n) => n !== number);
    } else {
      // 如果未选中，则选中
      // 检查是否超过最大可选数量
      if (maxSelectCount && selectedNumbers.length >= maxSelectCount) {
        // 如果超过最大可选数量，则不添加
        return;
      }
      newSelectedNumbers = [...selectedNumbers, number];
    }

    setSelectedNumbers(newSelectedNumbers);
    // 触发选择变化回调
    onSelectionChange?.(newSelectedNumbers, selectedAnimals);
  };

  // 选择动物
  const handleSelectAnimal = (animal: string) => {
    const animalNumbers = animalAgeMap[animal as keyof typeof animalAgeMap];

    let newSelectedNumbers: number[];
    let newSelectedAnimals: string[];

    if (selectedAnimals.includes(animal)) {
      // 如果已选中，则取消选中该动物及其对应的数字
      newSelectedAnimals = selectedAnimals.filter((a) => a !== animal);
      // 取消选中该动物对应的数字
      newSelectedNumbers = selectedNumbers.filter(
        (num) => !animalNumbers.includes(num)
      );
    } else {
      // 如果未选中，则选中该动物及其对应的数字
      // 检查是否超过最大可选数量
      if (
        maxSelectCount &&
        selectedNumbers.length + animalNumbers.length > maxSelectCount
      ) {
        // 如果超过最大可选数量，则不添加
        return;
      }
      newSelectedAnimals = [...selectedAnimals, animal];
      // 选中该动物对应的所有数字
      newSelectedNumbers = [
        ...selectedNumbers,
        ...animalNumbers.filter((num) => !selectedNumbers.includes(num)),
      ];
    }

    setSelectedAnimals(newSelectedAnimals);
    setSelectedNumbers(newSelectedNumbers);
    // 触发选择变化回调
    onSelectionChange?.(newSelectedNumbers, newSelectedAnimals);
  };

  // 清除所有选中状态
  const clearAllSelections = () => {
    setSelectedNumbers([]);
    setSelectedAnimals([]);
    setAllSelected(false);
    setBigSelected(false);
    setSmallSelected(false);
    setOddSelected(false);
    setEvenSelected(false);
    // 触发选择变化回调
    onSelectionChange?.([], []);
  };

  // 全选
  const handleSelectAll = () => {
    // 清除其他按钮的选中状态
    setBigSelected(false);
    setSmallSelected(false);
    setOddSelected(false);
    setEvenSelected(false);
    // 关闭动物面板
    setShowAnimals(false);

    let newSelectedNumbers: number[];
    let newSelectedAnimals: string[];

    if (allSelected) {
      // 如果已全选，则取消全选
      newSelectedNumbers = [];
      newSelectedAnimals = [];
      setAllSelected(false);
    } else {
      // 如果未全选，则全选
      // 检查是否有最大可选数量限制
      if (maxSelectCount && maxSelectCount < 49) {
        // 如果有限制且小于49，则不执行全选
        return;
      }
      newSelectedNumbers = Array.from({ length: 49 }, (_, i) => i + 1);
      // 选中所有动物
      newSelectedAnimals = Object.keys(animalAgeMap);
      setAllSelected(true);
    }

    setSelectedNumbers(newSelectedNumbers);
    setSelectedAnimals(newSelectedAnimals);
    // 触发选择变化回调
    onSelectionChange?.(newSelectedNumbers, newSelectedAnimals);
  };

  // 清空
  const handleClear = () => {
    // 关闭动物面板
    setShowAnimals(false);
    clearAllSelections();
  };

  // 选择大数（25-49）
  const handleSelectBig = () => {
    // 清除其他按钮的选中状态
    setAllSelected(false);
    setSmallSelected(false);
    setOddSelected(false);
    setEvenSelected(false);
    // 关闭动物面板
    setShowAnimals(false);

    let newSelectedNumbers: number[];

    if (bigSelected) {
      // 如果已选中大数，则取消选中
      clearAllSelections();
      return;
    } else {
      // 如果未选中大数，则选中
      // 检查是否超过最大可选数量
      if (maxSelectCount && maxSelectCount < 25) {
        // 如果有限制且小于25，则不执行选择
        return;
      }

      clearAllSelections(); // 先清除所有选择
      newSelectedNumbers = Array.from({ length: 25 }, (_, i) => i + 25);
      setSelectedNumbers(newSelectedNumbers);
      setBigSelected(true);
      // 触发选择变化回调
      onSelectionChange?.(newSelectedNumbers, []);
    }
  };

  // 选择小数（1-24）
  const handleSelectSmall = () => {
    // 清除其他按钮的选中状态
    setAllSelected(false);
    setBigSelected(false);
    setOddSelected(false);
    setEvenSelected(false);
    // 关闭动物面板
    setShowAnimals(false);

    let newSelectedNumbers: number[];

    if (smallSelected) {
      // 如果已选中小数，则取消选中
      clearAllSelections();
      return;
    } else {
      // 如果未选中小数，则选中
      // 检查是否超过最大可选数量
      if (maxSelectCount && maxSelectCount < 24) {
        // 如果有限制且小于24，则不执行选择
        return;
      }

      clearAllSelections(); // 先清除所有选择
      newSelectedNumbers = Array.from({ length: 24 }, (_, i) => i + 1);
      setSelectedNumbers(newSelectedNumbers);
      setSmallSelected(true);
      // 触发选择变化回调
      onSelectionChange?.(newSelectedNumbers, []);
    }
  };

  // 选择单数（奇数）
  const handleSelectOdd = () => {
    // 清除其他按钮的选中状态
    setAllSelected(false);
    setBigSelected(false);
    setSmallSelected(false);
    setEvenSelected(false);
    // 关闭动物面板
    setShowAnimals(false);

    let newSelectedNumbers: number[];

    if (oddSelected) {
      // 如果已选中单数，则取消选中
      clearAllSelections();
      return;
    } else {
      // 如果未选中单数，则选中
      // 计算奇数的数量
      const oddCount = Math.ceil(49 / 2);
      // 检查是否超过最大可选数量
      if (maxSelectCount && maxSelectCount < oddCount) {
        // 如果有限制且小于奇数数量，则不执行选择
        return;
      }

      clearAllSelections(); // 先清除所有选择
      newSelectedNumbers = Array.from(
        { length: 25 },
        (_, i) => i * 2 + 1
      ).filter((n) => n <= 49);
      setSelectedNumbers(newSelectedNumbers);
      setOddSelected(true);
      // 触发选择变化回调
      onSelectionChange?.(newSelectedNumbers, []);
    }
  };

  // 选择双数（偶数）
  const handleSelectEven = () => {
    // 清除其他按钮的选中状态
    setAllSelected(false);
    setBigSelected(false);
    setSmallSelected(false);
    setOddSelected(false);
    // 关闭动物面板
    setShowAnimals(false);

    let newSelectedNumbers: number[];

    if (evenSelected) {
      // 如果已选中双数，则取消选中
      clearAllSelections();
      return;
    } else {
      // 如果未选中双数，则选中
      // 计算偶数的数量
      const evenCount = Math.floor(49 / 2);
      // 检查是否超过最大可选数量
      if (maxSelectCount && maxSelectCount < evenCount) {
        // 如果有限制且小于偶数数量，则不执行选择
        return;
      }

      clearAllSelections(); // 先清除所有选择
      newSelectedNumbers = Array.from(
        { length: 24 },
        (_, i) => (i + 1) * 2
      ).filter((n) => n <= 49);
      setSelectedNumbers(newSelectedNumbers);
      setEvenSelected(true);
      // 触发选择变化回调
      onSelectionChange?.(newSelectedNumbers, []);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.selectButton}>
        <BigSmallOddEvenButtonsGroup
          showAnimals={showAnimals}
          toggleAnimalsPanel={toggleAnimalsPanel}
          allSelected={allSelected}
          onSelectAll={handleSelectAll}
          onClear={handleClear}
          onSelectBig={handleSelectBig}
          onSelectSmall={handleSelectSmall}
          onSelectOdd={handleSelectOdd}
          onSelectEven={handleSelectEven}
          bigSelected={bigSelected}
          smallSelected={smallSelected}
          oddSelected={oddSelected}
          evenSelected={evenSelected}
        />
        {showAnimals && (
          <AnimalButtonsGroup
            selectedAnimals={selectedAnimals}
            onSelectAnimal={handleSelectAnimal}
          />
        )}
      </View>
      <ButtonsGroup
        length={49}
        selectedButtons={selectedNumbers}
        onSelectButton={handleSelectNumber}
        allSelected={allSelected}
        onSelectAll={handleSelectAll}
        onClear={handleClear}
        displayInfo={label}
        buttonDescription={buttonDescription}
        selectedButtonStyle={selectedButtonStyle}
        ButtonDefaultTextStyle={ButtonDefaultTextStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  selectButton: {
    flexDirection: "column",
    width: "100%",
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ddd",
  },
});
