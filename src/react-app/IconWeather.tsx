import { Box, BoxProps } from "@mantine/core";
import {
  IconCloud,
  IconSun,
  IconMist,
  IconCloudRain,
  IconCloudSnow,
  IconCloudStorm,
  IconProps,
} from "@tabler/icons-react";

const WEATHER_ICON_MAP: Record<number, React.ElementType> = {
  0: IconSun,
  1: IconSun,
  2: IconCloud,
  3: IconCloud,
  45: IconMist,
  48: IconMist,
  51: IconCloudRain,
  53: IconCloudRain,
  55: IconCloudRain,
  56: IconCloudRain,
  57: IconCloudRain,
  61: IconCloudRain,
  63: IconCloudRain,
  65: IconCloudRain,
  66: IconCloudRain,
  67: IconCloudRain,
  80: IconCloudRain,
  81: IconCloudRain,
  82: IconCloudRain,
  71: IconCloudSnow,
  73: IconCloudSnow,
  75: IconCloudSnow,
  77: IconCloudSnow,
  85: IconCloudSnow,
  86: IconCloudSnow,
  95: IconCloudStorm,
  96: IconCloudStorm,
  99: IconCloudStorm,
};

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

  const IconComponent = WEATHER_ICON_MAP[weatherCode];

  return IconComponent ? (
    <IconComponent {...iconProps} />
  ) : (
    <Box {...boxProps} />
  );
}
