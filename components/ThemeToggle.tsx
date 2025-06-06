import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { List, Menu, Surface, useTheme } from "react-native-paper";

interface ThemeToggleProps extends React.ComponentProps<typeof View> {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
}

export default function ThemeToggle({
  isDarkMode,
  setIsDarkMode,
  currentTheme,
  setCurrentTheme,
  ...props
}: ThemeToggleProps) {
  const theme = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeOptions = [
    { id: "default", color: "#6200ee", name: "Default" },
    { id: "pink", color: "#e91e63", name: "Pink" },
    { id: "blue", color: "#2196f3", name: "Blue" },
    { id: "green", color: "#4caf50", name: "Green" },
    { id: "orange", color: "#ff9800", name: "Orange" },
    { id: "yellow", color: "#ffeb3b", name: "Yellow" },
    { id: "red", color: "#f44336", name: "Red" },
    { id: "cyan", color: "#00bcd4", name: "Cyan" },
  ];

  return (
    <Surface {...props} style={{ borderRadius: 4 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Dark/Light Mode Icon */}
        <TouchableOpacity onPress={toggleDarkMode} style={{ marginRight: 16 }}>
          <Ionicons
            name={isDarkMode ? "moon" : "sunny"}
            size={24}
            color={theme.colors.onBackground}
          />
        </TouchableOpacity>

        {/* Color Menu Icon */}
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
              <Ionicons
                name="color-palette-outline"
                size={24}
                color={theme.colors.onBackground}
              />
            </TouchableOpacity>
          }
        >
          {themeOptions.map((item) => (
            <List.Item
              key={item.id}
              onPress={() => {
                setCurrentTheme(item.id);
                setMenuVisible(false);
              }}
              title="" // 不显示文字
              left={() => (
                <View
                  style={{
                    width: currentTheme === item.id ? 24 : 20,
                    height: currentTheme === item.id ? 24 : 20,
                    borderRadius: 12,
                    backgroundColor: item.color,
                    borderWidth: currentTheme === item.id ? 2 : 0,
                    borderColor: theme.colors.primary,
                    marginLeft: 8,
                  }}
                />
              )}
              style={{ paddingVertical: 4 }}
            />
          ))}
        </Menu>
      </View>
    </Surface>
  );
}
