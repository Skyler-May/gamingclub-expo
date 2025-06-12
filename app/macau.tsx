import CountdownTimer from "@/components/CountdownTimer";
import { MO_API_URL } from "@/components/LotteryResult/constants/mo-api-url";
import GetLotteryResults from "@/components/LotteryResult/GetLotteryResults";
import OpenModal from "@/components/Modal/OpenModal";
import SubPageContent from "@/components/Modal/SubPageContent";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
export default function MacauScreen() {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState<number>(1); // 设置默认页面为第一个页面
  // 处理页面选择
  const handlePageSelect = (pageId: number) => {
    setCurrentPage(pageId);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View
        style={{
          // backgroundColor: "#ddd",
          width: "100%",
          height: 80,
          flexDirection: "row",
          marginBottom: 10,
        }}
      >
        <View
          style={{
            // backgroundColor: "blue",
            width: "65%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <GetLotteryResults
            apiUrl={MO_API_URL}
            showExpect={true}
            showOpenCode={true}
            showZodiac={true}
            showWave={true}
          />
        </View>

        {/* 倒计时 */}
        <View
          style={{
            // backgroundColor: "#ccc",
            width: "35%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <GetLotteryResults
            apiUrl={MO_API_URL}
            calculateExpect={(expect) => {
              const num = parseInt(expect);
              return num + 1;
            }}
          />
          <Text>
            <CountdownTimer sleepStartTime={"23:10"} sleepEndTime={"08:00"} />
          </Text>
          <Text style={{ color: theme.colors.primary }}>余额：888888</Text>
        </View>
      </View>

      <View style={[styles.contentCtainer, ,]}>
        <View style={styles.openModalContainer}>
          <TouchableOpacity
            style={{
              // backgroundColor: "#2196F3",
              width: "30%",
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              borderWidth: 1,
              borderColor: theme.colors.primary,
            }}
            onPress={() => {}}
          >
            <Text style={{ color: theme.colors.primary }}>打开模态1</Text>
          </TouchableOpacity>
          <OpenModal
            buttonTitle="打开模态"
            modalTitle="模态标题"
            itemsPerRow={4}
            onPageSelect={handlePageSelect}
          />
          <TouchableOpacity
            style={{
              // backgroundColor: "#2196F3",
              width: "30%",
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              borderWidth: 1,
              borderColor: theme.colors.primary,
            }}
            onPress={() => {}}
          >
            <Text style={{ color: theme.colors.primary }}>打开模态2</Text>
          </TouchableOpacity>
        </View>

        {/* 渲染模态子页面 */}
        <View style={styles.subPageContainer}>
          <SubPageContent currentPage={currentPage} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  openCodeContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 50,
  },
  contentCtainer: {
    flex: 1,
  },
  openModalContainer: {
    justifyContent: "space-between",
    // alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  subPageContainer: {
    flex: 1,
  },
});
