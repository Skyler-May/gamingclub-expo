import Balance from "@/components/Wallet/Balance";
import BankCards from "@/components/Wallet/BankCards";
import ThirdPartyAccounts from "@/components/Wallet/ThirdPartyAccounts";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import Animated from "react-native-reanimated";

export default function WalletScreen() {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View
        style={{
          padding: 10,
          backgroundColor: theme.colors.elevation.level0,
        }}
      >
        <Balance />
      </View>
      <View
        style={{
          flex: 1,
          padding: 10,
          backgroundColor: theme.colors.elevation.level0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: "hidden",
        }}
      >
        <Animated.ScrollView>
          <ThirdPartyAccounts />
          <BankCards />
        </Animated.ScrollView>
      </View>
    </View>
  );
}
