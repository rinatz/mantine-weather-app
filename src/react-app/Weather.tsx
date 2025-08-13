// cSpell:ignore tabler

import { useState } from "react";
import { WeatherByLocationResponse } from "../types";
import {
  Box,
  Stack,
  TextInput,
  Text,
  Group,
  Loader,
  Flex,
  Button,
  Paper,
  ScrollArea,
  BoxProps,
  TextProps,
} from "@mantine/core";
import {
  IconCloud,
  IconDroplet,
  IconMapPin,
  IconSearch,
  IconSun,
  IconMist,
  IconCloudRain,
  IconCloudSnow,
  IconCloudStorm,
  IconProps,
} from "@tabler/icons-react";
import { format, parseISO } from "date-fns";

type IconWeatherProps = {
  code: number;
} & Omit<IconProps, "ref"> &
  BoxProps;

function IconWeather({ code, ...props }: IconWeatherProps) {
  const iconProps = props as IconProps;

  if ([0, 1].includes(code)) {
    return <IconSun {...iconProps} />;
  }
  if ([2, 3].includes(code)) {
    return <IconCloud {...iconProps} />;
  }
  if ([45, 48].includes(code)) {
    return <IconMist {...iconProps} />;
  }
  if ([51, 53, 55, 56, 57].includes(code)) {
    return <IconCloudRain {...iconProps} />;
  }
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return <IconCloudRain {...iconProps} />;
  }
  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return <IconCloudSnow {...iconProps} />;
  }
  if ([95, 96, 99].includes(code)) {
    return <IconCloudStorm {...iconProps} />;
  }
  if ([96, 99].includes(code)) {
    return <IconCloudStorm {...iconProps} />;
  }

  const { ...boxProps } = props as BoxProps;

  return <Box {...boxProps} />;
}

type WeatherTextProps = {
  weatherCode: number;
} & TextProps;

function WeatherText({ weatherCode, ...props }: WeatherTextProps) {
  const weatherCodeString: Record<number, string> = {
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

  const text = weatherCodeString[weatherCode] || "不明";

  return <Text {...props}>{text}</Text>;
}

export function Weather() {
  const [searchLocationName, setSearchLocationName] = useState("");
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherByLocationResponse | null>(
    null
  );

  const fetchWeather = async () => {
    if (searchLocationName === "") {
      return;
    }

    const url = new URL("/weather", window.location.origin);
    url.searchParams.set("q", searchLocationName);

    setLoading(true);
    setWeather(null);

    try {
      const response = await fetch(url.toString());
      setWeather(await response.json());
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack
      align="center"
      pt={100}
      mih="100vh"
      bg="linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)"
    >
      <Box
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: 0,
        }}
      />

      <Box w="100%" maw={640} p="md" style={{ zIndex: 1 }}>
        <Flex gap="sm">
          <TextInput
            placeholder="天気を見たい地名を入力"
            leftSection={<IconSearch />}
            flex={1}
            onChange={(e) =>
              setSearchLocationName(e.currentTarget.value.trim())
            }
            onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
          />
          <Button onClick={fetchWeather}>表示</Button>
        </Flex>

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
                <IconWeather code={weather.hourly[0].weatherCode} size={128} />
              </Flex>

              <Paper
                mt="xl"
                radius="xl"
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
                        <IconWeather code={hour.weatherCode} />
                        <Text size="24px" ml="xs">
                          {hour.temperature.current}°
                        </Text>

                        <Flex align="center">
                          <IconDroplet size={16} />
                          <Text size="sm">
                            {hour.precipitationProbability}
                          </Text>
                          <Text size="sm">%</Text>
                        </Flex>
                      </Stack>
                    ))}
                  </Flex>
                </ScrollArea>
              </Paper>
            </Box>
          )
        )}
      </Box>
    </Stack>
  );
}
