import { GameCategoryTab } from "@/types/game";
import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Text, useTheme } from "react-native-paper";

interface CategoryTabsProps {
  categories: GameCategoryTab[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  style?: ViewStyle;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  style,
}) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      gap: 10,
    },
    tab: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 20,
      backgroundColor: theme.colors.elevation.level3,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    activeTab: {
      backgroundColor: theme.colors.primary,
    },
    tabText: {
      marginLeft: 12,
      fontSize: 14,
      color: theme.colors.primary,
    },
    activeText: {
      color: theme.colors.onPrimary,
      fontWeight: "bold",
    },
  });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.container, style]}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.tab,
            selectedCategory === category.category && styles.activeTab,
          ]}
          onPress={() => onSelectCategory(category.category)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={category.icon as any}
            size={20}
            color={selectedCategory === category.category ? "#FFF" : "#666"}
          />
          <Text
            // variant="headlineLarge"
            style={[
              styles.tabText,
              selectedCategory === category.category && styles.activeText,
            ]}
          >
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
