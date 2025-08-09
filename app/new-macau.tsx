import SubPageContent from "@/components/Gameplay/GameplayContent";
import OpenModal from "@/components/Gameplay/GameplayToggle";
import GetLotteryResults from "@/components/ui/GetLotteryResults";
import { NEWMO_API_URL } from "@/constants/moApiUrl";
import { useDailyCountdown } from "@/hooks/useCountdown";
import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
export default function NewMacauScreen() {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState<number>(1); // 设置默认页面为第一个页面
  // 处理页面选择
  const handlePageSelect = (pageId: number) => {
    setCurrentPage(pageId);
  };

  const { status, hours, minutes, seconds } = useDailyCountdown({
    startTime: { hour: 16, minute: 41, second: 0 },
    endTime: { hour: 16, minute: 0, second: 0 },
  });

  const format = (n: number) => n.toString().padStart(2, "0");

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
            apiUrl={NEWMO_API_URL}
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
            gap: 10,
          }}
        >
          <GetLotteryResults
            apiUrl={NEWMO_API_URL}
            calculateExpect={(expect) => {
              const num = parseInt(expect);
              return num + 1;
            }}
          />
          {status === "counting" ? (
            <Text style={styles.text}>
              ⏰ {format(hours)}:{format(minutes)}:{format(seconds)}
            </Text>
          ) : (
            <Modal visible={true} transparent animationType="fade">
              <View style={styles.modalBackground}>
                <View style={styles.modalBox}>
                  <Text style={styles.modalText}>已到 21:00，休息中...</Text>
                  <Text style={styles.modalText}>
                    距离下轮还有 {format(hours)}:{format(minutes)}:
                    {format(seconds)}
                  </Text>
                </View>
              </View>
            </Modal>
          )}
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
    // margin: 10,
    // borderWidth: 1,
    // borderColor: "gray",
    // borderRadius: 10,
    // padding: 10,
    // backgroundColor: "red",
  },
  openModalContainer: {
    justifyContent: "space-between",
    // alignItems: "center",
    flexDirection: "row",
    width: "100%",
    // height: 40,
    // borderTopStartRadius: 10,
    // borderTopEndRadius: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ddd",
    // backgroundColor: "red",
    // margin: 10,
  },
  subPageContainer: {
    flex: 1,
  },

  // 倒计时样式
  text: {
    fontSize: 16,
    color: "tomato",
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "#00000088",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 8,
  },
});
