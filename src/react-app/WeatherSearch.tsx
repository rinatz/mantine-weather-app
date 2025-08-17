import { Button, Flex, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

export type WeatherSearchProps = {
  fetchWeather: (location: string) => void;
  loading: boolean;
};

export function WeatherSearch({ fetchWeather, loading }: WeatherSearchProps) {
  const [locationName, setLocationName] = useState("");

  return (
    <Flex gap="sm">
      <TextInput
        placeholder="天気を見たい地名を入力"
        leftSection={<IconSearch />}
        flex={1}
        onChange={(e) => setLocationName(e.currentTarget.value.trim())}
        onKeyDown={(e) => e.key === "Enter" && fetchWeather(locationName)}
      />
      <Button
        onClick={() => fetchWeather(locationName)}
        disabled={!locationName || loading}
      >
        表示
      </Button>
    </Flex>
  );
}
