// cSpell:ignore tabler

import { Box, Stack, Text, Group, Loader, Flex, Paper } from "@mantine/core";
import { IconDroplet } from "@tabler/icons-react";
import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";
import { useWeather } from "./hooks/useWeather";
import { WeatherSearch } from "./WeatherSearch";
import { IconWeather } from "./IconWeather";
import { CurrentWeather } from "./CurrentWeather";
import { HourlyForecast } from "./HourlyForecast";

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
              <CurrentWeather
                locationName={weather.locationName}
                currentTemperature={weather.hourly[0].temperature.current}
                apparentTemperature={weather.hourly[0].temperature.apparent}
                maxTemperature={weather.daily[0].temperature.max}
                minTemperature={weather.daily[0].temperature.min}
                weatherCode={weather.hourly[0].weatherCode}
              />

              <HourlyForecast hourly={weather.hourly} />

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
