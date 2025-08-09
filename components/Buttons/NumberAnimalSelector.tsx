import { useState } from "react";
import { StyleSheet, View } from "react-native";

import BigSmallOddEvenButtonsGroup from "@/components/ui/BigSmallOddEvenPanel";
import ButtonsGroup from "@/components/ui/ButtonsGroup";
import { handleClear } from "@/features/BSOE-Panel/handleClear";
import { handleSelectAll } from "@/features/BSOE-Panel/handleSelectAll";
import { handleSelectBig } from "@/features/BSOE-Panel/handleSelectBig";
import { handleSelectEven } from "@/features/BSOE-Panel/handleSelectEven";
import { handleSelectOdd } from "@/features/BSOE-Panel/handleSelectOdd";
import { handleSelectSmall } from "@/features/BSOE-Panel/handleSelectSmall";
import { toggleAnimalsPanel } from "@/features/BSOE-Panel/toggleAnimalsPanel";
import { handleSelectAnimal } from "@/features/handleSelectAnimal ";
import {
  ButtonDefaultTextStyle,
  selectedButtonStyle,
} from "@/utils/buttonGroupStyles";
import AnimalButtonsPanel from "./AnimalButtonsPanel";
import SubmitButton from "./SubmitButton";

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
  const [showAnimals, setShowAnimals] = useState(false);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>(
    initialSelectedNumbers
  );
  const [selectedAnimals, setSelectedAnimals] = useState<string[]>(
    initialSelectedAnimals
  );
  const [allSelected, setAllSelected] = useState(false);
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
      newSelectedNumbers = selectedNumbers.filter((n) => n !== number);
    } else {
      if (maxSelectCount && selectedNumbers.length >= maxSelectCount) {
        return;
      }
      newSelectedNumbers = [...selectedNumbers, number];
    }

    setSelectedNumbers(newSelectedNumbers);
    onSelectionChange?.(newSelectedNumbers, selectedAnimals);
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
          <AnimalButtonsPanel
            selectedAnimals={selectedAnimals}
            onSelectAnimal={(animal) => {
              // 必须接收返回值并更新状态
              const { newSelectedAnimals, newSelectedNumbers } =
                handleSelectAnimal({
                  selectedAnimals,
                  selectedNumbers,
                  animal,
                  maxSelectCount,
                });

              // 更新React状态
              setSelectedAnimals(newSelectedAnimals);
              setSelectedNumbers(newSelectedNumbers);

              // 触发回调（如果存在）
              onSelectionChange?.(newSelectedNumbers, newSelectedAnimals);
            }}
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
      <SubmitButton />
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
