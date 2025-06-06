import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";

interface BankCardsProps {
  onAddCard?: () => void;
}

export default function BankCards({ onAddCard }: BankCardsProps) {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      marginTop: 16,
      padding: 16,
      minHeight: 200,
      borderRadius: 12,
      backgroundColor: theme.colors.elevation.level1,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.colors.onSurface,
      marginBottom: 16,
    },
    addCardButton: {
      height: 120,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.outline,
      borderStyle: "dashed",
      justifyContent: "center",
      alignItems: "center",
    },
    addIcon: {
      marginBottom: 8,
    },
    addText: {
      color: theme.colors.onSurfaceVariant,
      fontSize: 14,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>我的银行卡</Text>
      <TouchableOpacity style={styles.addCardButton} onPress={onAddCard}>
        <AntDesign
          name="plus"
          size={24}
          color={theme.colors.onSurfaceVariant}
          style={styles.addIcon}
        />
        <Text style={styles.addText}>添加银行卡</Text>
      </TouchableOpacity>
    </View>
  );
}
