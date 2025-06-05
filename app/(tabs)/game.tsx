import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function GameScreen() {
  return (
    <View style={styles.container}>
      <Text>game</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/hongkong")}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
