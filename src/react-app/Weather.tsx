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
} from "@mantine/core";
import { IconMapPin, IconSearch } from "@tabler/icons-react"; // cSpell:ignore tabler

export function Weather() {
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherByLocationResponse | null>(
    null
  );

  const fetchWeather = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") {
      return;
    }
    const locationName = e.currentTarget.value.trim();

    const url = new URL("/weather", window.location.origin);
    url.searchParams.set("q", locationName);

    setLoading(true);
    setWeather(null);

    try {
      const response = await fetch(url.toString());
      setLoading(false);
      setWeather(await response.json());
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack
      align="center"
      pt={100}
      h="100vh"
      bg="linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)"
    >
      <Box w="100%" maw={640} p="md">
        <TextInput
          placeholder="天気を見たい地名を入力"
          leftSection={<IconSearch />}
          onKeyDown={fetchWeather}
        />
        {loading ? (
          <Group gap="xs" align="center" justify="center" mt={20}>
            <Loader size="sm" />
          </Group>
        ) : (
          weather && (
            <>
              <Group gap="xs" align="center" mt={40}>
                <IconMapPin size={24} />
                <Text fw="bold">{weather.locationName}</Text>
              </Group>

              <Text size="64px" fw="bold" mt={20}>
                {weather.hourly[0].temperature.current}°
              </Text>
              <Text fw="bold">{weather.hourly[0].forecast}</Text>

              <Flex align="center" mt={20}>
                <Text size="sm" c="dimmed">
                  ↑{weather.daily[0].temperature.max}°
                </Text>
                <Text size="xl" c="dimmed" px={2}>
                  /
                </Text>
                <Text size="sm" c="dimmed">
                  ↓{weather.daily[0].temperature.min}°
                </Text>
              </Flex>

              <Text size="sm" c="dimmed">
                体感温度{weather.hourly[0].temperature.apparent}°
              </Text>
            </>
          )
        )}
      </Box>
    </Stack>
  );
}
