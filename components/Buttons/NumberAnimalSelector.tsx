import { useState } from "react";
import { StyleSheet, View } from "react-native";
import AnimalButtonsGroup from "./AnimalButtonsPanel";
import BigSmallOddEvenButtonsGroup from "./BigSmallOddEvenPanel";
import ButtonsGroup from "./ButtonsGroup";

import { handleClear } from "@/features/BSOE-Panel/handleClear";
import { handleSelectAll } from "@/features/BSOE-Panel/handleSelectAll";
import { handleSelectBig } from "@/features/BSOE-Panel/handleSelectBig";
import { handleSelectEven } from "@/features/BSOE-Panel/handleSelectEven";
import { handleSelectOdd } from "@/features/BSOE-Panel/handleSelectOdd";
import { handleSelectSmall } from "@/features/BSOE-Panel/handleSelectSmall";
import { toggleAnimalsPanel } from "@/features/BSOE-Panel/toggleAnimalsPanel";
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

  // // 选择动物
  // const handleSelectAnimal = (animal: string) => {
  //   const animalAgeMap = getAnimalAgeMap();
  //   if (!animalAgeMap) {
  //     throw new Error("animalAgeMap 尚未初始化！");
  //   }

  //   const animalNumbers = animalAgeMap[animal as keyof typeof animalAgeMap];

  //   let newSelectedNumbers: number[];
  //   let newSelectedAnimals: string[];

  //   if (selectedAnimals.includes(animal)) {
  //     // 如果已选中，则取消选中该动物及其对应的数字
  //     newSelectedAnimals = selectedAnimals.filter((a) => a !== animal);
  //     // 取消选中该动物对应的数字
  //     newSelectedNumbers = selectedNumbers.filter(
  //       (num) => !animalNumbers.includes(num)
  //     );
  //   } else {
  //     // 如果未选中，则选中该动物及其对应的数字
  //     // 检查是否超过最大可选数量
  //     if (
  //       maxSelectCount &&
  //       selectedNumbers.length + animalNumbers.length > maxSelectCount
  //     ) {
  //       // 如果超过最大可选数量，则不添加
  //       return;
  //     }
  //     newSelectedAnimals = [...selectedAnimals, animal];
  //     // 选中该动物对应的所有数字
  //     newSelectedNumbers = [
  //       ...selectedNumbers,
  //       ...animalNumbers.filter((num) => !selectedNumbers.includes(num)),
  //     ];
  //   }

  //   setSelectedAnimals(newSelectedAnimals);
  //   setSelectedNumbers(newSelectedNumbers);
  //   // 触发选择变化回调
  //   onSelectionChange?.(newSelectedNumbers, newSelectedAnimals);
  // };

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

  return (
    <View style={styles.container}>
      <View style={styles.selectButton}>
        <BigSmallOddEvenButtonsGroup
          showAnimals={showAnimals}
          toggleAnimalsPanel={() => {
            toggleAnimalsPanel({
              showAnimals,
              setShowAnimals,
              setAllSelected,
              setBigSelected,
              setSmallSelected,
              setOddSelected,
              setEvenSelected,
              clearAllSelections,
            });
          }}
          allSelected={allSelected}
          onSelectAll={() => {
            handleSelectAll({
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
            });
          }}
          onClear={() => {
            handleClear({
              setShowAnimals,
              clearAllSelections,
            });
          }}
          onSelectBig={() => {
            handleSelectBig({
              bigSelected,
              maxSelectCount,
              clearAllSelections,
              setAllSelected,
              setSmallSelected,
              setOddSelected,
              setEvenSelected,
              setShowAnimals,
              setSelectedNumbers,
              setBigSelected,
              onSelectionChange,
            });
          }}
          onSelectSmall={() => {
            handleSelectSmall({
              smallSelected,
              maxSelectCount,
              clearAllSelections,
              setAllSelected,
              setBigSelected,
              setOddSelected,
              setEvenSelected,
              setShowAnimals,
              setSelectedNumbers,
              setSmallSelected,
              onSelectionChange,
            });
          }}
          onSelectOdd={() => {
            handleSelectOdd({
              oddSelected,
              maxSelectCount,
              clearAllSelections,
              setAllSelected,
              setBigSelected,
              setOddSelected,
              setEvenSelected,
              setShowAnimals,
              setSelectedNumbers,
              setSmallSelected,
              onSelectionChange,
            });
          }}
          onSelectEven={() => {
            handleSelectEven({
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
            });
          }}
          bigSelected={bigSelected}
          smallSelected={smallSelected}
          oddSelected={oddSelected}
          evenSelected={evenSelected}
        />
        {showAnimals && (
          <AnimalButtonsGroup
            selectedAnimals={selectedAnimals}
            onSelectAnimal={() => {}}
          />
        )}
      </View>
      <ButtonsGroup
        length={49}
        selectedButtons={selectedNumbers}
        onSelectButton={handleSelectNumber}
        allSelected={allSelected}
        onSelectAll={() => {
          handleSelectAll({
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
          });
        }}
        onClear={() => {
          handleClear({
            setShowAnimals,
            clearAllSelections,
          });
        }}
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
