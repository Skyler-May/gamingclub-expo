import { useLotteryResults } from "@/hooks/useMoLotteryResults";
import { LotteryResultDisplayOptions } from "@/types/moApiTypes";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

const GetLotteryResults: React.FC<LotteryResultDisplayOptions> = ({
  apiUrl,
  showExpect = false,
  showOpenCode = false,
  showZodiac = false,
  showOpenTime = false,
  showWave = false,
  showInfo = false,
  shouldCalculateExpect = false,
  calculateExpect,
}) => {
  const { isLoading, data } = useLotteryResults(apiUrl);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ expect }) => expect}
          renderItem={({ item }) => {
            const openCodes = item.openCode.split(",");
            const zodiacs = item.zodiac.split(",");
            const waves = item.wave.split(",");

            return (
              <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                  {showExpect && !shouldCalculateExpect && (
                    <Text style={styles.infoText}>
                      第 {item.expect} 期 开奖结果
                    </Text>
                  )}
                  {calculateExpect && (
                    <Text style={styles.infoText}>
                      第 {calculateExpect(item.expect)} 期 截止
                    </Text>
                  )}
                  {showOpenTime && (
                    <Text style={styles.infoText}>
                      开奖时间: {item.openTime}
                    </Text>
                  )}
                  {showInfo && (
                    <Text style={styles.infoText}>信息: {item.info}</Text>
                  )}
                </View>

                <View style={{ flexDirection: "row" }}>
                  {showOpenCode &&
                    showZodiac &&
                    openCodes.slice(0, 6).map((code, index) => (
                      <View style={styles.numberAndZodiacContainer} key={index}>
                        <View
                          style={[
                            styles.numberContainer,
                            { backgroundColor: waves[index] },
                          ]}
                        >
                          <Text style={styles.numberText}>{code}</Text>
                        </View>
                        <View style={styles.zodiacContainer}>
                          <Text style={styles.ZocialText}>
                            {zodiacs[index]}
                          </Text>
                        </View>
                      </View>
                    ))}

                  {showWave && (
                    <View style={styles.numberAndZodiacContainer}>
                      <View style={[styles.numberContainer]}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            color: "gray",
                          }}
                        >
                          +
                        </Text>
                      </View>
                    </View>
                  )}

                  {showOpenCode && showZodiac && (
                    <View style={styles.numberAndZodiacContainer}>
                      <View
                        style={[
                          styles.numberContainer,
                          { backgroundColor: waves[6] },
                        ]}
                      >
                        <Text style={styles.numberText}>{openCodes[6]}</Text>
                      </View>
                      <View style={styles.zodiacContainer}>
                        <Text style={styles.ZocialText}>{zodiacs[6]}</Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  numberAndZodiacContainer: {
    alignItems: "center",
    margin: 1,
  },
  numberContainer: {
    borderRadius: 15,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  zodiacContainer: {
    borderRadius: 15,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: {
    fontSize: 12,
    color: "white",
  },
  ZocialText: {
    fontSize: 12,
    color: "gray",
  },
  infoText: {
    fontSize: 12,
    color: "gray",
    margin: 3,
  },
});

export default GetLotteryResults;
