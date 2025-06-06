import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MenuItem {
  icon: string;
  text: string;
  library: React.ComponentType<any>;
  backgroundColor?: string;
  iconColor?: string;
  textColor?: string;
}

interface AccountDetailsProps {
  items?: MenuItem[]; // 改为可选属性
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ items = [] }) => {
  if (!items || !Array.isArray(items)) {
    return null; // 或者你可以返回一个空视图或错误提示
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {items.map((item, index) => {
          const IconComponent = item.library;
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.detailsButton,
                { backgroundColor: item.backgroundColor || "#FFFFFF" },
              ]}
              activeOpacity={0.7}
              accessibilityLabel={item.text}
            >
              <IconComponent
                name={item.icon}
                size={24}
                color={item.iconColor || "#007AFF"}
                style={styles.icon}
              />
              <Text
                style={[
                  styles.detailsButtonText,
                  { color: item.textColor || "#000000" },
                ]}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 15,
    padding: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    flexWrap: "wrap",
  },
  detailsButton: {
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "23%",
    minHeight: 90,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    marginBottom: 6,
  },
  detailsButtonText: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
    textAlign: "center",
    flexShrink: 1,
    includeFontPadding: false,
    textAlignVertical: "center",
  },
});

export default AccountDetails;
