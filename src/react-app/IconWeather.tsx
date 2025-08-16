import { Box, BoxProps } from "@mantine/core";
import { IconProps } from "@tabler/icons-react";
import { WEATHER_CODE_MAP } from "./constants";

export type IconWeatherProps = {
  weatherCode: number;
} & Omit<IconProps, "ref"> &
  BoxProps;

export function IconWeather({
  weatherCode: weatherCode,
  ...props
}: IconWeatherProps) {
  const iconProps = props as IconProps;
  const boxProps = props as BoxProps;

  const IconComponent = WEATHER_CODE_MAP[weatherCode]?.icon;

  return IconComponent ? (
    <IconComponent {...iconProps} />
  ) : (
    <Box {...boxProps} />
  );
}
