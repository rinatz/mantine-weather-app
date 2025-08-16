import { Flex, Text, Group, Stack } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import { IconWeather } from "./IconWeather";
import { WeatherText } from "./WeatherText";

export type CurrentWeatherProps = {
  locationName: string;
  currentTemperature: number;
  apparentTemperature: number;
  maxTemperature: number;
  minTemperature: number;
  weatherCode: number;
};

export function CurrentWeather({
  locationName,
  currentTemperature,
  apparentTemperature,
  maxTemperature,
  minTemperature,
  weatherCode,
}: CurrentWeatherProps) {
  return (
    <Flex align="center" justify="space-around" mt="xl">
      <Stack gap={0}>
        <Group gap="xs">
          <IconMapPin size={24} />
          <Text fw="bold">{locationName}</Text>
        </Group>
        <Text size="64px" fw="bold" mt="xl">
          {currentTemperature}°
        </Text>
        <WeatherText fw="bold" mt="md" weatherCode={weatherCode} />
        <Flex align="center" mt="xl">
          <Text size="sm">↑{maxTemperature}°</Text>
          <Text size="xl" px={2}>
            /
          </Text>
          <Text size="sm">↓{minTemperature}°</Text>
        </Flex>
        <Text size="sm">体感温度{apparentTemperature}°</Text>
      </Stack>
      <IconWeather weatherCode={weatherCode} size={128} />
    </Flex>
  );
}
