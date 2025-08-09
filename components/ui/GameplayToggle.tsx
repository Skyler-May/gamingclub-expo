import { GamePlayData, gamePlayModes } from "@/types/game-play";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { Button, Modal, Portal, useTheme } from "react-native-paper";

interface GameplayButtonProps {
  id: number;
  title: string;
  onPress: () => void;
}

interface GameplayGridProps {
  visible: boolean;
  hideModal: () => void;
  title?: string;
  children?: React.ReactNode;
  gamePlays?: GameplayButtonProps[];
  itemsPerRow?: number;
}

// 内部组件：玩法网格
function GameplayGrid({
  visible,
  hideModal,
  title,
  children,
  gamePlays,
  itemsPerRow = 4,
}: GameplayGridProps) {
  const renderPlays = () => {
    if (!gamePlays) return children;

    const rowCount = Math.ceil(gamePlays.length / itemsPerRow);

    const rows = Array.from({ length: rowCount }, (_, rowIndex) => {
      const rowButtons = gamePlays.slice(
        rowIndex * itemsPerRow,
        (rowIndex + 1) * itemsPerRow
      );

      while (rowButtons.length < itemsPerRow) {
        rowButtons.push({ id: 0, title: "", onPress: () => {} });
      }

      return rowButtons;
    });

    return (
      <View style={gridStyles.buttonContainer}>
        {rows.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={gridStyles.buttonRow}>
            {row.map((button, buttonIndex) => (
              <View
                key={`button-${button.id || rowIndex}-${buttonIndex}`}
                style={gridStyles.buttonWrapper}
              >
                {button.title ? (
                  <TouchableOpacity
                    onPress={button.onPress}
                    style={gridStyles.button}
                  >
                    <Text style={gridStyles.buttonText}>{button.title}</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={gridStyles.containerStyle}
      >
        {title && <Text style={gridStyles.title}>{title}</Text>}
        {renderPlays()}
        <Button
          mode="contained"
          onPress={hideModal}
          style={gridStyles.closeButton}
        >
          关闭
        </Button>
      </Modal>
    </Portal>
  );
}

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
  gamePlays = gamePlayModes,
  itemsPerRow = 4,
  buttonProps,
  onGamePlaySelect,
  renderContent,
}: GameplayToggleProps) {
  const [visible, setVisible] = useState(false);
  const [currentGamePlay, setCurrentGamePlay] = useState<number | null>(null);
  const [currentButtonTitle, setCurrentButtonTitle] = useState(buttonTitle);
  const theme = useTheme();

  useEffect(() => {
    if (onGamePlaySelect && currentGamePlay === null) {
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

  const handleGamePlaySelect = (gamePlayId: number) => {
    setCurrentGamePlay(gamePlayId);
    hideModal();
    if (onGamePlaySelect) {
      onGamePlaySelect(gamePlayId);
    }
  };

  const processedGamePlays = gamePlays.map((gamePlay) => ({
    ...gamePlay,
    onPress: () => handleGamePlaySelect(gamePlay.id),
  }));

  const toggleStyles = StyleSheet.create({
    button: {
      borderWidth: 1,
      borderColor: theme.colors.primary,
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      color: theme.colors.primary,
      fontSize: 14,
      textAlign: "center",
    },
  });

  return (
    <>
      <TouchableOpacity
        onPress={showModal}
        style={toggleStyles.button}
        {...buttonProps}
      >
        <Text style={toggleStyles.buttonText}>{currentButtonTitle}</Text>
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

const gridStyles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 20,
  },
  buttonContainer: {
    width: "100%",
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  buttonWrapper: {
    width: "25%",
    padding: 5,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
});

export { GameplayToggle };
