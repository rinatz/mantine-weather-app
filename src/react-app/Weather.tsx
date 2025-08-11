import { useState } from "react";
import { WeatherByLocationResponse } from "../types";
import { Box, Stack, TextInput, Title, Text, Group } from "@mantine/core";
import { IconMapPin, IconSearch } from "@tabler/icons-react";

export function Weather() {
  const [weather, setWeather] = useState<WeatherByLocationResponse | null>(
    null
  );

  const fetchWeather = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") {
      return;
    }
    const locationName = e.currentTarget.value;

    const url = new URL("/weather", window.location.origin);
    url.searchParams.set("q", locationName);

    const response = await fetch(url.toString());

    setWeather(await response.json());
  };

  return (
    <Stack
      align="center"
      pt={100}
      h="100vh"
      bg="linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)"
    >
      <Box w={640}>
        <TextInput
          placeholder="天気を見たい地名を入力"
          leftSection={<IconSearch />}
          onKeyDown={fetchWeather}
        />
        {weather && (
          <Stack mt={20} px="xs">
            <Group gap="xs" align="center">
              <IconMapPin size={24} color="#1a61ff" />
              <Text fw="bold">{weather.locationName}</Text>
            </Group>

            <Title order={1}>{weather.hourly[0].temperature.current}°</Title>
            <Text fw="bold">{weather.hourly[0].forecast}</Text>

            <Text size="sm" c="dimmed">
              ↑{weather.daily[0].temperature.max}°/↓
              {weather.daily[0].temperature.min}°
            </Text>
            <Text size="sm" c="dimmed">
              体感温度{weather.hourly[0].temperature.apparent}°
            </Text>
          </Stack>
        )}
      </Box>
    </Stack>
  );
}
