import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { Link, Tabs, useNavigation } from "expo-router";
import { Pressable, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";

type TabBarIconProps = {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color?: string;
  size?: number;
};

const Drawer = createDrawerNavigator();
function TabBarIcon({ name, color = "black", size = 24 }: TabBarIconProps) {
  return (
    <Ionicons
      name={name}
      color={color}
      size={size}
      style={{ marginBottom: -3 }}
    />
  );
}

function TabsLayout() {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.elevation.level3 },
        tabBarStyle: {
          backgroundColor: theme.colors.elevation.level3,
          borderTopColor: theme.colors.elevation.level1,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        headerTintColor: theme.colors.onSurface,
        headerLeft: () => (
          <Pressable
            onPress={() => {
              // 打开 drawer
              navigation.dispatch(DrawerActions.openDrawer());
            }}
            style={{ paddingLeft: 20 }}
          >
            <Ionicons name="menu" size={24} color={theme.colors.onSurface} />
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "首页",
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
              size={size}
            />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="information-circle"
                    size={25}
                    color={"black"}
                    style={{
                      marginRight: 15,
                      opacity: pressed ? 0.5 : 1,
                      color: theme.colors.onSurface,
                    }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="game"
        options={{
          title: "大厅",
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              name={focused ? "game-controller" : "game-controller-outline"}
              size={size}
              color={color}
            />
          ),
          headerRight: () => (
            <TouchableOpacity>
              <Ionicons
                name="search-outline"
                size={24}
                color="black"
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              name={focused ? "wallet" : "wallet-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
          headerRight: () => (
            <Link href="/settings" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="settings-outline"
                    size={25}
                    color={"black"}
                    style={{
                      marginRight: 15,
                      opacity: pressed ? 0.5 : 1,
                      color: theme.colors.onSurface,
                    }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}

export default function DrawerLayout() {
  const theme = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: theme.colors.elevation.level3,
            // width: 240,
          },
          drawerActiveTintColor: theme.colors.primary,
          drawerInactiveTintColor: theme.colors.onSurfaceVariant,
          headerShown: false,
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          component={TabsLayout}
          options={{
            drawerLabel: () => null,
            drawerItemStyle: { height: 0 },
          }}
        />
        {/* 可添加更多 Drawer 页面 */}
      </Drawer.Navigator>
    </GestureHandlerRootView>
  );
}
