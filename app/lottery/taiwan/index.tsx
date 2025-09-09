import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function TaiWanScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "个人信息",
        }}
      />
      <View style={{ flex: 1 }}>
        <Text>taiwan</Text>
        <View
          style={{
            height: 200,
            width: "100%",
            backgroundColor: "red",
            margin: 10,
          }}
        ></View>
        {/* <NumberAnimalSelector
        buttonDescription="动物值"
        onSelectionChange={(numbers, animals) => {
          console.log("选中的数字:", numbers);
          console.log("选中的动物:", animals);
        }}
      /> */}
      </View>
    </>
  );
}
