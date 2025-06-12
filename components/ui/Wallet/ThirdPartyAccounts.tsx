import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";

interface ThirdPartyAccount {
  id: string;
  type: "alipay" | "wechat";
  name: string;
}

interface ThirdPartyAccountsProps {
  accounts?: ThirdPartyAccount[];
  onAddAccount?: () => void;
}

export default function ThirdPartyAccounts({
  accounts = [],
  onAddAccount,
}: ThirdPartyAccountsProps) {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      marginTop: 16,
      padding: 16,
      borderRadius: 12,
      backgroundColor: theme.colors.elevation.level1,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.colors.onSurface,
      marginBottom: 16,
    },
    accountsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
    },
    accountItem: {
      width: "48%",
      aspectRatio: 1.8,
      borderRadius: 8,
      backgroundColor: theme.colors.elevation.level2,
      padding: 12,
      justifyContent: "center",
    },
    accountIcon: {
      marginBottom: 8,
    },
    accountName: {
      fontSize: 14,
      color: theme.colors.onSurface,
    },
    addButton: {
      width: "20%",
      height: 80,
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

  const getAccountIcon = (type: "alipay" | "wechat") => {
    switch (type) {
      case "alipay":
        return "alipay-circle";
      case "wechat":
        return "wechat";
      default:
        return "wallet";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>第三方账户</Text>
      <View style={styles.accountsContainer}>
        {accounts.map((account) => (
          <View key={account.id} style={styles.accountItem}>
            <AntDesign
              name={getAccountIcon(account.type)}
              size={24}
              color={theme.colors.primary}
              style={styles.accountIcon}
            />
            <Text style={styles.accountName}>{account.name}</Text>
          </View>
        ))}
        <TouchableOpacity style={styles.addButton} onPress={onAddAccount}>
          <AntDesign
            name="plus"
            size={24}
            color={theme.colors.onSurfaceVariant}
            style={styles.addIcon}
          />
          <Text style={styles.addText}>添加账户</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
