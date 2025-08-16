import { Paper, Flex, Text } from "@mantine/core";
import { IconDroplet } from "@tabler/icons-react";
import { format, Locale, parseISO } from "date-fns";
import { IconWeather } from "./IconWeather";

export type DailyForecastProps = {
  locale: Locale;
  daily: {
    time: string;
    weatherCode: number;
    temperature: {
      max: number;
      min: number;
    };
    precipitationProbability: number;
  }[];
};

export function DailyForecast({ locale, daily }: DailyForecastProps) {
  return (
    <Paper mt="xl" radius="lg" py="lg" bg="rgba(255, 255, 255, 0.1)">
      {daily.map((day) => (
        <Flex key={day.time} justify="space-around" align="center" mt="md">
          <Text>{format(parseISO(day.time), "EEEEEE", { locale })}</Text>
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
  );
}
