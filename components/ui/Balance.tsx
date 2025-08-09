import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";

interface BalanceProps {
  balance?: { amount: number; currency: string; currencySymbol: string };
  onDeposit?: () => void;
  onWithdraw?: () => void;
  onTransfer?: () => void;
}

export default function Balance({
  balance = { amount: 0, currency: "USD", currencySymbol: "$" },
  onDeposit,
  onWithdraw,
  onTransfer,
}: BalanceProps) {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      padding: 16,
      borderRadius: 12,
      backgroundColor: theme.colors.primary,
      // 阴影
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    balanceContainer: {
      marginBottom: 24,
    },
    balanceLabel: {
      fontSize: 14,
      color: theme.colors.surface,
      marginBottom: 8,
    },
    balanceAmount: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.colors.surface,
    },
    actionsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    actionButton: {
      alignItems: "center",
    },
    actionIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.surfaceVariant,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 8,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    actionText: {
      fontSize: 12,
      color: theme.colors.surface,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>账户余额</Text>
        <Text style={styles.balanceAmount}>
          {balance.currencySymbol} {balance.amount.toFixed(2)}
        </Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={onDeposit}>
          <View style={styles.actionIcon}>
            <AntDesign name="plus" size={24} color={theme.colors.primary} />
          </View>
          <Text style={styles.actionText}>充值</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={onWithdraw}>
          <View style={styles.actionIcon}>
            <AntDesign name="minus" size={24} color={theme.colors.primary} />
          </View>
          <Text style={styles.actionText}>提现</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={onTransfer}>
          <View style={styles.actionIcon}>
            <AntDesign name="swap" size={24} color={theme.colors.primary} />
          </View>
          <Text style={styles.actionText}>转账</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
