import { useAuthStore } from "@/utils/authStore";
import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function SignInScreen() {
  const { logIn } = useAuthStore();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>sign-in</Text>
      <Button title="Sign In" onPress={logIn} />
      <Button
        title="Opne Modal"
        disabled
        onPress={() => router.push("/modal")}
      />
    </View>
  );
}
