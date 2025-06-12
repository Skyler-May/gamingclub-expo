import {
  CHANNELS_DATA,
  PLATFORM_INFO,
  TOOLS_DATA,
} from "@/constants/Profile-Data";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function ToolCards() {
  const theme = useTheme();

  return (
    <View style={styles.Container}>
      <View
        style={[
          styles.dataItem,
          { backgroundColor: theme.colors.surfaceVariant },
        ]}
      >
        <Text style={[styles.dataTitle, { color: theme.colors.onSurface }]}>
          必备工具
        </Text>
        <View style={styles.toolsDATA}>
          {TOOLS_DATA.map((tool, index) => (
            <TouchableOpacity
              key={index}
              style={styles.toolItem}
              onPress={() => tool.route && router.push(tool.route)}
            >
              <AntDesign
                name={tool.icon as any}
                size={24}
                color={theme.colors.primary}
              />
              <Text
                style={[
                  styles.toolText,
                  { color: theme.colors.onSurfaceVariant },
                ]}
              >
                {tool.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View
        style={[
          styles.dataItem,
          { backgroundColor: theme.colors.surfaceVariant },
        ]}
      >
        <Text style={[styles.dataTitle, { color: theme.colors.onSurface }]}>
          我的频道
        </Text>
        <View style={styles.toolsDATA}>
          {CHANNELS_DATA.map((tool, index) => (
            <TouchableOpacity
              key={index}
              style={styles.toolItem}
              onPress={() => tool.route && router.push(tool.route)}
            >
              <AntDesign name={tool.icon as any} size={24} color={tool.color} />
              <Text
                style={[styles.toolText, { color: theme.colors.onSurface }]}
              >
                {tool.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View
        style={[
          styles.dataItem,
          { backgroundColor: theme.colors.surfaceVariant },
        ]}
      >
        <Text style={[styles.dataTitle, { color: theme.colors.onSurface }]}>
          平台信息
        </Text>
        <View style={styles.toolsDATA}>
          {PLATFORM_INFO.map((tool, index) => (
            <TouchableOpacity
              key={index}
              style={styles.toolItem}
              onPress={() => tool.route && router.push(tool.route)}
            >
              <AntDesign name={tool.icon as any} size={24} color={tool.color} />
              <Text
                style={[styles.toolText, { color: theme.colors.onSurface }]}
              >
                {tool.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  dataItem: {
    minHeight: 200,
    width: "95%",
    borderRadius: 15,
    flexDirection: "column",
    padding: 15,
    elevation: 3,
  },
  dataTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  toolsDATA: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  toolItem: {
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
    opacity: 0.9,
  },
  toolText: {
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
    fontWeight: "500",
  },
});
