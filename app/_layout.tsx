import ThemeToggle from "@/components/ThemeToggle";
import { useAuthStore } from "@/utils/authStore";
import { getTheme } from "@/utils/Themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider, useTheme } from "react-native-paper";
import "react-native-reanimated";

// 导出错误边界（如果使用 Expo Router 的错误捕获）
export { ErrorBoundary } from "expo-router";

// Expo Router 设置
export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// 禁用 splash 自动隐藏，直到资源加载完成
SplashScreen.preventAutoHideAsync();

// 定义 RootLayout 组件
export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("default");

  const theme = getTheme(isDarkMode, currentTheme);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        // backgroundColor={theme.colors.elevation.level3}
        style={theme.colors.statusBar.style === "dark" ? "dark" : "light"}
      />
      <PaperProvider theme={theme}>
        <RootLayoutNav
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          currentTheme={currentTheme}
          setCurrentTheme={setCurrentTheme}
        />
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

// ✅ 添加 props 类型定义
interface RootLayoutNavProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  currentTheme: string;
  setCurrentTheme: React.Dispatch<React.SetStateAction<string>>;
}

// 路由导航组件
function RootLayoutNav({
  isDarkMode,
  setIsDarkMode,
  currentTheme,
  setCurrentTheme,
}: RootLayoutNavProps) {
  const { isLoggedIn, shouldCreateAccount } = useAuthStore();
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.elevation.level3 },
        headerTintColor: theme.colors.onSurface,
      }}
    >
      {/* ------------------- 受保护的主页面 ------------------- */}
      <Stack.Protected guard={isLoggedIn}>
        {/* 顶层 Tabs，只声明一次，不重复嵌套 */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* 独立页面，可深层访问 */}
        <Stack.Screen
          name="settings/index"
          options={{
            title: "设置",
            headerRight: () => (
              <View>
                <ThemeToggle
                  isDarkMode={isDarkMode}
                  setIsDarkMode={setIsDarkMode}
                  currentTheme={currentTheme}
                  setCurrentTheme={setCurrentTheme}
                />
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="modal"
          options={{ title: "模态（测试）", presentation: "modal" }}
        />
        <Stack.Screen name="fuli/index" />
        <Stack.Screen name="lottery/hong-kong/index" />
        <Stack.Screen name="lottery/macau/index" />
        <Stack.Screen name="chat/index" />
      </Stack.Protected>

      {/* ------------------- 登录 & 创建账号 ------------------- */}
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Protected guard={shouldCreateAccount}>
          <Stack.Screen
            name="create-account"
            options={{ headerShown: false }}
          />
        </Stack.Protected>
      </Stack.Protected>
    </Stack>
  );
}
