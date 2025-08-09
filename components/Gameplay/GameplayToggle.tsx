import { GamePlayData, gamePlayModes } from "@/types/game-play";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { useTheme } from "react-native-paper";
import { GameplayGrid } from "./GameplayGrid";

interface GameplayToggleProps {
  buttonTitle?: string;
  gamePlayTitle?: string;
  gamePlays?: GamePlayData[];
  itemsPerRow?: number;
  buttonProps?: Omit<TouchableOpacityProps, "onPress">;
  onGamePlaySelect?: (gamePlayId: number) => void;
  renderContent?: (currentGamePlay: number | null) => React.ReactNode;
}

function GameplayToggle({
  buttonTitle = "打开模态",
  gamePlayTitle = "模态标题",
  gamePlays = gamePlayModes, // 默认使用导入的gamePlayModes
  itemsPerRow = 4,
  buttonProps,
  onGamePlaySelect,
  renderContent,
}: GameplayToggleProps) {
  const [visible, setVisible] = useState(false);
  const [currentGamePlay, setCurrentGamePlay] = useState<number | null>(null);
  const [currentButtonTitle, setCurrentButtonTitle] = useState(buttonTitle);
  const theme = useTheme();

  // 根据当前玩法ID更新按钮标题
  useEffect(() => {
    // 初始化时，如果有传入的currentGamePlay，则使用它
    if (onGamePlaySelect && currentGamePlay === null) {
      // 查找第一个玩法作为默认玩法
      if (gamePlays.length > 0) {
        const defaultGamePlay = gamePlays[0];
        setCurrentGamePlay(defaultGamePlay.id);
        setCurrentButtonTitle(`玩法：${defaultGamePlay.title}`);
      }
    } else if (currentGamePlay === null) {
      setCurrentButtonTitle(buttonTitle);
    } else {
      const selectedGamePlay = gamePlays.find(
        (gamePlay) => gamePlay.id === currentGamePlay
      );
      if (selectedGamePlay) {
        setCurrentButtonTitle(`玩法：${selectedGamePlay.title}`);
      }
    }
  }, [currentGamePlay, gamePlays, buttonTitle, onGamePlaySelect]);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // 处理玩法选择
  const handleGamePlaySelect = (gamePlayId: number) => {
    setCurrentGamePlay(gamePlayId);
    hideModal();
    if (onGamePlaySelect) {
      onGamePlaySelect(gamePlayId);
    }
  };

  // 处理玩法数据
  const processedGamePlays = gamePlays.map((gamePlay) => ({
    ...gamePlay,
    onPress: () => handleGamePlaySelect(gamePlay.id),
  }));

  const styles = StyleSheet.create({
    button: {
      borderWidth: 1,
      borderColor: theme.colors.primary, // #2196F3
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      color: theme.colors.primary, // #2196F3
      fontSize: 14,
      textAlign: "center",
    },
  });

  return (
    <>
      {/* 触发模态的按钮 */}
      <TouchableOpacity
        onPress={showModal}
        style={styles.button}
        {...buttonProps}
      >
        <Text style={styles.buttonText}>{currentButtonTitle}</Text>
      </TouchableOpacity>
      <GameplayGrid
        visible={visible}
        hideModal={hideModal}
        title={gamePlayTitle}
        gamePlays={processedGamePlays}
        itemsPerRow={itemsPerRow}
      />

      {renderContent &&
        currentGamePlay !== null &&
        renderContent(currentGamePlay)}
    </>
  );
}

export { GameplayToggle };
