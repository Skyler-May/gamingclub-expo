import * as React from "react";
import { StyleSheet } from "react-native";
import { Button, Modal, Portal, Text } from "react-native-paper";
import ModalPages from "./ModalPages";

interface PageButtonProps {
  id: number;
  title: string;
  onPress: () => void;
}

interface CustomModalProps {
  visible: boolean;
  hideModal: () => void;
  title?: string;
  children?: React.ReactNode;
  pages?: PageButtonProps[];
  itemsPerRow?: number;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  hideModal,
  title,
  children,
  pages,
  itemsPerRow = 4,
}) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}
      >
        {title && <Text style={styles.title}>{title}</Text>}
        {pages ? (
          <ModalPages pages={pages} itemsPerRow={itemsPerRow} />
        ) : (
          children
        )}
        <Button mode="contained" onPress={hideModal} style={styles.button}>
          关闭
        </Button>
      </Modal>
    </Portal>
  );
};

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
  button: {
    marginTop: 20,
  },
});

export default CustomModal;
