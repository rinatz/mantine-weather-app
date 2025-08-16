import { useCallback, useState } from "react";
import { WeatherByLocationResponse } from "../../types";

export function useWeather() {
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherByLocationResponse | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (locationName: string) => {
    if (locationName === "") {
      return;
    }

    const url = new URL("/weather", window.location.origin);
    url.searchParams.set("q", locationName);

    setLoading(true);
    setWeather(null);
    setError(null);

    try {
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error("天気の取得に失敗しました。");
      }
      setWeather(await response.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : "不明なエラーが発生しました。");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    weather,
    error,
    fetchWeather,
  };
}
