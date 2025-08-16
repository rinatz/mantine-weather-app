// cSpell:ignore tabler

import { Box, Stack, Group, Loader, Text } from "@mantine/core";
import { ja } from "date-fns/locale";
import { useWeather } from "./hooks/useWeather";
import { WeatherSearch } from "./WeatherSearch";
import { CurrentWeather } from "./CurrentWeather";
import { HourlyForecast } from "./HourlyForecast";
import { DailyForecast } from "./DailyForecast";

export function Weather() {
  const locale = ja;
  const { loading, weather, error, fetchWeather } = useWeather();

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
        ) : error ? (
          <Text c="red" my="md">
            {error}
          </Text>
        ) : (
          weather && (
            <Box px="sm">
              <CurrentWeather
                locationName={weather.locationName}
                currentTemperature={weather.hourly[0].temperature.current}
                apparentTemperature={weather.hourly[0].temperature.apparent}
                maxTemperature={weather.daily[0].temperature.max}
                minTemperature={weather.daily[0].temperature.min}
                weatherCode={weather.hourly[0].weatherCode}
              />

              <HourlyForecast hourly={weather.hourly} />
              <DailyForecast locale={locale} daily={weather.daily} />
            </Box>
          )
        )}
      </Box>
    </Stack>
  );
}
