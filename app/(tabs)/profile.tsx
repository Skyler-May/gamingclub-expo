import AccountDetails from "@/components/Profile/AccountDetails";
import ToolCards from "@/components/Profile/ToolCards";
import UserInfoCard from "@/components/Profile/UserInfoCard";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import Animated from "react-native-reanimated";

export default function ProfileScreen() {
  const theme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View
        style={[
          styles.userInfoContainer,
          { backgroundColor: theme.colors.elevation.level3 },
        ]}
      >
        <UserInfoCard
          avatarUri={{ uri: "https://picsum.photos/200/300" }}
          username="Jhon"
          email="example@email.com"
          // 可选参数
          avatarSize={100}
          textColor={theme.colors.onSurface}
          backgroundColor={theme.colors.elevation.level3}
        />
        <AccountDetails
          items={[
            {
              icon: "receipt",
              text: "购买记录",
              library: MaterialIcons,
              backgroundColor: "#F5F5F5",
              iconColor: "#FF9500",
              textColor: "#333333",
            },
            {
              icon: "credit-card",
              text: "交易记录",
              library: FontAwesome,
              backgroundColor: "#F5F5F5",
              iconColor: "#34C759",
              textColor: "#333333",
            },
            {
              icon: "account-balance",
              text: "账户明细",
              library: MaterialIcons,
              backgroundColor: "#F5F5F5",
              iconColor: "#007AFF",
              textColor: "#333333",
            },
            {
              icon: "bar-chart",
              text: "我的报表",
              library: FontAwesome,
              backgroundColor: "#F5F5F5",
              iconColor: "#5856D6",
              textColor: "#333333",
            },
          ]}
        />
      </View>

      {/* 主要内容  */}
      <View
        style={[
          styles.contentContainer,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <Animated.ScrollView>
          <ToolCards />
        </Animated.ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  userInfoContainer: {
    width: "100%",
    // 阴影
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: -10,
    // 阴影
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
