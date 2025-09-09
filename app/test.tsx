import { Stack } from "expo-router";

export default function TestScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "测试",
          headerShown: true,
        }}
      />
      {/* 页面内容 */}
    </>
  );
}
