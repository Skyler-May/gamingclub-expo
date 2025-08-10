import { LotteryResult } from "@/types/mo-api";
import { useCallback, useEffect, useState } from "react";

export function useLotteryResults(apiUrl: string) {
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
  }, [apiUrl]);

  useEffect(() => {
    getLotteryResults();
  }, [getLotteryResults]);

  return { isLoading, data };
}
