// cSpell:ignore Meteo nominatim

import { fetchLocation } from "../external/nominatim";
import { fetchWeatherForecast } from "../external/openMeteo";
import { WeatherByLocationResponse } from "../../types";

export async function getWeatherByLocation(
  locationName: string
): Promise<WeatherByLocationResponse> {
  const geo = await fetchLocation(locationName);
  const { name, lat, lon } = geo[0];

  const weatherForecast = await fetchWeatherForecast({
    latitude: parseFloat(lat),
    longitude: parseFloat(lon),
  });

  return {
    locationName: name,
    hourly: weatherForecast.hourly.time.map((time, index) => {
      return {
        time,
        weatherCode: weatherForecast.hourly.weather_code[index],
        temperature: {
          current: Math.round(weatherForecast.hourly.temperature_2m[index]),
          apparent: Math.round(
            weatherForecast.hourly.apparent_temperature[index]
          ),
        },
        precipitationProbability: Math.round(
          weatherForecast.hourly.precipitation_probability[index]
        ),
      };
    }),
    daily: weatherForecast.daily.time.map((time, index) => {
      return {
        time,
        weatherCode: weatherForecast.daily.weather_code[index],
        temperature: {
          max: Math.round(weatherForecast.daily.temperature_2m_max[index]),
          min: Math.round(weatherForecast.daily.temperature_2m_min[index]),
        },
        precipitationProbability: Math.round(
          weatherForecast.daily.precipitation_probability_max[index]
        ),
      };
    }),
  };
}
