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
} from "@tabler/icons-react"; // cSpell:ignore tabler

function IconWeather({ code, ...props }: { code: number; [key: string]: any }) {
  if ([0, 1].includes(code)) return <IconSun {...props} />; // 快晴〜ほぼ晴れ
  if ([2, 3].includes(code)) return <IconCloud {...props} />; // 薄曇り〜曇り
  if ([45, 48].includes(code)) return <IconMist {...props} />; // 霧
  if ([51, 53, 55, 56, 57].includes(code)) return <IconCloudRain {...props} />; // 霧雨
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code))
    return <IconCloudRain {...props} />; // 雨
  if ([71, 73, 75, 77, 85, 86].includes(code))
    return <IconCloudSnow {...props} />; // 雪
  if ([95, 96, 99].includes(code)) return <IconCloudStorm {...props} />; // 雷雨
  if ([96, 99].includes(code)) return <IconCloudStorm {...props} />; // ひょうを伴う雷雨

  return <Box {...props} />;
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
                  <Text fw="bold" mt="md">
                    {weather.hourly[0].forecast}
                  </Text>
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
                    {weather.hourly.map((hour) => (
                      <Stack key={hour.time} align="center" gap="xs" mb="xl">
                        <Text size="sm" c="">
                          {hour.time}
                        </Text>
                        <IconWeather code={hour.weatherCode} />
                        <Text size="24px">{hour.temperature.current}°</Text>

                        <Flex align="center" pr={8}>
                          <IconDroplet size={16} />
                          <Text size="sm">
                            {hour.precipitationProbability}%
                          </Text>
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
