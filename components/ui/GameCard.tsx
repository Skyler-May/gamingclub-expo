import { Game } from "@/types/game";
import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "react-native-paper";
import { navigateToGameRoute } from "../../utils/game-routes";

interface GameCardProps {
  game: Game;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, style, onPress }) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      width: "47%",
      backgroundColor: theme.colors.elevation.level3,
      borderRadius: 10,
      overflow: "hidden",
      ...Platform.select({
        ios: {
          shadowColor: theme.colors.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
        },
        android: {
          elevation: 5,
        },
      }),
    },
    imageContainer: {
      position: "relative",
      aspectRatio: 16 / 9,
    },
    image: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    newBadge: {
      position: "absolute",
      top: 8,
      left: 8,
      backgroundColor: theme.colors.primary, // #FF5722
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
    },
    featuredBadge: {
      position: "absolute",
      top: 8,
      right: 8,
      backgroundColor: theme.colors.primary, // #FF4081
      width: 20,
      height: 20,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    badgeText: {
      color: "#FFFFFF", // #FFFFFF
      fontSize: 10,
      fontWeight: "bold",
    },
    infoContainer: {
      padding: 12,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 4,
      color: theme.colors.primary, // #333333
    },
    description: {
      fontSize: 12,
      color: theme.colors.secondary, // #666666,
      marginBottom: 8,
    },
    metaContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    ratingContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    ratingText: {
      fontSize: 12,
      marginLeft: 4,
      color: theme.colors.secondary, // #666666,
    },
    playersContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    playersText: {
      fontSize: 12,
      marginLeft: 4,
      color: theme.colors.secondary, // #666666,
    },
    regionBadge: {
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
    },
    regionText: {
      color: "#ffffff", // #FFFFFF,
      fontSize: 10,
      fontWeight: "bold",
    },
  });

  const getRegionColor = () => {
    switch (game.region) {
      case "hk":
        return "#4CAF50";
      case "mo":
        return "#FFC107";
      case "tw":
        return "#F44336";
      default:
        return "#9E9E9E";
    }
  };

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigateToGameRoute(game.type);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: game.thumbnail }} style={styles.image} />
        {game.isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.badgeText}>NEW</Text>
          </View>
        )}
        {game.isFeatured && (
          <View style={styles.featuredBadge}>
            <Ionicons name="star" size={12} color="#FFF" />
          </View>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {game.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {game.description}
        </Text>

        <View style={styles.metaContainer}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{game.rating.toFixed(1)}</Text>
          </View>

          <View style={styles.playersContainer}>
            <Ionicons name="people" size={14} color="#888" />
            <Text style={styles.playersText}>{game.playersOnline}</Text>
          </View>

          <View
            style={[styles.regionBadge, { backgroundColor: getRegionColor() }]}
          >
            <Text style={styles.regionText}>{game.region.toUpperCase()}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
