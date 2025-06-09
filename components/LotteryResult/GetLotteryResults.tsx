import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LotteryResult, LotteryResultDisplayOptions } from "./types/apiTypes";

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
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<LotteryResult[]>([]);

  const getLotteryResults = useCallback(async () => {
    try {
      const response = await fetch(apiUrl);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]); // 依赖 apiUrl

  useEffect(() => {
    getLotteryResults();
  }, [getLotteryResults]); // 现在可以安全地作为依赖项

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ expect }) => expect}
          renderItem={({ item }) => (
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
                  <Text style={styles.infoText}>开奖时间: {item.openTime}</Text>
                )}
                {showInfo && (
                  <Text style={styles.infoText}>信息: {item.info}</Text>
                )}
              </View>

              <View style={{ flexDirection: "row" }}>
                {showOpenCode &&
                  showZodiac &&
                  [...Array(6)].map((_, index) => (
                    <View style={styles.numberAndZodiacContainer} key={index}>
                      <View
                        style={[
                          styles.numberContainer,
                          {
                            backgroundColor: item.wave.split(",")[index],
                          },
                        ]}
                      >
                        <Text style={styles.numberText}>
                          {item.openCode.split(",")[index]}
                        </Text>
                      </View>
                      <View style={styles.zodiacContainer}>
                        <Text style={styles.ZocialText}>
                          {item.zodiac.split(",")[index]}
                        </Text>
                      </View>
                    </View>
                  ))}

                {/* “ + ” 连接符容器*/}
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
                        { backgroundColor: item.wave.split(",")[6] },
                      ]}
                    >
                      <Text style={styles.numberText}>
                        {item.openCode.split(",")[6]}
                      </Text>
                    </View>
                    <View style={styles.zodiacContainer}>
                      <Text style={styles.ZocialText}>
                        {item.zodiac.split(",")[6]}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
          )}
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
