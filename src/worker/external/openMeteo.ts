import type { WeatherForecastResponse } from "../types/openMeteo";

export async function fetchWeatherForecast({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}): Promise<WeatherForecastResponse> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", latitude.toString());
  url.searchParams.set("longitude", longitude.toString());
  url.searchParams.set("timezone", "auto");
  url.searchParams.set(
    "hourly",
    "weather_code,temperature_2m,apparent_temperature,precipitation_probability"
  );
  url.searchParams.set(
    "daily",
    "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max"
  );

  console.log("Weather forecast request:", url.toString());

  const response = await fetch(url.toString());

  console.log("Weather forecast response:", response);

  return response.json();
}
