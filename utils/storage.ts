import * as SecureStore from "expo-secure-store";
import { User } from "@/types/user";

type StorageKeys = {
  accessToken: string;
  refreshToken: string;
  user: User; // 使用User类型
};

export const setSecureItem = async <K extends keyof StorageKeys>(
  key: K,
  value: StorageKeys[K]
) => {
  const stringValue = typeof value === "string" ? value : JSON.stringify(value);
  await SecureStore.setItemAsync(key, stringValue);
};

export const getSecureItem = async <K extends keyof StorageKeys>(
  key: K
): Promise<StorageKeys[K] | null> => {
  const value = await SecureStore.getItemAsync(key);
  if (!value) return null;

  try {
    return key === "user"
      ? (JSON.parse(value) as StorageKeys[K])
      : (value as StorageKeys[K]);
  } catch {
    return null;
  }
};

export const deleteSecureItem = async (key: keyof StorageKeys) => {
  await SecureStore.deleteItemAsync(key);
};
