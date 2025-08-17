import { Text, type TextProps } from "@mantine/core";
import { WEATHER_CODE_MAP } from "./constants";

export type WeatherTextProps = {
  weatherCode: number;
} & TextProps;

export function WeatherText({ weatherCode, ...props }: WeatherTextProps) {
  const text = WEATHER_CODE_MAP[weatherCode]?.text || "不明";

  return <Text {...props}>{text}</Text>;
}
