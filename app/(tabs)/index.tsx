import { QuickButton } from "@/components/Buttons/QuickButton";
import Test from "@/components/Buttons/ui/Test";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <QuickButton />
      <Test
        allSelected={false}
        selectedButtons={[]}
        onSelectButton={function (number: number): void {
          throw new Error("Function not implemented.");
        }}
        onSelectAll={function (): void {
          throw new Error("Function not implemented.");
        }}
        onClear={function (): void {
          throw new Error("Function not implemented.");
        }}
        length={17}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});
