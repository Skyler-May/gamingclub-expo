import { useDailyCountdown } from "@/hooks/useCountdown";
import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

export default function CountdownScreen() {
  const { status, hours, minutes, seconds } = useDailyCountdown({
    startTime: { hour: 15, minute: 20, second: 0 },
    endTime: { hour: 15, minute: 25, second: 0 },
  });

  const format = (n: number) => n.toString().padStart(2, "0");

  return (
    <View style={styles.container}>
      {status === "counting" ? (
        <Text style={styles.text}>
          距离 21:00 倒计时：{format(hours)}:{format(minutes)}:{format(seconds)}
        </Text>
      ) : (
        <Modal visible={true} transparent animationType="fade">
          <View style={styles.modalBackground}>
            <View style={styles.modalBox}>
              <Text style={styles.modalText}>已到 21:00，休息中...</Text>
              <Text style={styles.modalText}>
                距离下轮还有 {format(hours)}:{format(minutes)}:{format(seconds)}
              </Text>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 24 },
  modalBackground: {
    flex: 1,
    backgroundColor: "#00000088",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 12,
  },
  modalText: { fontSize: 18, marginBottom: 8 },
});
