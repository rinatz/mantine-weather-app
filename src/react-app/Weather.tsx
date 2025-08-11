import { useState } from "react";
import { WeatherByLocationResponse } from "../types";
import { Box, Stack, TextInput, Title, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

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
    <Stack align="center" justify="center" pt={100}>
      <Box w={640}>
        <TextInput
          placeholder="地名を入力"
          leftSection={<IconSearch />}
          onKeyDown={fetchWeather}
        />
        {weather && (
          <Stack mt={20}>
            <Text>{weather.locationName}</Text>
            <Title order={1}>{weather.hourly[0].temperature.current}°</Title>
            <Text>{weather.hourly[0].forecast}</Text>
            <Text>
              ↑{weather.daily[0].temperature.max}°/↓
              {weather.daily[0].temperature.min}°
            </Text>
            <Text>体感温度{weather.hourly[0].temperature.apparent}°</Text>
          </Stack>
        )}
      </Box>
    </Stack>
  );
}
