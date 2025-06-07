import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Menu, useTheme } from "react-native-paper";

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
    <View
      style={{
        ...props,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "green",
        borderRadius: 8,
        padding: 8,
      }}
    >
      {/* Color Menu Icon */}
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <Ionicons
          name="color-palette-outline"
          size={24}
          color={theme.colors.onBackground}
        />
      </TouchableOpacity>

      {/* Dark/Light Mode Icon */}
      <TouchableOpacity onPress={toggleDarkMode}>
        <Ionicons
          name={isDarkMode ? "moon" : "sunny"}
          size={24}
          color={theme.colors.onBackground}
        />
      </TouchableOpacity>

      {/* Color Menu Item */}
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={{ x: 400, y: 100 }}
      >
        {themeOptions.map((option) => (
          <Menu.Item
            key={option.id}
            onPress={() => {
              setCurrentTheme(option.id);
              setMenuVisible(false);
            }}
            title={option.name}
            leadingIcon={() => (
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: option.color,
                }}
              />
            )}
            trailingIcon={currentTheme === option.id ? "check" : undefined}
          />
        ))}
      </Menu>
    </View>
  );
}
