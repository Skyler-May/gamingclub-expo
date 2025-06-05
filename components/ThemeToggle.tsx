import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";
// import { useTheme } from "react-native-paper";

interface ThemeToggleProps {
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
}: ThemeToggleProps) {
  // const theme = useTheme();
  const [showColors, setShowColors] = useState(false);

  return (
    <View
      style={{
        padding: 16,
        borderTopWidth: 1,
        // borderTopColor: theme.colors.outline,
      }}
    >
      <Text
        style={{
          // color: theme.colors.onBackground,
          fontSize: 16,
          fontWeight: "bold",
          marginBottom: 16,
        }}
      >
        主题设置
      </Text>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}
      >
        <Ionicons
          name={isDarkMode ? "moon" : "sunny"}
          size={24}
          // color={theme.colors.onBackground}
          style={{ flex: 1 }}
        />
        <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
      </View>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}
      >
        <Ionicons
          name="color-palette-outline"
          size={24}
          // color={theme.colors.onBackground}
          style={{ flex: 1 }}
        />
        <Switch value={showColors} onValueChange={setShowColors} />
      </View>

      {showColors && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
            borderWidth: 1,
            borderRadius: 4,
            // borderColor: theme.colors.primary,
          }}
        >
          {[
            { id: "default", name: "默认" },
            { id: "pink", name: "粉色" },
            { id: "blue", name: "蓝色" },
            { id: "green", name: "绿色" },
            { id: "orange", name: "橙色" },
            { id: "yellow", name: "黄色" },
            { id: "red", name: "红色" },
            { id: "cyan", name: "青色" },
          ].map((item) => (
            <TouchableOpacity
              key={item.id}
              style={{
                padding: 8,
                // backgroundColor:
                //   currentTheme === item.id
                //     ? theme.colors.primary
                //     : theme.colors.surface,
                borderRadius: 4,
                minWidth: 50,
                alignItems: "center",
              }}
              onPress={() => setCurrentTheme(item.id)}
            >
              <Text
                style={
                  {
                    // color:
                    //   currentTheme === item.id
                    //     ? theme.colors.onPrimary
                    //     : theme.colors.onSurface,
                  }
                }
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
