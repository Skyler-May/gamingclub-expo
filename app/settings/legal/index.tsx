import { useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import { Text, View } from "react-native";

export default function Legal() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: "法律声明" });
  }, [navigation]);

  return (
    <View>
      <Text>法律声明</Text>
    </View>
  );
}
