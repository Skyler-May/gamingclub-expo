import { Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function PersonalInfo() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "个人信息",
        }}
      />

      <View>
        <Text>个人信息</Text>
      </View>
    </>
  );
}
