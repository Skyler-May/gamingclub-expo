import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Modal, Portal } from "react-native-paper";

export default function HomeScreen() {
  const [visibleModals, setVisibleModals] = useState({
    modal1: false,
    modal2: false,
    modal3: false,
  });

  const showModal = (modalId: string) => {
    setVisibleModals((prev) => ({
      ...prev,
      [modalId]: true,
    }));
  };

  const hideModal = (modalId: string) => {
    setVisibleModals((prev) => ({
      ...prev,
      [modalId]: false,
    }));
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Home Screen</Text>
        <TouchableOpacity
          onPress={() => showModal("modal1")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Open Modal 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => showModal("modal2")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Open Modal 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => showModal("modal3")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Open Modal 3</Text>
        </TouchableOpacity>
      </View>
      <Portal>
        <Modal
          visible={visibleModals.modal1}
          onDismiss={() => hideModal("modal1")}
          contentContainerStyle={styles.modalContainer}
          dismissable={true}
          dismissableBackButton={true}
          theme={{ colors: { backdrop: "rgba(0, 0, 0, 0.5)" } }}
          style={{ marginTop: 0 }}
        >
          <Text>Modal 1</Text>
          <TouchableOpacity
            onPress={() => hideModal("modal1")}
            style={[styles.button, styles.closeButton]}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </Modal>

        <Modal
          visible={visibleModals.modal2}
          onDismiss={() => hideModal("modal2")}
          contentContainerStyle={styles.modalContainer}
          dismissable={true}
          dismissableBackButton={true}
          theme={{ colors: { backdrop: "rgba(0, 0, 0, 0.5)" } }}
          style={{ marginTop: 0 }}
        >
          <Text>Modal 2</Text>
          <Text>Modal 2</Text>
          <Text>Modal 2</Text>
          <Text>Modal 2</Text>
          <Text>Modal 2</Text>
          <Text>Modal 2</Text>
          <Text>Modal 2</Text>
          <Text>Modal 2</Text>
          <TouchableOpacity
            onPress={() => hideModal("modal2")}
            style={[styles.button, styles.closeButton]}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </Modal>

        <Modal
          visible={visibleModals.modal3}
          onDismiss={() => hideModal("modal3")}
          contentContainerStyle={styles.modalContainer}
          dismissable={true}
          dismissableBackButton={true}
          theme={{ colors: { backdrop: "rgba(0, 0, 0, 0.5)" } }}
          style={{ marginTop: 0 }}
        >
          <Text>Modal 3</Text>
          <TouchableOpacity
            onPress={() => hideModal("modal3")}
            style={[styles.button, styles.closeButton]}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 50,
  },
  closeButton: {
    marginTop: 20,
  },
});
