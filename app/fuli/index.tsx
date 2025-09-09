import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function fuli() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "福利",
        }}
      />
      <View>
        <Text>fuli</Text>
      </View>
    </>
  );
}
