import ThemeToggle from "@/components/ThemeToggle";
import { getTheme } from "@/utils/themed";
import { useState } from "react";
import { Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";

export default function ModalScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("default");
  const theme = getTheme(isDarkMode, currentTheme);

  return (
    <PaperProvider theme={theme}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.background,
        }}
      >
        <Text>Edit to edit this screen.</Text>
        <ThemeToggle
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          currentTheme={currentTheme}
          setCurrentTheme={setCurrentTheme}
        />
      </View>
    </PaperProvider>
  );
}
