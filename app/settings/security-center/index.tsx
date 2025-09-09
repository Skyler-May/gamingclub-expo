import { Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function SecurityCenter() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "安全中心",
        }}
      />
      <View>
        <Text>安全中心</Text>
      </View>
    </>
  );
}
