import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";

type UserInfoCardProps = {
  avatarUri: ImageSourcePropType;
  username: string;
  email: string;
  avatarSize?: number;
  textColor?: string;
  backgroundColor?: string;
};

const UserInfoCard: React.FC<UserInfoCardProps> = ({
  avatarUri,
  username,
  email,
  avatarSize = 80,
  textColor = "#333",
  backgroundColor = "transparent",
}) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      padding: 16,
      backgroundColor,
      // borderRadius: 15,
    },
    avatar: {
      width: avatarSize,
      height: avatarSize,
      borderRadius: avatarSize / 2,
      marginBottom: 12,
    },
    usernameText: {
      fontSize: 18,
      fontWeight: "bold",
      color: textColor,
      marginBottom: 4,
    },
    emailText: {
      fontSize: 14,
      color: textColor,
      opacity: 0.8,
    },
  });

  return (
    <View style={styles.container}>
      <Image source={avatarUri} style={styles.avatar} />
      <Text style={styles.usernameText}>用户名：{username}</Text>
      <Text style={styles.emailText}>邮箱：{email}</Text>
    </View>
  );
};

export default UserInfoCard;
