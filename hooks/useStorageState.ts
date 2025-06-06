import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useStorageState<T>(
  key: string
): [[boolean, T | null], (value: T | null) => void] {
  const [state, setState] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(key)
      .then((value) => {
        setState(value ? JSON.parse(value) : null);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("加载存储失败:", error);
        setIsLoading(false);
      });
  }, [key]);

  const setStorageState = (value: T | null) => {
    const jsonValue = value ? JSON.stringify(value) : null;
    AsyncStorage.setItem(key, jsonValue || "")
      .then(() => setState(value))
      .catch((error) => console.error("保存存储失败:", error));
  };

  return [[isLoading, state], setStorageState];
}
