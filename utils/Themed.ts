import {
  darkBlueColors,
  darkCyanColors,
  darkGreenColors,
  darkOrangeColors,
  darkPinkColors,
  darkRedColors,
  darkYellowColors,
  defaultDarkColors,
  defaultLightColors,
  lightBlueColors,
  lightCyanColors,
  lightGreenColors,
  lightOrangeColors,
  lightPinkColors,
  lightRedColors,
  lightYellowColors,
} from "@/constants/colors";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

export const getTheme = (isDarkMode: boolean, currentTheme: string) => {
  const baseTheme = isDarkMode ? MD3DarkTheme : MD3LightTheme;

  const customColors = isDarkMode
    ? currentTheme === "pink"
      ? darkPinkColors.colors
      : currentTheme === "blue"
      ? darkBlueColors.colors
      : currentTheme === "green"
      ? darkGreenColors.colors
      : currentTheme === "orange"
      ? darkOrangeColors.colors
      : currentTheme === "yellow"
      ? darkYellowColors.colors
      : currentTheme === "red"
      ? darkRedColors.colors
      : currentTheme === "cyan"
      ? darkCyanColors.colors
      : defaultDarkColors.colors
    : currentTheme === "pink"
    ? lightPinkColors.colors
    : currentTheme === "blue"
    ? lightBlueColors.colors
    : currentTheme === "green"
    ? lightGreenColors.colors
    : currentTheme === "orange"
    ? lightOrangeColors.colors
    : currentTheme === "yellow"
    ? lightYellowColors.colors
    : currentTheme === "red"
    ? lightRedColors.colors
    : currentTheme === "cyan"
    ? lightCyanColors.colors
    : defaultLightColors.colors;

  return {
    ...baseTheme,
    colors: customColors,
  };
};
