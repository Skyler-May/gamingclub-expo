import Balance from "@/components/ui/Balance";
import BankCards from "@/components/ui/BankCards";
import ThirdPartyAccounts from "@/components/ui/ThirdPartyAccounts";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

export default function WalletScreen() {
  const theme = useTheme();
  const balance = {
    amount: 589650.86,
    currency: "USD",
    currencySymbol: "$",
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View
        style={{
          padding: 10,
          backgroundColor: theme.colors.elevation.level0,
        }}
      >
        <Balance balance={balance} />
        <ThirdPartyAccounts />
        <BankCards />
      </View>
    </View>
  );
}
