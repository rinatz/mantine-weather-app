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
import { IconDroplet, IconMapPin, IconSearch } from "@tabler/icons-react"; // cSpell:ignore tabler

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
              <Group gap="xs" mt={40}>
                <IconMapPin size={24} />
                <Text fw="bold">
                  {weather.locationName}
                </Text>
              </Group>

              <Text size="64px" fw="bold" mt={20}>
                {weather.hourly[0].temperature.current}°
              </Text>
              <Text fw="bold">
                {weather.hourly[0].forecast}
              </Text>

              <Flex align="center" mt={20}>
                <Text size="sm">
                  ↑{weather.daily[0].temperature.max}°
                </Text>
                <Text size="xl" px={2}>
                  /
                </Text>
                <Text size="sm">
                  ↓{weather.daily[0].temperature.min}°
                </Text>
              </Flex>

              <Text size="sm">
                体感温度{weather.hourly[0].temperature.apparent}°
              </Text>

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
                        <Text size="sm">
                          {hour.forecast}
                        </Text>
                        <Text size="32px">
                          {hour.temperature.current}°
                        </Text>

                        <Flex align="center" pr={16}>
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
