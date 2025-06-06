import GetLotteryResults from "@/components/LotteryResult/GetLotteryResults";
import {
  MO_API_URL,
  MOTHREE_API_URL,
  NEWMO_API_URL,
} from "@/components/LotteryResult/types";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
export default function HongKongScreen() {
  const theme = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GetLotteryResults
        apiUrl={NEWMO_API_URL}
        showExpect={true}
        showOpenCode={true}
        showZodiac={true}
        showOpenTime={true}
        showWave={true}
        showInfo={true}
      />
      <GetLotteryResults
        apiUrl={MO_API_URL}
        showExpect={true}
        showOpenCode={true}
        showZodiac={true}
        showOpenTime={true}
        showWave={true}
        showInfo={true}
      />
      <GetLotteryResults
        apiUrl={MOTHREE_API_URL}
        showExpect={true}
        showOpenCode={true}
        showZodiac={true}
        showOpenTime={true}
        showWave={true}
        showInfo={true}
      />
    </View>
  );
}
