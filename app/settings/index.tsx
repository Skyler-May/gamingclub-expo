import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Settings() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "设置",
        }}
      />
      <View style={styles.container}>
        {/* 法律声明 */}
        <Link href={"/settings/legal" as any} style={styles.link}>
          <View style={styles.option}>
            <Ionicons name="hammer-outline" size={24} color="" />
            <Text style={[styles.optionText]}>法律声明</Text>
            <Ionicons name="chevron-forward" size={24} color="" />
          </View>
        </Link>

        <View style={[styles.divider]} />

        {/* 个人信息 */}
        <Link href={"/settings/personal-info" as any} style={styles.link}>
          <View style={styles.option}>
            <Ionicons name="person-outline" size={24} color="" />
            <Text style={[styles.optionText]}>个人信息</Text>
            <Ionicons name="chevron-forward" size={24} color="" />
          </View>
        </Link>

        <View style={styles.divider} />

        {/* 安全中心 */}
        <Link href={"/settings/security-center" as any} style={styles.link}>
          <View style={styles.option}>
            <Ionicons name="lock-closed-outline" size={24} color="" />
            <Text style={[styles.optionText]}>安全中心</Text>
            <Ionicons name="chevron-forward" size={24} cocolor="" />
          </View>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  optionText: {
    fontSize: 18,
    marginLeft: 15,
    flex: 1,
  },
  link: {
    textDecorationLine: "none",
  },
  divider: {
    height: 1,
    marginVertical: 5,
  },
});
