import FoldCarousel from "@/components/Carousel/Fold/FoldCarousel";
import { CategoryTabs } from "@/components/ui/CategoryTabs";
import { GameCard } from "@/components/ui/GameCard";
import { CATEGORIES, GAMES } from "@/constants/game-data";
import { Game, GameCategory } from "@/types/game-card";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";

// 类型定义
type ResponsiveContainerProps = {
  children?: React.ReactNode;
  style?: ViewStyle;
};

// 响应式容器组件
const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  style,
}) => <View style={[styles.container, style]}>{children}</View>;

const GameLobbyScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const theme = useTheme();

  // 响应式尺寸计算
  const CONTAINER_PADDING = 10;
  const cardWidth = width - CONTAINER_PADDING * 2;
  const sidePanelWidth = width * 0.25;
  const mainPanelWidth = width - sidePanelWidth - CONTAINER_PADDING * 3;
  const [selectedCategory, setSelectedCategory] = useState<
    GameCategory | "all"
  >("all");
  const [searchQuery] = useState("");

  const filteredGames = GAMES.filter(
    (game: { category: string; title: string; description: string }) => {
      const matchesCategory =
        selectedCategory === "all" || game.category === selectedCategory;
      const matchesSearch =
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }
  );

  return (
    <ResponsiveContainer>
      {/* 顶部区域 */}

      <View
        style={[
          styles.topSection,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <View
          style={[
            styles.card,
            {
              width: cardWidth,
              height: 200,
              overflow: "hidden",
            },
          ]}
        >
          <FoldCarousel />
        </View>
        <View
          style={[
            styles.card,
            {
              width: cardWidth,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "orange" }}>
            欢迎来到游戏大厅，更多经典游戏等你体验！
          </Text>
        </View>
      </View>

      {/* 底部区域 */}
      <View
        style={[
          styles.bottomSection,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <View
          style={[
            styles.card,
            {
              width: sidePanelWidth,
              height: "100%",
            },
          ]}
        >
          <CategoryTabs
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory as (category: string) => void}
          />
        </View>

        <View
          style={[
            styles.card,
            {
              width: mainPanelWidth,
              height: "100%",
            },
          ]}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
                // shadowColor: theme.colors.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
              }}
            >
              {filteredGames.map((game: Game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </ResponsiveContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  topSection: {
    alignItems: "center",
    padding: 10,
    // backgroundColor: "#FF3355",
  },
  bottomSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    // backgroundColor: "#4CAF50",
  },
  card: {
    // backgroundColor: "#444444",
    borderRadius: 10,
    marginVertical: 4,
  },
});

export default GameLobbyScreen;
