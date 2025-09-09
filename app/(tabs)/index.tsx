import { useAuthStore } from "@/utils/authStore";
import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function HomeScreen() {
  const { logOut } = useAuthStore();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>HomeScreen</Text>
      <Button title="退出" onPress={logOut} />
      <Button title="Open Modal" onPress={() => router.push("/modal")} />
    </View>
  );
}
