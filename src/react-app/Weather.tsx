// cSpell:ignore tabler

import React from "react";
import {
  Box,
  Stack,
  Text,
  Group,
  Loader,
  Flex,
  Paper,
  ScrollArea,
  BoxProps,
  TextProps,
} from "@mantine/core";
import {
  IconCloud,
  IconDroplet,
  IconMapPin,
  IconSun,
  IconMist,
  IconCloudRain,
  IconCloudSnow,
  IconCloudStorm,
  IconProps,
} from "@tabler/icons-react";
import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";
import { useWeather } from "./hooks/useWeather";
import { WeatherSearch } from "./WeatherSearch";

const WEATHER_ICON_MAP: Record<number, React.ElementType> = {
  0: IconSun,
  1: IconSun,
  2: IconCloud,
  3: IconCloud,
  45: IconMist,
  48: IconMist,
  51: IconCloudRain,
  53: IconCloudRain,
  55: IconCloudRain,
  56: IconCloudRain,
  57: IconCloudRain,
  61: IconCloudRain,
  63: IconCloudRain,
  65: IconCloudRain,
  66: IconCloudRain,
  67: IconCloudRain,
  80: IconCloudRain,
  81: IconCloudRain,
  82: IconCloudRain,
  71: IconCloudSnow,
  73: IconCloudSnow,
  75: IconCloudSnow,
  77: IconCloudSnow,
  85: IconCloudSnow,
  86: IconCloudSnow,
  95: IconCloudStorm,
  96: IconCloudStorm,
  99: IconCloudStorm,
};

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

type IconWeatherProps = {
  weatherCode: number;
} & Omit<IconProps, "ref"> &
  BoxProps;

function IconWeather({ weatherCode: weatherCode, ...props }: IconWeatherProps) {
  const iconProps = props as IconProps;
  const boxProps = props as BoxProps;

  const IconComponent = WEATHER_ICON_MAP[weatherCode];

  return IconComponent ? (
    <IconComponent {...iconProps} />
  ) : (
    <Box {...boxProps} />
  );
}

type WeatherTextProps = {
  weatherCode: number;
} & TextProps;

function WeatherText({ weatherCode, ...props }: WeatherTextProps) {
  const text = WEATHER_TEXT_MAP[weatherCode] || "不明";

  return <Text {...props}>{text}</Text>;
}

export function Weather() {
  const locale = ja;
  const { loading, weather, fetchWeather } = useWeather();

  return (
    <Stack
      align="center"
      py={100}
      mih="100vh"
      bg="linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)"
      style={{ zIndex: 0 }}
    >
      <Box
        style={{
          position: "fixed",
          inset: 0,
          minHeight: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: 1,
        }}
      />

      <Box w="100%" maw={640} p="md" style={{ zIndex: 1 }}>
        <WeatherSearch fetchWeather={fetchWeather} loading={loading} />

        {loading ? (
          <Group gap="xs" align="center" justify="center" mt={20}>
            <Loader size="sm" />
          </Group>
        ) : (
          weather && (
            <Box px="sm">
              <Flex align="center" justify="space-around" mt="xl">
                <Stack gap={0}>
                  <Group gap="xs">
                    <IconMapPin size={24} />
                    <Text fw="bold">{weather.locationName}</Text>
                  </Group>
                  <Text size="64px" fw="bold" mt="xl">
                    {weather.hourly[0].temperature.current}°
                  </Text>
                  <WeatherText
                    fw="bold"
                    mt="md"
                    weatherCode={weather.hourly[0].weatherCode}
                  />
                  <Flex align="center" mt="xl">
                    <Text size="sm">↑{weather.daily[0].temperature.max}°</Text>
                    <Text size="xl" px={2}>
                      /
                    </Text>
                    <Text size="sm">↓{weather.daily[0].temperature.min}°</Text>
                  </Flex>
                  <Text size="sm">
                    体感温度{weather.hourly[0].temperature.apparent}°
                  </Text>
                </Stack>
                <IconWeather
                  weatherCode={weather.hourly[0].weatherCode}
                  size={128}
                />
              </Flex>

              <Paper
                mt="xl"
                radius="lg"
                pt="lg"
                px="xl"
                bg="rgba(255, 255, 255, 0.1)"
                style={{
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                }}
              >
                <ScrollArea
                  type="hover"
                  scrollbarSize={16}
                  scrollHideDelay={0}
                  offsetScrollbars
                >
                  <Flex justify="space-between" gap="xl">
                    {weather.hourly.slice(0, 24).map((hour) => (
                      <Stack key={hour.time} align="center" gap="xs" mb="xl">
                        <Text size="sm" c="">
                          {format(parseISO(hour.time), "HH:mm")}
                        </Text>
                        <IconWeather weatherCode={hour.weatherCode} />
                        <Text size="24px" ml="xs">
                          {hour.temperature.current}°
                        </Text>

                        <Flex align="center">
                          <IconDroplet size={16} />
                          <Text size="sm">{hour.precipitationProbability}</Text>
                          <Text size="sm">%</Text>
                        </Flex>
                      </Stack>
                    ))}
                  </Flex>
                </ScrollArea>
              </Paper>

              <Paper mt="xl" radius="lg" py="lg" bg="rgba(255, 255, 255, 0.1)">
                {weather.daily.map((day) => (
                  <Flex
                    key={day.time}
                    justify="space-around"
                    align="center"
                    mt="md"
                  >
                    <Text>
                      {format(parseISO(day.time), "EEEEEE", { locale })}
                    </Text>
                    <Flex gap={{ base: "md", md: "xl" }} justify="end">
                      <Flex justify="space-between" align="center" w={50}>
                        <IconDroplet size={16} />
                        <Text>{day.precipitationProbability}%</Text>
                      </Flex>
                      <IconWeather weatherCode={day.weatherCode} />
                      <Flex gap="xs">
                        <Text>{day.temperature.max}°</Text>
                        <Text>{day.temperature.min}°</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                ))}
              </Paper>
            </Box>
          )
        )}
      </Box>
    </Stack>
  );
}
