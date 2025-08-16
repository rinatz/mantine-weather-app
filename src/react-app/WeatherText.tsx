import { Text, TextProps } from "@mantine/core";

const WEATHER_TEXT_MAP: Record<number, string> = {
  0: "快晴",
  1: "ほぼ晴れ",
  2: "薄曇り",
  3: "曇り",
  45: "霧",
  48: "樹氷を伴う霧",
  51: "霧雨（弱い）",
  53: "霧雨（やや強い）",
  55: "霧雨（強い）",
  56: "着氷性の霧雨（弱い）",
  57: "着氷性の霧雨（強い）",
  61: "雨（弱い）",
  63: "雨（やや強い）",
  65: "雨（強い）",
  66: "着氷性の雨（弱い）",
  67: "着氷性の雨（強い）",
  71: "降雪（弱い）",
  73: "降雪（やや強い）",
  75: "降雪（強い）",
  77: "雪あられ",
  80: "にわか雨（弱い）",
  81: "にわか雨（やや強い）",
  82: "にわか雨（非常に強い）",
  85: "にわか雪（弱い）",
  86: "にわか雪（強い）",
  95: "雷雨（弱い〜中程度）",
  96: "ひょうを伴う雷雨（弱い）",
  99: "ひょうを伴う雷雨（強い）",
};

export type WeatherTextProps = {
  weatherCode: number;
} & TextProps;

export function WeatherText({ weatherCode, ...props }: WeatherTextProps) {
  const text = WEATHER_TEXT_MAP[weatherCode] || "不明";

  return <Text {...props}>{text}</Text>;
}
