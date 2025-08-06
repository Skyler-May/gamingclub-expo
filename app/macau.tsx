import OpenModal from "@/components/Modal/OpenModal";
import SubPageContent from "@/components/Modal/SubPageContent";
import GetLotteryResults from "@/components/ui/GetLotteryResults";
import { MO_API_URL } from "@/constants/moApiUrl";
import { useDailyCountdown } from "@/hooks/useCountdown";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
export default function MacauScreen() {
  const theme = useTheme();
  const [isModal, setIsModal] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1); // 设置默认页面为第一个页面
  // 处理页面选择
  const handlePageSelect = (pageId: number) => {
    setCurrentPage(pageId);
  };

  const { status, hours, minutes, seconds } = useDailyCountdown({
    startTime: { hour: 21, minute: 15, second: 0 },
    endTime: { hour: 21, minute: 35, second: 0 },
  });

  useEffect(() => {
    if (status !== "counting") {
      setIsModal(true);
    }
  }, [status]);

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
            gap: 10,
          }}
        >
          <View>
            <GetLotteryResults
              apiUrl={MO_API_URL}
              calculateExpect={(expect) => {
                const num = parseInt(expect);
                return num + 1;
              }}
            />
          </View>
          {status === "counting" ? (
            <Text style={styles.text}>
              ⏰ {format(hours)}:{format(minutes)}:{format(seconds)}
            </Text>
          ) : (
            <Modal visible={isModal} transparent animationType="fade">
              <View style={styles.modalBackground}>
                <View style={styles.modalBox}>
                  <TouchableOpacity
                    onPress={() => {
                      setIsModal(false);
                      router.back();
                    }}
                    style={styles.modalClose}
                  >
                    <Ionicons
                      name="close-circle-outline"
                      size={24}
                      color="red"
                    />
                  </TouchableOpacity>
                  <Text style={styles.modalText}>已到 21:15，休息中...</Text>
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
  // 倒计时样式
  text: {
    fontSize: 16,
    color: "tomato",
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    width: "80%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize: 14,
    marginBottom: 8,
  },
  modalClose: {
    //绝对定位到右上角
    position: "absolute",
    right: 10,
    top: 10,
  },
});
