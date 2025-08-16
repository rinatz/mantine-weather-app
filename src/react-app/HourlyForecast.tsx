import { Paper, ScrollArea, Flex, Stack, Text } from "@mantine/core";
import { IconDroplet } from "@tabler/icons-react";
import { IconWeather } from "./IconWeather";
import { format, parseISO } from "date-fns";

export type HourlyForecastProps = {
  hourly: {
    time: string;
    weatherCode: number;
    temperature: {
      current: number;
      apparent: number;
    };
    precipitationProbability: number;
  }[];
};

export function HourlyForecast({ hourly }: HourlyForecastProps) {
  return (
    <Paper
      mt="xl"
      radius="lg"
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
          {hourly.slice(0, 24).map((hour) => (
            <Stack key={hour.time} align="center" gap="xs" mb="xl">
              <Text size="sm" c="">
                {format(parseISO(hour.time), "HH:mm")}
              </Text>
              <IconWeather weatherCode={hour.weatherCode} />
              <Text size="24px" ml="xs">
                {hour.temperature.current}°
              </Text>

              <Flex align="center">
                <IconDroplet size={16} />
                <Text size="sm">{hour.precipitationProbability}</Text>
                <Text size="sm">%</Text>
              </Flex>
            </Stack>
          ))}
        </Flex>
      </ScrollArea>
    </Paper>
  );
}
