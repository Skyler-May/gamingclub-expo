import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, Modal, Portal } from "react-native-paper";

interface GameplayButtonProps {
  id: number;
  title: string;
  onPress: () => void;
}

interface GameplayProps {
  visible: boolean;
  hideModal: () => void;
  title?: string;
  children?: React.ReactNode;
  pages?: GameplayButtonProps[];
  itemsPerRow?: number;
}

function GameplayGrid({
  visible,
  hideModal,
  title,
  children,
  pages,
  itemsPerRow = 4,
}: GameplayProps) {
  const renderPages = () => {
    if (!pages) return children;

    const rowCount = Math.ceil(pages.length / itemsPerRow);

    const rows = Array.from({ length: rowCount }, (_, rowIndex) => {
      const rowButtons = pages.slice(
        rowIndex * itemsPerRow,
        (rowIndex + 1) * itemsPerRow
      );

      while (rowButtons.length < itemsPerRow) {
        rowButtons.push({ id: 0, title: "", onPress: () => {} });
      }

      return rowButtons;
    });

    return (
      <View style={styles.buttonContainer}>
        {rows.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.buttonRow}>
            {row.map((button, buttonIndex) => (
              <View
                key={`button-${button.id || rowIndex}-${buttonIndex}`}
                style={styles.buttonWrapper}
              >
                {button.title ? (
                  <TouchableOpacity
                    onPress={button.onPress}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>{button.title}</Text>
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
        contentContainerStyle={styles.containerStyle}
      >
        {title && <Text style={styles.title}>{title}</Text>}
        {renderPages()}
        <Button mode="contained" onPress={hideModal} style={styles.closeButton}>
          关闭
        </Button>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
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

export { GameplayGrid };
